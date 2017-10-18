using System;
using System.Net;
using backend.auth.api.Contracts;
using backend.auth.api.Data;
using backend.auth.api.Entities;
using backend.auth.api.Security;
using Microsoft.Extensions.Logging;

namespace backend.auth.api.Service
{
    public class RegisterService : IRegisterService
    {
        public string ActionType => "Register";
        public ApplicationDbContext Context { get; set; }

        private ILogger<RegisterService> _logger;
        private IAccountRepository _accountRepository;
        private IAuthInternalRepository _authInternalRepository;

        public RegisterService(IAccountRepository repository,
            ILogger<RegisterService> logger,
            IAuthInternalRepository authInternalRepository,
            ApplicationDbContext context)
        {
            Context = context;
            _logger = logger;
            _accountRepository = repository;
            _authInternalRepository = authInternalRepository;
        }

        public void Register(LoginRequest account)
        {
            var dbUser = _authInternalRepository.FindByEmail(account.Email);

            if (dbUser == null)
            {
                using (var transaction = Context.Database.BeginTransaction())
                {
                    try
                    {
                        _accountRepository.Create(new Account
                        {
                            first_name = account.FirstName,
                            last_name = account.LastName,
                            username = account.UserName,
                            registration_ip = account.RegistrationIP
                        });
                        _authInternalRepository.Create(new AuthInternal
                        {
                            account_id = _accountRepository.GetByUserName(account.UserName).id,
                            email = account.Email,
                            password = PasswordHashProvider.CreateHash(account.Password)
                        });

                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw new Exception(ex.Message);
                    }
                }
            }
            else
            {
                _logger.LogError($"Account with {account.Email} already exist!");
                throw new WebException(HttpStatusCode.BadRequest.ToString());
            }
        }
    }
}
