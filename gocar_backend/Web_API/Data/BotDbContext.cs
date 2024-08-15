using Web_API.Models.Cars;
using Web_API.Models.RentCarUserData;

namespace Web_API.Data
{
    public class BotDbContext : DbContext
    {
        public DbSet<Bot> Bot { get; set; }

        public BotDbContext(DbContextOptions<BotDbContext> options) : base(options)
        {

        }

    }
}
