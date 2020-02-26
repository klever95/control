'use strict'
///trabajar con el sistema de ficheros, al memento de subir una imagen 
//y devolver en el momento del api res full
var path = require('path');
var fs = require('fs');
//modulo de paginacion 
var mongoosepaginate = require('mongoose-pagination');
var Producto = require('../models/producto');
var Categoria = require('../models/categoria');
var Venta = require('../models/venta');
//mostrar producto de la base de datos (metodo buscar)
//ex traer producto de la base de datis guardada FUNCION NORMAL
//prueba de devolver parametros
function getcategoriaUnId(req, res) {
    var categoriaid = req.params.id;
    //conseguir todos los datos de categoria que s eencuentren asociados
    //con la clave foranea
    Categoria.findById(categoriaid, (err, categoria) => {
        if (err) {
            return res.status(200).send({ message: 'error en la peticion' })
        }
        else {
            if (!categoria) {
                return res.status(404).send({ message: 'no existe el producto' })
            }
            else {
                return res.status(200).send({ categoria })
            }
        }
    })

}

//FUNCION EXTRAER DATOS CON LOS ID ASOCIADOS DE LA BASE DE DATOS
function getcategoria(req, res) {
    var categoriaid = req.params.id;
    //populate devuelve toda la cadena de caracteres que se encuentran 
    //asociado con la clave de producto
    Categoria.findById(categoriaid).populate({ path: 'producto' }).exec((err, categoria) => {
        if (err) {
            return res.status(500).send({ message: 'error en la peticion' });
        }
        else {
            if (!categoria) {
                return res.status(404).send({ message: 'la categoria no existe' });
            }
            else {
                return res.status(200).send({ categoria })
            }
        }
    })
}
//guardar categoria
function guardarcategoria(req, res) {
    var categoria = new Categoria();
    var params = req.body;

    categoria.cat_nombre = params.cat_nombre;
    categoria.cat_descripcion = params.cat_descripcion;
    categoria.cat_fecha = params.cat_fecha;
    categoria.fk_usuario = params.fk_usuario;
    categoria.cat_fechaActualizacion = params.cat_fechaActualizacion;
    categoria.categoria = params.categoria;
    //categoria.cat_modificar = "";
    if(!params.cat_nombre || params.cat_nombre==null || params.cat_nombre==undefined|| params.cat_nombre==''){
        categoria.cat_nombre=0;
    }
    if(params.cat_descripcion){

    if (categoria.cat_descripcion != null
        && categoria.cat_nombre != null
    ) {
        Categoria.find({
            $or: [
                { cat_descripcion: params.cat_descripcion },
                { cat_nombre: params.cat_nombre }
            ]
        }, (err, resp) => {
            if (err) return res.status(500)({ message: 'error en la peticion' + err });
            if (resp.length >= 1) return res.status(404).send({ message: 'Error  ' + params.cat_descripcion + ' ya ingresado!..' })
            if (resp.length == 0) {
                categoria.save((err, categoriastored) => {
                    if (err) {
                        return res.status(500).send({ message: 'error en el servidor' });
                    }
                    else {
                        if (!categoriastored) {
                            return res.status(404).send({ message: 'error en guardar la categoria' });
                        }
                        else {
                            // return res.status(404).send({ message: 'La Categoria '+ params.cat_descripcion+' se ha registrado correctamente!..' });

                            return res.status(200).send({ categoria: categoriastored });
                        }
                    }
                })
            }
        }
        )
    }
    }


}
//sacar todas las categorias
function mostrarcategorias(req, res) {
    var id = req.params.id;
    var productoid = Categoria.find();
    if (id) productoid = Categoria.findById(id);
    productoid.populate('fk_usuario cat_modificar').exec((error, response) => {
        if (error)
            return res.status(500).send({ Message: 'Error al ejectuar la peticion', Error: error });
        if (!response || response.length <= 0)
            return res.status(404).send({ Message: 'No existen categorias en el sistema' });
        return res.status(200).send({ Message: 'Categorias cargados!', categoria: response });
    })
}


// function mostrarcategorias(req, res) {
//     var productoid = req.params.producto;
//     if (!productoid) {
//         var find = Categoria.find({}).sort('asc');
//     }
//     else {
//         var find = Categoria.find({ producto: productoid }).sort('-date');
//     }
//     find.populate({ path: 'producto' }).exec((err, categoria) => {
//         if (err) {
//             return res.status(500).send({ message: 'error en la peticion' });
//         }
//         else {
//             if (!categoria) {
//                 return res.status(404).send({ message: 'no hay categoria' });
//             }
//             else {
//                 return res.status(200).send({ categoria });
//             }
//         }
//     });
// }

//actualizar una categoria

function updatecategoria(req, res) {
    var categoriaid = req.params.id;
    var update = req.body;
    //actualizar los datos de un documentos de la base de datos tipo categoria cuyo id
    //sea el que nos llega por parametros(categoriaid) de a url y que actualice con los datos que tiene guardado en la DB(update)
    Categoria.findByIdAndUpdate(categoriaid, update, (err, categoriaupdate) => {
        if (err) {
            return res.status(500).send({ message: 'error en el servidor' });
        }
        else {
            if (!categoriaupdate) {
                return res.status(404).send('no se puedad actualizar la categoria');
            }
            else {
                return res.status(200).send({ categoria: categoriaupdate });
            }
        }
    })
}

function deletecategoria(req, res) {
    var deletecat = req.params.id;
    Categoria.findByIdAndRemove(deletecat, (err, categoriaremoved) => {
        if (err) {
            return res.status(500).send({ message: 'error al eliminar la categoria' });
        }
        else {
            if (!categoriaremoved) {
                return res.status(200).send({ message: 'la categoria no ha sido eliminada' });
            }
            else {
                Producto.find({ categoria: categoriaremoved._id }).remove((err, productoremove) => {
                    if (err) {
                        req.status(500).send({ message: 'error al eliminar el producto' });
                    }
                    else {
                        if (!productoremove) {
                            res.send(404).send({ message: 'el producto no ha sido eliminado' });
                        } else {
                            return res.status(200).send({ categoria: categoriaremoved });
                        }
                    }
                })
            }
        }
    })
}


module.exports = {
    getcategoria,
    guardarcategoria,
    mostrarcategorias,
    updatecategoria,
    deletecategoria,
    getcategoriaUnId
}

