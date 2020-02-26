'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var detalleDescuentoSchema=Schema({
    desde: String,
    hasta: String,
    costo: String,
    fk_descuento: { type: Schema.ObjectId, ref: 'descuento' },
});

module.exports = mongoose.model('detaleDescuento', detalleDescuentoSchema);

