var http = require('http');

var destinationUrl = '127.0.0.1:8000'

var server;
server = http.createServer(function (request, response) {
    console.log('request starting...');
    console.log('request headers...');
    console.log(request.headers);


    // respond
    for (var h in request.headers) {
        response.setHeader(h, request.headers[h])
    }
    request.pipe(response)
    //response.end();

});

server.listen(9000);
console.log('Server running at http://127.0.0.1:9000/');
