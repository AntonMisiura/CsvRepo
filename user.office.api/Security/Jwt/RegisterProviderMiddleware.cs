using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using user.office.api.Contracts;
using user.office.api.Data;
using user.office.api.Entities;
using user.office.api.Services;

namespace user.office.api.Security.Jwt
{
    public class RegisterProviderMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILoginHandler _loginHandler;
        private readonly TokenProviderOptions _options;
        private readonly IRegisterService _registerService;

        public RegisterProviderMiddleware(RequestDelegate next,
            IOptions<TokenProviderOptions> options,
            IAccountRepository accountRepository,
            IAuthInternalRepository internalRepository,
            ILogger<RegisterService> registerLogger,
            ILogger<AllegroRegisterHandler> allegroLogger,
            ApplicationDbContext context)
        {
            _next = next;
            _options = options.Value;
            _loginHandler = new AllegroRegisterHandler(allegroLogger);
            _registerService = new RegisterService(accountRepository, registerLogger, internalRepository, context);
        }

        public Task Invoke(HttpContext context)
        {
            _options.Path = "/register";

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

            return RegisterAccount(context);
        }

        private async Task RegisterAccount(HttpContext context)
        {
            var actionType = context.Request.Form["actiontype"];
            var loginData = context.Request.Form["logindata"];

            if (_loginHandler == null || actionType != _loginHandler.ActionType)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Bad request.");
                return;
            }

            var account = await _loginHandler.GetAccount(loginData);
            if (account == null)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Bad request.");
                return;
            }

            try
            {
                _registerService.Register(account);
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(ex.Message + ex.StackTrace);
            }
        }
    }
}
