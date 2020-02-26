'use strict'
 //acceder a las rutas y permita crearlas
var express=require('express');//cargamos el modulo expres
//cargamos en controlador
var numeroController=require('../controllers/numero-venta');
//llamar al router, permite hacer el CRUD
var api=express.Router();
//cargar el middleware
//restringe el acceo a los usuarios logueados
var md_auth=require('../middleware/autenticated');


api.post('/registrar',md_auth.ensureAuth,numeroController.guardarNumero);

api.get('/mostrar/:id?',md_auth.ensureAuth,numeroController.mostrarnumeros);

api.put('/actualizar/:id',md_auth.ensureAuth,numeroController.updateNumeros);


module.exports=api;