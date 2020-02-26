'use strict'

var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var numeroSchema = Schema({
    num_desde:Number,
    num_hasta:Number,
    num_autorizacion:Number,
    num_ambiente:String,
    num_emision:String,
    num_clave:Number,
    num_fecha:String,
    fk_usuario: {type:Schema.ObjectId, ref: 'usuario'},
    num_fechaActualizacion:String,
    num_modificado: {type:Schema.ObjectId, ref: 'usuario'},
});

module.exports=mongoose.model('numero-ventas',numeroSchema)