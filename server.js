var express = require('express'),
    app = express(),
    compression = require('compression'),
    fs = require('fs');

// start game logic computing
require('./logic/main.js');

app.use(compression({
    threshold: 512
}));

app.use(express.static(__dirname + '/game'));

app.get('/game', function(req, res) {
    res.end(fs.readFileSync(__dirname + '/game/index.html'));
});

app.listen(3000);