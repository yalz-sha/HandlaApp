using System.ComponentModel.DataAnnotations;

namespace Handla.Models
{
    public class User
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }

        public int Id { get; set; }
       
        public string Email { get; set; }
       
        public DateTime Created_At { get; set; } = DateTime.Now;
    }
}
