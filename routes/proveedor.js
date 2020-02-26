'use strict'
 //acceder a las rutas y permita crearlas
var express=require('express');//cargamos el modulo expres
//cargamos en controlador
var proveedorController=require('../controllers/proveedor');
//llamar al router, permite hacer el CRUD
var api=express.Router();
//cargar el middleware
//restringe el acceo a los usuarios logueados
var md_auth=require('../middleware/autenticated');

var multipart = require('connect-multiparty');
//guardar
api.post('/guardar-proveedor',md_auth.ensureAuth,proveedorController.guardarProveedor);
//mostrar todos los datos
api.get('/mostrar-proveedor',md_auth.ensureAuth,proveedorController.mostrarProveedor);
//eliminar
api.delete('/delete-proveedor/:id',md_auth.ensureAuth,proveedorController.deleteProveedor);
//mostrar un dato por id
api.get('/get-proveedor/:id',md_auth.ensureAuth,proveedorController.getProveedor);
//actulaizar proveedor
api.put('/update-proveedor/:id',md_auth.ensureAuth,proveedorController.updateProveedor);

module.exports=api;