'usu strinct'

var path = require('path');
var fs = require('fs');
//modulo de paginacion 
var mongoosepaginate = require('mongoose-pagination');
var Producto = require('../models/producto');
var Categoria = require('../models/categoria');
var Venta = require('../models/venta');

//probar si el controlador y las rutas funcionen correctamente
//mostrar datos con un solo id de forma anidad con foranea al usuario
function getventas(req, res) {
    var ventaid = req.params.id;
    Venta.findById(ventaid).populate({ path: 'usuario' }).exec((err, venta) => {
        if (err) {
            return res.status(500).send({ message: 'error en la peticion' });
        }
        else {
            if (!venta) {
                return res.status(404).send({ message: 'la venta no existe' });
            }
            else {
                return res.status(200).send({ venta });
            }
        }
    })
}

function guardarventa(req, res) {
    //crear un objeto que almacenes las variables de la clase Categoria que se encuentran en la base de datos
    var venta = new Venta();
    //agarro los parametro que envia el body
    var params = req.body;
    venta.ven_codigo        =params.ven_codigo
    venta.ven_fecha_venta   =params.ven_fecha_venta
    venta.ven_total         =params.ven_total
    venta.ven_subtotal      =params.ven_subtotal
    venta.ven_iva           =params.ven_iva
    venta.ven_Siniva        =params.ven_Siniva
    venta.ven_descuento     =params.ven_descuento
    venta.ven_Totaldescuento=params.ven_Totaldescuento
    venta.ven_efectivo      =params.ven_efectivo
    venta.ven_cambio        =params.ven_cambio
    venta.fk_cliente        =params.fk_cliente
    venta.fk_usuario        =params.fk_usuario
    venta.fk_producto       =params.fk_producto
    venta.fk_ivas           =params.fk_ivas
    venta.fk_configuracion  =params.fk_configuracion
    venta.fk_numero         =params.fk_numero
    venta.ven_ice           =params.ven_ice
    venta.ven_subtotalIva   =params.ven_subtotalIva
    venta.ven_subtotalCero  =params.ven_subtotalCero
        
    // venta.fk_cliente = params.fk_cliente;
    // venta.fk_ivas = params.fk_ivas
    // venta.fk_usuario = params.fk_usuario;
    // venta.ven_cambio = params.ven_cambio;   
    // venta.ven_codigo = params.ven_codigo;
    // venta.ven_efectivo = params.ven_efectivo;
    // venta.ven_fecha_venta = params.ven_fecha_venta;
    // venta.ven_iva = params.ven_iva;
    // venta.ven_total = params.ven_total;
    // venta.ven_Siniva = params.ven_Siniva;
    // venta.ven_subtotal = params.ven_subtotal;
    // venta.ven_descuento = params.ven_descuento;
    // venta.ven_ice=params.ven_ice;
    // venta.ven_subtotalIva=params.ven_subtotalIva;
    // venta.ven_subtotalCero=params.ven_subtotalCero;
    venta.save((err, ventastored) => {
        if (err) {
            return res.status(500).send({ message: 'error en el servidor' , error: err});
        }
        else {
            if (!ventastored) {
                return res.status(404).send({ message: 'error en guardar la venta' });
            }
            else {
                return res.status(200).send({ venta: ventastored });
            }
        }
    })

}

//mostrar toda clase de ventas que se encuentren en la base de datos
function mostrarventas(req, res) {
    var id = req.params.id;
    var productofind = Venta.find();
    if (id) productofind = Venta.findById(id);
    productofind.populate('fk_producto fk_ivas ').exec((error, response) => {
        if (error)
            return res.status(500).send({ Message: 'Error al ejectuar la peticion', Error: error });
        if (!response || response.length <= 0)
            return res.status(404).send({ Message: 'No existen productos en el sistema' });
        // return res.status(200).send({Message: 'Productos cargados!', producto: response});
        productofind.populate('fk_cliente').exec((error, response) => {
            if (error)
                return res.status(500).send({ Message: 'Error al ejectuar la peticion', Error: error });
            if (!response || response.length <= 0)
                return res.status(404).send({ Message: 'No existen productos en el sistema' });
            // return res.status(200).send({ Message: 'Productos cargados!', producto: response });
            productofind.populate('fk_usuario').exec((error, response) => {
                if (error)
                    return res.status(500).send({ Message: 'Error al ejectuar la peticion', Error: error });
                if (!response || response.length <= 0)
                    return res.status(404).send({ Message: 'No existen productos en el sistema' });
                return res.status(200).send({ Message: 'Productos cargados!', venta: response });
            })
        })
    })
}


function updateventa(req, res) {
    var ventaid = req.params.id;
    var update = req.body;

    Venta.findByIdAndUpdate(ventaid, update, (err, ventaupdate) => {
        if (err) {
            return res.status(500).send({ message: 'error en el servidor' });
        }
        else {
            if (!ventaupdate) {
                return res.status(404).send({ message: 'no se actualizo la venta' });
            }
            else {
                return res.status(200).send({ venta: ventaupdate, message: 'venta actualizada' });
            }
        }
    })
}
function deleteventa(req, res) {
    var deleteventa = req.params.id;

    Venta.findByIdAndRemove(deleteventa, (err, ventadelete) => {
        if (err) {
            return res.status(404).send({ message: 'error al eliminar el producto' });
        }
        else {
            if (!ventadelete) {
                return res.status(404).send({ message: 'el producto ha sido eliminado' });
            }
            else {
                Usuario.find({ usuario: productodel._id }).remove((err, usuarioRemove) => {
                    if (err) {
                        return res.status(404).send({ message: 'error al eliminar el categoria' });
                    }
                    else {
                        if (!usuarioRemove) {
                            return res.status(404).send({ message: 'la marca ha sido eliminado' });
                        }
                        else {
                            Cliente.find({ cliente: productodel._id }).remove((err, clienteRemove) => {
                                if (err) {
                                    return res.status(500).send({ message: 'error en eliminar marca' });

                                }
                                else {
                                    if (!clienteRemove) {
                                        return res.status(404).send({ message: 'ha sido eliminado' });
                                    }
                                    else {
                                        //return res.status(200).send({venta:productodel});
                                        Producto.find({ producto: productodel._id }).remove((err, productoRemove) => {
                                            if (err) {
                                                return res.status(500).send({ message: 'error en eliminar marca' });

                                            }
                                            else {
                                                if (!productoRemove) {
                                                    return res.status(404).send({ message: 'ha sido eliminado' });
                                                }
                                                else {
                                                    return res.status(200).send({ venta: productodel });
                                                }
                                            }
                                        })
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
function numeros(req, res) {
    Venta.find({}, {_id: 0, ven_codigo: 1}, (error, response) => {
        if (error) return res.status(500).send({Message: 'Error al contactar con al base de datos', Error: error});
        if (!response) return res.status(404).send({Message:'Error al devolver los datos'});
        if (response && response.length <=0) return res.status(200).send({Message: 'Aun no existen facturas ingresadas'});
        return res.status(200).send({Message: 'Exito al cargar los numeros de las facturas', numeros: response});
    } )
}
module.exports = {
    getventas,
    guardarventa,
    mostrarventas,
    updateventa,
    deleteventa,
    numeros
}