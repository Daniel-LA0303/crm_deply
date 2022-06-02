const Productos = require('../models/Productos');
const multer = require('multer');
const shortid = require('shortid');

//20. configuracion d multer
const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true);
        }else{
            cb(new Error('Formato No valido'));
        }
    }
}
//21. sube un archivo
//Pasar la configuraciony el campo
const upload = multer(configuracionMulter).single('imagen');
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error){
            res.json({mensaje: error})
        }

        return next()
    })
}

//19. agrega nuevos productos
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);


    try {
        if(req.file.filename){
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({mensaje: 'Se agrego un nuevo producto'});
    } catch (error) {
        console.log(error);
        next();
    }
}
//23. muestra todos los productos
exports.mostrarProductos = async (req, res, next) =>{
    try {
        //obtener todos los produtos
        const productos = await Productos.find({})
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
}

//25.muestra producto por id
exports.mostrarProducto = async (req, res, next) =>{
    try {
        const producto = await Productos.findById(req.params.id);
        //mostrar el cliente 
        res.json(producto);
        
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Ese Cliente no existe'});
        next();
    }
}
//27. Actualiza producto por id
exports.actualizarProducto = async(req, res, next) => {
    try {
        
        // construir un nuevo producto
        let nuevoProducto = req.body;
        //verificar si hay una nueva img
        if(req.file){
            nuevoProducto.imagen = req.file.filename;
        }else{
            //actualizando imagen
            let productoAnterior = await Productos.findById(req.params.id);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findByIdAndUpdate(
            {_id: req.params.id},
            nuevoProducto,
            {new: true}
        )
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}
//29. Elimina un producto via id
exports.eliminarProducto = async(req, res, next) => {
    try {
        await Productos.findByIdAndDelete({_id: req.params.id});

        res.json({mensaje: 'El producto se ha eliminado'})
    } catch (error) {
        console.log(error);
        next();
    }
}

//43. buscar producto
exports.buscarProducto = async (req, res, next) => {
    try {
        //obtener el query
        const {query} = req.params;
        const producto = await Productos.find({
            nombre: new RegExp(query, 'i')
        });
        res.json(producto)
    } catch (error) {
        console.log(error);
        next();
    }
}


