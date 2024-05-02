const director_general = require('../models');

// Funcion para obtener los datos de un director general mediante el id_usuario
exports.getDirectorGeneralByUserId = async (req, res) => {
    const { id_usuario } = req.query;
    try {
        const directorGeneral = await director_general.sequelize.models.director_general.findOne({
            where: {
                id_usuario: id_usuario
            }
        });
        if (directorGeneral !== null) {
            return res.status(200).send(directorGeneral);
        } else {
            return res.status(404).send({ message: 'No se encontraron datos del director general' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para obtener todos los datos de un director general
exports.getDirectorGeneral = async (req, res) => {
    const { id_director_general } = req.query;
    try {
        const directorGeneral = await director_general.sequelize.models.director_general.findOne({
            where: {
                id_director_general: id_director_general
            }
        });
        if (directorGeneral !== null) {
            return res.status(200).send(directorGeneral);
        } else {
            return res.status(404).send({ message: 'No se encontraron datos del director general' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para crear un director general
exports.createDirectorGeneral = async (req, res) => {
    const { 
        id_usuario, 
        nombres, 
        apellidos, 
        cedula, 
        sexo,
        lugar_nacimiento, 
        fecha_nacimiento, 
        direccion_residencia, 
        numero_telefonico, 
        correo, 
        estado_civil, 
        nivel_academico,
    } = req.body;
    try {
        await director_general.sequelize.models.director_general.create({
            id_usuario: id_usuario,
            nombres: nombres,
            apellidos: apellidos,
            cedula: cedula,
            sexo: sexo,
            lugar_nacimiento: lugar_nacimiento,
            fecha_nacimiento: fecha_nacimiento,
            direccion_residencia: direccion_residencia,
            numero_telefonico: numero_telefonico,
            correo: correo,
            estado_civil: estado_civil,
            nivel_academico: nivel_academico,
            estado: 'ACTIVO'
        });
        return res.status(201).send({ message: 'Director general creado correctamente' });
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para actualizar los datos de un director general
exports.updateDirectorGeneral = async (req, res) => {
    const { 
        id_director_general, 
        id_usuario, 
        nombres, 
        apellidos, 
        cedula, 
        lugar_nacimiento, 
        fecha_nacimiento, 
        direccion_residencia, 
        numero_telefonico, 
        correo, 
        estado_civil, 
        nivel_academico 
    } = req.body;
    try {
        await director_general.sequelize.models.director_general.update({
            id_usuario: id_usuario,
            nombres: nombres,
            apellidos: apellidos,
            cedula: cedula,
            lugar_nacimiento: lugar_nacimiento,
            fecha_nacimiento: fecha_nacimiento,
            direccion_residencia: direccion_residencia,
            numero_telefonico: numero_telefonico,
            correo: correo,
            estado_civil: estado_civil,
            nivel_academico: nivel_academico
        }, {
            where: {
                id_director_general: id_director_general
            }
        });
        return res.status(200).send({ message: 'Datos actualizados correctamente' });
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};
