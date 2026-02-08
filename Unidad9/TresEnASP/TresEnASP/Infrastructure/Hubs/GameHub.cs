using Microsoft.AspNetCore.SignalR;

namespace Infrastructure.Hubs
{
    public class GameHub : Hub
    {
        private static readonly List<string> _jugadoresEsperando = new List<string>();
        private static readonly Dictionary<string, string> _partidas = new Dictionary<string, string>();

        public override async Task OnConnectedAsync()
        {
            string connectionId = Context.ConnectionId;

            if (_jugadoresEsperando.Count == 0)
            {
                // Primer jugador - espera
                _jugadoresEsperando.Add(connectionId);
                await Clients.Caller.SendAsync("AsignarSimbolo", "X", "esperando");
            }
            else
            {
                // Segundo jugador - empieza la partida
                string jugador1 = _jugadoresEsperando[0];
                _jugadoresEsperando.RemoveAt(0);

                // Crear pareja de partida
                _partidas[jugador1] = connectionId;
                _partidas[connectionId] = jugador1;

                // Asignar símbolos
                await Clients.Client(jugador1).SendAsync("AsignarSimbolo", "X", "jugando");
                await Clients.Caller.SendAsync("AsignarSimbolo", "O", "jugando");
            }

            await base.OnConnectedAsync();
        }

        public async Task EnviarJugada(int fila, int columna, string simbolo)
        {
            string oponenteId = _partidas.ContainsKey(Context.ConnectionId)
                ? _partidas[Context.ConnectionId]
                : null;

            if (oponenteId != null)
            {
                await Clients.Client(oponenteId).SendAsync("RecibirJugada", fila, columna, simbolo);
            }
        }

        public async Task FinalizarPartida()
        {
            string oponenteId = _partidas.ContainsKey(Context.ConnectionId)
                ? _partidas[Context.ConnectionId]
                : null;

            if (oponenteId != null)
            {
                await Clients.Client(oponenteId).SendAsync("OponenteDesconectado");
                _partidas.Remove(Context.ConnectionId);
                _partidas.Remove(oponenteId);
            }
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            _jugadoresEsperando.Remove(Context.ConnectionId);

            if (_partidas.ContainsKey(Context.ConnectionId))
            {
                string oponenteId = _partidas[Context.ConnectionId];
                await Clients.Client(oponenteId).SendAsync("OponenteDesconectado");
                _partidas.Remove(Context.ConnectionId);
                _partidas.Remove(oponenteId);
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}