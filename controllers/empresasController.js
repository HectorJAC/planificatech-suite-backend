const empresas = require('../models');

// Funcion para buscar todas las empresas
exports.findAllCompany = async (req, res) => {
    try {
        const empresa = await empresas.sequelize.models.empresas.findAll();
        return res.status(200).send(empresa);
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para buscar si existe una empresa relacionada con un director general
exports.findCompanyByDirector = async (req, res) => {
    const { id_director_general } = req.query;
    try {
        const empresa = await empresas.sequelize.models.empresas.findOne({
            where: {
                id_director_general: id_director_general
            }
        });
        if (empresa !== null) {
            return res.status(200).send(empresa);
        } else {
            return res.status(404).send({ message: 'Usted no tiene ninguna empresa registrada' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Función para crear una empresa
exports.createCompany = async (req, res) => {
    const { 
        nombre_empresa, 
        rnc_empresa, 
        logo_empresa,
        fecha_fundacion, 
        direccion_empresa, 
        numero_telefonico, 
        correo_empresa, 
        id_sector, 
        id_director_general 
    } = req.body;

    try {
        const empresa = await empresas.sequelize.models.empresas.create({
            nombre_empresa: nombre_empresa,
            rnc_empresa: rnc_empresa,
            logo_empresa: logo_empresa,
            fecha_fundacion: fecha_fundacion,
            direccion_empresa: direccion_empresa,
            numero_telefonico: numero_telefonico,
            correo_empresa: correo_empresa,
            id_sector: id_sector,
            id_director_general: id_director_general,
            estado: 'ACTIVO'
        });

        return res.status(201).send({ message: 'Empresa registrasa correctamente', empresa });
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para asegurar que la empresa creada no tenga el mimso rnc que otra empresa ya registrada
exports.verifyRNC = async (req, res) => {
    const { rnc_empresa } = req.query;
    try {
        const empresa = await empresas.sequelize.models.empresas.findOne({
            where: {
                rnc_empresa: rnc_empresa
            }
        });
        if (empresa !== null) {
            return res.status(200).send({ message: 'Este RNC ya esta registrado', empresa });
        } else {
            return res.status(404).send({ message: 'Este RNC no esta registrado' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor rnc', error: error});
    }
};

// Funcion para editar una empresa
exports.updateCompany = async (req, res) => {
    const { 
        id_empresa,
        nombre_empresa, 
        rnc_empresa, 
        logo_empresa,
        fecha_fundacion, 
        direccion_empresa, 
        numero_telefonico, 
        correo_empresa, 
        id_sector, 
        id_director_general 
    } = req.body;

    try {
        await empresas.sequelize.models.empresas.update({
            nombre_empresa: nombre_empresa,
            rnc_empresa: rnc_empresa,
            logo_empresa: logo_empresa,
            fecha_fundacion: fecha_fundacion,
            direccion_empresa: direccion_empresa,
            numero_telefonico: numero_telefonico,
            correo_empresa: correo_empresa,
            id_sector: id_sector,
            id_director_general: id_director_general
        }, {
            where: {
                id_empresa: id_empresa
            }
        });
        return res.status(200).send({ message: 'Empresa actualizada correctamente' });
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};
