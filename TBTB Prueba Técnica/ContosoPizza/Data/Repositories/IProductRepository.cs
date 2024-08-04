namespace ContosoPizza.Data.Repositories;
/// <summary>
/// Interfaz que contiene los métodos que debe implementar el repositorio para
/// llevar a cabo un CRUD completo. 
/// </summary>
public interface IProductRepository
{
   /// <summary>
   /// Obtiene todos los registros de la tabla Products.
   /// </summary>
   /// <returns>Una lista con todos los objetos en la tabla Products.</returns>
   Task<IEnumerable<Product>> GetAll();
   /// <summary>
   /// Obtiene un único registro de la base de datos identificado por el id presente en la solicitud.
   /// </summary>
   /// <param name="id">Identificación del producto presente en la solicitud.</param>
   /// <returns>El producto encontrado identificado por id.</returns>
   Task<Product> Get(int id);
   /// <summary>
   /// Inserta el producto dado por parámetro.
   /// </summary>
   /// <param name="p">Producto presente en el cuerpo de la solicitud POST.</param>
   /// <returns>Verdadero si hubo una inserción, falso si no hubo ninguna inserción.</returns>
   Task<bool> CreateProduct(Product p);
   /// <summary>
   /// Actualiza el producto dado por parámetro mediante la solicitud HTTP PUT.
   /// </summary>
   /// <param name="p">Producto a actualizar</param>
   /// <returns>Verdadero si hubo una actualización o falso si no hubo actualización.</returns>
   Task<bool> UpdateProduct(Product p);
   /// <summary>
   /// Elimina el producto que se recibe por parámetro dispuesto en el cuerpo de la solicitud HTTP.
   /// </summary>
   /// <param name="p">Producto convertido en objeto gracias al modelo Product.</param>
   /// <returns>Retorna verdadero si hubo más de una eliminación o false si no hubo eliminación alguna.</returns>
   Task<bool> DeleteProduct(Product p);
}