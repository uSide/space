var child = _.find(childs, {
  id: entity.id
});

if (!child) {
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

  child.id = entity.id;

  childs.push(child);

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
