var express = require('express');
var app = express();
var spawn = require('child_process').spawn;
var YouTube = require('youtube-node');
var youTube = new YouTube();


var player = null;

var queue = [];

youTube.setKey('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU');

youTube.addParam('type', 'video');

app.use(express.static('public'));

function initPlayer(id, queue) {
  player = spawn("sh", ["pls.sh", "https://www.youtube.com/watch?v="+id]);
  
  player.on('close', function() {
    queue.shift();
    if (queue[0] !== undefined) initPlayer(queue[0], queue);
  });
}

function addOnQueue(id, queue) {
  console.log(id);
  if (player === null || queue[0] === undefined) {
    initPlayer(id, queue);
    queue.push(id);
  }
  else queue.push(id);
}

app.param('id', function(req, res, next, id) {
  addOnQueue(id, queue);
  next();
});

app.param('title', function(req, res, next, title) {
  youTube.search(title, 1, function(error, result) {
    if(error) res.status(400).end();
    else addOnQueue(result.items[0].id.videoId, queue);
  });
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

app.get('/api/queue/title/:title', function(req, res) {
  res.end();
});

app.get('/api/search/:query', function(req, res) {
  console.log(queue);
  res.end();
});

app.get('/api/next', function(req, res) {
  queue.shift();
  if (queue[0] !== undefined) initPlayer(queue[0], queue);
  res.end();
});


var port = 1100;

console.log("listening on port " + port);

app.listen(1100);
