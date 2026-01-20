"use strict";

var connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

// Desactivar botón hasta que haya conexión
document.getElementById("sendButton").disabled = true;

// Escuchar mensajes del servidor
connection.on("ReceiveMessage", function (mensajeUsuario) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);

    li.textContent = `${mensajeUsuario.nombre} dice: ${mensajeUsuario.mensaje}`;
});

// Iniciar conexión
connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

// Enviar mensaje
document.getElementById("sendButton").addEventListener("click", function (event) {
    var nombre = document.getElementById("userInput").value;
    var mensaje = document.getElementById("messageInput").value;

    // Crear objeto clsMensajeUsuario versión JS
    var mensajeUsuario = {
        nombre: nombre,
        mensaje: mensaje
    };

    connection.invoke("SendMessage", mensajeUsuario).catch(function (err) {
        return console.error(err.toString());
    });

    event.preventDefault();
});
