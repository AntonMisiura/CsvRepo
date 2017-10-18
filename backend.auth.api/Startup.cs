using System;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using backend.auth.api.Contracts;
using backend.auth.api.Data;
using backend.auth.api.Model;
using backend.auth.api.Repo;
using backend.auth.api.Security.JWT;
using backend.auth.api.Service;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Npgsql;

namespace backend.auth.api
{
    public class Startup : IDisposable
    {
        /// <summary>
        /// Configuration file
        /// </summary>
        public IConfigurationRoot Configuration { get; }

        public IDbConnection Connection { get; private set; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

#if DEBUG
            if (env.IsEnvironment("Development"))
            {
                // This will push telemetry data through Application Insights pipeline faster, allowing you to view results immediately.
                builder.AddApplicationInsightsSettings(developerMode: true);
            }
#endif

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddApplicationInsightsTelemetry(Configuration);

            Connection = new NpgsqlConnection(Configuration.GetConnectionString("DataAccessPostgreSqlProvider"));
            
            services.AddDbContext<ApplicationDbContext>(options => {
                options.UseNpgsql(Configuration.GetConnectionString("DataAccessPostgreSqlProvider"));
            });

#if DEBUG
            // Cross - orgin requests
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });
#endif

            //Using this core's identity to enable allegro's, google's and fb's identity
            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
                {
                    options.Password.RequireDigit = true;
                    options.Password.RequireLowercase = true;
                    options.Password.RequireNonAlphanumeric = true;
                    options.Password.RequireUppercase = true;
                    options.Password.RequiredLength = 6;
                    options.User.AllowedUserNameCharacters = null;
                })
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            //Add my own services
            services.AddTransient<EmailService>();
            services.AddTransient<ResetPasswordService>();
            services.AddTransient<ILoginService, InternalLoginService>();
            //services.AddTransient<ILoginService, FacebookLoginService>();
            //services.AddTransient<ILoginService, GoogleLoginService>();
            //services.AddTransient<IRegisterService, RegisterService>();
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IAuthExternalRepository, AuthExternalRepository>();
            services.AddTransient<IAuthInternalRepository, AuthInternalRepository>();


            services.AddMvc();
#if DEBUG
            //Configure mvc for Cors
            services.Configure<MvcOptions>(options =>
            {
                options.Filters.Add(new CorsAuthorizationFilterFactory("AllowSpecificOrigin"));
            });
#endif
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddConsole(LogLevel.Debug);
            loggerFactory.AddDebug(LogLevel.Debug);

#if DEBUG
            //app.UseCors(builder =>
            //    builder.WithOrigins("http://localhost:8080"));
            app.UseCors("CorsPolicy");
#endif

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationScheme = "ApplicationCookie",
                AutomaticAuthenticate = true
            });

            app.UseFacebookAuthentication(new FacebookOptions
            {
                AppId = Configuration["FacebookOptions:AppId"],
                AppSecret = Configuration["FacebookOptions:AppSecret"]
            });

            app.UseGoogleAuthentication(new GoogleOptions()
            {
                ClientId = Configuration["GoogleOptions:ClientId"],
                ClientSecret = Configuration["GoogleOptions:ClientSecret"]
            });

            app.UseApplicationInsightsRequestTelemetry();

            app.UseApplicationInsightsExceptionTelemetry();

            //Get JWT secret key and id from config
            var jwtSecretKey = Configuration["JwtSecret:SecretKey:k"];
            var jwtSecretId = Configuration["JwtSecret:SecretKey:kid"];

            //Convert secretKey from base 64
            var jwtSecretKeyFromBase64 = new SymmetricSecurityKey(Convert.FromBase64String(jwtSecretKey));
            var signingCredentials = new SigningCredentials(jwtSecretKeyFromBase64, SecurityAlgorithms.HmacSha256);

            var header = new JwtHeader(signingCredentials);
            header.Add("kid", jwtSecretId);

            var options = new TokenProviderOptions
            {
                Header = header
            };

            app.UseMiddleware<ResetPasswordProviderMiddleware>();
            app.UseMiddleware<TokenProviderMiddleware>(Options.Create(options));
            app.UseMiddleware<RegisterProviderMiddleware>(Options.Create(options));

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }

        public void Dispose()
        {
            Connection.Close();
        }
    }
}
