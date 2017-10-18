using System;

namespace AdminDashboard.CsvExport.Entities
{
    public class CsvValues
    {
        public DateTime device_timestamp { get; set; }

        public double? acc_x { get; set; }
        public double? acc_y { get; set; }
        public double? acc_z { get; set; }
        public double? mag_x { get; set; }
        public double? mag_y { get; set; }
        public double? mag_z { get; set; }
        public double? gyro_xangle { get; set; }
        public double? gyro_yangle { get; set; }
        public double? gyro_zangle { get; set; }

        //public int? obd_event_id { get; set; }
        //public string pid { get; set; }
        public double? pidValue { get; set; }

        //public long? gps_event_id { get; set; }
        public double? latitude { get; set; }
        public double? longitude { get; set; }
        public long? attitude { get; set; }
        public long? track { get; set; }
    }
}
