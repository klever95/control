'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clienteSchema = Schema({
    cli_codigo:String,
    cli_cedula: String,
    cli_nombre: String,
    cli_apellido: String,
    cli_celular:String,
    cli_telefono: String,
    cli_email: String,
    cli_direccion: String,
    cli_fecha: String,
    cli_fechaActualizacion:String,
    fk_usuario: { type: Schema.ObjectId, ref: 'usuario' },
    cli_modificar: { type: Schema.ObjectId, ref: 'usuario' },

})
module.exports = mongoose.model('cliente', clienteSchema)