const director_general = require('../models');
const { sign } = require('jsonwebtoken');

// Función para el inicio de sesión
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const directorGeneral = await director_general.sequelize.models.director_general.findOne({
            where: {
                username: username,
                password: password
            }
        });
        if (directorGeneral !== null) {
            const accessToken = sign({
                username: directorGeneral.username,
                id: directorGeneral.id_director_general
            }, 'secretkey');

            return res.status(200).send({ 
                message: 'Inicio de sesión exitoso',
                accessToken: accessToken,
                username: directorGeneral.username,
                id_director_general: directorGeneral.id_director_general
             });

        } else {
            return res.status(404).send({ message: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};