using System.Linq;
using backend.auth.api.Contracts;
using backend.auth.api.Data;
using backend.auth.api.Entities;
using backend.auth.api.Security;

namespace backend.auth.api.Repo
{
    public class AuthInternalRepository : IAuthInternalRepository
    {
        public ApplicationDbContext Context { get; set; }

        public AuthInternalRepository(ApplicationDbContext context)
        {
            Context = context;
        }

        public void Create(AuthInternal account)
        {
            if (account != null)
            {
                Context.Set<AuthInternal>().Add(account);
            }

            Context.SaveChanges();
        }

        public AuthInternal FindByEmail(string email)
        {
            return Context.Set<AuthInternal>().FirstOrDefault(u => u.email == email);
        }

        public bool UpdatePassword(string email, string password)
        {
            var dbAccount = Context.Set<AuthInternal>().FirstOrDefault(u => u.email == email);

            if (PasswordHashProvider.ValidatePassword(password, dbAccount.password))
            {
                dbAccount.password = string.Empty;
                Context.SaveChanges();
                return true;
            }

            return false;
        }
    }
}
