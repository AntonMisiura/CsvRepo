using System;
using backend.auth.api.Contracts;
using backend.auth.api.Data;
using backend.auth.api.Entities;

namespace backend.auth.api.Service
{
    public class FacebookLoginService : ILoginService
    {
        public string ActionType => "Facebook";
        public ApplicationDbContext Context { get; set; }

        private IAccountRepository _accountRepository;
        private IAuthExternalRepository _authExternalRepository;

        public FacebookLoginService(IAccountRepository repository,
            IAuthExternalRepository authExternalRepository,
            ApplicationDbContext context)
        {
            Context = context;
            _accountRepository = repository;
            _authExternalRepository = authExternalRepository;
        }

        public Account GetOrCreate(LoginRequest account)
        {
            var facebookId = account.Id;
            var dbUser = _authExternalRepository.FindByFacebookId(facebookId);

            if (dbUser == null)
            {
                using (var transaction = Context.Database.BeginTransaction())
                {
                    try
                    {
                        var userAccount = _accountRepository.Create(new Account
                        {
                            first_name = account.FirstName,
                            last_name = account.LastName,
                            username = account.UserName,
                            registration_ip = account.RegistrationIP
                        });
                        _authExternalRepository.CreateFbAccount(new AuthFacebook()
                        {
                            account_id = userAccount.id,
                            email = account.Email,
                            facebook_id = account.Id
                        });

                        transaction.Commit();
                        return userAccount;
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw new Exception(ex.Message);
                    }
                }
            }

            return _accountRepository.GetById(dbUser.account_id);
        }
    }
}
