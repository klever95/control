'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var marcaschema = Schema({
     
     marca_codigo:String,
     marca_descripcion:String,
     marca_fecha:String,
     marca_fechaActualizacion:String,
     marca_modificado:{ type: Schema.ObjectId , ref: 'usuario' },
     fk_usuario: { type: Schema.ObjectId , ref: 'usuario' },

});

module.exports=mongoose.model('marca',marcaschema)