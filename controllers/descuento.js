'use strict'
///trabajar con el sistema de ficheros, al memento de subir una imagen 
//y devolver en el momento del api res full
var path = require('path');
var fs = require('fs');
//modulo de paginacion 
var mongoosepaginate = require('mongoose-pagination');
var Descuento = require('../models/descuento');
var LimitesDescuento = require('../models/limitesDescuento')
function guardarDescuento(req, res) {
    var descuento = new Descuento();
    var params = req.body;
    descuento.des_codigo      = params.des_codigo      ;
    descuento.des_descripcion = params.des_descripcion ;
    descuento.des_desde       = params.des_desde       ;
    descuento.des_hasta       = params.des_hasta       ;
    descuento.des_valor       = params.des_valor       ;
    descuento.des_fecha       = params.des_fecha       ;
    descuento.fk_usuario      = params.fk_usuario      ;
    descuento.save((err, descuentostored) => {
        if (err) {
            return res.status(500).send({ message: 'error al ingresar' });
        }
        else {
            if (!descuentostored) {
                return res.status(404).send({ message: 'error al guardar' });
            }
            else {
                return res.status(200).send({ descuento: descuentostored });
            }
        }
    })
}

function mostrarDescuento(req, res) {
    var id = req.params.id;
    var descuentofind = Descuento.find();
    if (id) descuentofind = Descuento.findById(id);
    descuentofind.populate('fk_usuario').exec((error, response) => {
        if (error)
            return res.status(500).send({ Message: 'Error al ejectuar la peticion', Error: error });
        if (!response || response.length <= 0)
            return res.status(404).send({ Message: 'No existen productos en el sistema' });
        return res.status(200).send({ Message: 'Productos cargados!', descuento: response });
    })

}

function deleteDescuento(req, res) {
    var deleteDes = req.params.id;
    Descuento.findByIdAndRemove(deleteDes, (err, descuentoDel) => {
        if (err) {
            return res.status(500).send({ message: 'error la eliminar' });
        } else {
            if (!descuentoDel) {
                return res.status(404).send({ message: 'eliminado con exito' });
            }
            else {
                return res.status(200).send({ descuento: descuentoDel });
            }
        }
    })
}

function updateDescuento(req, res) {
    var desid = req.params.id;
    var update = req.body;
    // update.marca_modificado = req.usu._i;
    Descuento.findByIdAndUpdate(desid, update, (err, descuentoUpdate) => {
        if (err) {
            return res.status(500).send({ message: 'ERROR AL ACTUALIZAR' });
        }
        else {
            if (!descuentoUpdate) {
                return res.status(404).send({ message: 'ACTUALIZADO CON EXITO' });
            }
            else {
                return res.status(200).send({ descuento: descuentoUpdate });
            }
        }
    })
}

module.exports = {
    guardarDescuento,
    mostrarDescuento,
    deleteDescuento,
    updateDescuento,
}