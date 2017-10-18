
using DeviceAuth.Models;
using DeviceAuth.Services;
using DeviceAuth.Services.Models;
using Microsoft.Extensions.Configuration;
using Moq;
using System;
using Xunit;
using Microsoft.Extensions.Primitives;
using System.Collections.Generic;
using DeviceAuth.IServices;
using DeviceAuth.Helpers;
using DeviceJWTGenerator;
using System.IdentityModel.Tokens.Jwt;
using DeviceJWTGenerator.Models;
using System.Linq;

namespace DeviceAuth.Tests
{
    public class AuthProviderTests
    {
        AuthProvider _authProvider;
        Device _device;
        string _randomPayload = "f4980b816474929eb277264b06ad639927f36cce3dd70de66551b6a1be72b705";
        public AuthProviderTests()
        {
            string key = "ServerKey";
            var configMoq = new Mock<IConfigurationService>();
            configMoq.Setup(config => config.GetValue(key)).Returns(GetServerKey());
            _authProvider = new AuthProvider(configMoq.Object);
            _device = new Device { CarID = 1, ID = 1, OriginalID = "EF5ON3EOVH9X37", SecretKey = "adb6f6367722183007041ce6745dbe133d61e62e360fea0dd4c6ee5be1da5c53" };

        }

        [Fact]
        public void GetRandomPayloadTest()
        {
            var payload = _authProvider.GetRandomPayload();
            Assert.Equal(64, payload.Length);
        }
        [Fact]
        public void GetServerSignatureTest()
        {
            var serverSignature = _authProvider.GetServerPayloadSignature(_randomPayload);
            Assert.Equal(serverSignature, CryptoHelpers.GetSHA(CryptoHelpers.GetXOR(_randomPayload, GetServerKey())));
            Assert.Equal(serverSignature, "52863fad43884230b81857b90955dff765530ef1e0f7c227252e0433190b66dd");

        }
        [Fact]
        public void GetDeviceSignatureTest()
        {
            var deviceSignature = _authProvider.GetDevicePayloadSignature(_randomPayload, _device);
            Assert.Equal(deviceSignature, CryptoHelpers.GetSHA(CryptoHelpers.GetXOR(_randomPayload, _device.SecretKey)));
            Assert.Equal(deviceSignature, "0ef508f1e02dbf734538fe6b2af65f018e1c0d778979728d58e19ab6b5ed1692");

        }
        [Fact]
        public void TestToken() {
            JWTGenerator jwtGen = new JWTGenerator();
           List<TokenKeyItem> tokenKey  = new List<TokenKeyItem>();
            tokenKey.Add(new TokenKeyItem
            {
                k = "Mjg2NTFjYzZkNDljMjhjYjJmNGEwOTk1YmY=",
                kty = "oct",
                kid = "0001"
            });
           
            JWTService.TokenKeysHolder.keys = tokenKey;
            var token = jwtGen.GetJWTToken(_device);
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            var readedToken = handler.ReadJwtToken(token);
            Assert.Equal(_device.OriginalID, readedToken.Payload.Claims.Single(x => x.Type == "serialID").Value);
        }
        public string GetServerKey() {
            return "f72af469123abd8d6c026839fed46079fc1efc3a159b9eceb1ececcf54c1b4b9";
        }
    }

  
}
