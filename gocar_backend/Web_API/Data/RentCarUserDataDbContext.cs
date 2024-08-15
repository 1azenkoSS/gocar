using Web_API.Models.BotModels;
using Web_API.Models.Cars;

namespace Web_API.Data
{
    public class RentCarUserDataDbContext : DbContext
    {
        public DbSet<RentCarUserData> RentCarUserData { get; set; }

        public RentCarUserDataDbContext(DbContextOptions<RentCarUserDataDbContext> options) : base(options)
        {

        }

    }
}
