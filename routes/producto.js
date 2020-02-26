'use strict'
 //acceder a las rutas y permita crearlas
var express=require('express');//cargamos el modulo expres
//cargamos en controlador
var Productocontroller=require('../controllers/producto');
//llamar al router, permite hacer el CRUD
var api=express.Router();
//cargar el middleware
//restringe el acceo a los usuarios logueados
var md_auth=require('../middleware/autenticated');

var multipart = require('connect-multiparty')
//agregados una variable y le asignamos la ruta donde se van a subir los ficheros
var md_upload=multipart({uploadDir:'./uploads/producto'});

//mostrar todos los productos
api.get('/mostrar-productos/:id?',md_auth.ensureAuth,Productocontroller.mostrarProductos)

//muestra un producto dependiendo del respectivo id
api.get('/producto/:id',md_auth.ensureAuth,Productocontroller.getproducto)
//guardar prodycto

api.post('/guardarproducto',md_auth.ensureAuth,Productocontroller.guardarproducto)
//mostrar productos paginados
//odenados por el nombre
api.get('/productoimg/:page?',md_auth.ensureAuth,Productocontroller.mostrarproductopaginado)

//actualizar un producto
api.put('/actualizar-producto/:id?',md_auth.ensureAuth,Productocontroller.updateproducto)
//eliminar un producto
api.delete('/delete-producto/:id',md_auth.ensureAuth,Productocontroller.deleteproducto);
//agregar imagen
api.post('/upload-imagen-producto/:id', [md_auth.ensureAuth, md_upload], Productocontroller.uploadimage);
api.put('/actualizar-promedio', Productocontroller.updatePromedioPonderado);

//mostrar imagen del usuario
api.get('/get-imagen-producto/:prod_imagen', Productocontroller.getimagenfile);
//exportar el modulo api para el llamado a las funciones CRUD
module.exports=api;