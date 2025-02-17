const EventEmitter = require('events');

// ChatServer নামে একটি EventEmitter তৈরি করা
class ChatServer extends EventEmitter {}
const chatServer = new ChatServer();

// User 1 Listener (এখানে একজন ব্যবহারকারী)
chatServer.on('newMessage', (message, sender) => {
  console.log(`User 1 received message: "${message}" from ${sender}`);
});
chatServer.on('newMessage', (message, sender) => {
  console.log(`User 2 received message: "${message}" from ${sender}`);
});

// User 1 sends a message
function sendMessage(sender, message) {
  console.log(`${sender} is sending a message: "${message}"`);
  // Emit the event so that all connected users can receive the message
  chatServer.emit('newMessage', message, sender);
}

// 6. Simulate User 1 sending a message
sendMessage('User 1', 'Hello, how are you?');
