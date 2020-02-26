'use strict'

var jwt=require('jwt-simple');
var moment=require('moment');
var secret='clave_secreta';

exports.createToken = function(usuario){
    var payload={ // datos que se van a codificar
        usu_id:usuario._id,
        usu_cedula:usuario.usu_cedula,
        usu_nombre:usuario.usu_nombre,
        usu_apellido:usuario.usu_apellido,
        usu_direccion:usuario.usu_direccion,
        usu_telefono:usuario.usu_telefono,
        usu_sexo:usuario.usu_telefono,
        usu_imagen:usuario.usu_imagen,
        usu_contrasena:usuario.usu_contrasena,
        iat:moment().unix(),
        exp:moment().add(30,'days').unix
    };

    //devolver el token codificado 
    return jwt.encode(payload, secret);

};
