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
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 9; // Cantidad de resultados por página

    const { id_usuario } = req.query;
    try {
        // Consulta para obtener la cantidad total de notas de un usuario
        const totalNotesByUser = await notas.sequelize.models.notas.count({
            where: {
                id_usuario: id_usuario
            }
        });

        const totalPages = Math.ceil(totalNotesByUser / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const notasUsuario = await notas.sequelize.query(`
            SELECT
                n.*
            FROM
                notas n
            WHERE
                n.id_usuario = ${id_usuario}
            LIMIT 
                ${limit} OFFSET ${offset}`,
            { type: notas.sequelize.QueryTypes.SELECT }
        );
        if (notasUsuario.length === 0) {
            return res.status(404).send({ message: 'No se encontraron notas del usuario' });
        } else {
            return res.status(200).json({
                totalNotesByUser: totalNotesByUser,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                notesByUser: notasUsuario,
            });
        }
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

// Funcion para buscar una nota por su titulo o por su descripcion
exports.searchNote = async (req, res) => {
    const { search, id_usuario } = req.query;
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 9; // Cantidad de resultados por página

    try {
        // Consulta para obtener la cantidad total de notas de un usuario
        const totalNotesByUser = await notas.sequelize.models.notas.count({
            where: {
                id_usuario: id_usuario
            }
        });

        const totalPages = Math.ceil(totalNotesByUser / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const notasUsuario = await notas.sequelize.query(`
            SELECT
                n.*
            FROM
                notas n
            WHERE
                n.titulo_nota LIKE '%${search}%' OR n.descripcion_nota LIKE '%${search}%'
            LIMIT 
                ${limit} OFFSET ${offset}`,
            { type: notas.sequelize.QueryTypes.SELECT }
        );
        if (notasUsuario.length === 0) {
            return res.status(404).send({ message: 'No se encontraron notas con los terminos buscados' });
        } else {
            return res.status(200).json({
                totalNotesByUser: totalNotesByUser,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                notesByUser: notasUsuario,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para actualizar una nota
exports.updateNote = async (req, res) => {
    const { id_nota, titulo_nota, descripcion_nota } = req.body;
    try {
        await notas.sequelize.models.notas.update({
            titulo_nota: titulo_nota,
            descripcion_nota: descripcion_nota
        }, {
            where: {
                id_nota: id_nota
            }
        });
        return res.status(200).send({ message: 'Nota actualizada correctamente' });
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};
