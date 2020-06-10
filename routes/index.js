var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var x = { title: 'Hello World'}
  res.render('index', x);
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.post('/login', function(req, res, next) {
  var username = req.body.usuario;
  var password = req.body.pass;
  var u = { // esto vendrá de la bbdd
  	username: "pepito", 
  	password: "hola223"
  }
  if (username == u.username){
  	res.render('index', { title: username });
  }else{
  	res.render('login');
  }
  
});

module.exports = router;
