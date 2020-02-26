'use strict'

//definir variables
var mongoose =require('mongoose');

//modelo, permite crear un objeto de tipo esquema,guardar en una coleccion concreta dentro de la coleccion
var Schema = mongoose.Schema;
//crear un schema para usuario
var usuario_esquema = Schema({
    usu_usuario:String,
    usu_cedula:String,
    usu_nombre:String,
    usu_apellido:String,
    usu_telefono:String,
    usu_celular:String,
    usu_email:String,
    usu_direccion:String,
    usu_sexo:String,
    usu_imagen:String,
    usu_rol:String,
    usu_contrasena:String,
    usu_fecha:String,
});
//exportar el modulo
//cuando utilicemos el usuarequema vamos a tener un objeto el cual se pueda instancio y acepte valores
//en la base de dato
//guarda en una cole
module.exports = mongoose.model('usuario', usuario_esquema);