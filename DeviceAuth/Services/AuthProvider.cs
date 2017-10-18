using System;
using DeviceAuth.Helpers;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using DeviceAuth.Data.Repositories;
using DeviceAuth.Models;
using DeviceAuth.Services.Models;
using System.Configuration;
using Microsoft.Extensions.Configuration;
using DeviceJWTGenerator;
using DeviceAuth.IServices;

namespace DeviceAuth.Services
{

    public class AuthProvider : IAuthProvider
    {
        private string _serverPrivateKey;
        const int RANDOM_PAYLOAD_LENGTH = 32;
        private JWTGenerator _jwtGen;
      
        
        public AuthProvider(IConfigurationService configuration)
        {
            //_serverPrivateKey = ConfigurationManager.AppSettings["serverKey"];
            _serverPrivateKey = configuration.GetValue("ServerKey");
            _jwtGen = new JWTGenerator();
           
        }
        
       public string GetRandomPayload()
        {
            return CryptoHelpers.GetSHA(CryptoHelpers.GetRandomSalt(RANDOM_PAYLOAD_LENGTH));
        }
        public string GetServerPayloadSignature(string randomPayload)
        {
            if (randomPayload.Length != _serverPrivateKey.Length) {
                return null;
            }
            return CryptoHelpers.GetSHA(CryptoHelpers.GetXOR(randomPayload, _serverPrivateKey));
        }
        
        public bool CheckServerAndDevicePayload(PacketWithId packet, Device device)
        {
            if (GetServerPayloadSignature(packet.randomPayload) == packet.serverSignature && 
                GetDevicePayloadSignature(packet.randomPayload, device) == packet.deviceSignature) return true;
            return false;
        }
        
        public string GetJWTToken(Device device)
        {
            return _jwtGen.GetJWTToken(device);
        }
       public string GetDevicePayloadSignature(string randomPayload, Device device)
        {
            if (randomPayload.Length != device.SecretKey.Length)
            {
                return null;
            }
            return CryptoHelpers.GetSHA(CryptoHelpers.GetXOR(randomPayload, device.SecretKey));
        }

    }
}
