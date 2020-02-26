'use strict'
 //acceder a las rutas y permita crearlas
var express=require('express');//cargamos el modulo expres
//cargamos en controlador
var compraController=require('../controllers/compra');
//llamar al router, permite hacer el CRUD
var api=express.Router();
//cargar el middleware
//restringe el acceo a los usuarios logueados
var md_auth=require('../middleware/autenticated');

var multipart = require('connect-multiparty')
//agregados una variable y le asignamos la ruta donde se van a subir los ficheros
var md_upload=multipart({uploadDir:'./uploads/producto'});

api.post('/guardar-compra',md_auth.ensureAuth,compraController.guardarcompra);
api.get('/mostrar-compra/:id?',md_auth.ensureAuth,compraController.mostrarCompra);
api.delete('/delete-compra/:id',md_auth.ensureAuth,compraController.deleteCompra)

api.put('/update-compra/:id',md_auth.ensureAuth,compraController.updateCompra)
module.exports=api;