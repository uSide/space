var game = {
  viewPort: {
    x: window.innerWidth,
    y: window.innerHeight - 5
  },
  baseUnit: false,
  background: false
};

var renderer = PIXI.autoDetectRenderer(game.viewPort.x, game.viewPort.y);
window.document.body.appendChild(renderer.view);
// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x66FF99),
  background = new PIXI.Sprite(new PIXI.Texture.fromImage('/resources/bg.jpg'));

background.position.x = 0;
background.position.y = 0;

background.anchor.x = 0.5;
background.anchor.y = 0.5;

game.background = background;
// set background for stage
stage.addChild(background);

var socket = io.connect('http://localhost:4000');

socket.on('sync', function(ents) {
  // console.log(ents);

  entities = ents.filter(function(entity) {
    return entity !== false;
  }).map(function(entity) {
    return Entity.reload(entity);
  });
});

socket.on('base unit', function(id) {
  game.baseUnit = _.find(entities, {
    id: id
  });
});

var childs = [];

var fps = false;

setInterval(function(){
  if(fps) console.log('sec');
}, 1000);

// Render loop
var render = function() {
  if(fps) console.log('fps');

  requestAnimationFrame(render);

  stage.children.forEach(function(child) {
    if (child !== game.background) {
      if (!_.where(entities, {
          id: child.id
        })) {
        stage.removeChild(child);
      }
    }
  });

  entities.forEach(renderEntity);

  renderer.render(stage);
};

requestAnimationFrame(render);

Mousetrap.bind('up', function() {
  if (!game.up) {
    socket.emit('up:enabled');
    game.up = true;
  }
});

Mousetrap.bind('up', function() {
  socket.emit('up:disabled');
  game.up = false;
}, 'keyup');

Mousetrap.bind('left', function() {
  if (!game.left) {
    socket.emit('left:enabled');
    game.left = true;
  }
});

Mousetrap.bind('left', function() {
  socket.emit('left:disabled');
  game.left = false;
}, 'keyup');

Mousetrap.bind('right', function() {
  if (!game.right) {
    socket.emit('right:enabled');
    game.right = true;
  }
});

Mousetrap.bind('right', function() {
  socket.emit('right:disabled');
  game.right = false;
}, 'keyup');
