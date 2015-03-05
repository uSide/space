var game = {
    viewPort: {
        x: window.innerWidth,
        y: window.innerHeight - 5
    },
    baseUnit: false,
    background: false
};

function polarToRect(r, phi) {
    return [
        r * Math.sin(phi),
        r * Math.cos(phi)
    ];
}

var renderer = PIXI.autoDetectRenderer(game.viewPort.x, game.viewPort.y);
window.document.body.appendChild(renderer.view);
// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x66FF99),
    background = new PIXI.Sprite(new PIXI.Texture.fromImage('/resources/bg.jpg'));

background.position.x = game.viewPort.x / 2;
background.position.y = game.viewPort.y / 2;

background.anchor.x = 0.5;
background.anchor.y = 0.5;

game.background = background;
// set background for stage
stage.addChild(background);

var socket = io.connect('http://46.63.1.119:4000', {
    query: 'token=' + token
});

socket.on('sync', function(ships) {
    console.log(ships.length);
    var entity;
    ships.forEach(function(ship) {
        if (entity = Entity.getEntityById(ship.id)) {
            entity.x = ship.x;
            entity.y = ship.y;

            if(game.baseUnit && ship.id == game.baseUnit.entity.id){
                var deltas = polarToRect(ship.x / 3, ship.angle);

                game.background.x = (game.viewPort.x / 2) + deltas[0];
                game.background.y = (game.viewPort.y / 2) + deltas[1];

                game.background.rotation = -ship.angle;
            }
        } else {
            var entity = new Ship('1', ship.id);
            stage.addChild(entity.entity);

            entity.x = ship.x;
            entity.y = ship.y;

            entity.entity.rotation = ship.angle;
        }
    });

    game.baseUnit = Entity.getEntityById(id);
});

// Render loop
var render = function() {
    requestAnimationFrame(render);

    stage.children.forEach(function(child) {
        // console.log(child.id);
        if (game.baseUnit && child != game.background && child !== game.baseUnit) {
            // all objects
            // child.position.x = 1000 - game.baseUnit.position.x;
            child.x = game.viewPort.x / 2 - (game.baseUnit.x - Entity.getEntityById(child.id).x);
            child.y = game.viewPort.y / 2 - (game.baseUnit.y - Entity.getEntityById(child.id).y);
        }

        if (game.baseUnit && child.id == game.baseUnit.entity.id) {
            // TODO: check for corners of the system
            child.x = game.viewPort.x / 2;
            child.y = game.viewPort.y / 2;
        }

        if (game.baseUnit && child == game.background.entity) {
            // background (for parallax)
        }
    });

    renderer.render(stage);
};

requestAnimationFrame(render);

Mousetrap.bind('up', function() {
    if(!game.up){
        socket.emit('up:enabled');
        game.up = true;
    }
});

Mousetrap.bind('up', function() {
    socket.emit('up:disabled');
    game.up = false;
}, 'keyup');

Mousetrap.bind('left', function() {
    if(!game.left){
        socket.emit('left:enabled');
        game.left = true;
    }
});

Mousetrap.bind('left', function() {
    socket.emit('left:disabled');
    game.left = false;
}, 'keyup');

Mousetrap.bind('right', function() {
    if(!game.right){
        socket.emit('right:enabled');
        game.right = true;
    }
});

Mousetrap.bind('right', function() {
    socket.emit('right:disabled');
    game.right = false;
}, 'keyup');