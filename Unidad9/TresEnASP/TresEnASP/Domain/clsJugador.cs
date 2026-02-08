namespace TresEnASP.Domain
{
    public class clsJugador
    {
        public string ConnectionId { get; set; }

        public clsJugador() { }

        public clsJugador(string connectionId)
        {
            ConnectionId = connectionId;
        }
    }
}