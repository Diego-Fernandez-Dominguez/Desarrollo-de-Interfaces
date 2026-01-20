using Microsoft.AspNetCore.SignalR;
using Ejercicio1.Domain.Entities;

namespace Ejercicio1.SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(clsMensajeUsuario mensajeUsuario)
        {
            await Clients.All.SendAsync("ReceiveMessage", mensajeUsuario);
        }
    }
}
