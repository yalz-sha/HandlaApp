using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Handla.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int User_Id { get; set; }
        public decimal Total_Price { get; set; }
        public string Status { get; set; } = "Pending";
        public DateTime Created_At { get; set; } = DateTime.Now;
        public List<OrderItem> OrderItems { get; set; }

    }
}

   