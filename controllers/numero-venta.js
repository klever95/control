'use strict'

var NumeroVenta=require('../models/numero-venta');

function guardarNumero(req,res) {
    var numero =new NumeroVenta();
    var params=req.body;

    numero.num_desde=params.num_desde;
    numero.num_hasta=params.num_hasta;
    numero.num_autorizacion=params.num_autorizacion;
    numero.num_ambiente=params.num_ambiente;
    numero.num_emision=params.num_emision;
    numero.num_clave=params.num_autorizacion;
    numero.num_fecha=params.num_fecha;
    numero.fk_usuario=params.fk_usuario;
    numero.num_fechaActualizacion=params.num_fechaActualizacion;
    // numero.num_modificado=params.num_modificado;
    numero.save((err,numeroStored)=>{
        if(err){
            return res.status(500).send({message:'ERROR EN EL SERVIDOR'})
        }
        else{
            if(!numeroStored){
                return res.status(404).send({message:'ERROR AL GUARDAR'});
            }
            else{
                return res.status(200).send({numero:numeroStored});
            }
        }
    })
}

function mostrarnumeros(req,res) {
    var id = req.params.id;
    var numeroid=NumeroVenta.find();

    if(id) numeroid = NumeroVenta.findById(id);
    numeroid.populate('fk_usuario num_modificar').exec((error,response)=>{
        if(error)return res.status(500).send({message:'ERROR EN EL SERVIDOR'})
        if(!response || response.length<=0) return res.status(404).send({message:'NO SE PUEDE MOSTRAR   '})
        return res.status(200).send({numero:response})
    })
}

function updateNumeros(req,res) {
    var id =req.params.id;
    var update=req.body;

    NumeroVenta.findByIdAndUpdate(id,update,(error,response)=>{
        if(error)return res.status(500).send({message:'ERROR EN EL SERVIDOR'});
        if(!response) return res.status(500).send({message:'NO SE PUEDE ACTUALIZAR'});
        return res.status(200).send({numero:response});
    })
}

module.exports={
    guardarNumero,
    mostrarnumeros,
    updateNumeros,
}