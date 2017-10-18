using backend.auth.api.Entities;

namespace backend.auth.api.Contracts
{
    public interface IAuthExternalRepository
    {
        /// <summary>
        /// Create fb account if doesn't exist, and save to db
        /// </summary>
        /// <param name="account"></param>
        void CreateFbAccount(AuthFacebook account);

        /// <summary>
        /// Create google account if doesn't exist, and save to db
        /// </summary>
        /// <param name="account"></param>
        void CreateGoogleAccount(AuthGoogle account);

        /// <summary>
        /// Find account by facebook id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>AuthFacebook</returns>
        AuthFacebook FindByFacebookId(string id);

        /// <summary>
        /// Find account by google id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>AuthGoogle</returns>
        AuthGoogle FindByGoogleId(string id);
    }
}
