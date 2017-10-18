using System;
using user.office.api.Contracts;
using user.office.api.Data;
using user.office.api.Entities;

namespace user.office.api.Services
{
    public class GoogleLoginService : ILoginService
    {
        public string ActionType => "Google";
        public ApplicationDbContext Context { get; set; }
        
        private IAccountRepository _accountRepository;
        private IAuthExternalRepository _authExternalRepository;

        public GoogleLoginService(IAccountRepository repository,
            IAuthExternalRepository authExternalRepository,
            ApplicationDbContext context)
        {
            Context = context;
            _accountRepository = repository;
            _authExternalRepository = authExternalRepository;
        }

        public Account GetOrCreate(LoginRequest account)
        {
            var googleId = account.Id;
            var dbUser = _authExternalRepository.FindByGoogleId(googleId);
            
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
                        _authExternalRepository.CreateGoogleAccount(new AuthGoogle()
                        {
                            account_id = _accountRepository.GetByUserName(account.UserName).id,
                            email = account.Email,
                            google_id = account.Id
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
