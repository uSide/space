class Ship extends Entity {
  engine = false;
  shell = false;
  // TODO: Other items

  // current speed
  speed = 0;

  up = false;
  left = false;
  right = false;

  inventory = [];

  setInventory(inv) {
    this.inventory = inv;
  }

  addItemToInventory(item) {
    this.inventory.push(item);
  }

  removeItemFromInventory(itemForRemove) {
    inventory.forEach(function(item, i) {
      if (item == itemForRemove) {
        inventory.splice(i, 1);
      }
    });
  }

  destroy() {
    this.shell.remove();
    this.engine.remove();
    this.remove();

    // TODO: remove inventory entities
  }

  init() {
    this.mainScene = true;

    super.init();
  }
}
