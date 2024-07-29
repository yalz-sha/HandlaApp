using Handla.Models;

namespace Handla.Interfaces
{
    public interface IUserService
    {
        User Register(User user, string password);
        User Login(string username, string password);
    }
}
