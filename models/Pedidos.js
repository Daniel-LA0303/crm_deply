const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//30 crear modelo pedidos
const pedidosSchema = new Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: 'Clientes'
    },
    pedido: [{
        producto: {
            type: Schema.ObjectId,
            ref: 'Productos'
        },
        cantidad: Number
    }],
    total: {
        type: Number
    }
});

module.exports = mongoose.model('Pedidos', pedidosSchema);