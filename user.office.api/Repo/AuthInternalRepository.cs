using System.Linq;
using user.office.api.Contracts;
using user.office.api.Data;
using user.office.api.Entities;
using user.office.api.Security;

namespace user.office.api.Repo
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
