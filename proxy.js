/**
 * Created by rjaraja on 4/25/15.
 */

var http = require('http');
var request = require('request')

var argv = require('yargs')
    .default('host', '127.0.0.1')
    .argv

var scheme = 'http://'
var port = argv.port || argv.host === '127.0.0.1' ? 9000 : 80;
// Build the destinationUrl using the --host value
var destinationUrl = argv.url || scheme + argv.host + ':' + port
var logFile = argv.log


server = http.createServer(function (req, res) {
    destinationUrl = req.headers['x-desination-url'] || destinationUrl;
    console.log("Proxying request to: " + destinationUrl)
    var options = {
        headers: req.headers,
        url: destinationUrl
    }
    options.method = req.method

    var path = require('path')
    var fs = require('fs')

    var logPath = argv.log && path.join(__dirname, argv.log)
    console.log(logPath)
    var logStream = logPath ? fs.createWriteStream(logPath) : process.stdout

    logStream.write('Request headers: ' + JSON.stringify(req.headers))

    req.pipe(logStream, {end: false});
    req.pipe(request(options)).pipe(res)



}).listen(9001);

console.log('Server running at http://127.0.0.1:9001/');


