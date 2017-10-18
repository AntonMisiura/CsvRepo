using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using user.auth.api.Entities;
using user.auth.api.Model;

namespace user.auth.api.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Account> account { get; set; }
        public DbSet<AuthGoogle> auth_google { get; set; }
        public DbSet<AuthInternal> auth_internal{ get; set; }
        public DbSet<AuthFacebook> auth_facebook{ get; set; }
    }
}
