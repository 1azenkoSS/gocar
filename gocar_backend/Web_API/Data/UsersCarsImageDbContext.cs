using Web_API.Models.CarImage;
using Web_API.Models.UsersCarImageModels;

namespace Web_API.Data
{
    public class UsersCarsImageDbContext : DbContext
    {
           public DbSet<UsersCarImage> UsersCarImage { get; set; }
            public UsersCarsImageDbContext(DbContextOptions<UsersCarsImageDbContext> options) : base(options)
            {

            }
    }
}
