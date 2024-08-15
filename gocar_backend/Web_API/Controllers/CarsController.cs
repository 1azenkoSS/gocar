using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Security.Policy;
using Ubiety.Dns.Core;
using Web_API.Data;
using Web_API.Models.Cars;
using Web_API.Models.CarsModels;
using Web_API.Models.ProfileModels;



namespace Web_API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CarsController : Controller
    {
        private readonly CarsDbContext dbContext;
        public CarsController(CarsDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]

        public async Task<IActionResult> GetAllCars()
        {
            return Ok(await dbContext.Cars.ToListAsync());
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetCars([FromRoute] int id)
        {
            var car = await dbContext.Cars.FirstOrDefaultAsync(c => c.CarId == id);

            if (car == null)
            {
                return NotFound();
            }

            return Ok(car);
        }

        [HttpPost("filter")]
        public async Task<IActionResult> FilterCars([FromForm] FilterCarsRequest filterCars)
        {
            var filteredCars = dbContext.Cars.AsQueryable();

            if (filterCars.Vehicle != "")
                filteredCars = filteredCars.Where(c => c.Vehicle == filterCars.Vehicle);

            if (filterCars.Brand != "")
                filteredCars = filteredCars.Where(c => c.Brand == filterCars.Brand);

            if (filterCars.Model != "")
                filteredCars = filteredCars.Where(c => c.Model == filterCars.Model);

            if (filterCars.Fuel != "")
                filteredCars = filteredCars.Where(c => c.Fuel == filterCars.Fuel);

            if (filterCars.GraduationYearFrom == null)
                filteredCars = filteredCars.Where(c => c.GraduationYear >= filterCars.GraduationYearFrom);

            if (filterCars.GraduationYearTo != null)
                filteredCars = filteredCars.Where(c => c.GraduationYear <= filterCars.GraduationYearTo);

            if (filterCars.Transmission != "")
                filteredCars = filteredCars.Where(c => c.Transmission == filterCars.Transmission);

            if (filterCars.City != "")
                filteredCars = filteredCars.Where(c => c.City == filterCars.City);

            if (filterCars.PriceFrom != null)
                filteredCars = filteredCars.Where(c => c.Price >= filterCars.PriceFrom);

            if (filterCars.PriceTo != null)
                filteredCars = filteredCars.Where(c => c.Price <= filterCars.PriceTo);

            return Ok(filteredCars.ToList());
        }




        [HttpPost]
        public async Task<IActionResult> AddCars(AddCarRequest addCarRequest)
        {

            var Id = dbContext.Cars.Any() ? dbContext.Cars.Max(x => x.CarId) + 1 : 1;

            var cars = new Cars()
            {
                CarId = Id,
                Vehicle = addCarRequest.Vehicle,
                Brand = addCarRequest.Brand,
                Model = addCarRequest.Model,
                EngineCapacity = addCarRequest.EngineCapacity,
                Fuel = addCarRequest.Fuel,
                Horsepower = addCarRequest.Horsepower,
                Transmission = addCarRequest.Transmission,
                WheelDrive = addCarRequest.WheelDrive,
                GraduationYear = addCarRequest.GraduationYear,
                Odometer = addCarRequest.Odometer,
                Vincode = addCarRequest.Vincode,
                Color = addCarRequest.Color,
                WithDriver= addCarRequest.WithDriver,
                City = addCarRequest.City,
                Price = addCarRequest.Price,
                StartDate = addCarRequest.Dates[0],
                EndDate = addCarRequest.Dates[1],
                Description = addCarRequest.Description,
            };

            await dbContext.Cars.AddAsync(cars);
            await dbContext.SaveChangesAsync();

            var result = new { isSuccess = 0, message = "Transport was added", cars };
            return Ok(result);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateCar([FromRoute] int id, UpdateCarRequest updateCarRequest)
        {
            var car = await dbContext.Cars.FirstOrDefaultAsync(c => c.CarId == id);

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
                car.WithDriver = updateCarRequest.WithDriver;
                car.City = updateCarRequest.City;
                car.Price = updateCarRequest.Price;
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
            var car = await dbContext.Cars.FirstOrDefaultAsync(c => c.CarId == id);

            if (car != null)
            {
                dbContext.Remove(car);
                await dbContext.SaveChangesAsync();
                var result = new { isSuccess = 0, message = "Transport was deleted!", car };
                return Ok(result);
            }

            return NotFound();
        }


    }
}


