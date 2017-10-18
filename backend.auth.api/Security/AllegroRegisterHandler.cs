using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using backend.auth.api.Contracts;
using backend.auth.api.Entities;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net;

namespace backend.auth.api.Security
{
    public class AllegroRegisterHandler : ILoginHandler
    {
        public string ActionType => "Register";
        private readonly ILogger<AllegroRegisterHandler> _logger;

        public AllegroRegisterHandler(ILogger<AllegroRegisterHandler> logger)
        {
            _logger = logger;
        }

        public bool VerifyUserDetails(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password)
                || password.Length < 6)
            {
                _logger.LogError("email or password is not valid");
                return false;
            }

            var isValid = new EmailAddressAttribute().IsValid(email);

            if (!isValid)
            {
                _logger.LogError($"email {email} is wrong!");
                return false;
            }

            return true;
        }


        public Task<LoginRequest> GetAccount(string loginDataJson)
        {
            try
            {
                var allegroResponse = JsonConvert.DeserializeObject<RegisterRequest>(loginDataJson);
                var verifyUserDetails = VerifyUserDetails(allegroResponse.Email, allegroResponse.Password);
                var intAddress = BitConverter.ToInt32(IPAddress.Parse(allegroResponse.RegistrationIP).GetAddressBytes(), 0);
                
                if (verifyUserDetails != true)
                {
                    _logger.LogError("Account details are not valid");
                    return null;
                }

                return Task.FromResult(new LoginRequest()
                {
                    UserName = allegroResponse.UserName,
                    Email = allegroResponse.Email,
                    Password = allegroResponse.Password,
                    FirstName = allegroResponse.FirstName,
                    LastName = allegroResponse.LastName,
                    RegistrationIP = intAddress
                });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get user data: {ex.Message}");
                throw new Exception(ex.Message);
            }
        }
    }
}
