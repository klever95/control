'use strict'
var express = require('express');
var statisticsController = require('../controllers/statistics');

var api = express.Router();

api.get('/get-conteos', statisticsController.getCounts);
//numero de facturas por proveedor
api.get('/get-numeros-compras/:id', statisticsController.getNumerosCompras);


api.get('/getponderado', statisticsController.ingresosPonderado);


api.get('/get-costos-compras/', statisticsController.getCostosCompras);

api.get('/get-costos-compras-proveedor/:id', statisticsController.getCostosComprasProveedor);

api.get('/get-numeros-ventas', statisticsController.getNumerosVentas);
api.get('/get-costos-ventas', statisticsController.getCostosVentas);
api.get('/get-cedulas', statisticsController.getCedulas);
api.get('/get-stock', statisticsController.getcontarproductos);
api.get('/getNumeroVentas', statisticsController.getNumeroVentas);

api.get('/getusuariocuenta', statisticsController.getusuarioCuenta);
// numero total de compras y ventas
api.get('/getnumeros', statisticsController.getnumeros);
//numero total de productos
api.get('/get-productos', statisticsController.getproductos);


// api.get('/get-detallecompra/:id', statisticsController.compraDetalle);

// api.get('/get-detalleventa/:id', statisticsController.ventaDetalle);

module.exports = api;
