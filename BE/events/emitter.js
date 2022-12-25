const { EventEmitter } = require('events');

const emitter = new EventEmitter()

emitter.on('userVerified', (data) => { 
    emitter.emit('broadcastLogin', data)
 })

module.exports =  emitter