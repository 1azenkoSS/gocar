using Microsoft.AspNetCore.Hosting.Server;
using Web_API.Models.CarImage;

namespace Web_API.Data
{
    public class CarsImagesDbContext : DbContext
    {
        public DbSet<CarImage> CarImage { get; set; }

        public CarsImagesDbContext(DbContextOptions<CarsImagesDbContext> options) : base(options)
        {

        }
    }
}
