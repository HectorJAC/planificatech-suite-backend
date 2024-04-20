const director_general = require('../models');

// Función para cambiar la contraseña
exports.forgetPassword = async (req, res) => {
    const { username, password } = req.body;
    try {
        const directorGeneral = await director_general.sequelize.models.director_general.findOne({
            where: {
                username: username
            }
        });
        if (directorGeneral !== null) {
            await director_general.sequelize.models.director_general.update({
                password: password
            }, {
                where: {
                    username: username
                }
            });

            return res.status(200).send({ message: 'Contraseña actualizada correctamente' });
        } else {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};