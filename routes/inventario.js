'use strict'
var express                     = require('express');//cargamos el modulo expres
var inventarioController        = require('../controllers/inventario');
var api                         = express.Router();
var md_auth                     = require('../middleware/autenticated');
api.post('/guardar-inventario',md_auth.ensureAuth,inventarioController.guardarInventario);
api.post('/guardar-inventarios',md_auth.ensureAuth,inventarioController.guardarInventarios);
api.get('/mostrar-inventarios',md_auth.ensureAuth,inventarioController.mostrarInventario);

module.exports                  = api;