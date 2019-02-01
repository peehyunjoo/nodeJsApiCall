
var mysql_dbc = require('./config/db_con')();
var connection = mysql_dbc.init();
mysql_dbc.open(connection);
const bodyParser = require('body-parser');
const http = require('http');

exports.api = function (req, res) {
  var idx = req.param('idx');     //get방식일때는 req.param으로 받을 수 있지만 POST일때는 req.body로 받아야함
  if(idx == null){
    res.json("no match parameters");
  }else{
    connection.query('select * from schedule WHERE idx = ?',idx, function(err, rows, fields){
      if(err){
        console.log(err);
      } else {
        console.log("success");
        res.json(rows);
      }
    });
  }

};

exports.api_post = function (req, res) {
  var contype = req.headers['content-type'];
  if(contype != "application/json"){
    res.json("no match content-type");
  }else{
    var idx = req.body.idx;
    if(idx == null){
      res.json("no match parameters");
    }else{
      connection.query('select * from schedule WHERE idx = ?',idx, function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          console.log("success");
          rows[0].status = '00';
          res.json(rows);
        }
      });
    }
  }
};
