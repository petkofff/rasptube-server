var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
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
    if (queue[0] !== undefined) initPlayer(queue[0].id, queue);
    io.sockets.emit("queue changed or new connection", queue);
  });
}

function addOnQueue(song, queue) {
  if (player === null || queue[0] === undefined) {
    initPlayer(song.id, queue);
    queue.push(song);
  }
  else queue.push(song);
  
  io.sockets.emit("queue changed or new connection", queue);
}

io.on("connection", function(socket) {
  socket.emit("queue changed or new connection", queue);
});

app.param('id', function(req, res, next, id) {
  youTube.getById(id, function(error, result) {
    if(error) res.status(400).end();
    else addOnQueue({
      id: id, 
      title: result.items[0].snippet.title
    }, queue);
  });
  next();
});

app.param('title', function(req, res, next, title) {
  youTube.search(title, 1, function(error, result) {
    if(error) res.status(400).end();
    else addOnQueue({
      id: result.items[0].id.videoId,
      title: result.items[0].snippet.title
    }, queue);
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
  res.end();
});

app.get('/api/next', function(req, res) {
  exec("sh sts.sh");
  res.end();
});


var port = 1100;

http.listen(port, function(){
  console.log("listening on port " + port);
});
