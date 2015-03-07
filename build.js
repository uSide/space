var dir = 'game/entities/',
  files = ['entity', 'star', 'item', 'engine', 'shell', 'ship'],
  renderers = ['ship', 'star'],
  cp = require('child_process'),
  fs = require('fs'),
  _ = require('lodash');

var contents = '';

files.forEach(function(file) {
  var output = cp.spawnSync('c:\\Users\\Flopix\\AppData\\Roaming\\npm\\babel.cmd', [
    '--playground',
    '--experimental',
    dir + file + '.js'
  ]).stdout.toString();

  contents += output;
});

fs.writeFileSync('./game/entities.js', contents);

contents += 'module.exports = {';

contents += 'entities:entities,';

files.forEach(function(file) {
  contents += _.capitalize(file) + ':' + _.capitalize(file) + ',';
});

contents += '}';

fs.writeFileSync('./logic/entities.js', contents);

// clear
contents = 'window.renderEntity = function(entity){\n';

renderers.forEach(function(file) {
  contents += 'if (entity instanceof ' + _.capitalize(file) + ') {\n';

  contents += fs.readFileSync(dir + file + '.render.js', {
    encoding: 'utf8'
  });

  contents += '}\n';
});

contents += '};\n';

fs.writeFileSync('./game/render.js', contents);
