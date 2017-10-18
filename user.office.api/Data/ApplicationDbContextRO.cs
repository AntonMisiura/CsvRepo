using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using user.office.api.Entities;

namespace user.office.api.Data
{
    public class ApplicationDbContextRO : DbContext
    {

        public ApplicationDbContextRO(DbContextOptions<ApplicationDbContextRO> options)
            : base(options)
        {
        }

        public DbSet<Device> device { get; set; }
        public DbSet<GpsData> gps_data { get; set; }
        public DbSet<OBDRecord> obd_data { get; set; }
        public DbSet<IMURecord> imu_data { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OBDRecord>().ToTable("obd_data", "raw_data");
            modelBuilder.Entity<IMURecord>().ToTable("imu_data", "raw_data");
            modelBuilder.Entity<Device>().ToTable("device", "config");
            
        }
    }
   
}
