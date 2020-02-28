'use strict'

var Usuario     = require('../models/usuario'   );
var Cliente     = require('../models/cliente'   );
var Proveedor   = require('../models/proveedor' );

var Producto    = require('../models/producto'  );
var Marca       = require('../models/marca'     );
var Categoria   = require('../models/categoria' );

var Compra      = require('../models/compra'    );
var Venta       = require('../models/venta'     );
var DetalleCompra =require('../models/detalleCompra');
var DetalleVenta=require('../models/detalleVenta');

function getCounts(req, res) {
    getTotals().then((resp) => {
        return res.status(200).send({ Message: 'Lista cargada correctamente!!... ', conteo: resp });
    })
}

async function getTotals() {
    var totalUsers = await Usuario.countDocuments().exec().then((count) => {
        return count;
    });
    var totalProducts = await Producto.countDocuments().exec().then((count) => {
        return count;   
    })
    var totalCompra=await Compra.countDocuments().exec().then((count)=>{
        return count;
    })
    var totalMarca=await Marca.countDocuments().exec().then((resp)=>{
        return resp;
    })
    var totalCategoria=await Categoria.countDocuments().exec().then((categoria)=>{
        return categoria;
    })

    var totalcliente=await Cliente.countDocuments().exec().then((cli)=>{
        return cli;
    })
    var totalproveedor=await Proveedor.countDocuments().exec().then((prov)=>{
        return prov;
    })
    var totalventa=await Venta.countDocuments().exec().then((ven)=>{
        return ven;
    })
    
    return {
        usuario     : totalUsers,
        producto    : totalProducts,
        compras     : totalCompra,
        marca       : totalMarca,
        categoria   : totalCategoria,
        cliente     : totalcliente,
        proveedor   : totalproveedor,
        venta       : totalventa,
    }
}

// permite contar todos los productos en el inventario sin excepciones

function getcontarproductos(req, res) {
    var id = req.params.id;
    Producto.find( {fk_proveedor: id} ,{prod_stock: 1, _id:0}, (error,response) => {
        if (error) return res.status(500).send({Message: 'Error al ejecutar la peticion...', error});
        if (!response) return res.status(404).send({Message: 'Error al cargar los numeros...'});
        if (response.length == 0) return res.status(200).send({Message: 'no hay stock!'})
        return res.status(200).send({Message: 'Lista de stock', stock: response});
        })
}
// cantidad de gastos

function getNumeroVentas(req, res) {
    var id = req.params.id;
    Venta.find( {venta: id} ,{ven_total: 1, _id:0}, (error,response) => {
        if (error) return res.status(500).send({Message: 'Error al ejecutar la peticion...', error});
        if (!response) return res.status(404).send({Message: 'Error al cargar los numeros...'});
        if (response.length == 0) return res.status(200).send({Message: 'no hay stock!'})
        return res.status(200).send({Message: 'Lista de stock', numeros: response});
        })
}
//llama a todos los productos por nombre y cada uno de los valores de la compra
function ingresosPonderado(req, res){
    // var id=req.params.id;
    DetalleCompra.find({},{fk_producto:1, _id:0}, (error,response)=>{
        if(error)return res.status(500).send({Message:'error en la peticion',error});
        if(!response) return res.status(404).send({Message:'error en cargar'});
        if(response.length==0) return res.status(200).send({Message:'no hay nada'});
        return res.status(200).send({Message:'Promedio ponde',promedio:response});
    })
}

//busca los numero de facturas de los proveedores por cada compra
function getNumerosCompras(req, res) {
    var id = req.params.id;
    Compra.find({fk_proveedor: id}, {com_codigo: 1, _id:0}, (error,response) => {
        if (error) return res.status(500).send({Message: 'Error al ejecutar la peticion...', error});
        if (!response) return res.status(404).send({Message: 'Error al cargar los numeros de facturas...'});
        if (response.length == 0) return res.status(200).send({Message: 'No hay facturas cargadas!'})
        return res.status(200).send({Message: 'Lista de numeros de Facturas', numeros: response});
        })
}

function getCostosCompras(req, res) {
    Compra.find({}, {com_total: 1, _id:0}, (error,response) => {
        if (error) return res.status(500).send({Message: 'Error al ejecutar la peticion...', error});
        if (!response) return res.status(404).send({Message: 'Error al cargar los gastos de facturas...'});
        if (response.length == 0) return res.status(200).send({Message: 'No hay facturas cargadas!'})
        return res.status(200).send({Message: 'Lista de gastos de Facturas de Compras', costos: response});
        })
}
function getCostosComprasProveedor(req, res) {
    var id = req.params.id;
    Compra.find({fk_proveedor: id}, {com_total: 1, _id:0}, (error,response) => {
        if (error) return res.status(500).send({Message: 'Error al ejecutar la peticion...', error});
        if (!response) return res.status(404).send({Message: 'Error al cargar los costos de facturas...'});
        if (response.length == 0) return res.status(200).send({Message: 'No hay facturas cargadas!'})
        return res.status(200).send({Message: 'Lista de costos de Facturas', costos: response});
        })
}
function getNumerosVentas(req, res) {
    Venta.find({}, {ven_codigo: 1, _id:0}, (error,response) => {
        if (error) return res.status(500).send({Message: 'Error al ejecutar la peticion...', error});
        if (!response) return res.status(404).send({Message: 'Error al cargar los numeros de facturas...'});
        if (response.length == 0) return res.status(200).send({Message: 'No hay facturas cargadas!'})
        return res.status(200).send({Message: 'Lista de numeros de Facturas', numeros: response});
        })
}
function getCostosVentas(req, res) {
    Venta.find({}, {ven_total: 1, _id:0}, (error,response) => {
        if (error) return res.status(500).send({Message: 'Error al ejecutar la peticion...', error});
        if (!response) return res.status(404).send({Message: 'Error al cargar los costos de facturas...'});
        if (response.length == 0) return res.status(200).send({Message: 'No hay facturas cargadas!'})
        return res.status(200).send({Message: 'Lista de costos de Facturas', costos: response});
        })
}

function getCedulas(req, res) {
    getNumerosCedulas().then((resp)=> {
        return res.status(200).send({Message: 'Lista de Cedulas Cargada!', cedulas: resp});
    })
}

async function getNumerosCedulas(){
    var proveedores = await Proveedor.find({}, {prov_cedula: 1, _id: 0}, (err, resp)=> {
        return resp;
    })
    var usuarios = await Usuario.find({}, {usu_cedula: 1, _id: 0}, (err, resp)=> {
        return resp;
    })
    var clientes = await Cliente.find({}, {cli_cedula: 1, _id: 0}, (err, resp)=> {
        return resp;
    })
    var cuentausuario = await Usuario.find({}, {usu_usuario:1, _id:0} ,(error,resp)=>{
        return resp;
    })
    var cuentausuario = await Usuario.find({}, {usu_usuario:1, _id:0} ,(error,resp)=>{
        return resp;
    })
    
    return {
        clientes,
        proveedores,
        usuarios,
        cuentausuario,
    }
}


async function getusuarioCuenta(){
    
    var cuentausuario = await Usuario.find({}, {usu_usuario:1, _id:0} ,(error,resp)=>{
        return resp;
    })
    return {
      
        cuentausuario,
    }
}


// numero de compras y ventas

function getnumeros(req, res) {
    getcompraventa().then((resp)=> {
        return res.status(200).send({Message: 'Lista de compra-venta Cargada!', total: resp});
    })
}

async function getcompraventa(){
    var compra = await Compra.find({}, {com_fechaIngreso: 1, _id: 0} , (err, resp)=> {
        return resp;
    })
    var venta = await Venta.find({}, {ven_fecha_venta : 1, _id: 0}, (err, resp)=> {
        return resp;
    })
    return {
        compra,
        venta,
    }
}

//todos los productos

// function getproductos(req, res) {
//     DetalleVenta.find({}, {fk_producto: 1, _id:0}, 
//          (error,response) => {
//         if (error) return res.status(500).send({Message: 'Error al ejecutar la peticion...', error});
//         if (!response) return res.status(404).send({Message: 'Error al cargar ...'});
//         if (response.length == 0) return res.status(200).send({Message: 'No hay productos!'})
//         return res.status(200).send({Message: 'Lista de productos', producto: response});
//         })
// }

function getproductos(req, res) {
    var id = req.params.id;
    var detallefind = DetalleVenta.find();
    detallefind.populate('fk_producto ').exec((error, response) => {
        if (error)
            return res.status(500).send({ Message: 'Error al ejectuar la peticion', Error: error });
        if (!response || response.length <= 0)
            return res.status(404).send({ Message: 'No existen detalle compra en el sistema' });
        return res.status(200).send({ Message: 'detalle compra cargados!', venta: response });
    })
}

module.exports = {
    getCounts,
    getNumerosCompras,
    getNumerosVentas,
    getCostosCompras,
    getCostosComprasProveedor,
    getCostosVentas,
    getCedulas,
    getcontarproductos,
    getNumeroVentas,
    getusuarioCuenta,
    ingresosPonderado,
    getnumeros,
    getproductos
    // compraDetalle,
    // ventaDetalle
}