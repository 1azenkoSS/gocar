namespace Web_API.Models.RentCarUserData
{
    public class Bot
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
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
        public DateTime RentStartDate { get; set; }
        public DateTime RentEndDate { get; set; }
        public DateTime UserStartDate { get; set; }
        public DateTime UserEndDate { get; set; }

        public override string ToString()
        {
            return $"**{Brand} {Model} {GraduationYear}** \n" +
                $"Місто: {City}\n" +
                $"Транспорт доступний з {RentStartDate.ToString("dd.MM.yyyy")} по {RentEndDate.ToString("dd.MM.yyyy")}\n" +
                "Дані орендаря:\n " +
                $"{Name} {Surname}\n " +
                $"Електронна пошта: {Email}\n" +
                $"Номер телефону: {PhoneNumber} \n" +
                $"з {UserStartDate.ToString("dd.MM.yyyy")} по {UserEndDate.ToString("dd.MM.yyyy")}";
        }
    }
}
