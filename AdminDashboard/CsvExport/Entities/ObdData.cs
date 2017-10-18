using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminDashboard.CsvExport.Entities
{
    public class ObdData
    {
        [Key]
        public long car_id { get; set; }
        [Column("device_id")]
        public long deviceId { get; set; }
        public DateTime device_timestamp { get; set; }
        public int event_id { get; set; }
        public string pid { get; set; }
        public double value { get; set; }

        public DateTime system_timestamp { get; set; }
    }
}
