using System.Linq;
using user.auth.api.Contracts;
using user.auth.api.Data;
using user.auth.api.Entities;
using user.auth.api.Security;

namespace user.auth.api.Repo
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

            if (dbAccount != null)
            {
                var hashNewPsw = PasswordHashProvider.CreateHash(password);
                dbAccount.password = hashNewPsw;

                Context.SaveChanges();
                return true;
            }
            
            return false;
        }
    }
}
