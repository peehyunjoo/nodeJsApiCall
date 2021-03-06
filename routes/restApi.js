
var mysql_dbc = require('./config/db_con')();
var connection = mysql_dbc.init();
mysql_dbc.open(connection);
const bodyParser = require('body-parser');
var crypto = require('crypto');
const https = require('https');
const http = require('http');
var prettyHtml = require('json-pretty-html').default;

exports.post = function (req, res,next) {
    var host = req.body.host;
    var path = req.body.path;
    var body = req.body.body;
    var type = req.body.type;
    var method = req.body.method;
    var port ="";

    var host = host.split('//');
    console.log(host[1]);
    console.log(path);
    console.log(method);
    if(host[0] == "http:"){
      var port ="80";
    }else{
      var port ="443";
    }
    console.log(body);
    var options = {
        hostname: host[1],
        path: path,
        port:port,
        method:method,
        headers : {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Content-Length': body.length
    }
      };

    function handleResponse(response) {
      var serverData = '';
      response.on('data', function (chunk) {
        serverData += chunk;
      });
      response.on('end', function () {
        //console.log("Response Status:", response.statusCode);
        //console.log(response.headers['content-type']);
        //console.log(response.headers['date']);
       console.log(serverData);
        res.send({statusCode:response.statusCode, headers:response.headers, resdata:serverData});
      });
    }

    if(port === "443"){
      post_req  =https.request(options, function(response){
          handleResponse(response);
      });
      post_req.write(body);
      post_req.end();
    }else if(port ==="80"){
      post_req  = http.request(options, function(response){
        handleResponse(response);
      });
      post_req.write(body);
      post_req.end();

    }

}
