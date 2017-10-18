using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace backend.auth.api.Model
{
    /// <summary>
    /// Core's standard class for user's identity
    /// </summary>
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
    }
}
