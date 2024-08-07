const notas = require('../models');

// Funcion para crear un nueva nota
exports.createNote = async (req, res) => {
    const { titulo_nota, descripcion_nota, fecha_creacion_nota, id_usuario, estado } = req.body;
    try {
        const nota = await notas.sequelize.models.notas.create({
            titulo_nota: titulo_nota,
            descripcion_nota: descripcion_nota,
            fecha_creacion_nota: fecha_creacion_nota,
            id_usuario: id_usuario,
            estado: 'ACTIVO'
        });
        return res.status(200).send({ message: 'Nota creada correctamente', nota: nota });
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para obtener todas las notas de un usuario
exports.getNotasByUser = async (req, res) => {
    const { id_usuario } = req.query;
    try {
        const notasUsuario = await notas.sequelize.models.notas.findAll({
            where: {
                id_usuario: id_usuario
            }
        });
        return res.status(200).send(notasUsuario);
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para eliminar una nota
exports.deleteNote = async (req, res) => {
    const { id_nota } = req.query;
    try {
        await notas.sequelize.models.notas.destroy({
            where: {
                id_nota: id_nota
            }
        });
        return res.status(200).send({ message: 'Nota eliminada correctamente' });
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para obtener una nota
exports.getNote = async (req, res) => {
    const { id_nota } = req.query;
    try {
        const nota = await notas.sequelize.models.notas.findOne({
            where: {
                id_nota: id_nota
            }
        });
        if (nota !== null) {
            return res.status(200).send(nota);
        } else {
            return res.status(404).send({ message: 'No se encontraron datos de la nota' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};
