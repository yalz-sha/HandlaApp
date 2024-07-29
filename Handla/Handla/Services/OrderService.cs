
using Handla.Models;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;

namespace Handla.Services
{
    public class OrderService : IOrderService
    {
        private readonly string _connectionString;

        public OrderService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public int CreateOrder(Order order)
        {
            int orderId;
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                using (var command = new SqlCommand("CreateOrder", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@UserId", order.User_Id);
                    command.Parameters.AddWithValue("@TotalPrice", order.Total_Price);
                    command.Parameters.AddWithValue("@Status", order.Status);

                    
                    orderId = Convert.ToInt32(command.ExecuteScalar());
                }
            }
            foreach (var item in order.OrderItems)
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    connection.Open();
                    using (var command = new SqlCommand("AddOrderItem", connection))
                    {
                        command.CommandType = System.Data.CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@OrderId", orderId);
                        command.Parameters.AddWithValue("@ProductId", item.Product_Id);
                        command.Parameters.AddWithValue("@Quantity", item.Quantity);
                        command.Parameters.AddWithValue("@Price", item.Price);
                        command.ExecuteNonQuery();
                    }
                }
            }

            return orderId;
        }

        public List<Order> GetOrders(int userId)
        {
            List<Order> orders = new List<Order>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                using (var command = new SqlCommand("GetOrders", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@UserId", userId);

                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            orders.Add(new Order
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Total_Price = reader.GetDecimal(reader.GetOrdinal("Total_Price")),
                                Status = reader.GetString(reader.GetOrdinal("Status")),
                                Created_At = reader.GetDateTime(reader.GetOrdinal("Created_At"))
                                
                            });
                        }
                    }
                }
            }

            return orders;
        }

        public List<OrderItem> GetOrderDetails(int orderId)
        {
            List<OrderItem> orderItems = new List<OrderItem>();

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                using (var command = new SqlCommand("GetOrderDetails", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@OrderId", orderId);

                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            orderItems.Add(new OrderItem
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Order_Id = reader.GetInt32(reader.GetOrdinal("Order_Id")),
                                Product_Id = reader.GetInt32(reader.GetOrdinal("Product_Id")),
                                Quantity = reader.GetInt32(reader.GetOrdinal("Quantity")),
                                Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                                Product_Name = reader.GetString(reader.GetOrdinal("Name"))
                            });
                        }
                    }
                }
            }

            return orderItems;
        }
    }
}
