using user.auth.api.Entities;

namespace user.auth.api.Contracts
{
    public interface IAccountRepository
    {
        /// <summary>
        /// Create account if doesn't exist, and save to db
        /// </summary>
        /// <param name="account"></param>
        Account Create(Account account);

        /// <summary>
        /// Find account by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Account GetById(long id);

        /// <summary>
        /// Find account by userName
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        Account GetByUserName(string userName);
    }
}
