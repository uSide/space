var entities = [],
    geometry = require('geometry');

process.on('message', function(m, data){
  if(m == 'add_entity'){
    entities.push(data);
  }else if(m == 'remove_entity'){
    entities.splice(data, 1);
  }
});

setInterval(function(){
  entities.forEach(function(entity){
    if (entity.mainScene) {
      if (entity instanceof entities.Ship) {
        if (entity.engine && entity.shell) {
          var acceleration = 0.5;

          if (entity.left) {
            // acceleration on rotations
            if (!entity.up) {
              if (entity.speed < entity.engine.speed / 2) {
                entity.speed += acceleration;
              } else {
                entity.speed -= acceleration / 2;
              }
            }

            entity.angle -= 0.1;
          }

          if (entity.right) {
            // acceleration on rotations
            if (!entity.up) {
              if (entity.speed < entity.engine.speed / 2) {
                entity.speed += acceleration;
              } else {
                entity.speed -= acceleration / 2;
              }
            }

            entity.angle += 0.1;
          }

          if (entity.up) {
            if (entity.speed < entity.engine.speed) {
              entity.speed += acceleration;
            }
          }

          if (!entity.left && !entity.right && !entity.up) {
            entity.speed -= acceleration / 2;

            if (entity.speed < 0.1) {
              entity.speed = 0;
            }
          }

          // calc coordinates
          var angle = entity.angle % (2 * Math.PI);

          var deltas = geometry.polarToRect(entity.speed, angle);

          entity.x += deltas[0];
          entity.y -= deltas[1];
        }
      }
    }
  });

  process.send('sync', entities);
}, 1000 / 60);
