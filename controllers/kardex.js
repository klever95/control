'use strict'

var Kardex=require('../models/kardex');

function guardarKardex(req,res){
    var kardex = new Kardex();
    var params=req.body;
    kardex.kardex_fecha             = params.kardex_fecha          ;
    kardex.kardex_detalle           = params.kardex_detalle        ;
    kardex.kardex_fk_producto       = params.kardex_fk_producto    ;
    kardex.kardex_valor_unitario    = params.kardex_valor_unitario ;
    kardex.kardex_ingreso           = params.kardex_ingreso        ;
    kardex.kardex_salida            = params.kardex_salida         ;
    kardex.kardex_saldos            = params.kardex_saldos         ;
    kardex.kardex_promedio          = params.kardex_promedio       ;

    // kardex.kardex_fecha     =params.kardex_fecha;
    // kardex.kardex_detalle   =params.kardex_detalle;
    // kardex.kardex_fk_prod   =params.kardex_fk_prod;
    // kardex.kardex_valor_u   =params.kardex_valor_u;
    // kardex.ingreso_canti    =params.ingreso_canti;
    // kardex.ingreso_valor    =params.ingreso_valor;
    // kardex.salida_cantid    =params.salida_cantid;
    // kardex.salida_valor     =params.salida_valor;
    // kardex.saldo_cantida    =params.saldo_cantida;
    // kardex.saldo_valor      =params.saldo_valor;
    // kardex.kardex_promedi   =params.kardex_promedi;
    //if(kardex.kardex_fk_producto && kardex.kardex_fk_producto != '') {
        kardex.save((err,kardexStored)=>{
            if(err){
                return console.log(err);
            }
            else{
                if(!kardexStored){
                    return console.log('kardex no ingresado');
                    
                }
                else{
                   return console.log('kardex ingresado');
                }
            }
        });
    //}
    return res.status(200).send({message: 'Kardex Ingresado',kardex:kardex});
}

 function mostrarKardex(req,res){
    var id=req.params.id;
    var kardexid=Kardex.find();
    if(id) kardexid=Kardex.find({kardex_fk_producto: id});
    kardexid.populate('kardex_fk_producto').exec((error,response)=>{
        if(error){
            return res.status(500).send({message:'error  en ejecutar'})
        }
        if(!response){
            return res.status(404).send({message:'no se encuentra kardex guardados  '})
        }
        if ( response && response.length <= 0) {
            return res.status(200).send({message: 'aun no hay registros de kardex con este producto...'})
        }
        return res.status(200).send({message:'kardex cargado', kardex: response})
    })
}

// function mostrarDetalleCompra(req, res) {
//     var id = req.params.id;
//     var detallefind = DetalleCompra.find();
//     if (id) detallefind = DetalleCompra.find({fk_producto: id});
//     detallefind.populate('fk_compra fk_producto ').exec((error, response) => {
//         if (error)
//             return res.status(500).send({ Message: 'Error al ejectuar la peticion', Error: error });
//         if (!response || response.length <= 0)
//             return res.status(404).send({ Message: 'No existen detalle compra en el sistema' });
//         return res.status(200).send({ Message: 'detalle compra cargados!', detallecompra: response });
//     })
// }
module.exports={
    guardarKardex,
    mostrarKardex,
}