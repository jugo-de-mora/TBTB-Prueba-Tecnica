/// <summary>
/// Excepción que se lanza cuando se detecta que el nombre en la solicitud POST o PUT
/// ya se encuentra presente en la base de datos.
/// </summary>
public class DuplicateNameException : Exception
{
   public DuplicateNameException(string message) : base(message) { }
}