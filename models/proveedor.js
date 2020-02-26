'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var proveedorSchema = Schema({
    prov_cedula:String,
    prov_codigo: String,
    prov_nombre: String,
    prov_apellido: String,
    prov_contacto1: String,
    prov_contacto2: String,
    prov_sitio_web: String,
    prov_cedula: String,
    prov_email: String,
    prov_direccion: String,
    prov_fecha: String,
    prov_fechaActualizacion:String,
    fk_usuario: { type: Schema.ObjectId , ref: 'usuario' },
    prov_modificado: { type: Schema.ObjectId , ref: 'usuario' },

});

module.exports = mongoose.model('proveedor', proveedorSchema);