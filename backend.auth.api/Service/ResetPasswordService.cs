using System;
using backend.auth.api.Contracts;

namespace backend.auth.api.Service
{
    public class ResetPasswordService
    {
        private IAuthInternalRepository _authInternalRepository;

        public ResetPasswordService(IAuthInternalRepository authInternalRepository)
        {
            _authInternalRepository = authInternalRepository;
        }

        public void ChangePassword(string email, string password)
        {
            _authInternalRepository.UpdatePassword(email, password);
        }

        public bool CheckAccountEmail(string email)
        {
            try
            {
                var dbUser = _authInternalRepository.FindByEmail(email);

                if (dbUser == null)
                {
                    return false;
                }

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
