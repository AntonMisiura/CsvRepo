using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using user.auth.api.Contracts;
using user.auth.api.Entities;

namespace user.auth.api.Security
{
    public class AllegroLoginHandler : ILoginHandler
    {
        public string ActionType => "Internal";
        private readonly ILogger<AllegroLoginHandler> _logger;

        public AllegroLoginHandler(ILogger<AllegroLoginHandler> logger)
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
                var allegroResponse = JsonConvert.DeserializeObject<LoginRequest>(loginDataJson);
                var verifyUserDetails = VerifyUserDetails(allegroResponse.Email, allegroResponse.Password);

                if (verifyUserDetails != true)
                {
                    _logger.LogError("Account details are not valid");
                    return null;
                }

                return Task.FromResult(new LoginRequest()
                {
                    Email = allegroResponse.Email,
                    Password = allegroResponse.Password
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
