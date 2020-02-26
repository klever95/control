'use strict'
///trabajar con el sistema de ficheros, al memento de subir una imagen 
//y devolver en el momento del api res full
var path = require('path');
var fs = require('fs');

//modulo de paginacion 

var mongoosepaginate = require('mongoose-pagination');
var Marca = require('../models/marca');

//guardar marca
function guardarMarca(req, res) {
    var marca = new Marca();
    var params = req.body;

    marca.marca_codigo = params.marca_codigo;
    marca.marca_descripcion = params.marca_descripcion;
    marca.marca_fecha = params.marca_fecha;
    marca.marca = params.marca;
    marca.marca_fechaActualizacion=params.marca_fechaActualizacion;
    marca.fk_usuario=params.fk_usuario;
    // marca.marca_modificado=params.marca_modificado;
    if(!params.marca_codigo || params.marca_codigo==null || params.marca_codigo==undefined|| params.marca_codigo==''){
        marca.marca_codigo=0;
    }
if(params.marca_descripcion)
{
    if(marca.marca_descripcion !=null){
        Marca.find({
            $or:[
                {marca_descripcion:params.marca_descripcion},
            ]
        },(err,resp)=>{
            if(err) return res.status(500)({message:'ERROR EN LA PETICION '+err});
            if(resp.length>=1) return res.status(500).send({message:'LA MARCA :'+params.marca_descripcion+'YA HA SIDO INGRESADA!'})

            if(resp.length==0){
                marca.save((err, marcastored) => {
                    if (err) {
                        return res.status(500).send({ message: 'ERROR EN EL SERVIDOR' });
                    }
                    else {
                        if (!marcastored) {
                            return res.status(404).send({ message: 'ERROR AL GUARDAR LA MARCA' });
                        }
                        else {
                            return res.status(200).send({ marca: marcastored });
                        }
                    }
                })


            }
            else
            {
                return res.status(500).send({message:'INGRESE UN VALOR'});
            }
        }
        )
    }
}
   
}
//mostrar todas las marcas
function mostrarMarca(req, res) {
    var id = req.params.id;
    var marcaid = Marca.find();
    if (id) marcaid = Marca.findById(id);
    marcaid.populate('fk_usuario marca_modificado').exec((error, response) => {
        if (error)
            return res.status(500).send({ Message: 'ERROR EN EL SERVIDOR', Error: error });
        if (!response || response.length <= 0)
            return res.status(404).send({ Message: 'NO SE PUEDE MOSTRAR' });
        return res.status(200).send({ marca: response});
    })
}

// function mostrarMarca(req, res) {
//     var marcaid = req.params.marca;
//     if (marcaid) {
//         var find = Marca.find({});
//     }
//     else {
//         var find = Marca.find({ marca: marcaid });
//     }
//     find.populate({ path: 'marca' }).exec((err, marca) => {
//         if (err) {
//             return res.status(500).send({ message: 'ERROR EN LA PETICION' });
//         }
//         else {
//             if (!marca) {
//                 return res.status(404).send({ message: 'ERROR AL MOSTRAR LA MARCA' });
//             }
//             else {
//                 return res.status(200).send({ marca });
//             }
//         }
//     })
// }

//borrar marca
function deleteMarca(req, res) {
    var deletemarca = req.params.id;
    Marca.findByIdAndRemove(deletemarca, (err, marcadelete) => {
        if (err) {
            return res.status(404).send({ message: 'ERROR AL ELIMINAR' });

        }
        else {
            if (!marcadelete) {
                return res.status(404).send({ message: 'ELIMINADO CON EXITO' });

            }
            else {
                return res.status(200).send({ marca: marcadelete })
            }

        }
    }
    )
}
//actualizar marca
function updateMarca(req, res) {
    var marcaid = req.params.id;
    var update = req.body;
    // update.marca_modificado = req.usu._i;
    Marca.findByIdAndUpdate(marcaid, update, (err, marcaUpdate) => {
        if (err) {
            return res.status(500).send({ message: 'ERROR AL ACTUALIZAR' });
        }
        else {
            if (!marcaUpdate) {
                return res.status(404).send({ message: 'ACTUALIZADO CON EXITO' });
            }
            else {
                return res.status(200).send({ marca: marcaUpdate });
            }
        }
    })
}

//mostrar producto a traves del id
function getMarca(req, res) {
    var marcaid = req.params.id;

    Marca.findById(marcaid, (err, marca) => {
        if (err) {
            return res.status(500).send({ message: 'ERROR EN LA PETICION' });
        }
        else {
            if (!marca) {
                return res.status(404).send({ message: 'ERROR AL MOSTRA MARCA' });
            }
            else {
                return res.status(200).send({ marca });
            }
        } 
    })
}
module.exports = {
    guardarMarca,
    mostrarMarca,
    deleteMarca,
    updateMarca,
    getMarca,
}