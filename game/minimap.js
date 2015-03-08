importScripts('/libs/lodash.min.js');

var imagedata, width, height, entities, delta;

function render() {
  var image = imagedata;

  // clear
  for (var i = 0; i < width; i++) {
    for (var j = 0; j < width; j++) {
      setPixel(i, j, 0, 0, 0, 255);
    }
  }

  _.where(entities, {
    className: 'Star'
  }).forEach(function(entity) {
    var coords = getCoords(entity);

    setPixel(coords[0], coords[1], 255, 0, 0, 255);
    setPixel(coords[0] - 1, coords[1], 255, 0, 0, 255);
    setPixel(coords[0] + 1, coords[1], 255, 0, 0, 255);
    setPixel(coords[0], coords[1] - 1, 255, 0, 0, 255);
    setPixel(coords[0], coords[1] + 1, 255, 0, 0, 255);
  });

  _.where(entities, {
    className: 'Ship'
  }).forEach(function(entity) {
    var coords = getCoords(entity);

    setPixel(coords[0], coords[1], 255, 255, 0, 255);
    setPixel(coords[0] - 1, coords[1], 255, 255, 0, 255);
    setPixel(coords[0] + 1, coords[1], 255, 255, 0, 255);
    setPixel(coords[0], coords[1] - 1, 255, 255, 0, 255);
    setPixel(coords[0], coords[1] + 1, 255, 255, 0, 255);
  });

  postMessage({
    image: image
  });
}

function setPixel(x, y, r, g, b, a) {
  var index = (y * width + x) * 4;
  imagedata.data[index + 0] = r;
  imagedata.data[index + 1] = g;
  imagedata.data[index + 2] = b;
  imagedata.data[index + 3] = a;
}

function getCoords(entity) {
  return [
    parseInt(entity.x / delta + width / 2),
    parseInt(entity.y / delta + width / 2)
  ];
}

onmessage = function(event) {
  var data = event.data;

  if (data.type == 'init') {
    imagedata = data.imagedata;
    width = data.width;
    height = data.width;
    entities = data.entities;
    delta = data.delta / data.width;

    setInterval(render, 50);
  } else if (data.type == 'sync') {
    entities = data.entities;
  }
};
