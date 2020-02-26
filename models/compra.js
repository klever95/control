'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var compraSchema = Schema({
    com_fechaEmitida:String,
    com_fechaIngreso:String,
    com_codigo: Number,
    com_subtotal: Number,
    com_total: Number,
    com_iva: Number,
    fk_proveedor: { type: Schema.ObjectId, ref: 'proveedor' },
    fk_usuario: { type: Schema.ObjectId, ref: 'usuario' },
    fk_ivas: { type: Schema.ObjectId, ref: 'iva' },

});

module.exports = mongoose.model('compra', compraSchema);