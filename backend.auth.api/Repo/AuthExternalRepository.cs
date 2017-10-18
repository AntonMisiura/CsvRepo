using backend.auth.api.Contracts;
using backend.auth.api.Data;
using backend.auth.api.Entities;
using System.Linq;

namespace backend.auth.api.Repo
{
    public class AuthExternalRepository : IAuthExternalRepository
    {
        public ApplicationDbContext Context { get; set; }

        public AuthExternalRepository(ApplicationDbContext context)
        {
            Context = context;
        }

        public void CreateFbAccount(AuthFacebook account)
        {
            if (account != null)
            {
                Context.Set<AuthFacebook>().Add(account);
            }

            Context.SaveChanges();
        }

        public void CreateGoogleAccount(AuthGoogle account)
        {
            if (account != null)
            {
                Context.Set<AuthGoogle>().Add(account);
            }

            Context.SaveChanges();
        }

        public AuthFacebook FindByFacebookId(string id)
        {
            return Context.Set<AuthFacebook>().FirstOrDefault(u => u.facebook_id == id);
        }

        public AuthGoogle FindByGoogleId(string id)
        {
            return Context.Set<AuthGoogle>().FirstOrDefault(u => u.google_id == id);
        }
    }
}
