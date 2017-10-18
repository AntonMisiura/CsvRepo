using System;
using System.IdentityModel.Tokens.Jwt;

namespace user.auth.api.Entities
{
    public class TokenProviderOptions
    {
        public string Path { get; set; }

        public JwtHeader Header { get; set; }

        public TimeSpan Expiration { get; set; } = TimeSpan.FromHours(2);
    }
}
