var dir = 'game/es6/',
  files = ['entity', 'star', 'item', 'engine', 'shell', 'ship'],
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
