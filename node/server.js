var http = require("http");
var fs = require("fs");
var os = require("os");
var ip = require('ip');

http.createServer(function(req, res){

function time(uptime) {
console.log(uptime)
console.log("Not sure if im misunderstanding something but for some reason uptime always returns above 2000 and it messes with it")
Days = uptime/(24*3600)
uptime = uptime%(24*3600)
Hours = uptime/3600
uptime = uptime%3600
Minutes = uptime/60
uptime = uptime%60
Seconds = uptime

}
z=os.uptime();
time(z)

mb = os.totalmem()/1000000
freemb = os.freemem/1000000
num = os.cpus().length

    if (req.url === "/") {
        fs.readFile("./Public/index.html", "UTF-8", function(err, body){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(body);
    })
}

    else if(req.url.match("/sysinfo")) {
        myHostName=os.hostname();
        html=`    
        <!DOCTYPE html>
        <html>
          <head>
            <title>Node JS Response</title>
          </head>
          <body>
            <p>Hostname: ${myHostName}</p>
            <p>IP: ${ip.address()}</p>
            <p>Server Uptime: Days:${Days} Hours:${Hours} Minutes:${Minutes} Seconds:${Seconds} </p>
            <p>Total Memory: ${mb}MB </p>
            <p>Free Memory: ${freemb}MB </p>
            <p>Number of CPUs: ${num} </p>            
          </body>
        </html>` 
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(html);
    }
    else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end(`404 File Not Found at ${req.url}`);
    }
}).listen(3000);

console.log("Server listening on port 3000");
