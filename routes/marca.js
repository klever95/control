'use strict'
 //acceder a las rutas y permita crearlas
var express=require('express');//cargamos el modulo expres
//cargamos en controlador
var marcaController=require('../controllers/marca');
//llamar al router, permite hacer el CRUD
var api=express.Router();
//cargar el middleware
//restringe el acceo a los usuarios logueados
var md_auth=require('../middleware/autenticated');

var multipart = require('connect-multiparty')

//guardar marcas
api.post('/guardar-marca',md_auth.ensureAuth,marcaController.guardarMarca)
//mostrar todas las marcas  
api.get('/mostrar-marca',md_auth.ensureAuth,marcaController.mostrarMarca);
//borrar marca
api.delete('/delete-marca/:id',md_auth.ensureAuth,marcaController.deleteMarca);

//actualziar marca
api.put('/update-marca/:id',md_auth.ensureAuth,marcaController.updateMarca);

//mostrar valor por ID

api.get('/mostrar-una-marca/:id',md_auth.ensureAuth,marcaController.getMarca);
module.exports=api;