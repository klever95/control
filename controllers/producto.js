'use strict'
///trabajar con el sistema de ficheros, al memento de subir una imagen 
//y devolver en el momento del api res full
var path = require('path');
var fs = require('fs');
//modulo de paginacion 
var mongoosepaginate = require('mongoose-pagination');
var Producto = require('../models/producto');
var Categoria = require('../models/categoria');
var Marca = require('../models/marca');
var Usuario = require('../models/usuario');
var Cliente = require('../models/cliente');

var Venta = require('../models/venta');
//mostrar producto de la base de datos (metodo buscar)
function getproducto(req, res) {
    var productoid = req.params.id;
    Producto.findById(productoid, (err, producto) => {
        if (err) {
            return res.status(200).send({ message: 'error en la peticion' })
        }
        else {
            if (!producto) {
                return res.status(404).send({ message: 'no existe el producto' })
            }
            else {
                return res.status(200).send({ producto })
            }
        }
    })
}

//sacar todos los productos
// function mostrarProductos(req, res) {
//     var id = req.params.id;
//     var productofind = Producto.find();
//     if (id) productofind = Producto.findById(id);
//     productofind.populate('fk_marca').exec((error, response) => {
//         if (error)
//             return res.status(500).send({ Message: 'Error al ejectuar la peticion', Error: error });
//         if (!response || response.length <= 0)
//             return res.status(404).send({ Message: 'No existen productos en el sistema' });
//         // return res.status(200).send({Message: 'Productos cargados!', producto: response});
//         productofind.populate('fk_categoria').exec((error, response) => {
//             if (error)
//                 return res.status(500).send({ Message: 'Error al ejectuar la peticion', Error: error });
//             if (!response || response.length <= 0)
//                 return res.status(404).send({ Message: 'No existen productos en el sistema' });
//             // return res.status(200).send({ Message: 'Productos cargados!', producto: response });
//             productofind.populate('fk_unidad').exec((error, response) => {
//                 if (error)
//                     return res.status(500).send({ Message: 'Error al ejectuar la peticion', Error: error });
//                 if (!response || response.length <= 0)
//                     return res.status(404).send({ Message: 'No existen productos en el sistema' });
//                 return res.status(200).send({ Message: 'Productos cargados!', producto: response });
//             })
//         })
//     })
// }

function mostrarProductos(req, res) {
    var id = req.params.id;
    var productofind = Producto.find();
    if (id) productofind = Producto.findById(id);
    productofind.populate('fk_marca fk_categoria fk_usuario prod_modificar').exec((error, response) => {
        if (error)
            return res.status(500).send({ Message: 'Error al ejectuar la peticion', Error: error });
        if (!response || response.length <= 0)
            return res.status(404).send({ Message: 'No existen productos en el sistema' });
        return res.status(200).send({ Message: 'Productos cargados!', producto: response });

    })
}
//sacar todas los productos
function mostrarProductos2(req, res) {
    var productoid = req.params.producto;
    if (!productoid) {
        //sacar todas las categorias y se los ordena por el nombre

        var find = Producto.find({}).sort('asc');
    }
    else {
        //sacar la categoria de un producto  de la DB
        //
        var find = Producto.find({ producto: productoid }).sort('-date');
    }
    //popular los datos del producto, en que propiedad se va a cargar
    find.populate({ path: 'producto' }).exec((err, producto) => {
        if (err) {
            return res.status(500).send({ message: 'error en la peticion' });
        }
        else {
            if (!producto) {
                return res.status(404).send({ message: 'no hay Pordcto' });
            }
            else {
                return res.status(200).send({ producto });
            }
        }
    });
}


//guardar productos

function guardarproducto(req, res) {
    //creamos el objeto producto
    var producto = new Producto();
    var params = req.body;
    producto.prod_codigo = params.prod_codigo;
    producto.prod_descripcion = params.prod_descripcion;
    producto.prod_precioCompra = params.prod_precioCompra;
    producto.prod_precioVenta = params.prod_precioVenta;
    producto.prod_fecha = params.prod_fecha;
    producto.prod_fechaActualizacion = params.prod_fechaActualizacion;
    producto.fk_marca = params.fk_marca;
    producto.fk_categoria = params.fk_categoria;
    producto.iva = params.iva;
    producto.fk_usuario = params.fk_usuario;
    // producto.prod_modificar=params.prod_modificar;
    producto.producto=params.producto;
    // producto.fk_descuento=params.fk_descuento;
    if(params.prod_descripcion){
        if (producto.prod_codigo != null
            && producto.prod_descripcion != null) {
            Producto.find({
                $or: [
                    { prod_codigo: params.prod_codigo },
                    { prod_descripcion: params.prod_descripcion }
                ]
            }, (err, resp) => {
                if (err) return res.status(500).send({ message: 'ERROR EN LA PETICION ' + err });
                if (resp.length >= 1) return res.status(404).send({ message: 'EL PRODUCTO ' + params.prod_descripcion + ' Y CODIGO ' + params.prod_codigo + ' YA FUE INGRESADO' });
                if (resp.length == 0) {
                    producto.save((err, productostored) => {
                        if (err) {
                            return res.status(500).send({ message: 'RELLENE TODOS LOS CAMPOS' });
                        }
                        else {
                            if (!productostored) {
                                return res.status(404).send({ message: 'ERROR AL GUARDAR' });
                            }
                            else {
                                return res.status(200).send({ producto: productostored });
                                // return res.status(200).send({ message: 'GUARDADO CORRECTAMENTE', producto:res });
    
                            }
                        }
                    })
                }
            }
    
            )
        }
    }

}

//listado de productos paginada
function mostrarproductopaginado(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    }
    else {
        var page = req.params.page;
    }
    var itemsperpage = 3;
    //saca toda la coleccion de objetos ordenados
    Producto.find().sort('usu_nombre ').paginate(page, itemsperpage,
        function (err, product, total) {
            if (err) {
                return res.status(500).send({ message: 'error al guardar el producto' });
            }
            else {
                if (!product) {
                    return res.status(404).send({ message: 'no hay artistas' });
                }
                else {
                    return res.status(200).send({
                        pages: total,
                        product: product,
                    })
                }
            }
        })
}
//actualizar el producto
function updateproducto(req, res) {
    //guardar el id del producto en la variable productoid
    var productoid = req.params.id;
    //datos por post,datos que se van a actualizar
    //datos que se envien desde el cliente
    var update = req.body

    Producto.findByIdAndUpdate(productoid, update, (err, productoupdate) => {
        //comprueba si hay un error
        if (err) {
            return res.status(500).send({ message: 'error al guardar el producto' });
        }
        else {
            if (!productoupdate) {
                return res.status(404).send({ message: 'el producto no ha sido acutalizado' });
            }
            else {
                return res.status(200).send({ product: productoupdate });
            }
        }
    })
}

//metodo para eliminar
function deleteproducto(req, res) {
    var deletepro = req.params.id;
    Producto.findByIdAndRemove(deletepro, (err, productodel) => {
        if (err) {
            return res.status(404).send({ message: 'error al eliminar el producto' });
        }
        else {
            if (!productodel) {
                return res.status(404).send({ message: 'el producto ha sido eliminado' });
            }
            else {

                Categoria.find({ categoria: productodel._id }).remove((err, categoriaRemove) => {
                    if (err) {
                        return res.status(404).send({ message: 'error al eliminar el categoria' });
                    }
                    else {
                        if (!categoriaRemove) {
                            return res.status(404).send({ message: 'la marca ha sido eliminado' });
                        }
                        else {
                            Marca.find({ marca: productodel._id }).remove((err, marcaRemove) => {
                                if (err) {
                                    return res.status(500).send({ message: 'error en eliminar marca' });

                                }
                                else {
                                    if (!marcaRemove) {
                                        return res.status(404).send({ message: 'ha sido eliminado' });
                                    }
                                    else {
                                        return res.status(200).send({ producto: productodel });
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }

    });

}

//metodo para subir imagen al producto
function uploadimage(req, res) {
    var prodid = req.params.id;
    var file_name = 'no subido..';
    //subida del fichero
    if (req.files) {
        var file_path = req.files.prod_imagen.path;
        //recortar imagen extencion
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        //si el ficho subido tiene la extencion correcta
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            Producto.findByIdAndUpdate(prodid, { prod_imagen: file_name }, (err, prod_update) => {
                if (!prod_update) {
                    return res.status(404).send({ message: 'no se ha podido actualizar el usuario' });
                }
                else {
                    return res.status(404).send({ producto: prod_update });
                }
            })
        }
        else {
            return res.status(200).send({ message: 'Extencion del archivo no valido' });
        }
        // console.log(ext_split)

    }
    else {
        return res.status(200).send({ message: 'no se ha subido la imagen' });
    }
}
//metodo para llamar la imagen del producto
function getimagenfile(req, res) {
    var prod_imagen = req.params.prod_imagen;
    var path_file = './uploads/producto/' + prod_imagen;
    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        }
        else {
            return res.status(200).send({ message: 'no existe la imagen' });
        }
    })
}

function updatePromedioPonderado(req, res) {
    // var id = req.params.id;
    var params = req.body;
    if (!params.id || !params.prod_precioVenta) return res.status(404).send({Message: 'no se recibio en objeto correcto'});
    // console.log(promedioProducto);
    // return res.status(200).send({Message: 'listo para actualizar el producto!', promedio: promedioProducto})
    Producto.findByIdAndUpdate(params.id, {prod_precioVenta: params.prod_precioVenta}, (err, response)=> {
        if (err) return console.log('error', err);
        // return res.status(500).send({Message: 'error al ejecutar la peticion en el servidor', Error: err});
        if (!response) return console.log('no hay respuesta');
        //return res.status(404).send({Message: 'No se pudo actualizar el costo del producto'});
        return console.log('ingreso correcto');
    })
    return res.status(200).send({Message: 'Actualizando el Producto'})
}
//exportat modulos de funciones creadas
module.exports = {
    getproducto,
    guardarproducto,
    mostrarproductopaginado,
    updateproducto,
    deleteproducto,
    uploadimage,
    getimagenfile,
    mostrarProductos,
    updatePromedioPonderado
}

