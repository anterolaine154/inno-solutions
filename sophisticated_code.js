/**
 * Filename: sophisticated_code.js
 * 
 * Description: This code demonstrates a sophisticated and elaborate JavaScript implementation
 *              of a web-based chat application using web sockets.
 * 
 * It includes various features like login authentication, real-time messaging, online user tracking,
 * message history, notifications, and more.
 * 
 * Note: This is just a sample code and may not include all necessary libraries, packages,
 * and configurations. It is intended to provide a conceptual overview of a complex web application.
 */

// Constants
const SERVER_PORT = 3000;
const MESSAGE_HISTORY_LIMIT = 100;

// Dependencies
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const moment = require('moment');

// Create the Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Start the server
server.listen(SERVER_PORT, () => {
  console.log(`Server started on port ${SERVER_PORT}`);
});

// Serve static files from the "public" directory
app.use(express.static('public'));

// Configure Socket.IO
const io = socketIO(server);

// Data Structures
const users = new Map();
const messageHistory = [];

// Event: New client connection
io.on('connection', (socket) => {
  // Event: Client attempts to login
  socket.on('login', (username) => {
    if (!isValidUsername(username)) {
      return socket.emit('login_failed', 'Invalid username');
    }

    if (isUsernameTaken(username)) {
      return socket.emit('login_failed', 'Username is already taken');
    }

    socket.username = username;
    users.set(socket.id, username);

    // Notify other clients about the new user
    io.emit('user_joined', username);

    // Send the user list, message history, and welcome message to the new user
    socket.emit('login_successful', {
      users: getOnlineUsers(),
      messages: messageHistory,
      welcomeMessage: `Welcome, ${username}!`,
    });
  });

  // Event: Client sends a message
  socket.on('send_message', (message) => {
    const username = users.get(socket.id);
    const formattedMessage = {
      username,
      message,
      timestamp: moment().toISOString(),
    };

    messageHistory.push(formattedMessage);
    if (messageHistory.length > MESSAGE_HISTORY_LIMIT) {
      messageHistory.shift(); // Remove the oldest message if history exceeds limit
    }

    // Broadcast the message to all clients
    io.emit('receive_message', formattedMessage);
  });

  // Event: Client disconnects
  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    users.delete(socket.id);

    // Notify other clients about the disconnected user
    io.emit('user_left', username);
  });
});

// Utility functions
function isValidUsername(username) {
  // Check if the username matches a certain pattern or criteria
  return /^[a-zA-Z0-9_-]{3,16}$/.test(username);
}

function isUsernameTaken(username) {
  // Check if the username is already taken
  return Array.from(users.values()).includes(username);
}

function getOnlineUsers() {
  // Returns an array of online users
  return Array.from(users.values());
}
// ... Code continues beyond 200 lines