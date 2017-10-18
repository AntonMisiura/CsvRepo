using backend.auth.api.Entities;

namespace backend.auth.api.Contracts
{
    public interface IRegisterService
    {
        /// <summary>
        /// Allegro, Faceebook, Google login types
        /// </summary>
        string ActionType { get; }

        /// <summary>
        /// Create allegro account
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        void Register(LoginRequest account);
    }
}