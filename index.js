var users = ["sgabello", "molletta", "negro", "vagiagia", "barlume", "cazzuola", "mantecato", "maronno", "salmonia", "bastonu"];
var colors = ["blue", "red", "black", "purple", "green", "teal", "fuchsia", "navy", "olive", "#999"];
 var sounds = ["clap-808.mp3", "clap-analog.mp3", "clap-crushed.mp3", "clap-fat.mp3", "clap-slapper.mp3", "clap-tape.mp3", "cowbell-808.mp3", "crash-808.mp3", "crash-acoustic.mp3", "crash-noise.mp3", "crash-tape.mp3", "hihat-808.mp3", "hihat-acoustic01.mp3", "hihat-acoustic02.mp3", "hihat-analog.mp3", "hihat-digital.mp3", "hihat-dist01.mp3", "hihat-dist02.mp3", "hihat-electro.mp3", "hihat-plain.mp3", "hihat-reso.mp3", "hihat-ring.mp3", "kick-808.mp3", "kick-acoustic01.mp3", "kick-acoustic02.mp3", "kick-big.mp3", "kick-classic.mp3", "kick-cultivator.mp3", "kick-deep.mp3", "kick-dry.mp3", "kick-electro01.mp3", "kick-electro02.mp3", "kick-floppy.mp3", "kick-gritty.mp3", "kick-heavy.mp3", "kick-newwave.mp3", "kick-oldschool.mp3", "kick-plain.mp3", "kick-slapback.mp3", "kick-softy.mp3", "kick-stomp.mp3", "kick-tape.mp3", "kick-thump.mp3", "kick-tight.mp3", "kick-tron.mp3", "kick-vinyl01.mp3", "kick-vinyl02.mp3", "kick-zapper.mp3", "openhat-808.mp3", "openhat-acoustic01.mp3", "openhat-analog.mp3", "openhat-slick.mp3", "openhat-tight.mp3", "perc-808.mp3", "perc-chirpy.mp3", "perc-hollow.mp3", "perc-laser.mp3", "perc-metal.mp3", "perc-nasty.mp3", "perc-short.mp3", "perc-tambo.mp3", "perc-tribal.mp3", "perc-weirdo.mp3", "ride-acoustic01.mp3", "ride-acoustic02.mp3", "shaker-analog.mp3", "shaker-shuffle.mp3", "shaker-suckup.mp3", "snare-808.mp3", "snare-acoustic01.mp3", "snare-acoustic02.mp3", "snare-analog.mp3", "snare-big.mp3", "snare-block.mp3", "snare-brute.mp3", "snare-chester.mp3", "snare-dist01.mp3", "snare-dist02.mp3", "snare-electro.mp3", "snare-lofi01.mp3", "snare-lofi02.mp3", "snare-modular.mp3", "snare-noise.mp3", "snare-pinch.mp3", "snare-punch.mp3", "snare-smasher.mp3", "snare-sumo.mp3", "snare-tape.mp3", "snare-vinyl01.mp3", "snare-vinyl02.mp3", "tom-808.mp3", "tom-acoustic01.mp3", "tom-acoustic02.mp3", "tom-analog.mp3", "tom-chiptune.mp3", "tom-fm.mp3", "tom-lofi.mp3", "tom-rototom.mp3", "tom-short.mp3"];

var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);
var GoogleSearch = require('google-search');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){  
  
  var color = randomElement(colors);
  var user = randomElement(users);

  console.log(user + ' user connected');

  io.emit('user connected', user, color);  
  
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    
      if (msg.indexOf("user") > -1) {
        var ww = msg.split(" ");
        if(ww.length == 2) {
            user = ww[1];
        }
      }
    
      var i = parseInt(Math.random() * sounds.length);
      var sound = sounds[i];
  
     io.emit('chat message', msg, color, user, sound);
  });
  
  socket.on('image message', function(imageUrl){
    console.log('image: ' + imageUrl);
     io.emit('image message', user, imageUrl);
  });

  socket.on('disconnect', function(){
    console.log(user + ' disconnected');
    users.push(user);
    colors.push(color);
  });
});

server.listen(process.env.PORT, process.env.IP, function(){
  console.log('listening on *:3000');
  console.log(server.address());
});

function randomElement(array) {    
      var r = parseInt(Math.random() * array.length);    
      var element = array[r];
      array.splice(r,1);
      return element;
};

