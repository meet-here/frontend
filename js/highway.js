
/// specify the URL of crossbar.io
//  if the user bypasses the server, make it still work
var wsuri = (document.location.protocol === 'http:' ? 'ws:' : 'wss:') + '//' + document.location.host + '/ws';

/// the WAMP connection to the Router
var connection = new autobahn.Connection({
	url: wsuri,
  realm: 'realm1'
});

var name;
var global_session;
var global_details;
var global_room;

function get_room() {
		global_session.call('rooms.get_new_room').then(
		function (res) {
			console.log('rooms.get_new_room', res);

			$('#new-room-name').html(res);
			$('#join-room-name').val(res);
		},
		function (err) {
			console.log('rooms.get_new_room', err);
			debugger;
			$('#new-room-name').html('ERROR');
		}
	);
}




function join_room() {
   function onevent(args) {
	    $("#chat-area").append(args[0]+"\n");
   }
   global_room = 'rooms.rooms.'+$('#join-room-name').val();
   global_session.subscribe(global_room, onevent).then(
		function (subscription) {
			$("#chat-area").append("joined room"+"\n")},
		function (error) {
			console.log("error subscribing to room",error);
			debugger;
		});
   global_session.publish(global_room, ["New user joins!"]);
}


function send_message() {
	message = $('#chat-message').val();
	$("#chat-area").append(message+"\n");
	global_session.publish(global_room, [message]);
}


// fired when connection is established and session attached
connection.onopen = function (session, details) {
	global_session = session;
	global_details = details;	
};

// fired when connection was lost (or could not be established)
connection.onclose = function (reason, details) {
	console.log('Connection lost: ' + reason);
}

// now actually open the connection
connection.open();

$(document).ready(function () {
});
