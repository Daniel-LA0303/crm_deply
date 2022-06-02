const express = require('express');
const routes = require('./routes');
const mongoose =  require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path: 'variables.env'})

//cors permite que un cliente se conecte a unservidor
const cors = require('cors');

//4. conectar MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis',{
    useNewUrlParser: true
});

//50. definir un dominiopara recibir peticiones
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin : (origin, callback) => {
        // console.log(origin);
        //revisr si la peticon viene de un servidor que esta en whitelist
        const existe = whitelist.some(dominio => dominio === origin);

        if(existe){
            callback(null, true);
        }else{
            callback(new Error('No permitido por CORS'));
        }
    }
}


//1. crear el servidor
const app = express();

//8. habilitar bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//41. hanilitar cors
// app.use(cors())

//51 cambiando cors
app.use(cors(corsOptions));

//42. hablitar carpeta publica
app.use(express.static('uploads'));

//3. rutas de la app
app.use('/', routes());

//2. puerto
app.listen(5000);