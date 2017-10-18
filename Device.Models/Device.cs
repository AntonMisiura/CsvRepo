using System;

namespace DeviceAuth.Models
{
    public class Device
    {
        public long ID { get; set; }
        public string OriginalID { get; set; }
        public long CarID { get; set; }
        public string SecretKey { get; set; }
    }
    public class DeviceViewModelParse
    {
        public long ID { get; set; }
        public string Original_ID { get; set; }
        public long Car_ID { get; set; }
        public string Secret_Key { get; set; }

    }
}
