var child = _.find(childs, {
  id: entity.id
});

if (!child) {
  var name = entity.type;

  var textures = [];

  for (var i = 0; i <= entity.spaceTextures; i++) {
    var arr = ['000', '00' + i, '0' + i, i];
    textures[i] = PIXI.Texture.fromImage("/resources/stars/" + name + "/" + name + "_" + arr[i.toString().length] + ".png");
  }

  child = new PIXI.MovieClip(textures);

  child.play();
  child.animationSpeed = 0.5;

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
