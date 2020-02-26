'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var factura = Schema({
   //id del usuario y del cliente
    fac_direccion:String,
    fac_sucursal:String,
    fac_oblicontabilidad:String,
    fac_ruc: String,
    fac_No:String,
    fac_fechahora:String,
    fac_telefono:String,
});
//envie datos de la coleccion de objetos llamda factura 
module.exports= mongoose.model('factura',factura)