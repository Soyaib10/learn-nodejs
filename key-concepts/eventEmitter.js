//  resgiter an event
// emit an event

const EventEmitter = require('events')
const customEmitter = new EventEmitter()

customEmitter.on('response', (data, num) => {
    console.log(`data received ${data} ${num}`);
})

customEmitter.on('response', () => {
    console.log('some other logic');
})
customEmitter.emit('response', 'zihad', 10)