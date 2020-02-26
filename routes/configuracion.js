'use strict'

var express=require('express');
var configuracionController=require('../controllers/configuracion');
var api=express.Router();
var md_auth=require('../middleware/autenticated');

var multipart = require('connect-multiparty')

api.post('/guardar-configuracion',md_auth.ensureAuth,configuracionController.guardar);

api.get('/mostrar-configuracion/:id?',md_auth.ensureAuth,configuracionController.mostrar);

api.put('/editar-configuracion/:id?',md_auth.ensureAuth,configuracionController.editar);

module.exports=api;