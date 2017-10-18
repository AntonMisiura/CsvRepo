using System;
using Microsoft.Extensions.Logging;
using user.office.api.Contracts;
using user.office.api.Data;
using user.office.api.Entities;
using user.office.api.Security;

namespace user.office.api.Services
{
    public class InternalLoginService : ILoginService
    {
        public string ActionType => "Internal";
        public ApplicationDbContext Context { get; set; }

        private ILogger<InternalLoginService> _logger;
        private IAccountRepository _accountRepository;
        private IAuthInternalRepository _authInternalRepository;

        public InternalLoginService(IAccountRepository repository,
            ILogger<InternalLoginService> logger,
            IAuthInternalRepository authInternalRepository)
        {
            _logger = logger;
            _accountRepository = repository;
            _authInternalRepository = authInternalRepository;
        }

        public Account GetOrCreate(LoginRequest account)
        {
            try
            {
                var dbUser = _authInternalRepository.FindByEmail(account.Email);

                if (dbUser == null)
                {
                    _logger.LogError($"Account with login {account.Email} doesn't exist!");
                    return null;
                }

                if (PasswordHashProvider.ValidatePassword(account.Password, dbUser.password))
                {
                    return _accountRepository.GetById(dbUser.account_id);
                }

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
