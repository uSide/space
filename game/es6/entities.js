var counter = 0,
    entities = {};

class Entity {
    constructor(entity) {
        this.entity = entity;
    }

    setDefaults(id) {
        this.x = 0;
        this.y = 0;

        this.left = false;
        this.right = false;
        this.up = false;

        this.speed = 0;

        this.angle = 0;

        this.collision = false;

        this.entity.anchor.x = 0.5;
        this.entity.anchor.y = 0.5;

        this.entity.scale.x = 0.5;
        this.entity.scale.y = 0.5;

        this.entity.id = id;

        entities[this.entity.id] = this;
    }

    static getEntityById(id) {
        return entities[id];
    }
}

class Ship extends Entity {
    constructor(name, id) {
        var textures = [];

        for (var i = 0; i < 100; i++) {
            var arr = ['000', '00' + i, '0' + i, i];
            textures[i] = PIXI.Texture.fromImage("/resources/ships/" + name + "/" + name + "_" + arr[i.toString().length] + ".png");
        }

        var entity = new PIXI.MovieClip(textures);

        entity.play();
        entity.animationSpeed = 0.3;

        this.entity = entity;

        this.setDefaults(id);
    }
}