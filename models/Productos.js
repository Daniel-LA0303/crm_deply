const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//17. modelo productos
const productosSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    precio: {
        type: Number
    },
    imagen: {
        type: String
    }
});
module.exports = mongoose.model('Productos', productosSchema)