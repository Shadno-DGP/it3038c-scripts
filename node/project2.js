var http = require("http");
var fs = require("fs");
var os = require("os");
var ip = require('ip');

http.createServer(function(req, res){

function time(uptime) {
console.log("server pinged")
}
z=os.uptime();
time(z)

mb = os.totalmem()/1000000
freemb = os.freemem/1000000
num = os.cpus().length


    if (req.url == "/SeoulWeather") {
        fs.readFile("logfile.txt", "UTF-8", function(err, body){
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end(body);
    })}
}).listen(3000);
console.log("Server listening on port 3000");
