using System;
using System.ComponentModel.DataAnnotations;

namespace AdminDashboard.CsvExport.Entities
{
    public class GpsData
    {
        [Key]
        public long car_id { get; set; }
        public long device_id { get; set; }
        public DateTime device_timestamp { get; set; }
        public long event_id { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        public long attitude { get; set; }
        public long track { get; set; }
        public DateTime system_timestamp { get; set; }
    }
}
