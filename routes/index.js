var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login');
});
router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  console.log(username+password);
  var u = {
  	username: "prueba",
  	password: "prueba"
  }
  if (username == u.username) {
      if (password == u.password) {
          res.render('menu');
      }
  }
  else {
      res.render('loginerror');
  }
});
router.get('/menu', function (req, res, next) {
    res.render('menu');
});
router.get('/calendario', function(req, res, next) {
	// calendario tendra que consultar a la base de datos para rellenar los viajes de cada día...
	res.render('calendario');
});

module.exports = router;