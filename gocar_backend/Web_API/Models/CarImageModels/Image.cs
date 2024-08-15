namespace Web_API.Models.CarImage
{
    public class CarImage
    {
        [Key]
        public int Id { get; set; }
        public int ImageId { get; set; }
        public string ImageName { get; set; }
        public byte[] ImageData { get; set; }
    }
}
