var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var fs = require('fs');

// set html swig engine, similar to Jinja2
var swig = require('swig');
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// set static files
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function (req, res) {
    res.render('index', {title: 'LoL Chat', first_message: 'Type LoL, and enjoy.'});
});

// listen socket events
io.on('connection', function (socket) {
	console.log('New user connected');
	socket.on('message', function (msg){
		switch (msg)
		{
			case 'lol': var file_sound = 'static/media/lol.ogg';
						break;

			case 'omg': var file_sound = 'static/media/omg.mp3';
						break;

			case 'loool':
			case 'lololol':
			case 'lool':
				var file_sound = 'static/media/loool.ogg'
				break;

			default:
				io.emit('message', msg);
				return true;

		}
		play_sound(file_sound);
						
	});
});

var play_sound = function (file_sound){
	fs.readFile(file_sound, function (err, file){
		var base64file = new Buffer(file, 'binary').toString('base64');
		io.sockets.emit('play sound', base64file);
		return true;
	});	
};

http.listen(3000, function (){
  console.log('listening on *:3000');
});