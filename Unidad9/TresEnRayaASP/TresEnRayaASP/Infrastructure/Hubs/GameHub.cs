using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace TresEnRayaASP.Infrastructure.Hubs
{
    public class GameHub : Hub
    {
        private static ConcurrentQueue<string> _waitingPlayers = new ConcurrentQueue<string>();
        private static ConcurrentDictionary<string, string> _playerToGroup = new ConcurrentDictionary<string, string>();

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            if (_playerToGroup.TryRemove(Context.ConnectionId, out var groupName))
            {
                await Clients.Group(groupName).SendAsync("PlayerDisconnected", Context.ConnectionId);
            }

            await base.OnDisconnectedAsync(exception);
        }

        public async Task JoinGame(string connectionId)
        {
            if (!_waitingPlayers.TryDequeue(out var otherPlayer))
            {
                _waitingPlayers.Enqueue(Context.ConnectionId);
                await Clients.Caller.SendAsync("WaitingForOpponent");
                return;
            }

            var groupName = $"game_{otherPlayer}_{Context.ConnectionId}";

            _playerToGroup[otherPlayer] = groupName;
            _playerToGroup[Context.ConnectionId] = groupName;

            await Groups.AddToGroupAsync(otherPlayer, groupName);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            await Clients.Client(otherPlayer).SendAsync("PlayerJoined", Context.ConnectionId);
            await Clients.Caller.SendAsync("PlayerJoined", otherPlayer);
        }

        public async Task MakeMove(int row, int col)
        {
            if (_playerToGroup.TryGetValue(Context.ConnectionId, out var groupName))
            {
                await Clients.Group(groupName).SendAsync("MoveMade", new
                {
                    playerId = Context.ConnectionId,
                    row,
                    col
                });
            }
        }

        public async Task RestartGame()
        {
            if (_playerToGroup.TryGetValue(Context.ConnectionId, out var groupName))
            {
                await Clients.Group(groupName).SendAsync("GameRestarted", Context.ConnectionId);
            }
        }

        public async Task Disconnect()
        {
            await OnDisconnectedAsync(null);
        }
    }
}
