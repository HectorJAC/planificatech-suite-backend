const gerentes = require('../models');

// Funcion para obtener los datos de un gerente mediante el id_usuario
exports.getGerenteByUserId = async (req, res) => {
    const { id_usuario } = req.query;
    try {
        const gerente = await gerentes.sequelize.models.gerentes.findOne({
            where: {
                id_usuario: id_usuario
            }
        });
        if (gerente !== null) {
            return res.status(200).send(gerente);
        } else {
            return res.status(404).send({ message: 'No se encontraron datos del gerente' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para buscar el nombre de la empresa a la que pertenece un gerente
exports.getEmpresaByGerenteId = async (req, res) => {
    const { id_gerente } = req.query;
    try {
        const empresa = await gerentes.sequelize.query(
            `SELECT empresas.nombre_empresa
            FROM empresas
            INNER JOIN gerentes ON empresas.id_empresa = gerentes.id_empresa
            WHERE gerentes.id_gerente = ${id_gerente}`,
            { type: gerentes.sequelize.QueryTypes.SELECT }
        );
        if (empresa !== null) {
            return res.status(200).send(empresa);
        } else {
            return res.status(404).send({ message: 'Usted no esta registrado en una empresa' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para crear un gerente
exports.createGerente = async (req, res) => {
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
        id_empresa,
        fecha_ingreso_empresa
    } = req.body;
    try {
        await gerentes.sequelize.models.gerentes.create({
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
            id_empresa: id_empresa,
            fecha_ingreso_empresa: fecha_ingreso_empresa,
            estado: 'ACTIVO'
        });
        return res.status(201).send({ message: 'Gerente creado correctamente' });
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para obtener todos los gerentes de una empresa
exports.getGerentesByCompany = async (req, res) => {
    const { id_empresa } = req.query;
    try {
        const managers = await gerentes.sequelize.models.gerentes.findAll({
            where: {
                id_empresa: id_empresa
            }
        });
        if (managers !== null) {
            return res.status(200).send(managers);
        } else {
            return res.status(404).send({ message: 'No se encontraron gerentes' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};
