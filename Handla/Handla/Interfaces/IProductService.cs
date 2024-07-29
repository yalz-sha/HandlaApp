namespace Handla.Interfaces
{    
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Handla.Models;

    public interface IProductService
    {
        public List<Product> GetAllProducts();
        Product CreateProduct(Product product);
        Product UpdateProduct(int id, Product product);
        bool DeleteProduct(int id);
    }

}
