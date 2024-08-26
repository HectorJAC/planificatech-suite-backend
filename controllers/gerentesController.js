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
            `SELECT e.*
            FROM empresas e
            INNER JOIN gerentes g ON e.id_empresa = g.id_empresa
            WHERE g.id_gerente = ${id_gerente}
            LIMIT 1`,
            { type: gerentes.sequelize.QueryTypes.SELECT }
        );
        if (empresa !== null) {
            return res.status(200).send(empresa[0]);
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
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 9; // Cantidad de resultados por página

    const { id_empresa } = req.query;
    try {
        // Consulta para obtener la cantidad total de empleados
        const totalGerentes = await gerentes.sequelize.models.gerentes.count({
            where: {    
                id_empresa: id_empresa
            }
        });

        const totalPages = Math.ceil(totalGerentes / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const managers = await gerentes.sequelize.query(`
            SELECT
                g.*
            FROM
                gerentes g
            WHERE
                g.id_empresa = ${id_empresa}
            LIMIT 
                ${limit} OFFSET ${offset}`, 
            { type: gerentes.sequelize.QueryTypes.SELECT } 
        );
        if (managers.length === 0) {
            return res.status(404).send({ message: 'No se encontraron gerentes' });
        } else {
            return res.status(200).json({
                totalGerentes: totalGerentes,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                managers: managers,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para obtener los datos de un gerente mediante el id_gerente
exports.getGerenteById = async (req, res) => {
    const { id_gerente } = req.query;
    try {
        const gerente = await gerentes.sequelize.models.gerentes.findOne({
            where: {
                id_gerente: id_gerente
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

// Funcion para buscar un gerente mediante su cedula, su nombre y apellido
exports.searchGerentes = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 9; // Cantidad de resultados por página

    const { search, id_empresa } = req.query;
    try {
        // Consulta para obtener la cantidad total de empleados
        const totalGerentes = await gerentes.sequelize.models.gerentes.count({
            where: {    
                id_empresa: id_empresa
            }
        });

        const totalPages = Math.ceil(totalGerentes / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const managers = await gerentes.sequelize.query(`
            SELECT
                g.*
            FROM
                gerentes g
            WHERE
                g.nombres LIKE '%${search}%' OR 
                g.apellidos LIKE '%${search}%' OR 
                g.cedula LIKE '%${search}%' AND
                g.id_empresa = ${id_empresa}
            LIMIT 
                ${limit} OFFSET ${offset}`, 
            { type: gerentes.sequelize.QueryTypes.SELECT } 
        );
        if (managers.length === 0) {
            return res.status(404).send({ message: 'No se encontraron gerentes' });
        } else {
            return res.status(200).json({
                totalGerentes: totalGerentes,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                managers: managers,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};