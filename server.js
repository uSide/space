var express = require('express'), app = express(), compression = require('compression'), fs = require('fs');

app.use(compression({
  threshold: 512
}));

app.use(express.static(__dirname + '/public'));

app.get('/*', function(req, res){
    res.end(fs.readFileSync(__dirname + '/public/index.html'));
});


app.listen(3000);