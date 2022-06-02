const express = require('express');
const router = express.Router();
//controllers
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

//49. middle ware para proteger rutas
const auth = require('../middleware/auth');

module.exports = function(){

    //*Clientes*//
    //6. Agrega nuevos clientes via Post
    router.post('/clientes', 
        auth,
        clienteController.nuevoCliente);

    //9. obtener clientes
    router.get('/clientes',
        auth,
        clienteController.mostrarClientes);

    //11. muestra un cliente por id
    router.get('/clientes/:id', 
        auth,
        clienteController.mostrarCliente);

    //13. Actualizar un cliente 
    router.put('/clientes/:id', 
        auth,
        clienteController.actualizarCliente);

    //15. eliminar un cliente por id
    router.delete('/clientes/:id', 
        auth,
        clienteController.eliminarCliente);

    //**Productos**//
    //18. agregar un producto
    router.post('/productos', 
        auth,
        productosController.subirArchivo,
        productosController.nuevoProducto
    );

    //22. mostrar productos
    router.get('/productos', 
        auth,
        productosController.mostrarProductos);

        
    //24. mostrar producto por id
    router.get('/productos/:id', 
        auth,
        productosController.mostrarProducto);

    //26- actualizar productos
    router.put('/productos/:id', 
        auth,
        productosController.subirArchivo,
        productosController.actualizarProducto
    );
    //28. eliminar un producto por id
    router.delete('/productos/:id', 
        auth,
        productosController.eliminarProducto);

    //42.busqueda de productos
    router.post('/productos/busqueda/:query', 
        auth,
        productosController.buscarProducto);

    
    //** Pedidos **//
    //31. creando un nuevo pedido

    //31.1 router.post('/pedidos', 
    //     // auth,
    //     pedidosController.nuevoPedido);

    //31.2
    router.post('/pedidos/nuevo/:id', 
        auth,
    pedidosController.nuevoPedido);
    
    //33. mostar pedidos
    router.get('/pedidos', 
        auth,
        pedidosController.mostrarPedidos);
    //35. mostrar pedido por id
    router.get('/pedidos/:id', 
        auth,   
        pedidosController.mostrarPedido);

    //37. Actualizar pedidos
    router.put('/pedidos/:id', 
        auth,
        pedidosController.actualizarPedido);
    //39. eliminar un producto por id
    router.delete('/pedidos/:id', 
        auth,
        pedidosController.eliminarPedido);

    
    //Usuarios
    //44.
    router.post('/crear-cuenta',
        auth,
        usuariosController.registrarUsuario
    );

    //45. 
    router.post('/iniciar-sesion',
        usuariosController.autenticarUsuario
    );
 
    return router;
}