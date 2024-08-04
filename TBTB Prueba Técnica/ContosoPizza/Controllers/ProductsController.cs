using Microsoft.AspNetCore.Mvc;
using ContosoPizza.Data.Repositories;

/// <summary>
/// Controlador que crea una ruta para interactuar con los Productos.
/// </summary>
[ApiController]
[Route("[controller]")]
public class ProductsController : ControllerBase
{
   /// <summary>
   /// Repositorio de todos los objetos Product.
   /// </summary>
   private readonly IProductRepository _productRepository;
   public ProductsController(IProductRepository productRepository)
   {
      _productRepository = productRepository;
   }

   /// <summary>
   /// Obtiene todos los registros de la tabla Products.
   /// </summary>
   /// <returns>Una lista con todos los objetos en la tabla Products.</returns>
   [HttpGet]
   public async Task<IActionResult> GetAll()
   {
      return Ok(await _productRepository.GetAll());
   }

   /// <summary>
   /// Obtiene un �nico registro de la base de datos identificado por el id presente en la solicitud.
   /// </summary>
   /// <param name="id">Identificaci�n del producto presente en la solicitud.</param>
   /// <returns>El producto encontrado identificado por id.</returns>
   [HttpGet("{id}")]
   public async Task<IActionResult> GetProductDetails(int id)
   {
      try
      {
         return Ok(await _productRepository.Get(id));
      }
      catch (NotFoundException)
      {
         return StatusCode(500, new { error = "Producto no encontrado." });
      }
   }

   /// <summary>
   /// Inserta el producto dado por par�metro.
   /// </summary>
   /// <param name="p">Producto presente en el cuerpo de la solicitud POST.</param>
   /// <returns>Verdadero si hubo una inserci�n, falso si no hubo ninguna inserci�n.</returns>
   [HttpPost]
   public async Task<IActionResult> CreateProduct([FromBody] Product p)
   {
      if (p == null)
         return BadRequest();

      if (!ModelState.IsValid)
         return BadRequest(ModelState);

      try
      {
         var created = await _productRepository.CreateProduct(p);

         return Created("created", created);
      }
      catch (DuplicateNameException)
      {
         return StatusCode(500, new { error = "Producto con nombre duplicado, por favor utilice un nuevo nombre." });
      }
   }

   /// <summary>
   /// Actualiza el producto dado por par�metro mediante la solicitud HTTP PUT.
   /// </summary>
   /// <param name="p">Producto a actualizar</param>
   /// <returns>Verdadero si hubo una actualizaci�n o falso si no hubo actualizaci�n.</returns>
   [HttpPut("{id}")]
   public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product p)
   {
      try
      {
         if (id != p.Id || p == null)
            return BadRequest();

         if (!ModelState.IsValid)
            return BadRequest(ModelState);

         await _productRepository.UpdateProduct(p);

         return NoContent();
      }
      catch (DuplicateNameException)
      {
         return StatusCode(500, new { error = "Producto con nombre duplicado, por favor utilice un nuevo nombre." });
      }
      catch (NotFoundException ex)
      {
         return StatusCode(500, new { error = "Producto no encontrado." });

      }
      catch (Exception)
      {
         return StatusCode(500, new { error = "Un error interno ocurrió." });
      }
   }

   /// <summary>
   /// Elimina el producto que se recibe por par�metro dispuesto en el cuerpo de la solicitud HTTP.
   /// </summary>
   /// <param name="p">Producto convertido en objeto gracias al modelo Product.</param>
   /// <returns>Retorna verdadero si hubo m�s de una eliminaci�n o false si no hubo eliminaci�n alguna.</returns>
   [HttpDelete("{id}")]
   public async Task<IActionResult> DeleteProduct(int id)
   {
      await _productRepository.DeleteProduct(new Product { Id = id });

      return NoContent();
   }
}