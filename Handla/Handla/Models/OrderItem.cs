﻿using System.ComponentModel.DataAnnotations;

namespace Handla.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int Order_Id { get; set; }
        public int Product_Id { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string Product_Name { get; set; }

    }


}