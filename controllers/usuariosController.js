const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//46. registrar usuario
exports.registrarUsuario = async (req, res, next) => {
    //leer los datos del usuario
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);
    try {
        await usuario.save();
        res.json({mensaje: 'Usuario creado correctamente'})
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Hubo un error'});
    }
}

//47. autenticar usuario
exports.autenticarUsuario = async (req, res, next) => {
    ///buscar el usuario
    const {email, password } = req.body;
    const usuario = await Usuarios.findOne({ email });

    if(!usuario){
        //cuando el usuario no existe}
        await res.status(401).json({mensaje: 'Ese usuario no exite'});
        next();
    }else{
        //el usuairo existe verificar si el pass es correcto
        if(!bcrypt.compareSync(password, usuario.password)){
            //el password es incorrecto
            await res.status(401).json({mensaje : 'Password es incorrecto'});
            next();
        }else{
            //el password es correcto
            const token = jwt.sign({
                email : usuario.email,
                nombre: usuario.nombre,
                id: usuario._id
            }, 'LLAVESECRETA', {
                expiresIn: '12h'
            });
            
            //retorna r el token
            res.json({token})
        }
    }
}