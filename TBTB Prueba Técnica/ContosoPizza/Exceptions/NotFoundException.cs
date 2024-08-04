/// <summary>
/// Excepción que es lanzada cuando un producto no se encuentra por su id.
/// </summary>
public class NotFoundException : Exception
{
   public NotFoundException(string message) : base(message) { }
}