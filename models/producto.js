'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productoschema = Schema({
     prod_codigo: String,
     prod_descripcion: String,
     prod_precioCompra: Number,
     prod_precioVenta: Number,
     prod_fecha: String,
     prod_fechaActualizacion: String,
     prod_stock: { type: Number, default: 0 },
     fk_marca: { type: Schema.ObjectId, ref: 'marca' },
     fk_categoria: { type: Schema.ObjectId, ref: 'categoria' },
     // fk_proveedor: { type: Schema.ObjectId, ref: 'proveedor' },
     iva: Boolean,

     fk_usuario: { type: Schema.ObjectId, ref: 'usuario' },
     prod_modificar:{ type: Schema.ObjectId , ref: 'usuario' },
     // fk_descuento:{type:Schema.ObjectId, ref:'descuento'},
   

});
//crear un modelo artista usando el esquema creado
module.exports = mongoose.model('producto', productoschema);
