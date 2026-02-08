using Infrastructure.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOriginsWithCredentials", policy =>
    {
        policy.SetIsOriginAllowed(_ => true)   // acepta cualquier origen
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });

    options.AddPolicy("AllowAllNoCredentials", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddSignalR();

var app = builder.Build();

app.UseHttpsRedirection();

// IMPORTANTE: UseCors antes de MapHub
app.UseCors("AllowAllOriginsWithCredentials");

// Mapear hub
app.MapHub<GameHub>("/gameHub");

app.Run();
