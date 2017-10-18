using AdminDashboard.CsvExport.Entities;
using DeviceAuth.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AdminDashboard.CsvExport.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Entities.Device> device { get; set; }
        public DbSet<GpsData> gps_data { get; set; }
        public DbSet<ObdData> obd_data { get; set; }


        public DbSet<Account> account { get; set; }
        public DbSet<AccountCar> account_car { get; set; }
        public DbSet<DevicePlacement> device_placement { get; set; }
    }
}
