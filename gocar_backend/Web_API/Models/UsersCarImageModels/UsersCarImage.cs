namespace Web_API.Models.UsersCarImageModels
{
    public class UsersCarImage
    {
        [Key]
        public int Id { get; set; }
        public int ImageId { get; set; }
        public string ImageName { get; set; }
        public byte[] ImageData { get; set; }
    }
}
