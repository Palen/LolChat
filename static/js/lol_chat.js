  $( document ).ready(function () {
	  var socket = io();

	  $('form').submit(function (){
	    
  		socket.emit('message', $('#m').val());
  		secret_function();
	    $('#m').val('');
	    return false;
	  });
	  socket.on('message', function (msg){
	    $('#messages').append($('<li>').text(msg));
	  });
	  socket.on('play sound', function (sound){
	    var audioSrc = 'data:audio/mp3;base64, ' + sound
	    var audio = new Audio();
	    audio.src = audioSrc;
	    audio.load();
	    audio.play();
	  });
	  socket.on('play gif', function (gif){
	  	var imgSrc = "data:image/jpeg;base64," + gif
	  	$('#messages').append($('<li><img src="' + imgSrc + '" /></li>'));
	  });

	var secret_function = function () {
		if($('#messages').children().length == 10) {
	  		$('#messages').append($("<li class='first_message'>").text('There are other hidden secrets, could you find them?'));
	    };
	};
});