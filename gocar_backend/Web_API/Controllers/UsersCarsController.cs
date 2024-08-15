using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using System.Security.Policy;
using Ubiety.Dns.Core;
using Web_API.userData;
using Web_API.Models.UsersCars;
using Web_API.Models.ProfileModels;
using Web_API.Models.Cars;
using Web_API.Data;
using Web_API.Models.CarImage;

namespace Web_API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class UsersCarsController : Controller
    {
        private readonly UsersCarsDbContext dbContext;
        private readonly CarsDbContext carsDbContext;
        private readonly UsersCarsImageDbContext rentCarImageDbContext;
        private readonly CarsImagesDbContext carImageDbContext;

        public UsersCarsController(UsersCarsDbContext dbContext, CarsDbContext carsDbContext,
            UsersCarsImageDbContext rentCarImageDbContext, CarsImagesDbContext carImageDbContext)
        {
            this.dbContext = dbContext;
            this.carsDbContext = carsDbContext;
            this.rentCarImageDbContext = rentCarImageDbContext;
            this.carImageDbContext = carImageDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCars()
        {
            return Ok(await dbContext.UsersCars.ToListAsync());
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetCars([FromRoute] int id)
        {
            var car = await dbContext.UsersCars.FirstOrDefaultAsync(c => c.CarId == id);

            if (car == null)
            {
                return NotFound();
            }

            return Ok(new { isSuccess = true, message = "Everything went right", car });
        }
        [HttpPost]
        public async Task<IActionResult> AddCars(AddUsersCarRequest AddUsersCarRequest)
        {
            var id = dbContext.UsersCars.Any() ? dbContext.UsersCars.Max(x => x.CarId) + 1 : 1;
            var cars = new UsersCars()
            {
                CarId = id,
                UserName = AddUsersCarRequest.UserName,
                UserSurname = AddUsersCarRequest.UserSurname,
                UserEmail = AddUsersCarRequest.UserEmail,
                UserPhoneNumber = AddUsersCarRequest.UserPhoneNumber,
                Vehicle = AddUsersCarRequest.Vehicle,
                Brand = AddUsersCarRequest.Brand,
                Model = AddUsersCarRequest.Model,
                EngineCapacity = AddUsersCarRequest.EngineCapacity,
                Fuel = AddUsersCarRequest.Fuel,
                Horsepower = AddUsersCarRequest.Horsepower,
                Transmission = AddUsersCarRequest.Transmission,
                WheelDrive = AddUsersCarRequest.WheelDrive,
                GraduationYear = AddUsersCarRequest.GraduationYear,
                Odometer = AddUsersCarRequest.Odometer,
                Vincode = AddUsersCarRequest.Vincode,
                Color = AddUsersCarRequest.Color,
                WithDriver = AddUsersCarRequest.WithDriver,
                City = AddUsersCarRequest.City,
                Price = AddUsersCarRequest.Price,
                StartDate = AddUsersCarRequest.Dates[0],
                EndDate = AddUsersCarRequest.Dates[1],
                Description= AddUsersCarRequest.Description,
            };

            await dbContext.UsersCars.AddAsync(cars);
            await dbContext.SaveChangesAsync();

            var result = new { isSuccess = 0, message = "Автомобіль було додано", cars };
            return Ok(result);
        }

        [HttpPost]
        [Route("copydata/{id}")]
        public async Task<IActionResult> CopyData([FromRoute] int id)
        {
            var genId = carsDbContext.Cars.Any() ? carsDbContext.Cars.Max(x => x.CarId) + 1 : 1;

            // Отримання записів зі старої таблиці
            var rentCar = await dbContext.UsersCars.FirstOrDefaultAsync(c => c.CarId == id);

            if (rentCar != null)
            {
                // Створення нових записів для нової таблиці зі старих записів
                var cars = new Cars
                {
                    CarId = genId,
                    Vehicle = rentCar.Vehicle,
                    Brand = rentCar.Brand,
                    Model = rentCar.Model,
                    EngineCapacity = rentCar.EngineCapacity,
                    Fuel = rentCar.Fuel,
                    Horsepower = rentCar.Horsepower,
                    Transmission = rentCar.Transmission,
                    WheelDrive = rentCar.WheelDrive,
                    GraduationYear = rentCar.GraduationYear,
                    Odometer = rentCar.Odometer,
                    Vincode = rentCar.Vincode,
                    Color = rentCar.Color,
                    City = rentCar.City,
                    WithDriver= rentCar.WithDriver,
                    Price = rentCar.Price,
                    StartDate = rentCar.StartDate,
                    EndDate = rentCar.StartDate,
                    Description = rentCar.Description,
                };

                // Додавання нових записів в нову таблицю
                carsDbContext.Cars.Add(cars);

                // Збереження змін
                carsDbContext.SaveChanges();

                var rentCarImages = await rentCarImageDbContext.UsersCarImage.Where(x => x.ImageId == id).ToListAsync();

                foreach (var rentCarImage in rentCarImages)
                {
                    // Створення нових записів для нової таблиці зі старих записів
                    var image = new CarImage
                    {
                        ImageId = genId,
                        ImageName = rentCarImage.ImageName,
                        ImageData = rentCarImage.ImageData
                    };

                    // Додавання нових записів в нову таблицю
                    carImageDbContext.CarImage.Add(image);
                }

                // Збереження змін
                await carImageDbContext.SaveChangesAsync();

            }
            return Ok(new {isSuccess = 0, message = "Data copied successfully." });
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateCar([FromRoute] int id, UpdateUsersCarRequest updateCarRequest)
        {
            var car = await dbContext.UsersCars.FirstOrDefaultAsync(c => c.CarId == id);

            if (car != null)
            {
                car.Vehicle = updateCarRequest.Vehicle;
                car.Brand = updateCarRequest.Brand;
                car.Model = updateCarRequest.Model;
                car.EngineCapacity = updateCarRequest.EngineCapacity;
                car.Fuel = updateCarRequest.Fuel;
                car.Horsepower = updateCarRequest.Horsepower;
                car.Transmission = updateCarRequest.Transmission;
                car.WheelDrive = updateCarRequest.WheelDrive;
                car.GraduationYear = updateCarRequest.GraduationYear;
                car.Odometer = updateCarRequest.Odometer;
                car.Vincode = updateCarRequest.Vincode;
                car.Color = updateCarRequest.Color;
                car.City = updateCarRequest.City;
                car.Price = updateCarRequest.Price;
                car.WithDriver= updateCarRequest.WithDriver;
                car.StartDate = updateCarRequest.Dates[0];
                car.EndDate = updateCarRequest.Dates[1];
                car.Description = updateCarRequest.Description;

                await dbContext.SaveChangesAsync();

                return Ok(new { isSuccess = 0, message = "Transport data was changed" });
            }
            return NotFound();
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteCar([FromRoute] int id)
        {
            var car = await dbContext.UsersCars.FirstOrDefaultAsync(c => c.CarId == id);

            if (car != null)
            {
                dbContext.Remove(car);
                await dbContext.SaveChangesAsync();
                var result = new { isSuccess = 0, message = "Автомобіль було видалено!", car };
                return Ok(result);
            }

            return NotFound();
        }
    }
}


