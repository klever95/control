'use strict'

var express = require('express');
//cargar el fichero usuario.js dentro del direcctorio controllers
var usuariocontroller=require('../controllers/usuario');
//cargar dentro e una variable que se llame api par apoder crear rutas

var api=express.Router();
var md_auth=require('../middleware/autenticated');
//permite subir ficheros
var multipart = require('connect-multiparty')
//agregados una variable y le asignamos la ruta donde se van a subir los ficheros
var md_upload=multipart({uploadDir:'./uploads/usuario'});


//crear una ruta
//carga el controlador 
//-----------------------------CRUD USUARIO-----------------------------------
api.get('/probando_controlador', md_auth.ensureAuth, usuariocontroller.pruebas);
//registrar usuario
api.post('/registrarusu',usuariocontroller.guardarusuario);
//ingresar al usuario, login
api.post('/login',usuariocontroller.loginusuario);

api.post('/comprobar-contrase/:id', md_auth.ensureAuth ,usuariocontroller.comprarContrase);

api.put('/cambiar-contrase/:id', md_auth.ensureAuth ,usuariocontroller.cambiarContrase);
//actualizar el usuario
api.put('/actualizarusuario/:id?',md_auth.ensureAuth, usuariocontroller.actualizarusuario);
//cargar la imagen en el usuario
// api.post('/upload-imagen-user/:id?', [md_auth.ensureAuth, md_upload], usuariocontroller.uploadimageUsuario);
api.post('/upload-imagen-user/:id', [md_auth.ensureAuth, md_upload], usuariocontroller.uploadimageUsuario2);
//mostrar imagen del usuario
api.get('/get-imagen-usuario/:usu_imagen', usuariocontroller.getimagenfile);

api.get('/mostrar-usuario',md_auth.ensureAuth,usuariocontroller.mostrarUsuarios);



// editar desde el modo administrador
api.put('/update-usuario/:id',md_auth.ensureAuth,usuariocontroller.updateUsuario);

api.get('/get-usuario/:id',md_auth.ensureAuth,usuariocontroller.getUsuario);


module.exports=api;
