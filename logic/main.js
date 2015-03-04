var server = require('http').createServer(),
    io = socketIo.listen(server),
    entities = require('./entities.js');

// computing loop
setInterval(function() {
    entities.entities.forEach(function(entity){
        if(entity instanceOf entities.Ship){
            // compute angles, speed and coordinates
        }
    });
}, 20);

io.sockets.on('connection', function(socket) {
    var ship = new entities.Ship();
    ship.init();

    // create body for ship
    var body = new entities.Shell();
    body.init();

    body.weight = 300;
    body.price = 3;

    ship.body = body;

    // create engine for ship
    var engine = new entities.Engine();
    engine.init();

    engine.weight = 30;
    engine.price = 3;
    engine.acceleration = 1;
    engine.speed = 5;

    ship.engine = engine;

    socket.on('up:enabled', function() {
        ship.up = true;
    });

    socket.on('up:disabled', function() {
        ship.up = false;
    });

    socket.on('left:enabled', function() {
        ship.left = true;
    });

    socket.on('left:disabled', function() {
        ship.left = false;
    });

    socket.on('right:enabled', function() {
        ship.right = true;
    });

    socket.on('right:disabled', function() {
        ship.right = false;
    });

    socket.on('disconnect', function() {
        console.log('disconnected');

        ship.destroy();
    });
});

server.listen(4000);