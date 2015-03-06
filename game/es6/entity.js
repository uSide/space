var entities = [],
  counter = 0;

class Entity {
  mainScene = false;

  // textures
  spaceTextures = 0;
  inventoryTextures = 0;

  setSpaceTexturesCount(num){
    this.spaceTextures = num;
  }

  setInventoryTexturesCount(num){
    this.inventoryTextures = num;
  }

  id = 0;

  x = 0;
  y = 0;

  scale = 1;

  anchor = 0.5;

  collision = false;

  angle = 0;

  init(id) {
    this.id = counter++;
    entities[this.id] = this;
  }

  remove() {
    entities[this.id] = false;
  }

  hide() {
    this.mainScene = false;
  }

  static reload(data) { // spawning entities on client while sending it on websocket
    var instance = new window[data.className];

    delete data.className;

    for (var key in data) {
      instance[key] = data[key];
    }

    return instance;
  }

  toJSON() {
    var object = this;

    object.className = Object.getPrototypeOf(object).constructor.name;

    return object;
  }
}
