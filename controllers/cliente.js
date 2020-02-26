'use strinct'

var Cliente = require('../models/cliente');

function guardarCliente(req, res) {
    var cliente = new Cliente();
    var params = req.body;
    cliente.cli_codigo = params.cli_codigo;
    cliente.cli_cedula = params.cli_cedula;
    cliente.cli_nombre = params.cli_nombre;
    cliente.cli_apellido = params.cli_apellido;
    cliente.cli_celular = params.cli_celular;
    cliente.cli_telefono = params.cli_telefono;
    cliente.cli_email = params.cli_email;
    cliente.cli_direccion = params.cli_direccion;
    cliente.cli_fecha = params.cli_fecha;
    cliente.cli_fechaActualizacion = params.cli_fechaActualizacion;
    cliente.fk_usuario=params.fk_usuario;
    if (cliente.cli_cedula != null) {
        Cliente.find({
            $or: [
                { cli_cedula: params.cli_cedula },
                { cli_nombre: params.cli_nombre },
            ]
        }, (err, resp) => {
            if (err) return res.status(500).send({ message: 'ERROR EN LA PETICION' + err });
            if (resp.length >= 1) return res.status(404).send({ message: 'EL CLIENTE:  ' + params.cli_nombre + ' ' + params.cli_apellido + ' CON C.C ' + params.cli_cedula+' YA ESTA INGRESADO' });
            if (resp.length == 0) {
                cliente.save((err, clienteStored) => {
                    if (err) {
                        return res.status(500).send({ message: 'ERROR EN EL SERVIDOR',err });
                    }
                    else {
                        if (!res) {
                            return res.status(404).send({ message: 'ERROR AL GUARDAR' })
                        }
                        else {
                            return res.status(200).send({ cliente: clienteStored });
                        }
                    }
                }
                )
            }

        }
        )
    }

}
//mostrar todos los clientes

function mostrarCliente(req, res) {
    var id = req.params.id;
    var cli = Cliente.find();
    if (id) cli = Cliente.findById(id);
    cli.populate('fk_usuario cli_modificar').exec((error, response) => {
        if (error)
            return res.status(500).send({ Message: 'Error al ejectuar la peticion', Error: error });
        if (!response || response.length <= 0)
            return res.status(404).send({ Message: 'No existen Clientes en el sistema' });
        return res.status(200).send({ Message: 'Clientes  cargados!', cliente: response });
    })
}

// function mostrarCliente(req, res) {
//     var cleinteid = req.params.cliente;
//     if (cleinteid) {
//         var find = Cliente.find();
//     }
//     else {
//         var find = Cliente.find({ cliente: cleinteid });
//     }
//     find.populate({ path: 'cliente' }).exec((err, cliente) => {
//         if (err) {
//             return res.status(500).send({ message: 'ERROR EN LA PETICION' });
//         }
//         else {
//             if (!cliente) {
//                 return res.status(404).send({ message: 'NO HAY DATOS' })
//             }
//             else {
//                 return res.status(200).send({ cliente });
//             }
//         }
//     })
// }
//eliminar
function deleteCliente(req, res) {
    var deletecli = req.params.id;
    Cliente.findByIdAndRemove(deletecli, (err, clienteDelete) => {
        if (err) {
            return res.status(405).send({ message: 'ERROR AL ELIMINAR' });
        } else {
            if (!clienteDelete) {
                return res.status(404).send({ message: 'ELIMINADO CON EXITO' });
            } else {
                return res.status(200).send({ cliente: clienteDelete });
            }
        }
    })
}
//actualizar
function updateCliente(req, res) {
    var clienteid = req.params.id;
    var update = req.body;
    Cliente.findByIdAndUpdate(clienteid, update, (err, clienteUpdate) => {
        if (err) {
            return res.status(500).send({ message: 'ERROR EN EL SERVIDOR' });
        }
        else {
            if (!clienteUpdate) {
                return res.status(404).send({ message: 'ERROR EN ACTUALIZAR' });
            }
            else {
                return res.status(200).send({ cliente: clienteUpdate });
            }
        }
    })
}

//mostrar un solo valor
function getCliente(req, res) {
    var clienteid = req.params.id;

    Cliente.findById(clienteid, (err, cliente) => {
        if (err) {
            return res.status(500).send({ message: 'ERROR EN LA PETICION' });
        }
        else {
            if (!cliente) {
                return res.status(404).send({ message: 'NO SE HA ENCONTRADO QUE MOSTRAR' });
            }
            else {
                return res.status(200).send({ cliente });
            }
        }
    })
}
module.exports = {
    guardarCliente,
    mostrarCliente,
    deleteCliente,
    updateCliente,
    getCliente,
}