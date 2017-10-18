using System.Linq;
using user.office.api.Contracts;
using user.office.api.Data;
using user.office.api.Entities;

namespace user.office.api.Repo
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
