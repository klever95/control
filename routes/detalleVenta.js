'use strict'
 //acceder a las rutas y permita crearlas
var express=require('express');//cargamos el modulo expres
//cargamos en controlador
var detalleVentaController=require('../controllers/detalleVenta');
//llamar al router, permite hacer el CRUD
var api=express.Router();
//cargar el middleware
//restringe el acceo a los usuarios logueados
var md_auth=require('../middleware/autenticated');

var multipart = require('connect-multiparty')
//agregados una variable y le asignamos la ruta donde se van a subir los ficheros

api.post('/guardar-detalle-venta',md_auth.ensureAuth,detalleVentaController.guardarDetalleVenta);

api.get('/mostrar-detalle-venta/:id?',md_auth.ensureAuth,detalleVentaController.mostrarDetalleVenta);



api.get('/get-detalleventa/:id',md_auth.ensureAuth,detalleVentaController.ventaDetalle);



// api.get('/mostrar-kardex/:id?',md_auth.ensureAuth,detalleVentaController.mostrarDetalleVenta);


module.exports=api;