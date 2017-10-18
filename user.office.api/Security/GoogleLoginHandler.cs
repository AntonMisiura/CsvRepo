using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using user.office.api.Contracts;
using user.office.api.Entities;

namespace user.office.api.Security
{
    public class GoogleLoginHandler : ILoginHandler
    {
        public string ActionType => "Google";
        private readonly ILogger<GoogleLoginHandler> _logger;
        private const string GoogleApiTokenInfoUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={0}";
        
        public GoogleLoginHandler(ILogger<GoogleLoginHandler> logger)
        {
            _logger = logger;
        }
        
        public bool VerifyUserDetails(string email, string accessToken)
        {
            var isValid = new EmailAddressAttribute().IsValid(email);

            if (!isValid || string.IsNullOrEmpty(email))
            {
                _logger.LogError($"This email adress {email} is not valid!");
                return false;
            }

            var httpClient = new HttpClient();
            var requestUri = new Uri(string.Format(GoogleApiTokenInfoUrl, accessToken));
            HttpResponseMessage httpResponseMessage = null;

            try
            {
                httpResponseMessage = httpClient.GetAsync(requestUri).Result;
            }
            catch (WebException ex)
            {
                _logger.LogError($"Failed to get response message from Google Api: {ex.Message}");
                throw new WebException(ex.Status + ex.Message);
            }

            if (httpResponseMessage == null || httpResponseMessage.StatusCode != HttpStatusCode.OK)
            {
                _logger.LogError("Invalid access token");
                return false;
            }

            var response = httpResponseMessage.Content.ReadAsStringAsync().Result;

            if (response == null || response.Contains("Error"))
            {
                _logger.LogError("Invalid access token");
                return false;
            }

            return true;
        }


        public Task<LoginRequest> GetAccount(string loginDataJson)
        {
            try
            {
                var googleResponse = JsonConvert.DeserializeObject<RegisterRequest>(loginDataJson);
                var verifyUserDetails = VerifyUserDetails(googleResponse.Email, googleResponse.Token);
                //var intAddress = BitConverter.ToInt32(IPAddress.Parse(googleResponse.RegistrationIP).GetAddressBytes(), 0);
                
                if (verifyUserDetails != true)
                {
                    _logger.LogError("Google credential are not valid!");
                    var request = new LoginRequest();
                    return Task.FromResult(request = null); 
                }

                return Task.FromResult(new LoginRequest()
                {
                    Id = googleResponse.Id,
                    UserName = googleResponse.UserName,
                    Email = googleResponse.Email,
                    FirstName = googleResponse.FirstName,
                    LastName = googleResponse.LastName,
                    EndDate = googleResponse.EndDate,
                    RegistrationIP = Convert.ToInt32(googleResponse.RegistrationIP)
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
