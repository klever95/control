'use strict'
///trabajar con el sistema de ficheros, al memento de subir una imagen 
//y devolver en el momento del api res full
var DetalleVenta = require('../models/detalleVenta');
var Producto = require('../models/producto');
var Kardex = require('../models/kardex');
var Venta=require('../models/venta');
function guardarDetalleVenta(req, res) {
    var detalle = new DetalleVenta();
    var kardex = new Kardex;   
    var params = req.body;
    // Detalle de Factura Venta
    detalle.det_detalle             = params.det_detalle            ;
    detalle.det_fecha               = params.det_fecha              ;
    detalle.det_stockSig            = params.det_stockSig           ;
    detalle.det_unidades            = params.det_unidades           ;
    detalle.det_subtotal            = params.det_subtotal           ;
    detalle.det_total               = params.det_total              ;
    detalle.det_precio_unidad       = params.det_precio_unidad              ;
    detalle.det_preciosinIva        = params.det_preciosinIva ;
    detalle.det_precioVentaActual   = params.det_precioVentaActual  ;
    detalle.det_iva                 = params.det_iva                ;
    detalle.det_ivaSubtotal         = params.det_ivaSubtotal        ;
    detalle.det_ivaValor            = params.det_ivaValor           ;
    detalle.fk_producto             = params.fk_producto            ;
    detalle.fk_venta                = params.fk_venta               ;
    detalle.det_descuento           = params.det_descuento          ;
    detalle.det_descuentoTotal      = params.det_descuentoTotal     ;
    detalle.det_descuentoValor      = params.det_descuentoValor     ;
    detalle.det_subtotalprecio      = params.det_subtotalprecio;
    detalle.det_preciototal         = params.det_preciototal;
    // Kardex de Salida
    kardex.kardex_fecha             = params.det_fecha;
    kardex.kardex_detalle           = params.det_detalle;
    kardex.kardex_fk_prod           = params.fk_producto;
    kardex.kardex_valor_unitario    = params.det_precio_unidad;
    
    kardex.kardex_ingreso           = {
        ingreso_cantidad            : null,
        ingreso_valor               : null
    };
    
    kardex.kardex_salida            = {
        salida_cantidad             : params.det_unidades,
        salida_valor                : params.det_total 
    };

    kardex.kardex_saldos            = {
        saldo_cantidad              : null,
        saldo_valor                 : null
    }

    // kardex.kardex_saldos.saldo_cantidad = params.DetalleVenta; 
    // kardex.kardex_saldos.saldo_valor =  params.DetalleVenta;

    kardex.kardex_promedio          = params.det_precioVentaActual;
    var detalleMessage;
    detalle.save((err, response)=> {
        if (err) {
            detalleMessage = { Message: 'Error al ejecutar la peticion', Error: err };
            return console.error('Error al ejecutar la peticion', err);
        } 
        if (!response || response.length <=0) {
            detalleMessage = { Message: 'No se pudo ingresar' };
            return console.info('No existe');
        }
        if (response){
            detalleMessage = { Message: 'Datos Guardados'};
            var id = response.fk_producto;
            Producto.findById(id, (err, responseProducto)=> {
                if (responseProducto) {
                    var stockSig = responseProducto.prod_stock - params.det_unidades ;
                    Producto.findByIdAndUpdate(responseProducto._id, {prod_stock: stockSig}, {new:true}, (err, responseStock)=>{
                    if (responseStock) {
                         console.log('guardado?');
                         kardex.save((errKardex, responseKardex) => {
                             console.log('guardando kardex');
                             
                             if (errKardex) return console.log(errKardex);
                             if (!responseKardex)return  console.log(kardex);
                              return console.log(responseKardex);
                         });
                    }
                    })
                }
            })
            return console.log('Datos Guardados');
        }
    });

    return res.status(201).send({Message: detalleMessage});
}

function mostrarDetalleVenta(req, res) {
    var id = req.params.id;
    var detallefind = DetalleVenta.find();
    if (id) detallefind = DetalleVenta.findById(id);
    detallefind.populate({path:'fk_venta fk_producto',populate:{path:'fk_usuario  fk_ivas  fk_cliente fk_configuracion fk_numero'}}).exec((error, response) => {
        if (error)
            return res.status(500).send({ Message: 'Error al ejectuar la peticion', Error: error });
        if (!response || response.length <= 0)
            return res.status(404).send({ Message: 'No existen detalle venta en el sistema' });
        return res.status(200).send({Message: 'detalle venta cargados!', detalleventa: response});
    })
}


//mostrar todos los detalles de las ventas que esten asociadas con el id de la venta correspondiente

function ventaDetalle(req, res) {
    var id = req.params.id;
    if (id) {
        var find = DetalleVenta.find({fk_venta: id});
    }
     find.populate({
        path: 'fk_producto fk_venta',
        populate: {
          path: 'fk_usuario  fk_ivas  fk_cliente fk_configuracion fk_numero',
        }
     }).exec((err, venta) => {
        if (err) {
            return res.status(500).send({ message: 'ERROR EN LA PETICION' });
        }
        else {
            if (!venta) {
                return res.status(404).send({ message: 'ERROR AL MOSTRAR' });
            }
            else {
                return res.status(200).send({ venta });
            }
        }
    })
}


module.exports = {
    guardarDetalleVenta,
    mostrarDetalleVenta,
    ventaDetalle,
}