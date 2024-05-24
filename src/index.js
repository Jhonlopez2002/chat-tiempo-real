// Importar las dependencias necesarias
const express = require('express'); // Importa el módulo 'express', un framework para construir aplicaciones web y APIs en Node.js.
const morgan = require('morgan'); // Un middleware de registro de solicitudes HTTP para Node.js.
const { createServer } = require('http'); // Importa la función createServer del módulo 'http' de Node.js, utilizada para crear un servidor HTTP.
const socketIo = require('socket.io'); // Importa el módulo 'socket.io', que facilita la comunicación en tiempo real basada en WebSockets entre el servidor y los clientes.
const path = require('path'); // Proporciona utilidades para trabajar con rutas de archivos.

const app = express(); // Crear una instancia de Express
const server = createServer(app); // Crea un servidor HTTP utilizando la instancia de Express como manejador de solicitudes.

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Crear una instancia de Socket.IO y pasarle el servidor HTTP
const io = socketIo(server);

// Manejar conexiones entrantes de Socket.IO
io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');

    // Manejar evento 'join'
    socket.on('join', (username) => {
        // Guardar el nombre de usuario en la información del socket
        socket.username = username;
        // Emitir un mensaje de bienvenida a todos los usuarios
        io.emit('chatMessage', { username: 'Usuario', message: `${username} se ha unido al chat` });
        console.log(`${username} se ha unido al chat`);
    });

    // Manejar el evento de mensaje de chat
    socket.on('chatMessage', (message) => {
        // Obtener el nombre de usuario asociado con este socket
        const username = socket.username;
        // Emitir el mensaje a todos los usuarios conectados, junto con el nombre de usuario
        io.emit('chatMessage', { username, message });
        console.log(`${username}: ${message}`);
    });

    // Manejar la desconexión de un usuario
    socket.on('disconnect', () => {
        // Si el socket tiene un nombre de usuario asociado, emitir un mensaje de desconexión
        if (socket.username) {
            io.emit('chatMessage', { username: 'Servidor', message: `${socket.username} se ha desconectado` });
            console.log(`${socket.username} se ha desconectado`);
        }
    });
});

module.exports = server;
