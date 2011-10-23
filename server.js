var express = require('express');
var app = express.createServer()
var io = require('socket.io').listen(app);


app.listen(1111);

app.use('/js', express.static(__dirname + '/js'));

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});


var num_moves = 0


var board = new Object();

io.sockets.on('connection', function(socket) {
  console.log('a new connection was made');

  //new which player are you.
  socket.emit("player", 0);
  
  socket.on("new move", function(data){

    var move = {
      x: data.x,
      y: data.y,
      player: data.player,
      number: data.number
    }
    
    //make sure this isn't an old move
    if (num_moves > move.number) {
      console.log("tried to send an old move");
      return;
    }
    if (board[move.x+"-"+move.y] != undefined) {
      console.log("tried to move in a position that already exists");
      return;
    }
    board[move.x+"-"+move.y] = move.player;
    
    io.sockets.emit('new move', move);
  });
});
