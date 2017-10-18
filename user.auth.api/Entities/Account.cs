namespace user.auth.api.Entities
{
    public class Account
    {
        public long id { get; set; }
        public string username { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public int registration_ip { get; set; }
    }
}
