'user strict'

var mongosse=require('mongoose');
var Schema=mongosse.Schema;

var configSchema=Schema({
    con_nombre:String,
    con_logo:String,
    con_razon:String,
    con_ruc:String,
    con_matriz:String,
    con_establecimiento:String,
    con_telefono:String,
    con_email:String,
    con_contabilidad:String,
    con_fecha:String,
    con_fechaActualizacion:String,
    fk_usuario: { type: Schema.ObjectId , ref: 'usuario' },
    con_modificado:{ type: Schema.ObjectId , ref: 'usuario' },
})

module.exports=mongosse.model('configuracion',configSchema);