using System;
using System.IdentityModel.Tokens.Jwt;

namespace backend.auth.api.Security.JWT
{
    public class TokenProviderOptions
    {
        public string Path { get; set; }

        public JwtHeader Header { get; set; }

        public TimeSpan Expiration { get; set; } = TimeSpan.FromHours(2);
    }
}
