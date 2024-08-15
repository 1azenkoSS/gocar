using Web_API.Models.UsersCars;

namespace Web_API.userData
{
    public class UsersCarsDbContext : DbContext
    {
        public DbSet<UsersCars> UsersCars { get; set; }

        public UsersCarsDbContext(DbContextOptions<UsersCarsDbContext> options) : base(options)
        {

        }

    }
}
