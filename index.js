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

app.get('/', function (req, res){
	res.render('index', {title: 'LoL Chat', first_message: 'Type LoL, and enjoy.'})
});

io.on('connection', function (socket) {
	console.log('New user connected');
	socket.on('message', function (msg){
		io.emit('message', msg);
	});
	socket.on('lol message', function (){
		fs.readFile('static/media/lol.ogg', function (err, file){
			var base64file = new Buffer(file, 'binary').toString('base64');
			io.emit('lol message', 'everyone',base64file);
		});
	});
});

http.listen(3000, function (){
  console.log('listening on *:3000');
});