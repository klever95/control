'use strict'
 //acceder a las rutas y permita crearlas
var express=require('express');//cargamos el modulo expres
//cargamos en controlador
var categoriacontroller=require('../controllers/categoria');
//llamar al router, permite hacer el CRUD
var api=express.Router();
//cargar el middleware
//restringe el acceo a los usuarios logueados
var md_auth=require('../middleware/autenticated');

var multipart = require('connect-multiparty')
//agregados una variable y le asignamos la ruta donde se van a subir los ficheros
//var md_upload=multipart({uploadDir:'./uploads/producto'});
//--------------CRUD CATEGORIA
api.get('/categoriaId/:id',md_auth.ensureAuth,categoriacontroller.getcategoriaUnId)


//ruta de prueba
api.get('/categoria/:id',md_auth.ensureAuth,categoriacontroller.getcategoria)
///guardar
api.post('/guardarcategoria',md_auth.ensureAuth,categoriacontroller.guardarcategoria)
//muestra todas las categorias anidadas con claves 
api.get('/mostrarcategoria',md_auth.ensureAuth,categoriacontroller.mostrarcategorias)
//actualizar categorida
api.put('/actualizarcategoria/:id',md_auth.ensureAuth,categoriacontroller.updatecategoria)
//eliminar categoria
api.delete('/deletecategoria/:id',md_auth.ensureAuth,categoriacontroller.deletecategoria)

module.exports=api;         