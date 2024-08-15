using System.Drawing.Drawing2D;

namespace Web_API.Models.BotModels
{
    public class RentCarUserData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname{ get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int CarId { get; set; }
        public DateTime UserStartDate { get; set; }
        public DateTime UserEndDate { get; set; }  
        
    }
}
