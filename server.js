var express = require('express'),
    app = express(),
    compression = require('compression'),
    fs = require('fs'),
    jwt = require('jsonwebtoken'),
    socketioJwt = require('socketio-jwt'),
    socketIo = require('socket.io'),
    counter = 0,
    ships = [],
    _ = require('lodash');

function polarToRect(r, phi) {
    return [
        r * Math.sin(phi),
        r * Math.cos(phi)
    ];
}

app.use(compression({
    threshold: 512
}));

app.use(express.static(__dirname + '/game'));

app.get('/game', function(req, res) {
    counter = counter + 1;

    var token = jwt.sign({
        id: counter
    }, 'sss', {
        expiresInMinutes: 60 * 5
    });

    var text = fs.readFileSync(__dirname + '/game/index.html').toString().replace('[jsonwebtoken]', token).replace('[id]', counter);

    // console.log(text);

    res.end(text);
});

app.listen(3000);

var server = require('http').createServer();

var sio = socketIo.listen(server);

sio.set('authorization', socketioJwt.authorize({
    secret: 'sss',
    handshake: true
}));

var sockets = [];

sio.sockets
    .on('connection', function(socket) {
        var decoded = jwt.verify(socket.handshake.query.token, 'sss');

        sockets.push(socket);

        console.log(decoded.id, 'connected');

        ships = ships.filter(function(ship) {
            return ship.id != decoded.id;
        });

        ships.push({
            x: 50,
            y: 50,
            angle: 0,
            id: decoded.id
        });

        socket.on('up:enabled', function() {
	        console.log('event');
	        _.find(ships, {
	            id: decoded.id
	        }).up = true;
        });

        socket.on('up:disabled', function() {
            console.log('event');
            _.find(ships, {
	            id: decoded.id
	        }).up = false;
        });

        socket.on('left:enabled', function() {
            console.log('event');
            _.find(ships, {
	            id: decoded.id
	        }).left = true;
        });

        socket.on('left:disabled', function() {
            console.log('event');
            _.find(ships, {
	            id: decoded.id
	        }).left = false;
        });

        socket.on('right:enabled', function() {
            console.log('event');
            _.find(ships, {
	            id: decoded.id
	        }).right = true;
        });

        socket.on('right:disabled', function() {
            console.log('event');
            _.find(ships, {
	            id: decoded.id
	        }).right = false;
        });

        socket.on('disconnect', function() {
            console.log('disconnected');
            ships = ships.map(function(ship) {
                return ship.id != decoded.id;
            });
        });
    });

setInterval(function() {
	// console.log(ships);

    ships.forEach(function(ship) {
        if (ship.right) {
            ship.angle += 0.1;
        }
        if (ship.left) {
            ship.angle -= 0.1;
        }

        ship.angle = ship.angle % (2 * Math.PI);

        if (ship.up) {
            var deltas = polarToRect(3, ship.angle);

            ship.x += deltas[0];
            ship.y -= deltas[1];
        }
    });

    sockets.forEach(function(socket){
    	socket.emit('sync', ships);
    });
}, 20);

server.listen(4000);