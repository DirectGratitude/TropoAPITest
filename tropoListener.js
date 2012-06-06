var http = require('http');
var tropowebapi = require('tropo-webapi');

console.log("Tropo Web API Listener is started.");

var server = http.createServer(function(request, response) {
    var tropo = new tropowebapi.TropoWebAPI();
    tropo.say("Hello, World!");

    console.log("ANSWERING A REQUEST!!!");

    response.writeHead(200, {
        'Content-Type': 'application/json'
    });

    response.end(tropowebapi.TropoJSON(tropo));
}).listen(8000); // Listen on port 8000 for requests.
