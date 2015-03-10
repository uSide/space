var dir = 'game/entities/',
    files = ['entity', 'star', 'item', 'engine', 'shell', 'ship'],
    renderers = ['ship', 'star'],
    cp = require('child_process'),
    fs = require('fs'),
    _ = require('lodash'),
    path = require('path'),
    async = require('async');

var contents = [];

var translate = function(file, callback){
    var output = '';

    var proc = cp.fork(path.join(".", "node_modules", "babel", "bin", "babel", "index.js"), [
        '--playground',
        '--experimental',
        dir + file + '.js'
    ], {
        silent: true
    });

    proc.stdout.on('data', function(data) {
        output += data.toString();
    });

    proc.on('exit', function(){
        callback(null, output);
    });
};

async.map(files, translate, function(err, contents){
    contents = _.values(contents).join('');

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
});
