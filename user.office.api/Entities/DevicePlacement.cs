using System.ComponentModel.DataAnnotations;

namespace user.office.api.Entities
{
    public class DevicePlacement
    {
        [Key]
        public long device_id { get; set; }
        public long car_id { get; set; }
        public string secret_key { get; set; }

    }
}
