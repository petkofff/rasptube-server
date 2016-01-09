var express = require('express');
var app = express();
var spawn = require('child_process').spawn;
var YouTube = require('youtube-node');
var youTube = new YouTube();


var player = null;

var queue = [];

youTube.setKey('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU');

app.use(express.static('public'));

function initPlayer(id, queue) {
  player = spawn("sh", ["pls.sh", "https://www.youtube.com/watch?v="+id]);
  
  player.on('close', function() {
    queue.shift();
    if (queue[0] !== undefined) initPlayer(queue[0], queue);
  });
}

app.param('id', function(req, res, next, id) {
  if (player === null || queue[0] === undefined) {
    initPlayer(id, queue);
    queue.push(id);
  }
  else queue.push(id);
  
  next();
});

app.param('query', function(req, res, next, query) {
  youTube.search(query, 30, function(error, result) {
    if(error) res.status(400).end();
    else res.json(result);
  });
});

app.get('/api/queue/id/:id', function(req, res) {
  res.end();
});

app.get('/api/search/:query', function(req, res) {
  console.log(queue);
  res.end();
});


var port = 1100;

console.log("listening on port " + port);

app.listen(1100);
