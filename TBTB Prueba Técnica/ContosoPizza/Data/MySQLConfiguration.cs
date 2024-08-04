namespace ContosoPizza.Data;
// Clase que recibe el string de configuración y conexión a la base de datos
public class MySQLConfiguration
{
   public MySQLConfiguration(string connectionString)
   {
      ConnectionString = connectionString;
   }

   public string ConnectionString { get; set; }
}