const Clientes = require('../models/clientes');

//7. agrega un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body);
    
    try {
        //almacenar el registro
        await cliente.save();
        res.json({mensaje: 'Se agrego un nuevo cliente'});
    } catch (error) {
        //errores
        res.send(error);
        // console.log(error);
        next();
    }
}
//10. muestra todos los clientes
exports.mostrarClientes = async(req, res, next) => {

    try {
        const clientes = await Clientes.find({});
        res.json(clientes)
    } catch (error) {   
        console.log(error);
        next();
    }
}

//12. muestra un cliente por su id
exports.mostrarCliente = async(req, res, next) => {
    try {
        const cliente = await Clientes.findById(req.params.id);
        //mostrar el cliente 
        res.json(cliente);
        
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Ese Cliente no existe'});
        next();
    }
}
//14. actualiza un ciente por su id
exports.actualizarCliente = async(req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate(
            {_id : req.params.id}, 
            req.body, 
            {new: true}
        );
        res.json(cliente);
    } catch (error) {
        console.log(error);
        next();
    }
}
//16. eliminar un cliente por id
exports.eliminarCliente = async(req, res, next) => {
    try {
        await Clientes.findOneAndDelete(
            {_id : req.params.id}
        )
        res.json({mensaje: 'El cliente se ha eliminado'})
    } catch (error) {
        console.log(error);
        next();

    }
}
