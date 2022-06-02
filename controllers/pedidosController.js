const Pedidos = require('../models/Pedidos');

//32. nuevo pedidos
exports.nuevoPedido =  async(req, res, next) =>{
    const pedido = new Pedidos(req.body);

    try {
        await pedido.save();
        res.json({mesnaje: ' Se agrego un nuevo pedido'})
    } catch (error) {
        console.log(error);
        next();
    }
}


//34. muestra todos los pedidos
exports.mostrarPedidos = async (req, res, next) =>{
    try {
        //obtener todos los produtos
        const pedidos = await Pedidos.find({}).populate('cliente').populate({ //populate hace que la consulta se vea todo
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }
}

//36. muestra un pedido por su id
exports.mostrarPedido = async(req, res, next) => {

    const pedido = await Pedidos.findById(req.params.id);

    if(!pedido){
        res.json({mensaje: 'Ese Pedido no existe'});
        next();
    }    
    //mostrar el cliente 
    res.json(pedido);
}

//38. Actualizar pedido por id
exports.actualizarPedido = async(req, res, next) => {
    try {
        let pedido = await Pedidos.findOneAndUpdate(
            {_id : req.params.id},
            req.body,
            {new :true}
        ).populate('cliente').populate({ //populate hace que la consulta se vea todo
            path: 'pedido.producto',
            model: 'Productos'
        });

        res.json(pedido);
    } catch (error) {
        console.log(error);
        next();
    }
}

//40.Elimina un pedido via id
exports.eliminarPedido = async(req, res, next) => {
    try {
        await Pedidos.findByIdAndDelete({_id: req.params.id});

        res.json({mensaje: 'El pedido se ha eliminado'})
    } catch (error) {
        console.log(error);
        next();
    }
}
