using System;
using System.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AdminDashboard.Models;
using DeviceJWTGenerator;
using AdminDashboard.Contracts;
using AdminDashboard.CsvExport.Contracts;
using AdminDashboard.CsvExport.Data;
using AdminDashboard.CsvExport.Impl;
using AdminDashboard.Repositories;
using AdminDashboard.Services;
using DeviceAuth.Data.IRepositories;
using DeviceAuth.Data.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Npgsql;

namespace AdminDashboard
{
    public class Startup : IDisposable
    {
        public IConfiguration Configuration { get; }

        public IDbConnection Connection { get; private set; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options => {
                options.UseNpgsql(Configuration.GetConnectionString("DataAccessPostgreSqlProvider"));
            });
            services.AddDbContext<ApplicationDbContextRaw>(options => {
                options.UseNpgsql(Configuration.GetConnectionString("DataAccessPostgreSqlProviderRaw"));
            });

            services.AddMvc();
            services.AddTransient<IObdDataRecordRepository, ObdDataRecordRepository>();
            services.AddTransient<ITileService, TileService>();
            services.AddTransient<IDeviceService, DeviceService>();
            services.AddTransient<IJWTGeneratorService, JWTGeneratorService>();
            services.AddTransient<IDeviceRepository, DeviceRepository>();
            services.AddTransient<ICsvExportRepository, CsvExportRepository>();
            services.AddTransient<ICsvExportService, CsvExportService>();


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

            return services.BuildServiceProvider();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddConsole(LogLevel.Debug);
            loggerFactory.AddDebug(LogLevel.Debug);

            PidsDictionaryHolder _pidsHolder = new PidsDictionaryHolder(env);
            JWTService.GetTokensKeyFromFile(env);


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


            app.UseStaticFiles();

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
