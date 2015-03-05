"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var entities = [],
    counter = 0;

var Entity = (function () {
  function Entity() {
    this.angle = 0;
    this.collision = false;
    this.anchor = 0.5;
    this.scale = 1;
    this.y = 0;
    this.x = 0;
    this.id = 0;
    this.mainScene = false;

    _classCallCheck(this, Entity);
  }

  _prototypeProperties(Entity, {
    reload: {
      value: function reload(data) {
        // spawning entities on client while sending it on websocket
        var instance = new window[data.className]();

        delete data.className;

        for (var key in data) {
          instance[key] = data[key];
        }

        return instance;
      },
      writable: true,
      configurable: true
    }
  }, {
    init: {
      value: function init(id) {
        this.id = counter++;
        entities[this.id] = this;
      },
      writable: true,
      configurable: true
    },
    remove: {
      value: function remove() {
        entities[this.id] = false;
      },
      writable: true,
      configurable: true
    },
    hide: {
      value: function hide() {
        this.mainScene = false;
      },
      writable: true,
      configurable: true
    },
    toJSON: {
      value: function toJSON() {
        var object = this;

        object.className = Object.getPrototypeOf(object).constructor.name;

        return object;
      },
      writable: true,
      configurable: true
    }
  });

  return Entity;
})();

"use strict";

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Item = (function (Entity) {
  function Item() {
    this.weight = 1;
    this.price = 1;
    this.isDroppable = true;

    _classCallCheck(this, Item);

    if (Entity != null) {
      Entity.apply(this, arguments);
    }
  }

  _inherits(Item, Entity);

  return Item;
})(Entity);

"use strict";

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Engine = (function (Item) {
	function Engine() {
		this.speed = 1;
		this.acceleration = 1;

		_classCallCheck(this, Engine);

		if (Item != null) {
			Item.apply(this, arguments);
		}
	}

	_inherits(Engine, Item);

	return Engine;
})(Item);

"use strict";

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Shell = (function (Item) {
	function Shell() {
		this.health = 1;
		this.type = "1";

		_classCallCheck(this, Shell);

		if (Item != null) {
			Item.apply(this, arguments);
		}
	}

	_inherits(Shell, Item);

	return Shell;
})(Item);

"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Ship = (function (Entity) {
  function Ship() {
    this.inventory = [];
    this.right = false;
    this.left = false;
    this.up = false;
    this.speed = 0;
    this.shell = false;
    this.engine = false;

    _classCallCheck(this, Ship);

    if (Entity != null) {
      Entity.apply(this, arguments);
    }
  }

  _inherits(Ship, Entity);

  _prototypeProperties(Ship, null, {
    setInventory: {
      value: function setInventory(inv) {
        this.inventory = inv;
      },
      writable: true,
      configurable: true
    },
    addItemToInventory: {
      value: function addItemToInventory(item) {
        this.inventory.push(item);
      },
      writable: true,
      configurable: true
    },
    removeItemFromInventory: {
      value: function removeItemFromInventory(itemForRemove) {
        inventory.forEach(function (item, i) {
          if (item == itemForRemove) {
            inventory.splice(i, 1);
          }
        });
      },
      writable: true,
      configurable: true
    },
    destroy: {
      value: function destroy() {
        this.shell.remove();
        this.engine.remove();
        this.remove();

        // TODO: remove inventory entities
      },
      writable: true,
      configurable: true
    },
    init: {
      value: function init() {
        this.mainScene = true;

        _get(Object.getPrototypeOf(Ship.prototype), "init", this).call(this);
      },
      writable: true,
      configurable: true
    }
  });

  return Ship;
})(Entity);

// TODO: Other items

// current speed

