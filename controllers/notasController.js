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