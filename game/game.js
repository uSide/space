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

var socket = io.connect('http://46.63.1.119:4000');

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

  console.log(game.baseUnit, id, game.baseUnit.id);
});

var childs = [];

// Render loop
var render = function() {
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

  entities.forEach(function(entity) {
    var index = entity.id;

    if (entity instanceof Ship) {
      var child;

      if (childs[index]) {
        child = childs[index];
      } else {
        var name = entity.shell.type;

        var textures = [];

        for (var i = 0; i < 50; i++) {
          var arr = ['000', '00' + i, '0' + i, i];
          textures[i] = PIXI.Texture.fromImage("/resources/ships/" + name + "/" + name + "_" + arr[i.toString().length] + ".png");
        }

        child = new PIXI.MovieClip(textures);

        child.play();
        child.animationSpeed = 0.3;

        child.anchor.x = entity.anchor;
        child.anchor.y = entity.anchor;

        child.scale.x = entity.scale;
        child.scale.y = entity.scale;

        child.id = index;

        childs[index] = child;

        stage.addChild(child);
      }

      child.x = entity.x;
      child.y = entity.y;

      child.rotation = entity.angle;

      if (game.baseUnit && child.id) {
        if (child.id == game.baseUnit.id) {
          stage.worldTransform.tx = -child.x + game.viewPort.x / 2;
          stage.worldTransform.ty = -child.y + game.viewPort.y / 2;

          game.background.position.x = -stage.worldTransform.tx + game.viewPort.x / 2 - child.x / 5;
          game.background.position.y = -stage.worldTransform.ty + game.viewPort.y / 2 - child.y / 5;
        }
      }
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
