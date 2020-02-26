'use strict'
var express = require('express');
var kardexController = require('../controllers/kardex');
var md_auth=require('../middleware/autenticated');

var api = express.Router();

api.post('/guardar-kardex',md_auth.ensureAuth,kardexController.guardarKardex);

api.get('/mostrarkardex/:id?',md_auth.ensureAuth,kardexController.mostrarKardex);


module.exports=api;