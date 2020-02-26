'use strict'
 //acceder a las rutas y permita crearlas
var express=require('express');//cargamos el modulo expres
//cargamos en controlador
var UnidadMedidaController=require('../controllers/unidad_medida');
//llamar al router, permite hacer el CRUD
var api=express.Router();
//cargar el middleware
//restringe el acceo a los usuarios logueados
var md_auth=require('../middleware/autenticated');

var multipart = require('connect-multiparty')
//guardar
api.post('/guardarUM',md_auth.ensureAuth,UnidadMedidaController.guardarUM);

//mostrar todos los productos
api.get('/mostrarUM',md_auth.ensureAuth,UnidadMedidaController.mostrarUM);

//borrar
api.delete('/deleteUM/:id',md_auth.ensureAuth,UnidadMedidaController.deleteUM);

//actualizar
api.put('/updateUM/:id',md_auth.ensureAuth,UnidadMedidaController.updateUM);

//mostrar un id
api.get('/mostrarUnidad/:id',md_auth.ensureAuth,UnidadMedidaController.getUnidad);


module.exports=api;
