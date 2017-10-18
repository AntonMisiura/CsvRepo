using System.ComponentModel.DataAnnotations;

namespace user.office.api.Entities
{
    public class AuthInternal
    {
        [Key]
        public long account_id { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }
}
