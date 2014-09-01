  $( document ).ready(function() {
	  var socket = io();

	  $('form').submit(function (){
	    if ($('#m').val().toLowerCase() == 'lol'){
	        socket.emit('lol message');  
	    }
	    else{
	  		socket.emit('message', $('#m').val());
	  		secret_function();
	    }
	    $('#m').val('');
	    return false;
	  });
	  socket.on('message', function (msg){
	    $('#messages').append($('<li>').text(msg));
	  });
	  socket.on('lol message', function (to, sound){
	    var audioSrc = 'data:audio/mp3;base64, ' + sound
	    var audio = new Audio();
	    audio.src = audioSrc;
	    audio.load();
	    audio.play();
	  });

	var secret_function = function () {
		if($('#messages').children().length == 10) {
	  		$('#messages').append($("<li class='first_message'>").text('There are other hidden secrets, could you find them?'));
	    };
	};
});