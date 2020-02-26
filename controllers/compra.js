'use strict'
///trabajar con el sistema de ficheros, al memento de subir una imagen 
//y devolver en el momento del api res full
var path = require('path');
var fs = require('fs');
//modulo de paginacion 
var mongoosepaginate = require('mongoose-pagination');
var Compra = require('../models/compra');
var detalleCompra = require('../models/detalleCompra');

function guardarcompra(req, res) {
    var compra = new Compra();
    var params = req.body;
    compra.com_fechaEmitida=params.com_fechaEmitida;
    compra.com_fechaIngreso=params.com_fechaIngreso;
    compra.com_codigo = params.com_codigo;
    compra.com_subtotal = params.com_subtotal;
    compra.com_total = params.com_total;
    compra.com_iva = params.com_iva;
    compra.fk_proveedor = params.fk_proveedor;
    compra.fk_usuario = params.fk_usuario;
    compra.fk_ivas=params.fk_ivas;
    
    compra.save((err, compraStored) => {
        if (err) {
            return res.status(500).send({ message: 'error en el servidor', Error: err });
        }
        else {
            if (!compraStored) {
                return res.status(404).send({ message: 'error al guardar' });
            }
            else {
                return res.status(201).send({ message: 'La Factura' + compraStored.com_codigo + ' Guardada Correctamente!', compra: compraStored });
            }
        }
    })
}

function mostrarCompra(req, res) {
    var id = req.params.id;
    var comprafind = Compra.find();
    if (id) comprafind = Compra.findById(id);
    comprafind.exec((error, response) => {
        if (error)
            return res.status(500).send({ Message: 'Error al ejectuar la peticion', Error: error });
        if (!response || response.length <= 0)
            return res.status(404).send({ Message: 'No existen productos en el sistema' });
        // return res.status(200).send({ Message: 'Productos cargados!', compra: response });
        comprafind.populate('fk_usuario fk_ivas fk_proveedor').exec((error, response) => {
            if (error)
                return res.status(500).send({ Message: 'Error al ejectuar la peticion', Error: error });
            if (!response || response.length <= 0)
                return res.status(404).send({ Message: 'No existen  en el sistema' });
            return res.status(200).send({ Message: ' cargados!', compra: response });
        })
    })

}


function deleteCompra(req, res) {
    var deletecom = req.params.id;
    Compra.findByIdAndRemove(deletecom, (err, compraDelete) => {
        if (err) {
            return res.status(500).send({ message: 'error la eliminar' });
        } else {
            if (!compraDelete) {
                return res.status(404).send({ message: 'eliminado con exito' });
            }
            else {
                return res.status(200).send({ compra: compraDelete });
                // detalleCompra.find({detalle:compraDelete._id}).remove((err,detalleRemove)=>{
                //     if(err){
                //         return res.status(500).send({message:'revisa el servidor'});
                //     }
                //     else{
                //         if(!detalleRemove){
                //             return res.status(404).send({message:'error a eliminar detalle'});
                //         }
                //         else{
                //             return res.status(200).send({compra:compraDelete});
                //         }
                //     }
                // })


            }
        }
    })
}

function updateCompra(req, res) {
    var compraid = req.params.id;
    var update = req.body
    Compra.findByIdAndUpdate(compraid, update, (err, compraUpdate) => {
        if (err) {
            res.status(500).send({ message: 'error al actualizar' });
        }
        else {
            if (!compraUpdate) {
                res.status(404).send({ message: 'no se ha actualizado' });
            }
            else {
                res.status(200).send({ compra: compraUpdate });
            }
        }
    })
}


module.exports = {
    guardarcompra,
    mostrarCompra,
    deleteCompra,
    updateCompra,
};