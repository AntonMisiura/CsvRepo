using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using user.auth.api.Contracts;
using user.auth.api.Entities;

namespace user.auth.api.Security
{
    public class FacebookLoginHandler : ILoginHandler
    {
        public string ActionType => "Facebook";
        private readonly ILogger<FacebookLoginHandler> _logger;
        private const string FacebookGraphUrl = "https://graph.facebook.com/me?access_token=";

        public FacebookLoginHandler(ILogger<FacebookLoginHandler> logger)
        {
            _logger = logger;
        }

        public async Task<bool> VerifyUserDetails(string email, string accessToken)
        {
            var isValid = new EmailAddressAttribute().IsValid(email);

            if (!isValid)
            {
                _logger.LogError($"email {email} is wrong!");
                return false;
            }

            var fbVerifyAccessTokenUrl = FacebookGraphUrl + accessToken;

            if (string.IsNullOrEmpty(accessToken))
            {
                return false;
            }

            try
            {
                var request = WebRequest.Create(fbVerifyAccessTokenUrl);
                request.Credentials = CredentialCache.DefaultCredentials;

                using (var response = await request.GetResponseAsync())
                {
                    var status = ((HttpWebResponse)response).StatusCode;

                    if (status != HttpStatusCode.OK)
                    {
                        throw new ValidationException("Invalid Facebook token");
                    }

                    return true;
                }
            }
            catch (WebException ex)
            {
                throw new WebException(ex.Status + ex.Message);
            }
        }

        
        public async Task<LoginRequest> GetAccount(string loginDataJson)
        {
            try
            {
                var facebookResponse = JsonConvert.DeserializeObject<RegisterRequest>(loginDataJson);
                var verifyUserDetails = await VerifyUserDetails(facebookResponse.Email, facebookResponse.Token);
                //var intAddress = BitConverter.ToInt32(IPAddress.Parse(facebookResponse.RegistrationIP).GetAddressBytes(), 0);
                
                if (verifyUserDetails != true)
                {
                    _logger.LogError("Facebook credential are not valid!");
                    var request = new LoginRequest();
                    return await Task.FromResult(request = null);
                }

                return new LoginRequest()
                {
                    Id = facebookResponse.Id,
                    UserName = facebookResponse.UserName,
                    Email = facebookResponse.Email,
                    FirstName = facebookResponse.FirstName,
                    LastName = facebookResponse.LastName,
                    EndDate = facebookResponse.EndDate,
                    RegistrationIP = Convert.ToInt32(facebookResponse.RegistrationIP)
                };
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get user data: {ex.Message}");
                throw new Exception(ex.Message);
            }
        }
    }
}
