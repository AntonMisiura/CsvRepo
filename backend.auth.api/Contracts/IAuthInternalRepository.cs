using backend.auth.api.Entities;

namespace backend.auth.api.Contracts
{
    public interface IAuthInternalRepository
    {
        /// <summary>
        /// Create account if doesn't exist, and save to db
        /// </summary>
        /// <param name="account"></param>
        void Create(AuthInternal account);

        /// <summary>
        /// Find account by email address
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        AuthInternal FindByEmail(string email);

        /// <summary>
        /// Update user's password
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        bool UpdatePassword(string email, string password);
    }
}
