renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.view);

stage = new PIXI.Stage(0x66FF99);

background = new PIXI.Sprite(new PIXI.Texture.fromImage('resources/bg.jpg'));

background.position.x = 0;
background.position.y = 0;

stage.addChild(background);

var motion = require('../shared/motion.js');

var entities = [];

motion.on('message', function(m, data){
  if(m == 'sync'){
    data.forEach(function(entity, index){
      var onScene = entities[index];

      onScene.x = entity.x;
      onScene.y = entity.y;
      onScene.angle = entity.angle;
    });
  }
});

var render = function(){
  requestAnimationFrame(render);

  renderer.render(stage);
}

requestAnimationFrame(render);

document.addEventListener('click', function(ev){
  console.log(ev.x, ev.y);
});
