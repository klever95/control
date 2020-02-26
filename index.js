'use strict' //permite meter intrucciones de los nuevos estandares de javascript

var mongoose = require('mongoose');//carga el modulo mongoose como intermediario para trabajar con la base de datos
var app = require('./app');
var port = process.env.PORT || 3977; // PUERTO DE MONGO DB
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/control_ventas', (err,res) =>{//conexion a mongo db, usamos la funcion de callback
    if(err){ // no no hay error en la conexion genera una excepcion de err
        throw err;//genera excepciones
         }
    else{//si eta correcto muetra en menaje
            console.log('Lac conexion a la base de datos esta correctamente')
            app.listen(port, function(){
                console.log("API REST ESCUCHANDO EN:  http://localhost:"+port)
            });
        }
});