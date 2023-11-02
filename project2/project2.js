var http = require("http");
var fs = require("fs");

http.createServer(function(req, res){


    if (req.url == "/SeoulWeather") {
        fs.readFile("logfile.txt", "UTF-8", function(err, body){
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end(body);
    })}
}).listen(3000);
console.log("Server listening on port 3000");
