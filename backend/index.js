const { Server } = require('socket.io');

const io = new Server(3002, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const users = {};

io.on('connection', socket => {

    socket.on('newUserJoined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('userJoined', name);
    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    })

    socket.on('disconnect', data => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
})
