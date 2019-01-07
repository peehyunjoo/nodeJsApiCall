
var mysql_dbc = require('./config/db_con')();
var connection = mysql_dbc.init();
mysql_dbc.open(connection);
const bodyParser = require('body-parser');
var crypto = require('crypto');

exports.post = function (req, res,next) {
    var url = req.body.url;
    var body = req.body.body;
    var type = req.body.type;
    var method = req.body.method;

    console.log(req.body.data);
    console.log(req.body.body);
    res.send({url:url, body:body, type:type, method:method});
}
