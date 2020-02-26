'use strict'

var Inventario = require('../models/inventario');

function guardarInventario(req, res) {
    var inventario = new Inventario();
    var params = req.body;
    
    inventario.inv_descripcion    = params.inv_descripcion  ;  
    inventario.inv_cantidad       = params.inv_cantidad     ;  
    inventario.inv_promedio       = params.inv_promedio     ;  
    inventario.inv_fecha          = params.inv_fecha        ;  
    inventario.inv_total          = params.inv_total        ;  
    inventario.fk_producto        = params.fk_producto      ;  
    inventario.save((err, reponse) => {
        if (err) return res.status(500).send({Message: 'error al ejecutar la peticion!'});
        if (!response) return res.status(404).send({Message: 'no se pudo guardar la informacion del inventario'});
        else return res.status(201).send({Message: 'exito al guardar el inventario..', inventario: response});
    })
}

function guardarInventarios(req, res) {
    var inventario = new Inventario();
    var params = req.body;
    var check = true;
    inventario.inv_descripcion    = params.inv_descripcion  ;  
    inventario.inv_cantidad       = params.inv_cantidad     ;  
    inventario.inv_promedio       = params.inv_promedio     ;  
    inventario.inv_fecha          = params.inv_fecha        ;  
    inventario.inv_total          = params.inv_total        ;  
    inventario.fk_producto        = params.fk_producto      ;  
    inventario.save((err, response) => {
        if (err || !response) check = false;
        else check = true;
    });
    if (check == true) {
        return res.status(201).send({Message: 'exito al guardar los registros del inventario!'});
    } else {
        return res.status(500).send({Message: 'error en el servidor!'});
    }
}
function mostrarInventario(req, res) {
    // Inventario.find().populate('fk_producto').exec((err, response) => {
    Inventario.find((err, response) => {
        if (err) return res.status(500).send({Message: 'error al ejecutar el servidor', Error: err});
        if (!response) return res.status(404).send({Message: 'error al obtener los registros'});
        if (response && response.length <= 0) return res.status(200).send({Message: 'No existen registros de inventario actualmente'});
        return res.status(200).send({Message: 'Lista de Registros cargada Correctamente!!', inventarios: response});
    })
}
module.exports = {
    guardarInventario,
    guardarInventarios,
    mostrarInventario
}