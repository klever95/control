'use strict'
 //acceder a las rutas y permita crearlas
var express=require('express');//cargamos el modulo expres
//cargamos en controlador
var IvaController=require('../controllers/iva');
//llamar al router, permite hacer el CRUD
var api=express.Router();
//cargar el middleware
//restringe el acceo a los usuarios logueados
var md_auth=require('../middleware/autenticated');

var multipart = require('connect-multiparty')
//guardar iva
api.post('/guardar-iva',md_auth.ensureAuth,IvaController.guardarIva);
//mostrar todos los datos
api.get('/mostrar-iva',md_auth.ensureAuth,IvaController.mostrarIva);
//actualizar
api.put('/update-iva/:id',md_auth.ensureAuth,IvaController.updateIva);
//delete
api.delete('/delete-iva/:id',md_auth.ensureAuth,IvaController.deleteIva);
//mostrar un dato por id
api.get('/get-iva/:id',md_auth.ensureAuth,IvaController.getIva);

module.exports=api;