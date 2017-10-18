using System.ComponentModel.DataAnnotations;

namespace user.auth.api.Entities
{
    public class AuthGoogle
    {
        [Key]
        public long account_id { get; set; }
        public string email { get; set; }
        public string google_id { get; set; }
    }
}
