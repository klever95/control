'use strict'
///trabajar con el sistema de ficheros, al memento de subir una imagen 
//y devolver en el momento del api res full
var path = require('path');
var fs = require('fs');

//modulo de paginacion 

var mongoosepaginate = require('mongoose-pagination');
var Configuracion = require('../models/configuracion');
//guardar

function guardar(req,res) {
        var conf=new Configuracion();
        var params=req.body;
        conf.con_nombre             =params.con_nombre;
        conf.con_logo               =''           ;
        conf.con_razon              =params.con_razon          ;
        conf.con_ruc                =params.con_ruc            ;
        conf.con_matriz             =params.con_matriz         ;
        conf.con_establecimiento    =params.con_establecimiento;
        conf.con_telefono           =params.con_telefono       ;
        conf.con_email              =params.con_email          ;
        conf.con_contabilidad       =params.con_contabilidad   ;
        conf.fk_usuario             =params.fk_usuario         ;
        conf.con_fecha              =params.con_fecha;
        conf.con_fechaActualizacion =params.con_fechaActualizacion;
        conf.conf=params.conf;
        conf.save((err,dato)=>{
            if(err){
                return res.status(500).send({message:'ERROR EN EL SERVIDOR'})

            } else{
                if(!dato) 
                {
                    return res.status(404).send({message:'NO SE PUEDE REGISTRAR'})
                }
                return res.status(200).send({conf:dato})
            }
        })
}

function mostrar(req,res) {
    var id=req.params.id;
    var confids=Configuracion.find();

    if(id) confids=Configuracion.findById(id);
    confids.populate('fk_usuario').exec((error,response)=>{
        if(error) return res.status(500).send({message:'ERROR EN EL SERVIDOR'})
        if(!response || response.length<=0) return res.status(404).send({message:'NO SE PUDO REGISTRAR'})
        return res.status(200).send({conf:response})
    })
}


function editar(req,res) {
    var confgid=req.params.id;
    var update=req.body;
    Configuracion.findByIdAndUpdate(confgid,update,(err,confgid)=>{
        if(err) return res.status(500).send({message:'Erro en el servidor'});
        if(!confgid) return res.status(404).send({message:'no se puede actualizar'});
        return res.status(200).send({conf:confgid});
    })
}
module.exports={
    guardar,
    mostrar,
    editar,
}