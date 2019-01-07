
var mysql_dbc = require('./config/db_con')();
var connection = mysql_dbc.init();
mysql_dbc.open(connection);
const bodyParser = require('body-parser');
var crypto = require('crypto');

exports.main = function (req, res) {
    if(req.session.id === undefined){
      //res.render("index");
      console.log('aa');
      return false;
    }
      res.render('main', { user_id: req.session.id});
}
