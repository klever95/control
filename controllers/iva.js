'use strict'
///trabajar con el sistema de ficheros, al memento de subir una imagen 
//y devolver en el momento del api res full
var path = require('path');
var fs = require('fs');

//modulo de paginacion 

var mongoosepaginate = require('mongoose-pagination');
var Iva = require('../models/iva');
//guardar
function guardarIva(req, res) {
    var iva = new Iva();
    var params = req.body;
    iva.iva_codigo = params.iva_codigo;
    iva.iva_valor = params.iva_valor;
    iva.iva_fecha = params.iva_fecha;
    iva.iva_fechaActualizacion=params.iva_fechaActualizacion;
    iva.fk_usuario= params.fk_usuario;
    iva.save((err, ivastored) => {
        if (err) {
            return res.status(500).send({ message: 'error en el servidor' });
        }
        else {
            if (!ivastored) {
                return res.status(404).send({ message: 'error al guardar' });
            }
            else {
                return res.status(200).send({ iva: ivastored });
            }
        }
    })
}

//mostrar todos los datos
function mostrarIva(req,res) {
    var id=req.params.id;
    var ivaid=Iva.find();
    if(id) ivaid= Iva.findById(id);
    ivaid.populate('fk_usuario').exec((error,response)=>{
        if(error) res.status(500).send({message:'ERROR EN EL SERVIDO'})
        if(!response||response.length<=0) return res.status(404).send({message:'NO SE PUDO GUARDAR'});
        return res.status(200).send({iva:response});
    })
}
// function mostrarIva(req,res) {
//     var ivaid = req.params.iva;
//     if (ivaid) {
//         var find = Iva.find({});
//     }
//     else {
//         var find = Iva.find({ iva: ivaid });
//     }
//     find.populate({ path: 'iva' }).exec((err, iva) => {
//         if (err) {
//             return res.status(500).send({ message: 'error en la peticion' });
//         }
//         else {
//             if (!iva) {
//                 return res.status(404).send({ message: 'no hay valor al impuesto agregado' });
//             }
//             else {
//                 return res.status(200).send({ iva });
//             }
//         }
//     })
// }

//borrar
function deleteIva(req,res){
    var deleteiva= req.params.id;
    Iva.findByIdAndRemove(deleteiva,(err,ivaDelete)=>{
        if(err){
            return res.status(500).send({message:'error al eliminar'});
        }
        else{
            if(!ivaDelete){
                return res.status(404).send({message:'el valor a sido eliminado'});
            }
            else{
                return res.status(200).send({iva:ivaDelete});
            }
        }
    })
}
//actualizar
function updateIva(req,res){
    var ivaid=req.params.id;
    var update=req.body;

    Iva.findByIdAndUpdate(ivaid,update,(err,ivaUpdate)=>{
        if(err){
            return res.status(500).send({message:'error al actualizar'});
        }else{
            if(!ivaUpdate){
                return res.status(404).send({message:'no se ha actualizado'});
            }else{
                return res.status(200).send({iva:ivaUpdate});
            }
        }
    })
}

//mostrar un dato por id
function getIva(req,res){
    var ivaid=req.params.id;
    Iva.findById(ivaid,(err,iva)=>{
        if(err){
            return res.status(500).send({message:'error en la peticion'});
        }else{
            if(!iva){
                return res.status(404).send({message:'error al mostrar'});
            }
            else{
                return res.status(200).send({iva});
            }
        }
    })
}
module.exports = {
    guardarIva,
    mostrarIva,
    deleteIva,
    updateIva,
    getIva,

}