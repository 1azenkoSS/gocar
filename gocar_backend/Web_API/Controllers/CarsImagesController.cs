
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySql.EntityFrameworkCore.Extensions;
using System;
using System.Drawing;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Web_API.Data;
using Web_API.Models.CarImage;
using Web_API.Models.ProfileModels;

namespace Web_API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CarsImagesController : Controller
    {
        private readonly CarsImagesDbContext dbcontext;
        private readonly IWebHostEnvironment _environment;

        public CarsImagesController(CarsImagesDbContext dbContext, IWebHostEnvironment environment)
        {
            this.dbcontext = dbContext;
            _environment = environment;
        }
        [HttpPost]
        public async Task<IActionResult> CreateUserProfilePic(List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
            {
                return Content("No files selected");
            }
            var ImgId = dbcontext.CarImage.Any() ? dbcontext.CarImage.Max(x => x.ImageId) + 1 : 1;

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
                var carProfilePicture = new CarImage
                {
                    ImageId = ImgId, // add car id to the entity
                    ImageName = file.FileName,
                    ImageData = bytes
                };
                dbcontext.CarImage.Add(carProfilePicture);
            }

            await dbcontext.SaveChangesAsync();

            return Ok("Files uploaded successfully.");
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
            var items = await dbcontext.CarImage.Where(x => x.ImageId == id).ToListAsync();
            if (items == null)
            {
                return NotFound();
            }
            foreach(var item in items)
            {
                dbcontext.CarImage.Remove(item);
            }
            await dbcontext.SaveChangesAsync();

            return NoContent();
        }


        [HttpGet]
        public async Task<IActionResult> GetBlob()
        {
            var items = await dbcontext.CarImage.ToListAsync();
            if (!items.Any())
            {
                return NotFound();
            }

            var result = new List<CarImage>();

            foreach (var item in items)
            {
                using (var stream = new MemoryStream(item.ImageData))
                {
                    var image = Image.FromStream(stream);
                    result.Add(new CarImage { Id = item.Id, ImageId = item.ImageId, ImageName = item.ImageName, ImageData = ImageToByteArray(image) });
                }
            }

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBlobs([FromRoute] int id)
        {
            var items = await dbcontext.CarImage.Where(x => x.ImageId == id).ToListAsync();
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
    }
}

