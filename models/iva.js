'use strict'

var mongosse = require('mongoose');
var Schema = mongosse.Schema;

var ivaSchema = Schema({
    iva_codigo: String,
    iva_valor: Number,
    iva_fecha: String,
    iva_fechaActualizacion:String,
    fk_usuario: { type: Schema.ObjectId , ref: 'usuario' },
    iva_modificado:{ type: Schema.ObjectId , ref: 'usuario' },

})
module.exports = mongosse.model('iva', ivaSchema);