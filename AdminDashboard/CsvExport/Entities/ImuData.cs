using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminDashboard.CsvExport.Entities
{
    public class ImuData
    {
        [Key]
        public long car_id { get; set; }
        [Column("device_id")]
        public long deviceId { get; set; }
        public DateTime device_timestamp { get; set; }

        public double acc_x { get; set; }
        public double acc_y { get; set; }
        public double acc_z { get; set; }

        public double mag_x { get; set; }
        public double mag_y { get; set; }
        public double mag_z { get; set; }

        public double gyro_xangle { get; set; }
        public double gyro_yangle { get; set; }
        public double gyro_zangle { get; set; }
        public DateTime system_timestamp { get; set; }
    }
}
