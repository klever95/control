'use strict'
//cargar la libreria express
var express             = require('express');
var bodyParser          = require('body-parser');
var app                 = express();
//cargar rutas
var usuario_router      = require('./routes/usuario');
var producto_router     = require('./routes/producto');
var categoria_router    = require('./routes/categoria');
var ventas_router       = require('./routes/venta');
var cliente_router      = require('./routes/cliente');
var marca_router        = require('./routes/marca');
var proveedor_router    = require('./routes/proveedor');
var unidad_router       = require('./routes/unidad_medida');
var iva_router          = require('./routes/iva');
var descuento_router    = require('./routes/descuento');
var compra_router       = require('./routes/compra');
var detalleCompra_roter = require('./routes/detalleCompra');
var statistics_router   = require('./routes/statistics');
var detalleVenta_router = require('./routes/detalleVenta');
var kardex_router       = require('./routes/kardex');
var inventario_router   = require('./routes/inventario');
var numero_router       =require('./routes/numero-ventas');
var configuracion_router=require('./routes/configuracion');

//configurara body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()) //convierte a objetos json los datos que nos llegan por las peticiones http
//configurara cabeceras http (permisos de usuarios)
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');
    next();
})
//carga de rutas base
app.use('/api',usuario_router);
app.use('/api',producto_router);
app.use('/api',categoria_router);
app.use('/api',ventas_router);
app.use('/api',cliente_router);
app.use('/api',marca_router);
app.use('/api',proveedor_router);
app.use('/api',unidad_router);
app.use('/api',iva_router);
app.use('/api',descuento_router);
app.use('/api',compra_router);
app.use('/api',detalleCompra_roter);
app.use('/api',statistics_router);
app.use('/api',detalleVenta_router);
app.use('/api',kardex_router);
app.use('/api',inventario_router);
app.use('/api',numero_router);
app.use('/api',configuracion_router);

//app.use(express.static(path.join(__dirname,'client')));
//app.use('/',express.static('client',{redirect:false}))
module.exports=app;