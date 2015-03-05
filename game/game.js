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

background.position.x = game.viewPort.x / 2;
background.position.y = game.viewPort.y / 2;

background.anchor.x = 0.5;
background.anchor.y = 0.5;

game.background = background;
// set background for stage
stage.addChild(background);

var socket = io.connect('http://46.63.1.119:4000');

socket.on('sync', function(ents) {
  // console.log(ents);

  entities = ents.filter(function(entity) {
    return entity !== false;
  }).map(function(entity) {
    return Entity.reload(entity);
  });
});

// Render loop
var render = function() {
  requestAnimationFrame(render);

  stage.children.forEach(function(child) {
    stage.removeChild(child);
    //     // console.log(child.id);
    //     if (game.baseUnit && child != game.background && child !== game.baseUnit) {
    //         // all objects
    //         // child.position.x = 1000 - game.baseUnit.position.x;
    //         child.x = game.viewPort.x / 2 - (game.baseUnit.x - Entity.getEntityById(child.id).x);
    //         child.y = game.viewPort.y / 2 - (game.baseUnit.y - Entity.getEntityById(child.id).y);
    //     }
    //
    //     if (game.baseUnit && child.id == game.baseUnit.entity.id) {
    //         // TODO: check for corners of the system
    //         child.x = game.viewPort.x / 2;
    //         child.y = game.viewPort.y / 2;
    //     }
    //
    //     if (game.baseUnit && child == game.background.entity) {
    //         // background (for parallax)
    //     }
  });

  entities.forEach(function(entity) {
    if (entity instanceof Ship) {
      var name = entity.shell.type;

      var textures = [];

      for (var i = 0; i < 50; i++) {
        var arr = ['000', '00' + i, '0' + i, i];
        textures[i] = PIXI.Texture.fromImage("/resources/ships/" + name + "/" + name + "_" + arr[i.toString().length] + ".png");
      }

      var child = new PIXI.MovieClip(textures);

      child.play();
      child.animationSpeed = 0.3;

      child.x = entity.x;
      child.y = entity.y;

      child.rotation = entity.angle;

      child.anchor.x = entity.anchor;
      child.anchor.y = entity.anchor;

      child.scale.x = entity.scale;
      child.scale.y = entity.scale;

      stage.addChild(child);
    }
  });

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
