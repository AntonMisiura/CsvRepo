using DeviceAuth.Models;
using DeviceJWTGenerator.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace DeviceJWTGenerator
{
    public class JWTGenerator
    {

        public string GetJWTToken(Device device)
        {
            if (JWTService.TokenKeysHolder.keys.Count == 0) return null;
            string sec = JWTService.TokenKeysHolder.keys[0].k;

            var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(Convert.FromBase64String(sec));
            var signingCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(securityKey, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256);
            var header = new JwtHeader(signingCredentials);
            header.Add("kid", JWTService.TokenKeysHolder.keys[0].kid);
            var claims = new[]
            {
               new Claim("serialID", device.OriginalID.ToString()),
               new Claim("carID", device.CarID.ToString(), ClaimValueTypes.Integer64),
               new Claim("deviceID", device.ID.ToString(), ClaimValueTypes.Integer64),
               new Claim(JwtRegisteredClaimNames.Exp, ((Int32)(DateTime.UtcNow.AddDays(1).Subtract(new DateTime(1970, 1, 1))).TotalSeconds).ToString(), ClaimValueTypes.Integer64),
               new Claim(JwtRegisteredClaimNames.Aud, "https://auth.mgduke.com")

            };
            var payload = new JwtPayload(claims);
            var secToken = new JwtSecurityToken(header, payload);
            var handler = new JwtSecurityTokenHandler();
            var tokenString = handler.WriteToken(secToken);


            return tokenString;
        }
    }
    
   
    
}
