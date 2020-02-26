'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var kardexSchema = Schema({
    kardex_fecha: String,
    kardex_detalle: String,
    kardex_fk_producto: { type: Schema.ObjectId, ref: 'producto' },
    kardex_valor_unitario: Number,
    kardex_ingreso: {
        ingreso_cantidad: Number,
        ingreso_valor: Number,
    },
    kardex_salida: {
        salida_cantidad: Number,
        salida_valor: Number,
    },
    kardex_saldos: {
        saldo_cantidad: Number,
        saldo_valor: Number,
    },
    kardex_promedio: Number
})
module.exports = mongoose.model('kardex', kardexSchema)
