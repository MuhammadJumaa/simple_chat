const Port='10.25.1.70';
const express = require('express');
var util = require('util');
var logStdout = process.stdout;
fileLog = function () {
  logStdout.write(util.format.apply(null, arguments) + '\n');
}
const port = 3000;
const app = express();

var server = require('http').Server(app);

const io = require('socket.io').listen(server);

server.listen(port, Port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> Listening on port %s. Open up http://'+Port+':%s/ in your browser.', port, port);
});

var userId = 1;
var userCount = 0;

getDate = function() {

  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  var min  = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  return hour + ":" + min;
}

io.on('connection', function(socket){

  socket.on('user:request', function(msg) {
    userCount++;
    socket.emit('user:accept', { id : userId, users : userCount });
    userId++;
    socket.broadcast.emit('user:join');
    fileLog("someone joined");
  });

  socket.on('send:message', function(msg) {
    msg.time = getDate();
    io.emit('send:message', msg);
    fileLog(msg.time + " => " + msg.text);
  });

  socket.on('disconnect', function(msg) {
    socket.broadcast.emit('user:left', msg);
    userCount--;
    fileLog("someone left");
  })

});
