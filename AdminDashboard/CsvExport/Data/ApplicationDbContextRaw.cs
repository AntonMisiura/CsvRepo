using AdminDashboard.CsvExport.Entities;
using DeviceAuth.Models;
using Microsoft.EntityFrameworkCore;

namespace AdminDashboard.CsvExport.Data
{
    public class ApplicationDbContextRaw : DbContext
    {
        public ApplicationDbContextRaw(DbContextOptions<ApplicationDbContextRaw> options)
            : base(options)
        {
        }

        public DbSet<Entities.Device> device { get; set; }
        public DbSet<GpsData> gps_data { get; set; }
        public DbSet<ImuData> imu_data { get; set; }
        public DbSet<ObdData> obd_data { get; set; }
    }
}
