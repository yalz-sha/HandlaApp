using Handla.Models;
using Handla.Models;

namespace Handla.Services
{
    public interface IOrderService
    {
        int CreateOrder(Order order);
        List<Order> GetOrders(int userId);
        List<OrderItem> GetOrderDetails(int orderId);
    }
}