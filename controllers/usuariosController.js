const usuarios = require('../models');

// Funcion para crear usuario 
exports.createUser = async (req, res) => {
    const { username, password, tipo_usuario } = req.body;
    try {
        const usuario = await usuarios.sequelize.models.usuarios.create({
            username: username,
            password: password,
            tipo_usuario: tipo_usuario,
            estado: 'ACTIVO'
        });

        return res.status(201).send({ message: 'Usuario creado exitosamente', usuario: usuario });

    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para obtener los datos de un solo usuario
exports.getUser = async (req, res) => {
    const { id_usuario } = req.query;
    try {
        const usuario = await usuarios.sequelize.models.usuarios.findOne({
            where: { 
                id_usuario: id_usuario
            }
        });

        if (usuario !== null) {
            return res.status(200).send(usuario);
        } else {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const usuariosData = await usuarios.sequelize.models.usuarios.findAll();
        return res.status(200).send(usuariosData);
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};
