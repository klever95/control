'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var detalleVentaSchema = Schema({
    det_detalle             : String,
    det_fecha               : String,
    det_stockSig            : Number,
    det_unidades            : Number,
    det_subtotal            : Number,
    det_total               : Number,
    det_precioVentaActual   : Number,
    det_preciosinIva        : Number,
    det_iva                 : Number,
    det_precio_unidad       : Number,
    det_ivaValor            : Number,
    det_ivaSubtotal         : Number,
    det_descuento           : Number,
    det_descuentoTotal      : Number,
    det_descuentoValor      : Number,
    fk_producto             : {type: Schema.ObjectId, ref: 'producto'},
    fk_venta                : { type: Schema.ObjectId, ref: 'venta' },
    det_subtotalprecio      :Number,
    det_preciototal         :Number,
});

module.exports = mongoose.model('detalleVenta', detalleVentaSchema);

// det_detalle:string,
// det_fecha:string,
// det_stockSig: number,
// det_unidades: number,
// det_subtotal: number,
// det_total: number,
// det_iva: number,
// det_ivaValor: number,
// det_ivaSubtotal: number,
// det_descuento: number,
// det_descuentoTotal: number,
// det_descuentoValor: number,
// det_precioCompraActual: number,
// det_precioVentaActual: number,
// fk_producto:string,
// fk_venta:string