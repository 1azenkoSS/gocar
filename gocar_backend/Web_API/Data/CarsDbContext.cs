using Web_API.Models.Cars;

namespace Web_API.Data
{
    public class CarsDbContext : DbContext
    {
        public DbSet<Cars> Cars { get; set; }

        public CarsDbContext(DbContextOptions<CarsDbContext> options) : base(options)
        {

        }

    }
}
