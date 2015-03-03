"use strict";

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var counter = 0,
    entities = {};

var Entity = (function () {
        function Entity(entity) {
                _classCallCheck(this, Entity);

                this.entity = entity;
        }

        _prototypeProperties(Entity, {
                getEntityById: {
                        value: function getEntityById(id) {
                                return entities[id];
                        },
                        writable: true,
                        configurable: true
                }
        }, {
                setDefaults: {
                        value: function setDefaults(id) {
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
                        },
                        writable: true,
                        configurable: true
                }
        });

        return Entity;
})();

var Ship = (function (Entity) {
        function Ship(name, id) {
                _classCallCheck(this, Ship);

                var textures = [];

                for (var i = 0; i < 100; i++) {
                        var arr = ["000", "00" + i, "0" + i, i];
                        textures[i] = PIXI.Texture.fromImage("/resources/ships/" + name + "/" + name + "_" + arr[i.toString().length] + ".png");
                }

                var entity = new PIXI.MovieClip(textures);

                entity.play();
                entity.animationSpeed = 0.3;

                this.entity = entity;

                this.setDefaults(id);
        }

        _inherits(Ship, Entity);

        return Ship;
})(Entity);