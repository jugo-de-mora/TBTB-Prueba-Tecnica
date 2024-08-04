using Dapper;
using MySql.Data.MySqlClient;

namespace ContosoPizza.Data.Repositories;

/// <summary>
/// Clase que permite la conexión a la base de datos
/// y permite interactuar con la misma por medio de
/// acciones HTTP.
/// </summary>
public class ProductRepository : IProductRepository
{
   /// <summary>
   /// Contiene el string con todos los parámetros para conectarse
   /// a la base de datos traídos de appsettings.json.
   /// </summary>
   private readonly MySQLConfiguration _connectionString;
   public ProductRepository(MySQLConfiguration connectionString)
   {
      _connectionString = connectionString;
   }

   /// <summary>
   /// Crea una nueva conexión a la base de datos. 
   /// </summary>
   /// <returns>Objeto MySqlConnection que permite hacer consultas.</returns>
   protected MySqlConnection dbConnection()
   {
      return new MySqlConnection(_connectionString.ConnectionString);
   }

   /// <summary>
   /// Elimina el producto que se recibe por parámetro dispuesto en el cuerpo de la solicitud HTTP.
   /// </summary>
   /// <param name="p">Producto convertido en objeto gracias al modelo Product.</param>
   /// <returns>Retorna verdadero si hubo más de una eliminación o false si no hubo eliminación alguna.</returns>
   public async Task<bool> DeleteProduct(Product p)
   {
      var db = dbConnection();

      var sql = @"DELETE FROM products WHERE id = @Id";

      var result = await db.ExecuteAsync(sql, new { Id = p.Id });

      return result > 0;
   }

   /// <summary>
   /// Obtiene un único registro de la base de datos identificado por el id presente en la solicitud.
   /// </summary>
   /// <param name="id">Identificación del producto presente en la solicitud.</param>
   /// <returns>El producto encontrado identificado por id.</returns>
   public async Task<Product> Get(int id)
   {
      var db = dbConnection();

      var sql = @"SELECT id, name, price
                         FROM products
                         WHERE id = @Id";

      // lanzar un error cuando el producto no se encuentre
      var product = await db.QueryFirstOrDefaultAsync<Product>(sql, new { Id = id }) ?? throw new NotFoundException("Producto no encontrado.");

      return product;
   }

   /// <summary>
   /// Obtiene todos los registros de la tabla Products.
   /// </summary>
   /// <returns>Una lista con todos los objetos en la tabla Products.</returns>
   public Task<IEnumerable<Product>> GetAll()
   {
      var db = dbConnection();

      var sql = @"SELECT id, name, price
                         FROM products";

      return db.QueryAsync<Product>(sql, new { });
   }

   /// <summary>
   /// Inserta el producto dado por parámetro.
   /// Lanza un error si el nombre a insertar ya está en la base de datos.
   /// </summary>
   /// <param name="p">Producto presente en el cuerpo de la solicitud POST.</param>
   /// <returns>Verdadero si hubo una inserción, falso si no hubo ninguna inserción.</returns>
   public async Task<bool> CreateProduct(Product p)
   {
      var db = dbConnection();

      var sql = @"INSERT INTO products (name, price)
                         VALUES (@Name, @Price)";
      int result = 0;
      try
      {
         result = await db.ExecuteAsync(sql, new { p.Name, p.Price });
      }
      catch (MySqlException ex) when (ex.Number == 1062)
      {
         throw new DuplicateNameException("Producto duplicado");
      }
      return result > 0;
   }

   /// <summary>
   /// Actualiza el producto dado por parámetro mediante la solicitud HTTP PUT.
   /// Lanza un error si el nombre a actualizar ya está en la base de datos.
   /// </summary>
   /// <param name="p">Producto a actualizar</param>
   /// <returns>Verdadero si hubo una actualización o falso si no hubo actualización.</returns>
   public async Task<bool> UpdateProduct(Product p)
   {
      var db = dbConnection();

      var sql = @"UPDATE products
                        SET name = @Name,
                           price = @Price
                        WHERE id = @Id";


      int result = 0;
      try
      {
         result = await db.ExecuteAsync(sql, new { p.Id, p.Name, p.Price });
      }
      catch (MySqlException ex) when (ex.Number == 1062)
      {
         throw new DuplicateNameException("Producto duplicado");
      }

      return result > 0;
   }
}