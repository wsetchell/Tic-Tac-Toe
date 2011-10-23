var express = require('express');
var app = express.createServer()
var io = require('socket.io').listen(app);


app.listen(1111);

app.use('/js', express.static(__dirname + '/js'));

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});


io.sockets.on('connection', function(socket) {
  console.log('a new connection was made');

  //new which player are you.
  socket.emit("player", 0);
  
  socket.on("new move", function(data){
    var move = {
      x: data.x,
      y: data.y,
      player: data.player
    }
    io.sockets.emit('new move', move);
  });

// on a new connection send all previous messages  
//   io.sockets.on('connection', function(socket) {
//   console.log('a new connection was made');
//   socket.emit('questions', queue.map(function(queueItem) {
//     if (queueItem.answered)
//       return false;
//     else
//       return queueItem;
//   }));


// var firstMove = new Object;
// firstMove.x = 0;
// firstMove.y = 1;
// firstMove.player = "player1";
// socket.emit("new move", firstMove);
  
//   socket.emit('moves', queue.map(function(queueItem) {
//     if (queueItem.answered)
//       return false;
//     else
//       return queueItem;
//   }));

//   socket.on('new move', function(data) {
//     var move = {
//       id:       queue.length,
//       name:     data.name,
//       answered: false,
//       prepared: null
//     };
//     queue.push(elem);
//     io.sockets.emit('add question', elem);
//   });

//   socket.on('answer', function(data) {
//     queue[data.index].answered = true;
//     queue[data.index].prepared = data.prepared;
//   });
// 
//   socket.on('start answering', function(data) {
//     queue[data.id].beingAnswered = true;
//     queue[data.id].answerer = data.answerer;
//     io.sockets.emit('answering', data);
//   });
// 
//   socket.on('cancel answer', function(data) {
//     queue[data.id].beingAnswered = false;
//     queue[data.id].answerer = null;
//     io.sockets.emit('cancelled answer', data);
//   });
});
