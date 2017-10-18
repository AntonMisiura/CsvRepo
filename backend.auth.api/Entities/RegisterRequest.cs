namespace backend.auth.api.Entities
{
    public class RegisterRequest
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string RegistrationIP { get; set; }
        public string Token { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
    }
}
