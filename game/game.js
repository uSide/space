var game = {
	viewPort: {
		x: window.innerWidth,
		y: window.innerHeight - 5
	},
	baseUnit: false,
	background: false
};

function polarToRect(r, phi){
    return [
        r * Math.sin(phi),
        r * Math.cos(phi)
    ];
}

var renderer = PIXI.autoDetectRenderer(game.viewPort.x, game.viewPort.y);
window.document.body.appendChild(renderer.view);
// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x66FF99), background = new PIXI.Sprite(new PIXI.Texture.fromImage('/resources/bg.jpg'));

background.position.x = 0;
background.position.y = 0;

game.background = background;
// set background for stage
stage.addChild(background);
// Add some test entities
var test = new Ship('1', true);
stage.addChild(test.entity);

test.x = 10;
test.y = 20;

var test2 = new Ship('1', true);
stage.addChild(test2.entity);

game.baseUnit = test;

setInterval(function(){ // moving loop
    // test.e.rotation += 0.1;

    var angle = test.entity.rotation % (2 * Math.PI);

    var deltas = polarToRect(1, angle);

    test.x += deltas[0];
    test.y -= deltas[1];
}, 20);

// Render loop
var render = function(){
    requestAnimationFrame(render);

    stage.children.forEach(function(child){
        // console.log(child.id);
    	if(child != game.background && child !== game.baseUnit){
    		// all objects
            // child.position.x = 1000 - game.baseUnit.position.x;
            child.x = game.viewPort.x / 2 - (game.baseUnit.x - Entity.getEntityById(child.id).x);
            child.y = game.viewPort.y / 2 - (game.baseUnit.y - Entity.getEntityById(child.id).y);
    	}

        if(child.id == game.baseUnit.entity.id){
            // TODO: check for corners of the system
            child.x = game.viewPort.x / 2;
            child.y = game.viewPort.y / 2;
    	}

        if(child == game.background.entity){
    		// background (for parallax)
    	}
    });

    renderer.render(stage);
};

requestAnimationFrame(render);