const usuarios = require('../models');
const { sign } = require('jsonwebtoken');

// Función para el inicio de sesión
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const usuario = await usuarios.sequelize.models.usuarios.findOne({
            where: {
                username: username,
                password: password
            }
        });

        if (usuario !== null) {
            const accessToken = sign({
                username: usuario.username,
                id: usuario.id_usuario
            }, 'secretkey');

            return res.status(200).send({ 
                message: 'Inicio de sesión exitoso',
                accessToken: accessToken,
                username: usuario.username,
                id_usuario: usuario.id_usuario,
                tipo_usuario: usuario.tipo_usuario
            });
        } else {
            return res.status(404).send({ message: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};