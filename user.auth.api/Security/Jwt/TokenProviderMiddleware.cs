using System;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using user.auth.api.Contracts;
using user.auth.api.Data;
using user.auth.api.Entities;
using user.auth.api.Services;

namespace user.auth.api.Security.Jwt
{
    public class TokenProviderMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILoginHandler[] _handlers;
        private readonly ILoginService[] _services;
        private readonly TokenProviderOptions _options;

        public TokenProviderMiddleware(RequestDelegate next,
            IOptions<TokenProviderOptions> options,
            ILogger<InternalLoginService> logger,
            ILogger<FacebookLoginHandler> fbLogger,
            ILogger<GoogleLoginHandler> googleLogger,
            ILogger<AllegroLoginHandler> allegroLogger,
            IAccountRepository accountRepository,
            IAuthInternalRepository authInternalRepository,
            IAuthExternalRepository authExternalRepository,
            ApplicationDbContext context)
        {
            _next = next;
            _options = options.Value;
            _services = new ILoginService[]
            {
                new GoogleLoginService(accountRepository, authExternalRepository, context),
                new InternalLoginService(accountRepository, logger, authInternalRepository),
                new FacebookLoginService(accountRepository, authExternalRepository, context)
            };

            _handlers = new ILoginHandler[]
            {
                new FacebookLoginHandler(fbLogger),
                new GoogleLoginHandler(googleLogger),
                new AllegroLoginHandler(allegroLogger)
            };
        }

        public Task Invoke(HttpContext context)
        {
            _options.Path = "/login";

            // If the request path doesn't match, skip
            if (!context.Request.Path.Equals(_options.Path, StringComparison.Ordinal))
            {
                return _next(context);
            }

            if (!context.Request.Method.Equals("POST")
                || !context.Request.HasFormContentType)
            {
                context.Response.StatusCode = 400;
                return context.Response.WriteAsync("Bad request.");
            }

            return GenerateToken(context);
        }

        private async Task GenerateToken(HttpContext context)
        {
            var actionType = context.Request.Form["actiontype"];
            var loginData = context.Request.Form["logindata"];

            var loginHandler = _handlers.FirstOrDefault(h => h.ActionType == actionType);
            if (loginHandler == null)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Bad request.");
                return;
            }

            var loginService = _services.FirstOrDefault(h => h.ActionType == actionType);
            if (loginService == null)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Bad request.");
                return;
            }

            var user = await loginHandler.GetAccount(loginData);
            if (user == null)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Bad request.");
                return;
            }

            var dbUser = loginService.GetOrCreate(user);
            if (dbUser == null)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Bad request");
                return;
            }

            if (user.Id == null)
            {
                user.Id = dbUser.id.ToString();
            }

            var dateTimeNow = DateTime.UtcNow;

            // Specifically add the jti (random nonce), iat (issued timestamp), and sub (subject/user) claims.
            try
            {
                var claims = new[]
                {
                    // Required claims
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, dateTimeNow.ToUniversalTime().ToString(CultureInfo.InvariantCulture), ClaimValueTypes.Integer64),

                    // Account's details claims
                    new Claim("ExpirationTime", _options.Expiration.ToString())
                };

                // Create the JWT and write it to a string
                var header = _options.Header;
                var payload = new JwtPayload(claims);
                var jwt = new JwtSecurityToken(header, payload);
                var expiration = (long)_options.Expiration.TotalSeconds;
                var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

                if (actionType != "Internal")
                {
                    expiration = Convert.ToInt64(user.EndDate);
                }

                var response = new
                {
                    jwtToken = encodedJwt,
                    expires_in = expiration,
                    userName = dbUser.username
                };

                // Serialize and return the response
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(ex.Message + ex.StackTrace);
            }
        }
    }
}
