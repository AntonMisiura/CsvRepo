using Microsoft.EntityFrameworkCore;
using user.office.api.Entities;

namespace user.office.api.Data
{
    public class ApplicationDbContextRaw : DbContext
    {
        public ApplicationDbContextRaw(DbContextOptions<ApplicationDbContextRaw> options)
            : base(options)
        {
        }

        public DbSet<Device> device { get; set; }
        public DbSet<GpsData> gps_data { get; set; }
        public DbSet<OBDRecord> obd_data { get; set; }
    }
}
