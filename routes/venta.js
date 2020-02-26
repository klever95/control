'use strict'

var express = require('express');
//cargar el fichero usuario.js dentro del direcctorio controllers
var ventacontrotrollers=require('../controllers/venta');
//cargar dentro e una variable que se llame api par apoder crear rutas

var api=express.Router();
var md_auth=require('../middleware/autenticated');
//permite subir ficheros
var multipart = require('connect-multiparty')
//agregados una variable y le asignamos la ruta donde se van a subir los ficheros
//mostrar ventas realizadas
api.get('/get-venta/:id?',md_auth.ensureAuth,ventacontrotrollers.getventas)
//guardar venta
api.post('/guardar-venta',md_auth.ensureAuth,ventacontrotrollers.guardarventa)
//mostrar cualquier tipo de venta
api.get('/mostrar-venta/:id?',md_auth.ensureAuth,ventacontrotrollers.mostrarventas);
//mostrar numeros de facturas de venta
api.get('/numeros-venta',md_auth.ensureAuth,ventacontrotrollers.numeros);
//actualizar venta
api.put('/actualizar-venta/:id',md_auth.ensureAuth,ventacontrotrollers.updateventa);
//eliminar venta
api.delete('/delete-venta/:id',md_auth.ensureAuth,ventacontrotrollers.deleteventa);

module.exports=api;