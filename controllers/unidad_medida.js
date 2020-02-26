'use strict'
///trabajar con el sistema de ficheros, al memento de subir una imagen 
//y devolver en el momento del api res full
var path = require('path');
var fs = require('fs');

//modulo de paginacion 

var mongoosepaginate = require('mongoose-pagination');
var Unidad = require('../models/unidad_medida');

//guardar
function guardarUM(req, res) {
    var unidad = new Unidad();
    var params = req.body;

    unidad.um_codigo = params.um_codigo;
    unidad.um_descripcion = params.um_descripcion;
    unidad.um_fecha = params.um_fecha;
    unidad.um_fechaActualizacion=params.um_fechaActualizacion;
    unidad.save((err, unidadstored) => {
        if (err) {
            return res.status(500).send({ message: 'error en el servidor' });
        }
        else {
            if (!unidadstored) {
                return res.status(404).send({ message: 'error al guardar' });
            }
            else {
                return res.status(200).send({ unidad: unidadstored });
            }
        }
    })

}
//mostrar todas las medidas
function mostrarUM(req, res) {
    var unidadid = req.params.unidad;
    if (unidadid) {
        var find = Unidad.find({});
    }
    else {
        var find = Unidad.find({ unidad: unidadid });
    }
    find.populate({ path: 'unidad' }).exec((err, unidad) => {
        if (err) {
            return res.status(500).send({ message: 'error en la peticion' })
        }
        else {
            if (!unidad) {
                return res.status(404).send({ message: 'no hay unidad' });
            }
            else {
                return res.status(200).send({ unidad });
            }
        }
    })
}

//delete unidad medida
function  deleteUM(req,res){
    var deleteunidad=req.params.id;
    Unidad.findByIdAndRemove(deleteunidad, (err,unidadDelete)=>{
        if(err){
            return res.status(500).send({message:'error al eliminar'});
        }else{
            if(!unidadDelete){
                return res.status(404).send({message:'el valor ha sido eliminado'});
            }else{
                return res.status(200).send({unidad:unidadDelete});
            }
        }
    })
}
/*
//delete unidad medida
function  deleteUM(req,res){
    var deleteunidad=req.params.id;
    Unidad.find({'unidad':req.unidad.sub,'id' :deleteunidad}).remove(err=>{
        if(err) return return res.status(500).send({message:'Error al Borrar'});
        return return res.status(200).send({message:'eliminado con exito'});
    })
}
*/
//actualizar marca
function updateUM(req,res){
    var unidadid=req.params.id;
    var update=req.body;
    Unidad.findByIdAndUpdate(unidadid,update,(err,unidadUpdate)=>{
        if(err){
            return res.status(500).send({message:'error al actualizar'});
        }
        else{
            if(!unidadUpdate){
                return res.status(404).send({message:'no se ha actualizado'});
            }
            else{
                return res.status(200).send({unidad:unidadUpdate});
            }
        }
    })
}

//mostrar un dato por id
function getUnidad(req,res){
    var unidadmedida=req.params.id;
    Unidad.findById(unidadmedida,(err,unidad)=>{
        if(err){
            return res.status(500).send({message:'error en la peticion'});
        }
        else{
            if(!unidad){
                return res.status(404).send({message:'error al mostrar'});
            }else{
                return res.status(200).send({unidad});
            }
        }
    })
}   
    module.exports = {
        guardarUM,
        mostrarUM,
        deleteUM,
        updateUM,
        getUnidad,
    }