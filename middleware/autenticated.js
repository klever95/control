'use strict'

var jwt=require('jwt-simple');
var moment=require('moment');
var secret='clave_secreta';
//recibe valores que 
exports.ensureAuth = function (req, res, next){
    if(!req.headers.authorization)
    {
        return res.status(403).send({message: 'la peticion no tiene la cabecera de autenticacion' });
    }
    var token= req.headers.authorization.replace(/['"]+/g, '')
    //capturar el error a la hora de decodificar el token
    try{
        //decodifica el token  que llega desde la peticion y lo devuelve por payload
        var payload=jwt.decode(token, secret);
        if(payload.exp<= moment().unix())
        {
            return res.status(404).send({message: 'token ha expirado' });
        }
    }catch(ex){
        //console.log(ex);
        //no deja que se identifique el usuario ni que van ni ejecuta la ruta que quiera cargar
        return res.status(404).send({message: 'Token no es valido' });
    }
    req.usu = payload;
    next();

};
