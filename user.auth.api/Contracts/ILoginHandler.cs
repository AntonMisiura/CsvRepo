using System.Threading.Tasks;
using user.auth.api.Entities;

namespace user.auth.api.Contracts
{
    public interface ILoginHandler
    {
        /// <summary>
        /// Allegro, Faceebook, Google login types
        /// </summary>
        string ActionType { get; }
        
        /// <summary>
        /// Get user's data from json, and validate user's login and password in case
        /// of allegro reg/log, or user's access token in case of fb and google
        /// </summary>
        /// <param name="loginDataJson"></param>
        /// <returns></returns>
        Task<LoginRequest> GetAccount(string loginDataJson);
    }
}
