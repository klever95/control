'use strict'
//acceder a rutas concretas
var path = require('path');
//sistema de ficheros
var fs = require('fs');
//req lo que va a recibir en la peticion 
//res las que va a devolver
var bcrypt = require('bcrypt-nodejs');
var Usuario = require('../models/usuario'); //agregar la libreria de modulos para enviar datos a la DB
var jwt = require('../services/jwt');//cargar authorization


function pruebas(req, res) {
    return res.status(200).send({
        message: 'prueba de una accion del controlador de usuario de api ress node y mongo'
    });
}


//FUNCION PARA REGITRAR EL USUARIO
function guardarusuario(req, res) {

    var usuario = new Usuario();

    var params = req.body;//recoje todas las variables que lleguen por POST

    console.log(params);//muestra lo que llega a travez de la peticion
    usuario.usu_usuario = params.usu_usuario;
    usuario.usu_cedula = params.usu_cedula;
    usuario.usu_nombre = params.usu_nombre;
    usuario.usu_apellido = params.usu_apellido;
    usuario.usu_telefono = params.usu_telefono;
    usuario.usu_email=params.usu_email;
    usuario.usu_celular = params.usu_celular;
    usuario.usu_direccion = params.usu_direccion;
    usuario.usu_telefono = params.usu_telefono;
    usuario.usu_sexo = params.usu_sexo;
    usuario.usu_imagen = '';
    usuario.usu_rol = 'ROL_USUARIO';
    usuario.usu_contrasena = params.usu_contrasena;
    usuario.usu_fecha = params.usu_fecha;
    if (params.usu_contrasena) {
        bcrypt.hash(params.usu_contrasena, null, null, function (err, hash) {
            usuario.usu_contrasena = hash;
            if (usuario.usu_nombre != null && usuario.usu_apellido != null && usuario.usu_cedula != null && usuario.usu_usuario != null) {
                //guarde el usuario en la base de datos
                Usuario.find({
                    $or: [
                        { usu_usuario: params.usu_usuario },
                        { usu_cedula: params.usu_cedula },
                        { usu_nombre: params.usu_nombre },
                        { usu_apellido: params.usu_apellido},
                    ]
                }, (err, resp) => {
                    if (err) return res.status(500).send({ Message: 'ERROR EN EJECUTAR LA PETICION ..... ERROR: ' + err });
                    if (resp.length >= 1) return res.status(500).send({ message: 'EL USUARIO: ' + params.usu_usuario+ '. YA HA SIDO INGRESADO' })
                    
                    if (resp.length == 0) {
                        usuario.save((err, userStored) => {
                            if (err) {
                                return res.status(500).send({ message: 'ERROR AL GUARDAR EL USUARIO' });
                            }
                            else {
                                if (!userStored) {
                                    return res.status(404).send({ message: 'NO SE HA REGISTRADO EL USUARIO' });
                                }
                                else {
                                    return res.status(200).send({ usuario: userStored });//devuelve un objeto con la propiedad user y el usuario
                                }

                            }
                            
                        }
                        );
                        
                    }
                    else {
                        return res.status(500).send({ message: 'RELLENE TODOS LOS CAMPOS' });
                    }
                })

            }
           
        }
        )

    }
    else {
        return res.status(500).send({ message: 'INTRODUZCA LA CONTRASEÑA' })
    }
}
//guardar los datos en la base de datos a travez de la coneccion generada

//LOGIN
//recoge parametros que llegan a traves de 
//si el usuaario existe y sea correcto entrara correctamente 
function loginusuario(req, res) {
    var params = req.body;
    var usu_usuario = params.usu_usuario;
    var usu_contrasena = params.usu_contrasena;

    Usuario.findOne({ usu_usuario: usu_usuario }, (err, usuario) => {
        if (err) {
            return res.status(500).send({ message: 'ERROR EN LA PETICION ' })
        }
        else {
            if (!usuario) {
                return res.status(404).send({ message: 'EL USUARIO : ' + usu_usuario +'  NO EXISTE!'})
            }
            else {
                //comprobar la contrase;a
                bcrypt.compare(usu_contrasena, usuario.usu_contrasena, function (err, check) {
                    if (check) {
                        //devolver los deatos del usuario logueado  
                        if (params.gethash) {
                            //devolver un token de jwt
                            return res.status(200).send({ token: jwt.createToken(usuario) })
                        }
                        else {
                            return res.status(200).send({ usuario });
                        }
                    }
                    else {
                        return res.status(404).send({ message: 'ERROR...... LA CONTRASEÑA ************* NO COINCIDE, INTENTE DE NUEVO O CONTACTE CON EL ADMINISTRADOR!' });
                    }
                });
            }
        }
    });
}
//actualizar los datos del usuario 
function actualizarusuario(req, res) {
    var usuarioid = req.params.id;
    var update = req.body;
    //user id sea igual al usu que hay guardado en el token para que los usuario sean lo smismo
    //si es diferente no se actualiza
    if (usuarioid == req.usu.id) {
        return res.status(500).send({ message: 'no tienes permisos para actualizar este usuario' });

    }
    Usuario.findByIdAndUpdate(usuarioid, update, (err, usuarioactualizar) => {
        if (err) {
            return res.status(500).send({ message: "error al actualizar el usuario" });
        }
        else {
            if (!usuarioactualizar) {
                return res.status(404).send({ message: 'no se ha podido actualizar el usuario' });
            }
            else {
                return res.status(200).send({ usuario: usuarioactualizar });
            }
        }
    })
}
//cargar imagen en el usuario
function uploadimageUsuario(req, res) {
    var uuuu = req.params.id;
    var file_name = 'no subido..';
    // subida del fichero
    if (req.files) {
        var file_path = req.files.usu_imagen.path;
        //recortar imagen extencion
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        //si el ficho subido tiene la extencion correcta
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            Usuario.findByIdAndUpdate(uuuu, { usu_imagen: file_name }, (err, userUpdated) => {
                if (!userUpdated) {
                    return res.status(404).send({ message: 'no se ha podido actualizar el usuario' });
                }
                else {
                    return res.status(200).send({ usu_imagen: file_name, usuario: userUpdated });
                }
            })
        }
        else {
            return res.status(200).send({ message: 'Extencion del archivo no valido' });
        }
        console.log(ext_split)

    }
    else {
        return res.status(200).send({ message: 'no se ha subido la imagen' });
    }
}
function uploadimageUsuario2(req, res) {
    var usuario = req.params.id;
    console.log(usuario);
    console.log(req.files);
    
    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var ext_split = file_name.split('/.');
        var file_ext = ext_split[1];
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            Usuario.findByIdAndUpdate(usuario, { image: file_name }, {new: true}, (err, userUpdated) => {
                if (err) return res.status(500).send({Message: 'No se pudo subir la imagen del Usuario', Error: err}); console.log(err);
                if (!userUpdated) return res.status(404).send({ message: 'no se ha podido actualizar el usuario' });
                else return res.status(200).send({ image: file_name, usuario: userUpdated });
            })
        }
        else {
            return removeFilesOfUpload(res, file_path, 'Ups!, Algo va mal, no se ha podido subir el archivo. Extension no valida.');
        }
        console.log(ext_split)

    }
    else {
        return res.status(200).send({ message: 'no se ha subido la imagen' });
    }
}
function removeFilesOfUpload(res, file_path, message) {
    fs.unlink(path, (err) => {
        console.log(err);
        return res.status(200).send({message})
    });
}
//metodo para llamar la imagen del usuario
function getimagenfile(req, res) {
    var usu_imagen = req.params.usu_imagen;
    var path_file = './uploads/usuario/' + usu_imagen;
    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        }
        else {
            return res.status(200).send({ message: 'no existe la imagen' });
        }
    })
}
//mostrua usuarios
//sacar todas los productos
function mostrarUsuarios(req, res) {
    var usuarioid = req.params.usuario;
    if (!usuarioid) {
        //sacar todas las categorias y se los ordena por el nombre

        var find = Usuario.find({});
    }
    else {
        //sacar la categoria de un producto  de la DB
        //
        var find = Usuario.find({ usuario: usuarioid });
    }
    //popular los datos del producto, en que propiedad se va a cargar
    find.populate({ path: 'producto' }).exec((err, usuario) => {
        if (err) {
            return res.status(500).send({ message: 'error en la peticion' });
        }
        else {
            if (!usuario) {
                return res.status(404).send({ message: 'no hay usuario' });
            }
            else {
                return res.status(200).send({ usuario });
            }
        }
    });
}

function updateUsuario(req,res) {
    var usuarioid = req.params.id;
    var update = req.body;
    console.log(update);
    
    if (usuarioid == req.usu.id) {
        return res.status(500).send({ message: 'no tienes permisos para actualizar este usuario' });

    }
    Usuario.findByIdAndUpdate(usuarioid, update, (err, usuarioUpdate) => {
        if (err) {
            return res.status(500).send({ message: 'ERROR EN EL SERVIDOR' });
        }
        else {
            if (!usuarioUpdate) {
                return res.status(404).send({ message: 'ERROR AL ACTUALIZAR' });
            } else {
                return res.status(200).send({ usuario: usuarioUpdate });
                // return res.status(200).send({ message: 'Actualizado correctamente' });
                
            }
        }
    });
}
function getUsuario(req,res) {
    var usuarioId = req.params.id;

    Usuario.findById(usuarioId, (err, usuario) => {
        if (err) {
            return res.status(500).send({ message: 'ERROR EN EL SERVIDOR' });
        }
        else {
            if (!usuario) {
                return res.status(404).send({ message: 'ERROR AL MOSTRAR EL PROVEEDOR' });
            } else {
                return res.status(200).send({ usuario });
            }
        }
    })
}

function comprarContrase(req, res){
    var id = req.params.id;
    var contrase = req.body.contrase;
    Usuario.findById(id, (err, response) => {
        if (err) return res.status(500).send({Message: 'error al ejecutar la peticion en el servidor'})
        if (!response) return res.status(404).send({Message: 'No se pudo identificar el usuario'});
        bcrypt.compare(contrase, response.usu_contrasena, function (err, check) {           
            if (check) {
                return res.status(200).send({Message: 'Contraseña Correcta!', check});
            }
            else {
                return res.status(404).send({ message: 'contraseña incorrecta!' });
            }
        });
    })
}
function cambiarContrase(req, res){
    var id = req.params.id;
    var contrase = req.body;
    Usuario.findById(id, (err, response) => {
        if (err) return res.status(500).send({Message: 'error al ejecutar la peticion en el servidor'})
        if (!response) return res.status(404).send({Message: 'No se pudo identificar el usuario'});
        bcrypt.hash(contrase.usu_contrasena, null, null, function (err, hash) {
            if (hash) {
                var usu_contrasena = hash;
                Usuario.findByIdAndUpdate(id, {usu_contrasena: usu_contrasena}, (err, response) => {
                    if (err) return res.status(500).send({Message: 'Error al ejecutar la peticion en el servidor', Error: err});
                    if (!response) return res.status(404).send({Message: 'No se pudo editar la contraseña..'});
                    return res.status(200).send({Message: 'Contraseña editada de forma Exitosa!', usuario: response});
                })
            }
            else {
                return res.status(404).send({ message: 'contraseña incorrecta!' });
            }
        });
    })
}



module.exports = {
    pruebas,
    guardarusuario,
    loginusuario,
    actualizarusuario,
    uploadimageUsuario,
    getimagenfile,
    mostrarUsuarios,
    uploadimageUsuario2,
    updateUsuario,
    getUsuario,
    comprarContrase,
    cambiarContrase,
}; 
