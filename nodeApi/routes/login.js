
var mysql_dbc = require('./config/db_con')();
var connection = mysql_dbc.init();
mysql_dbc.open(connection);
const bodyParser = require('body-parser');
var crypto = require('crypto');

exports.login = function (req, res) {
    if(req.session.id === undefined){
      //res.render("index");
      console.log('aa');
      return false;
    }
    var id = req.body.id;
    var pwd = req.body.pwd;
    var HashPass=crypto.createHash("sha256").update(pwd).digest("hex");
    connection.query('select * from user WHERE id = ?', id, function(err, rows, fields){
  		if(HashPass === rows[0].pwd){
        console.log('로그인 성공');
        req.session.user_id=id;
        console.log(req.session.user_id);
      //  req.session.save(function(){
          res.redirect("main");
        //});
        //res.render('main', { user_id: req.session.user_id});
      }else{
        res.render("index");
      }
    });
};

exports.logout = function (req, res) {
  console.log(req.session);
    req.session.destroy;
    res.redirect('/');
};
