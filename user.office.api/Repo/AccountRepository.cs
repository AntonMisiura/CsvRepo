using System.Linq;
using user.office.api.Contracts;
using user.office.api.Data;
using user.office.api.Entities;

namespace user.office.api.Repo
{
    public class AccountRepository : IAccountRepository
    {
        public ApplicationDbContext Context { get; set; }

        public AccountRepository(ApplicationDbContext context)
        {
            Context = context;
        }

        public Account Create(Account account)
        {
            if (account != null)
            {
                Context.Set<Account>().Add(account);
            }

            Context.SaveChanges();

            return account;
        }

        public Account GetById(long id)
        {
            return Context.Set<Account>().FirstOrDefault(u => u.id == id);
        }

        public Account GetByUserName(string userName)
        {
            return Context.Set<Account>().FirstOrDefault(u => u.username == userName);
        }
    }
}
