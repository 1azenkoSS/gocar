using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using Web_API.Models.ProfileModels;

namespace Web_API.Data
{
    public class ProfilesDbContext : DbContext
    {
        public DbSet<Profile> Profiles { get; set; }

        /*public CarsDbContext(DbContextOptions options) : base(options)
        {
        }*/
        public ProfilesDbContext(DbContextOptions<ProfilesDbContext> options) : base(options)
        {
               
        }

    }
}
