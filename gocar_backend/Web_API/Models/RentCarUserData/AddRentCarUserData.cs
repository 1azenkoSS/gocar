using System;

namespace Web_API.Models.BotModels
{
    public class AddRentCarUserData
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int CarId { get; set; }
        public DateTime[] Dates { get; set; }

        
    }
}
