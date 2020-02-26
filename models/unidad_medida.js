'use strict'

var mongosse=require('mongoose');
var Schema =mongosse.Schema;

var unidadSchema =Schema({
    um_codigo:String,
    um_descripcion:String,
    um_fecha:String,
    um_fechaActualizacion:String,

})

module.exports=mongosse.model('unidad',unidadSchema);