using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Handla.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Handla.Services;
using Handla.Interfaces;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        var products = _productService.GetAllProducts();
        return Ok(products);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Product>> PostProduct([FromBody] Product product)
    {
        var createdProduct = _productService.CreateProduct(product);
        return CreatedAtAction(nameof(GetProducts), new { id = createdProduct.Id }, createdProduct);
    }

    [HttpPut("{id}")]
    [Authorize]
    
    public async Task<IActionResult> PutProduct(int id, [FromBody] Product product)
    {
        var updatedProduct = _productService.UpdateProduct(id, product);
        if (updatedProduct == null)
        {
            return NotFound();
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var deleted = _productService.DeleteProduct(id);
        if (!deleted)
        {
            return NotFound();
        }
        return NoContent();
    }
}
