'use strict'
 //acceder a las rutas y permita crearlas
var express=require('express');//cargamos el modulo expres
//cargamos en controlador
var descuentoController=require('../controllers/descuento');
//llamar al router, permite hacer el CRUD
var api=express.Router();
//cargar el middleware
//restringe el acceo a los usuarios logueados
var md_auth=require('../middleware/autenticated');

api.post('/guardar-descuento', md_auth.ensureAuth,descuentoController.guardarDescuento);
api.get('/mostrar-descuento/:id?',md_auth.ensureAuth,descuentoController.mostrarDescuento);
api.delete('/delete-descuento/:id',md_auth.ensureAuth,descuentoController.deleteDescuento);

api.put('/update-descuento/:id',md_auth.ensureAuth,descuentoController.updateDescuento);

module.exports=api;