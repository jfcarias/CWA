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
  if (username == u.username && password == u.password) {
      res.render('menu');
  }
  else if (username == "admin" && password == "admin") {
      res.render('menuadministrador');
  }
  else {
      res.render('loginerror');
  }
});
router.get('/menu', function (req, res, next) {
    res.render('menu');
});
router.get('/menuadministrador', function (req, res, next) {
    res.render('menuadministrador');
});
router.get('/menu/informacionresidencias', function (req, res, next) {
    res.render('informacionresidencias');
});
router.get('/menu/informacionvoluntarios', function (req, res, next) {
    res.render('informacionvoluntarios');
});
router.get('/menu/opiniones', function (req, res, next) {
    res.render('opiniones');
});
router.get('/calendario', function(req, res, next) {
	// calendario tendra que consultar a la base de datos para rellenar los viajes de cada día...
	res.render('calendario');
});

module.exports = router;