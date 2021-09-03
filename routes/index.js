//copiado
var express = require('express');
var router = express.Router();
const pg = require('pg');
//const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
/*
const config = {
					connectionString: process.env.DATABASE_URL,
					ssl: true,
					connectionTimeoutMillis: 5000,
					max: 15
				};

*/

const pool = new pg.Pool({

	user: 'postgres',
  
	host: 'localhost',
  
	database: 'CWA',
  
	password: 'cwa',
  
	port: 5432,
  
})

const secret = process.env.secret;
//const pool = new pg.Pool(config);

//copiado
router.get('/', function(req, res, next) {
  res.render('login');
});


//copiado
router.post('/login', (req, res, next) =>{
	const data = {email: req.body.email, password: req.body.password};
	pool.connect((err, client, done)=>{
		if(err){
			console.log(err);
			res.render('loginerror');
		}else{
			client.query('select usuario, password, nombre, apellidos, email from voluntarios where email=$1;', [data.email], (err, result)=>{

				console.log(data)
				done();
				if(err){
					console.log(err);
				}
				if(!result){
					res.render('loginerror', {wrong: true});
				}

				console.log(result)
				
				/*
				if(result.rows[0].email !== 'admin'){
					res.render('menuadministrador', {wrong: true});
				}
						
				if(result.rows[0].email == 'admin'){
					res.render('menuadministrador', {wrong: true});
				}
				*/
				user = {usuario: result.rows[0].usuario, email: result.rows[0].email, password: result.rows[0].password, nombre:result.rows[0].nombre, apellidos: result.rows[0].apellidos};

				
				bcrypt.compare(data.password, user.password, (err, isMatch)=>{
					if(err){
						console.log(err);
					}else{
						if(isMatch){
							jwt.sign({user:user}, secret, {expiresIn: 24*60*60}, (err, token)=>{
								if(err){
									console.log(err);
								}else{
									res.cookie('auth',token);
									res.redirect('/admin/admin_functions');
								}
							});
						}else{
							if (user.email == 'admin'){
								res.render('menuadministrador', {wrong: true});
							}else{
								res.render('menu', {wrong: true});
							}
							
						}
					}	
				});
				
			});
		}		
	});
});
//copiado

router.get('/menu', function (req, res, next) {
    res.render('menu');
});

router.get('/menuadministrador/dardealta', function (req, res, next) {
    res.render('menuadministrador/dardealta');
});
//copiado
router.post('/menuadministrador/dardealta', function(req, res, next){
	var data = {name: req.body.name, Email: req.body.Email, H_Password: req.body.H_Password};
	
	// hasshing the password
	bcrypt.genSalt(10, (err, salt)=>{
		bcrypt.hash(data.H_Password, salt, (err, hash)=>{
			if(err){
				console.log(err)
				res.render('menuadministrador/dardealta', {message: 'Ha habido un problema interno, por favor vuelva a enviar su información. Disculpe las molestias.'})
			}else{
				data.H_Password = hash;
			}
		});
	});

	//inserting the user
	pool.connect(function(err, client, done){
		if(err) {
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}

		client.query('insert into Voluntarios(Nombre, Apellidos, H_Password, Email) values($1, $2, $3, $4) returning Usuario;',
		[data.name, data.username, data.password], function(err, result){
			done();
			if(err){
				res.render('menuadministrador/dardealta', {used: true})
			}else{
				res.render('menuadministrador', {message: {positive:true, message:'You have been successfully registered. You can now access with your username and password.'}});
			}
		});
	});
});
//copiado
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