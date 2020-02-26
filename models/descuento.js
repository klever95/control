'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var descuentoSchema=Schema({
    des_codigo:String,
    des_descripcion:String,
    des_desde: Number,
    des_hasta: Number,
    des_valor: Number,
    des_fecha: String,
    fk_usuario: { type: Schema.ObjectId, ref: 'usuario' }
});

module.exports = mongoose.model('descuento', descuentoSchema);

