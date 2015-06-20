
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

function set_hello (name) {
    global_session.call('de.meet_here.hello', [name]).then(
        function (res) {
            console.log('de.meet_here.hello', res);

            $('#hello').html(res);
        },
        function (err) {
            console.log('Error when calling de.meet_here.hello', err);

            $('#hello').html('Default');
        }
    );
}

function set_name (args) {
    name = args[0];
    set_hello(name);
}

// fired when connection is established and session attached
connection.onopen = function (session, details) {
    global_session = session;
    global_details = details;

    session.register('de.meet_here.set_name', set_name).then(
        onSuccess = function (reg) {
            console.log('Registered de.meet_here.set_name');
        },
        onError = function (err) {
            console.log('Error when registering de.meet_here.set_name');
        }
    );

    set_hello("Guenther");
};

// fired when connection was lost (or could not be established)
connection.onclose = function (reason, details) {
    console.log('Connection lost: ' + reason);
}

// now actually open the connection
connection.open();

$(document).ready(function () {
});
