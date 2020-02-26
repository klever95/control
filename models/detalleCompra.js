'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var detalleCompraSchema = Schema({
    det_detalle         : String,
    det_fecha           : String,
    det_stockIng        : Number,
    det_cajas           : Number,
    det_unidadesCaja    : Number,
    det_precioCaja      : Number,
    det_subtotal        : Number,
    det_total           : Number,
    det_iva             : Number,
    det_precioCompraActual:Number,
    fk_producto         : {type: Schema.ObjectId, ref: 'producto'},
    fk_compra           : { type: Schema.ObjectId, ref: 'compra' },
    
});

module.exports = mongoose.model('detalleCompra', detalleCompraSchema);