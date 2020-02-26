'use strict'
///trabajar con el sistema de ficheros, al memento de subir una imagen 
//y devolver en el momento del api res full
var path = require('path');
var fs = require('fs');

//modulo de paginacion 

var mongoosepaginate = require('mongoose-pagination');
var Proveedor = require('../models/proveedor');
//guardar
function guardarProveedor(req, res) {
    var proveedor = new Proveedor();
    var params = req.body;
    proveedor.prov_cedula=params.prov_cedula;
    proveedor.prov_codigo = params.prov_codigo;
    proveedor.prov_nombre = params.prov_nombre;
    proveedor.prov_apellido = params.prov_apellido;
    proveedor.prov_cedula = params.prov_cedula;
    proveedor.prov_contacto1 = params.prov_contacto1;
    proveedor.prov_contacto2 = params.prov_contacto2;
    proveedor.prov_sitio_web = params.prov_sitio_web;
    proveedor.prov_email = params.prov_email;
    proveedor.prov_direccion = params.prov_direccion;
    proveedor.prov_fecha = params.prov_fecha;
    proveedor.prov_fechaActualizacion=params.prov_fechaActualizacion;
    proveedor.fk_usuario=params.fk_usuario;
    if(proveedor.prov_cedula!=null){
        Proveedor.find({
            $or:[
                {prov_cedula:params.prov_cedula},
            ]
        }, (err,resp)=>{
            if(err) return res.status(500).send({message:'ERROR EN EL SERVIDOR'});
            if(resp.length>=1) return res.status(404).send({message:'EL PROVEEDOR: '+ params.prov_nombre +' ' +params.prov_apellido+' CON C.C. '+params.prov_cedula+' YA FUE INGRESADO' });
            if(resp.length==0){
                proveedor.save((err, proveedorstored) => {
                    if (err) {
                        return res.status(500).send({ message: 'error en el servidor' });
                    }
                    else {
                        if (!proveedorstored) {
                            return res.status(404).send({ message: 'error al guardar' });
                        }
                        else {
                            return res.status(200).send({ proveedor: proveedorstored });
                        }
                    }
                })
            }
        }
        )
    }
  
}
//mostrar todos los datos

function mostrarProveedor(req, res) {
    var id = req.params.id;
    var pro = Proveedor.find();
    if (id) pro = Proveedor.findById(id);
    pro.populate('fk_usuario prov_modificado').exec((error, response) => {
        if (error)
            return res.status(500).send({ Message: 'Error al ejectuar la peticion', Error: error });
        if (!response || response.length <= 0)
            return res.status(404).send({ Message: 'No existen marca en el sistema' });
        return res.status(200).send({Message: 'marca cargados!', proveedor: response});
    })
}

// function mostrarProveedor(req, res) {
//     var proveedorid = req.params.proveedor;
//     if (proveedorid) {
//         var find = Proveedor.find({});
//     }
//     else {
//         var find = Proveedor.find({ proveedor: proveedorid });
//     }
//     find.populate({ path: 'proveedor' }).exec((err, proveedor) => {
//         if (err) {
//             return res.status(500).send({ message: 'ERROR EN EL SERVIDOR' });
//         }
//         else {
//             if (!proveedor) {
//                 return res.status(404).send({ message: 'ERROR AL MOSTRAR EL PROVEEDOR' });;
//             }
//             else {
//                 return res.status(200).send({ proveedor });
//             }
//         }
//     })
// }
//borrar
function deleteProveedor(req,res) {
    var deleteproveedor = req.params.id;
    Proveedor.findByIdAndRemove(deleteproveedor, (err, proveedorDelete) => {
        if (err) {
            return res.status(500).send({ message: 'ERROR EN EL SERVIDOR' });
        }
        else {
            if (!proveedorDelete) {
                return res.status(404).send({ message: 'ERROR EN ELIMINAR' });
            }
            else {
                return res.status(200).send({ proveedor: proveedorDelete });
            }
        }
    })
}
//actualizar
function updateProveedor(req,res) {
    var proveedorid = req.params.id;
    var update = req.body;

    Proveedor.findByIdAndUpdate(proveedorid, update, (err, proveedorUpdate) => {
        if (err) {
            return res.status(500).send({ message: 'ERROR EN EL SERVIDOR' });
        }
        else {
            if (!proveedorUpdate) {
                return res.status(404).send({ message: 'ERROR AL ACTUALIZAR' });
            } else {
                return res.status(200).send({ proveedor: proveedorUpdate });
            }
        }
    });
}

//mostrar id
function getProveedor(req,res) {
    var proveedorid = req.params.id;

    Proveedor.findById(proveedorid, (err, proveedor) => {
        if (err) {
            return res.status(500).send({ message: 'ERROR EN EL SERVIDOR' });
        }
        else {
            if (!proveedor) {
                return res.status(404).send({ message: 'ERROR AL MOSTRAR EL PROVEEDOR' });
            } else {
                return res.status(200).send({ proveedor });
            }
        }
    })
}
module.exports = {
    guardarProveedor,
    mostrarProveedor,
    deleteProveedor,
    updateProveedor,
    getProveedor,
}