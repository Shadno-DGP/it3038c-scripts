var http = require('http');
var data = require('/home/cechuser/it3038c-scripts/node/widgets.json')

var server = http.createServer(function(req, res){
	if	(req.url === "/") {
		res.writeHead(200, {"Content-Type": "text/json"});
		value = JSON.stringify(data, ["name","color"], 2);
		parsed = JSON.parse(value);
		for (var i = 0; i < parsed.length; i++) {
		res.write(parsed[i]['name'] + " is " + parsed[i]['color'] + ".\n");
}
		
		res.end("");
	}
	else {
		res.writeHead(404, {"Content-Type": "text/plain"});
		res.end("Data not found");
	}
	});

server.listen(3000);
console.log("Server listening on port 3000");




































































































































































































































































































































		
