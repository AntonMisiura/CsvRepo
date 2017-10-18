using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using user.office.api.Entities;
using user.office.api.Model;

namespace user.office.api.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Device> device { get; set; }
        public DbSet<GpsData> gps_data { get; set; }
        public DbSet<OBDRecord> obd_data { get; set; }


        public DbSet<Account> account { get; set; }
        public DbSet<AccountCar> account_car { get; set; }
        public DbSet<DevicePlacement> device_placement { get; set; }
        public DbSet<AuthGoogle> auth_google { get; set; }
        public DbSet<AuthInternal> auth_internal{ get; set; }
        public DbSet<AuthFacebook> auth_facebook{ get; set; }
    }
}
