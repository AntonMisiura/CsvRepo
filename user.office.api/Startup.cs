using System;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using user.office.api.Contracts;
using user.office.api.Data;
using user.office.api.Entities;
using user.office.api.Model;
using user.office.api.Repo;
using user.office.api.Security.Jwt;
using user.office.api.Services;
namespace user.office.api
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

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
            PidsDictionaryHolder _pidsHolder = new PidsDictionaryHolder(env);
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.ConfigureApplicationCookie(o => o.LoginPath = new PathString("/login"));
            
            services.AddDbContext<ApplicationDbContext>(options => {
                options.UseNpgsql(Configuration.GetConnectionString("DataAccessPostgreSqlProvider"));
            });
            services.AddDbContext<ApplicationDbContextRO>(options => {
                options.UseNpgsql(Configuration.GetConnectionString("DataAccessPostgreSqlProviderRO"));
            });
            services.AddDbContext<ApplicationDbContextRaw>(options => {
                options.UseNpgsql(Configuration.GetConnectionString("DataAccessPostgreSqlProviderRaw"));
            });
            // Register the Swagger generator, defining one or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                //c.SwaggerDoc("v1", new Info { Title = "My API", Version = "v1" });
            });

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true
            };
            
            services.AddAuthentication()
                .AddJwtBearer(o =>
                {
                    o.TokenValidationParameters = tokenValidationParameters;
                })
                .AddFacebook(o =>
                {
                    o.AppId = Configuration["FacebookOptions:AppId"];
                    o.AppSecret = Configuration["FacebookOptions:AppSecret"];
                })
                .AddGoogle(o =>
                {
                    o.ClientId = Configuration["GoogleOptions:ClientId"];
                    o.ClientSecret = Configuration["GoogleOptions:ClientSecret"];
                });

            Connection = new NpgsqlConnection(Configuration.GetConnectionString("DataAccessPostgreSqlProvider"));

           
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
            services.AddTransient<IChartService, ChartService>();
            services.AddTransient<IGetDirectionService, GetDirectionService>();
            
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IAuthExternalRepository, AuthExternalRepository>();
            services.AddTransient<IAuthInternalRepository, AuthInternalRepository>();
            services.AddTransient<IMapRepository, MapRepository>();
            services.AddTransient<IDeviceRepository, DeviceRepository>();
            services.AddTransient<IChartRepository, ChartRepository>();
            services.AddTransient<ICarRepository, CarRepository>();

            services.AddMvc();
            return services.BuildServiceProvider();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddConsole(LogLevel.Debug);
            loggerFactory.AddDebug(LogLevel.Debug);
            
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS etc.), specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseAuthentication();
            
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

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }

        public void Dispose()
        {
            Connection.Close();
        }
    }
}
