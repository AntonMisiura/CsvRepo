using System;
using backend.auth.api.Contracts;
using backend.auth.api.Data;
using backend.auth.api.Entities;
using backend.auth.api.Security;
using Microsoft.Extensions.Logging;

namespace backend.auth.api.Service
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
