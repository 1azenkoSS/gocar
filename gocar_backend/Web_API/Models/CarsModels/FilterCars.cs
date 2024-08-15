namespace Web_API.Models.CarsModels
{
    public class FilterCarsRequest
    {
        public string? Vehicle { get; set; }
        public string? Brand { get; set; }
        public string? Model { get; set; }
        public string? Fuel { get; set; }
        public int? GraduationYearFrom { get; set; }
        public int? GraduationYearTo { get; set; }
        public string? Transmission { get; set; }
        public string? City { get; set; }
        public decimal? PriceFrom { get; set; }
        public decimal? PriceTo { get; set; }
    }


}

