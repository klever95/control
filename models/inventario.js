'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Inventario = Schema({
    inv_descripcion     : String,
    inv_cantidad        : Number,
    inv_promedio        : Number,
    inv_fecha           : String,
    inv_total           : Number,
    fk_producto         : {type: Schema.ObjectId, ref: 'producto' }
});
module.exports= mongoose.model('Inventario', Inventario)