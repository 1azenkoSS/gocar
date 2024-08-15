using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Mvc;
using Telegram.Bot;
using Telegram.Bot.Types.InputFiles;
using Web_API.Data;
using Web_API.Models.BotModels;
using Web_API.Models.Cars;
using Web_API.Models.RentCarUserData;

namespace Web_API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class RentCarController : Controller
    {
        private readonly RentCarUserDataDbContext dbContext;
        private readonly CarsDbContext CardbContext;
        private readonly CarsImagesDbContext CarImageDbcontext;

        public RentCarController(RentCarUserDataDbContext dbContext, CarsDbContext cardbContext, CarsImagesDbContext dbcontext)
        {
            this.dbContext = dbContext;
            CardbContext = cardbContext;
            CarImageDbcontext = dbcontext;

        }

        [HttpPost]
        public async Task<IActionResult> AddUserData(AddRentCarUserData addRentCarUserData)
        {
            var car = await CardbContext.Cars.FirstOrDefaultAsync(c => c.CarId == addRentCarUserData.CarId);
            var carImages = await CarImageDbcontext.CarImage.FirstOrDefaultAsync(i => i.ImageId == addRentCarUserData.CarId);

            string botToken = "6138376734:AAGbdgQenSoPuqm2kgbNMSMh_N-nONXl8Go";
            var bot = new TelegramBotClient(botToken);
            string chatId = "-1001959620732";

            var botData = new Bot()
            {
                Name = addRentCarUserData.Name,
                Surname = addRentCarUserData.Surname,
                Email = addRentCarUserData.Email,
                PhoneNumber = addRentCarUserData.PhoneNumber,
                CarId = addRentCarUserData.CarId,
                UserStartDate = addRentCarUserData.Dates[0],
                UserEndDate = addRentCarUserData.Dates[1],
                Vehicle = car.Vehicle,
                Brand = car.Brand,
                Model = car.Model,
                GraduationYear = car.GraduationYear,
                City = car.City,
                Price = car.Price,
                RentStartDate = car.StartDate,
                RentEndDate = car.EndDate,
            };

            if (carImages != null)
            {
                byte[] imageBytes = carImages.ImageData;
                InputOnlineFile photo = new InputOnlineFile(new MemoryStream(imageBytes), "image.jpg");

                await bot.SendPhotoAsync(chatId, photo, botData.ToString());
            }
            /*var userData = new RentCarUserData()
            {
                Name = addRentCarUserData.Name,
                Surname = addRentCarUserData.Surname,
                Email = addRentCarUserData.Email,
                PhoneNumber = addRentCarUserData.PhoneNumber,
                CarId = addRentCarUserData.CarId,
                StartDate = addRentCarUserData.Dates[0],
                EndDate = addRentCarUserData.Dates[1]
            };

            await dbContext.RentCarUserData.AddAsync(userData);
            await dbContext.SaveChangesAsync();*/

            return Ok(new { isSuccess = 0, message = "" });


        }

        [HttpGet]
        public async Task<IActionResult> GetAllCars()
        {
            return Ok(await dbContext.RentCarUserData.ToListAsync());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteCar([FromRoute] int id)
        {
            var userData = await dbContext.RentCarUserData.FirstOrDefaultAsync(data => data.Id == id);

            if (userData != null)
            {
                dbContext.Remove(userData);
                await dbContext.SaveChangesAsync();
                var result = new { isSuccess = 0, message = "Transport was deleted!" };
                return Ok(result);
            }

            return NotFound();
        }
    }
}
