'use strict'

var express=require('express');
var clienteController=require('../controllers/cliente');
var api=express.Router();
var md_auth=require('../middleware/autenticated');

var multipart = require('connect-multiparty')

//guardar 
api.post('/guardarcliente',md_auth.ensureAuth,clienteController.guardarCliente);
//mostrar todo
api.get('/mostrarcliente',md_auth.ensureAuth,clienteController.mostrarCliente)

//eliminar cliente
api.delete('/deletecliente/:id',md_auth.ensureAuth,clienteController.deleteCliente);
//actualizar cliente
api.put('/updatecliente/:id',md_auth.ensureAuth,clienteController.updateCliente);

//mostrar una cliente
api.get('/mostraruncliente/:id',md_auth.ensureAuth,clienteController.getCliente);


module.exports=api;