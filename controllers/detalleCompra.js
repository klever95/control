'use strict'
///trabajar con el sistema de ficheros, al memento de subir una imagen 
//y devolver en el momento del api res full
var DetalleCompra = require('../models/detalleCompra');
var Producto = require('../models/producto');
var Kardex = require('../models/kardex');
var Compra = require('../models/compra');

function guardarDetalleCompra(req, res) {
    var detalle = new DetalleCompra();
    var kardex = new Kardex();
    var params = req.body;


    detalle.det_detalle = params.det_detalle;
    detalle.det_fecha = params.det_fecha;
    detalle.fk_producto = params.fk_producto;
    detalle.fk_compra = params.fk_compra;
    detalle.det_fecha = params.det_fecha;
    detalle.det_stockIng = params.det_stockIng;
    detalle.det_stockSig = params.det_stockSig;
    detalle.det_cajas = params.det_cajas;
    detalle.det_unidadesCaja = params.det_unidadesCaja;
    detalle.det_precioCaja = params.det_precioCaja;
    detalle.det_subtotal = params.det_subtotal;
    detalle.det_total = params.det_total;
    detalle.det_iva = params.det_iva;
    detalle.det_precioCompraActual = params.det_precioCompraActual;
    //kardex entrada
    // kardex.kardex_fecha = params.det_fecha;
    // kardex.kardex_detalle = params.det_detalle;
    // kardex.kardex_fk_prod = params.fk_producto;
    // kardex.kardex_valor_unitario = params.det_precioCaja;
    // var valorIngreso = params.det_precioCaja * params.det_stockIng;
    // kardex.kardex_ingreso = {
    //     ingreso_cantidad: params.det_stockIng,
    //     ingreso_valor: valorIngreso,
    // };
    // kardex.kardex_salida = {
    //     salida_cantidad: null,
    //     salida_valor: null,
    // };
    // kardex.kardex_saldos = {
    //     saldo_cantidad: null,
    //     saldo_valor: null,
    // }
    // kardex.kadex_promedio       =params.

    var detalleMessage;
    detalle.save((err, response) => {
        if (err) {
            detalleMessage = { Message: 'Error al ejecutar la peticion', Error: err };
            return console.error('Error al ejecutar la peticion', err);
        }
        if (!response || response.length <= 0) {
            detalleMessage = { Message: 'No se pudo ingresar' };
            return console.info('No existe');
        }
        if (response) {
            detalleMessage = { Message: 'Datos Guardados' };
            var id = response.fk_producto;
            Producto.findById(id, (err, responseProducto) => {
                if (responseProducto) {
                    var stockSig = params.det_stockIng + responseProducto.prod_stock;
                    Producto.findByIdAndUpdate(responseProducto._id, { prod_stock: stockSig }, { new: true }, (err, responseStock) => {
                        if (responseStock) return console.log('guardado?');
                        // kardex.save((errKardex, responseKardex) => {
                        //     console.log('guardar kardex');
                        //     if (errKardex) return console.log(errKardex);
                        //     if (!responseKardex) return console.log(kardex);
                        //     return console.log(responseKardex);
                        // })
                    })
                }
            })
            return console.log('Datos Guardados');
        }

    });

    return res.status(201).send({ Message: detalleMessage });
}

function mostrarDetalleCompra(req, res) {
    var id = req.params.id;
    var detallefind = DetalleCompra.find();
    if (id) detallefind = DetalleCompra.findById(id);
    detallefind.populate('fk_compra fk_producto ').exec((error, response) => {
        if (error)
            return res.status(500).send({ Message: 'Error al ejectuar la peticion', Error: error });
        if (!response || response.length <= 0)
            return res.status(404).send({ Message: 'No existen detalle compra en el sistema' });
        return res.status(200).send({ Message: 'detalle compra cargados!', detallecompra: response });
    })
}


//muestra todos los detalles de las compras que esten asociadas con el id de la comra correspondiente
function compraDetalle(req, res) {
    var id = req.params.id;
    if (id) {
        var find = DetalleCompra.find({ fk_compra: id });
    }
    find.populate({
        path: 'fk_producto fk_compra',
        populate: {
            path: 'fk_usuario fk_categoria fk_ivas fk_marca fk_proveedor',
            populate: {
                path: 'fk_usuario'
            }
        }
    }).exec((err, compra) => {
        if (err) {
            return res.status(500).send({ message: 'ERROR EN LA PETICION' });
        }
        else {
            if (!compra) {
                return res.status(404).send({ message: 'ERROR AL MOSTRAR' });
            }
            else {
                return res.status(200).send({ compra });
            }
        }
    })
}


module.exports = {
    guardarDetalleCompra,
    mostrarDetalleCompra,
    compraDetalle
}