using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using Web_API.Data;
using Web_API.Models.CarImage;
using Web_API.Models.Cars;
using Web_API.Models.UsersCarImageModels;

namespace Web_API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class UsersCarImagesController : Controller
    {
        private readonly UsersCarsImageDbContext rentCarImageDbContext;
        private readonly CarsImagesDbContext carImageDbContext;
        private readonly CarsDbContext carsDbContext;

        public UsersCarImagesController(UsersCarsImageDbContext dbContext, CarsImagesDbContext rentCarDbContext, CarsDbContext carsDbContext)
        {
            this.rentCarImageDbContext = dbContext;
            this.carImageDbContext = rentCarDbContext;
            this.carsDbContext = carsDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUserProfilePic(List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
            {
                return Content("No files selected");
            }
            var ImgId = rentCarImageDbContext.UsersCarImage.Any() ? rentCarImageDbContext.UsersCarImage.Max(x => x.ImageId) + 1 : 1;

            foreach (var file in files)
            {
                if (file.Length == 0)
                {
                    continue;
                }

                // Convert IFormFile to byte array
                byte[] bytes;
                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    bytes = stream.ToArray();
                }

                // Insert into database
                var carProfilePicture = new UsersCarImage
                {
                    ImageId = ImgId,
                    ImageName = file.FileName,
                    ImageData = bytes
                };
                rentCarImageDbContext.UsersCarImage.Add(carProfilePicture);
            }

            await rentCarImageDbContext.SaveChangesAsync();

            return Ok("Files uploaded successfully.");
        }

        [HttpPost]
        [Route("copyimage/{id}")]
        public IActionResult CopyData([FromRoute] int id)
        {
            var rentCarImage = rentCarImageDbContext.UsersCarImage.FirstOrDefault(i => i.ImageId == id);

            if (rentCarImage != null)
            {
                // Створення нових записів для нової таблиці зі старих записів
                var newData = new CarImage
                {
                    ImageId = carsDbContext.Cars.Any() ? carsDbContext.Cars.Max(x => x.CarId) + 1 : 1,
                    ImageName = rentCarImage.ImageName,
                    ImageData = rentCarImage.ImageData
                };

                // Додавання нових записів в нову таблицю
                carImageDbContext.CarImage.Add(newData);

                // Збереження змін
                carImageDbContext.SaveChanges();
            }
            return Ok("Data copied successfully.");
        }


            [HttpGet]
        public async Task<IActionResult> GetBlob()
        {
            var items = await rentCarImageDbContext.UsersCarImage.ToListAsync();
            if (!items.Any())
            {
                return NotFound();
            }

            var result = new List<UsersCarImage>();

            foreach (var item in items)
            {
                using (var stream = new MemoryStream(item.ImageData))
                {
                    var image = Image.FromStream(stream);
                    result.Add(new UsersCarImage { Id = item.Id,ImageId = item.ImageId, ImageName = item.ImageName, ImageData = ImageToByteArray(image) });
                }
            }
            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBlobs([FromRoute] int id)
        {
            var items = await rentCarImageDbContext.UsersCarImage.Where(x => x.ImageId == id).ToListAsync();
            if (!items.Any())
            {
                return NotFound();
            }

            var result = new List<byte[]>();

            foreach (var item in items)
            {
                using (var stream = new MemoryStream(item.ImageData))
                {
                    var image = Image.FromStream(stream);
                    result.Add(ImageToByteArray(image));
                }
            }

            return Ok(result);
        }
        private byte[] ImageToByteArray(Image image)
        {
            using (var stream = new MemoryStream())
            {
                image.Save(stream, System.Drawing.Imaging.ImageFormat.Jpeg);
                return stream.ToArray();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlob([FromRoute] int id)
        {
            var items = await rentCarImageDbContext.UsersCarImage.Where(x => x.ImageId == id).ToListAsync();
            if (items == null)
            {
                return NotFound();
            }
            foreach (var item in items)
            {
                rentCarImageDbContext.UsersCarImage.Remove(item);
            }
            await rentCarImageDbContext.SaveChangesAsync();

            return NoContent();

        }
    }
}
