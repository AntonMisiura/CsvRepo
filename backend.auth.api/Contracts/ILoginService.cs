using backend.auth.api.Entities;

namespace backend.auth.api.Contracts
{
    public interface ILoginService
    {
        /// <summary>
        /// Allegro, Faceebook, Google login types
        /// </summary>
        string ActionType { get; }

        /// <summary>
        /// Get(Login) account if exists, or return message if doesn't 
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        Account GetOrCreate(LoginRequest account);
    }
}
