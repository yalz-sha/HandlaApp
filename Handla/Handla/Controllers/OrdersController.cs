using Handla.Interfaces;
using Handla.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.Extensions.Logging;
using Handla.Services;
using Org.BouncyCastle.Asn1.X509;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpPost("placeorder")]
    [Authorize]
    public async Task<ActionResult<Order>> CreateOrder([FromBody] Order order)
    {
        try
        {
            var orderId = _orderService.CreateOrder(order);

            return Ok(new { OrderId = orderId });

        }
        catch (Exception ex)
        {            
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("{userId}")]
    public IActionResult GetOrders(int userId)
    {
        try
        {
            var orders = _orderService.GetOrders(userId);
            return Ok(orders);
        }
        catch (Exception ex) {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
        
        
    }

    [HttpGet("orderById/{id}")]
    public IActionResult GetOrderDetails(int id)
    {
        try 
        { 
        var orderItems = _orderService.GetOrderDetails(id);
        return Ok(orderItems);
        }
        catch (Exception ex)
        {
           
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}