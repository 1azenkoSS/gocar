using System.Reflection.Metadata;

namespace Web_API.Models.Cars
{
    public class Cars
    {
        public int Id { get; set; }
        public int CarId { get; set; }
        public string Vehicle { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public double EngineCapacity { get; set; }
        public string Fuel { get; set; }
        public int Horsepower { get; set; }
        public string Transmission { get; set; }
        public string WheelDrive { get; set; }
        public int GraduationYear { get; set; }
        public int Odometer { get; set; }
        public string Vincode { get; set; }
        public string Color { get; set; }
        public string City { get; set; }
        public bool WithDriver { get; set; }
        public string Description { get; set; }

        public int Price { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}

