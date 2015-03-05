var entities = [];

class Entity {
    mainScene = false;

    id = 0;

    x = 0;
    y = 0;

    scale = 1;

    anchor = 0.5;

    collision = false;

    angle = 0;

    init(id) {
        this.id = id;
        entities[this.id] = this;
    }

    remove(){
        entities[this.id] = false;
    }

    hide(){
        this.mainScene = false;
    }
}