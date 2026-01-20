namespace Ejercicio1.Domain.Entities
{
    public class clsMensajeUsuario
    {
        public string nombre { get; set; } = string.Empty;
        public string mensaje { get; set; } = string.Empty;

        public clsMensajeUsuario() { }

        public clsMensajeUsuario(string nombre, string mensaje)
        {
            this.nombre = nombre;
            this.mensaje = mensaje;
        }
    }
}
