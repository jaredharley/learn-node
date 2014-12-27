var serverPort = 8888;
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.listen(serverPort);
console.log('Tooter is running on port ' + serverPort);
var toots = [];

app.get('/', function(req, res) {
    res.send('Welcome to Tooter!');
});

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/send', urlencodedParser, function(req, res) {
    console.log('Incoming toot');
   if (req.body && req.body.toot) {
       toots.push(req.body.toot);
       console.log('toot: ' + req.body.toot);
       res.send({status:"ok", message:"Toot smelled"});
   } else {
       console.log('Error with toot');
       res.send({status:"nok", message: "No toot received."});
   }
});

app.get('/toots', function(req, res) {
    res.send(toots);
});