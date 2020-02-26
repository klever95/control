'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoriaschema = Schema({
    //cat_numero:String,
    cat_nombre: String,
    cat_descripcion: String,
    cat_fecha: String,
    cat_fechaActualizacion: String,
    cat_modificar: { type: Schema.ObjectId, ref: 'usuario' },
    fk_usuario: { type: Schema.ObjectId, ref: 'usuario' },

    // producto:{type:Schema.ObjectId, ref:'producto'}//relacion de categoria con productos
});
//envie datos de la coleccion de objetos llamda categoria 
module.exports = mongoose.model('categoria', categoriaschema)