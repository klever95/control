'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ventasSchema = Schema({
    ven_codigo              : String,
    ven_fecha_venta         : String,
    ven_total               : Number,
    ven_subtotal            : Number,
    ven_iva                 : Number,
    ven_Siniva              : Number,
    ven_descuento           : Number,
    ven_Totaldescuento      :Number,
    ven_efectivo            : Number,
    ven_cambio              : Number,
    fk_cliente              : { type: Schema.ObjectId, ref: 'cliente' },
    fk_usuario              : { type: Schema.ObjectId, ref: 'usuario' },
    fk_producto             : { type: Schema.ObjectId, ref: 'producto' },
    fk_ivas                 : { type: Schema.ObjectId, ref: 'iva' },
    fk_configuracion        : { type: Schema.ObjectId, ref: 'configuracion' },
    fk_numero               : { type: Schema.ObjectId, ref: 'numero-ventas' },
    ven_ice                 : Number,
    ven_subtotalIva         :Number,
    ven_subtotalCero        :Number,
});

module.exports = mongoose.model('venta', ventasSchema);
// _id:string,
// ven_codigo:string,
// ven_fecha_venta:string,
// ven_total:number,
// ven_subtotal:number,
// ven_iva:number,
// ven_Siniva:number,
// ven_descuento:number,
// ven_efectivo:number,
// ven_cambio:number,
// fk_usuario:string,
// fk_cliente:string,
// fk_ivas:string,
// fk_descuento:string,