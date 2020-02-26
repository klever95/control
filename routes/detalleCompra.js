'use strict'
 //acceder a las rutas y permita crearlas
var express=require('express');//cargamos el modulo expres
//cargamos en controlador
var detalleCompraController=require('../controllers/detalleCompra');
//llamar al router, permite hacer el CRUD
var api=express.Router();
//cargar el middleware
//restringe el acceo a los usuarios logueados
var md_auth=require('../middleware/autenticated');

var multipart = require('connect-multiparty')
//agregados una variable y le asignamos la ruta donde se van a subir los ficheros

api.post('/guardar-detalle-compra',md_auth.ensureAuth,detalleCompraController.guardarDetalleCompra);

api.get('/mostrar-detalle-compra/:id?',md_auth.ensureAuth,detalleCompraController.mostrarDetalleCompra);


api.get('/get-detallecompra/:id', md_auth.ensureAuth,detalleCompraController.compraDetalle);


module.exports=api;