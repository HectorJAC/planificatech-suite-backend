const departamentos = require('../models');

// Funcion para obtener la cantidad de empleados por departamento
exports.getEmpleadosPorDepartamento = async (req, res) => {
    try {
        const empleadosPorDepartamento = await departamentos.sequelize.query(
            `SELECT 
                departamentos.nombre_departamento AS departamento,
                COUNT(empleados.id_empleado) AS cantidad_empleados
            FROM empleados
            INNER JOIN departamentos ON empleados.id_departamento = departamentos.id_departamento
            GROUP BY departamentos.nombre_departamento`,
            { type: departamentos.sequelize.QueryTypes.SELECT }
        );
        return res.status(200).send(empleadosPorDepartamento);
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para obtener todos los departamentos de una empresa
exports.getDepartamentos = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 9; // Cantidad de resultados por página

    const { id_empresa } = req.query;
    try {
        // Consulta para obtener la cantidad total de empleados
        const totalDepartments = await departamentos.sequelize.models.departamentos.count({
            where: {    
                id_empresa: id_empresa,
                estado: 'ACTIVO'
            }
        });

        const totalPages = Math.ceil(totalDepartments / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const departamentosEmpresa = await departamentos.sequelize.query(`
            SELECT
                d.*
            FROM
                departamentos d
            WHERE
                d.id_empresa = ${id_empresa} AND d.estado = 'ACTIVO'
            LIMIT 
                ${limit} OFFSET ${offset}`, 
            { type: departamentos.sequelize.QueryTypes.SELECT } 
            );
            if (departamentosEmpresa.length === 0) {
                return res.status(404).send({ message: 'No se encontraron departamentos' });
            } else {
                return res.status(200).json({
                    totalDepartments: totalDepartments,
                    totalPages: totalPages,
                    currentPage: page,
                    pageSize: limit,
                    departments: departamentosEmpresa,
                });
            }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para obtener todos los departamentos inactivos de una empresa
exports.getInactiveDepartamentos = async (req, res) => {
    const { id_empresa } = req.query;
    try {
        const departamentosEmpresa = await departamentos.sequelize.models.departamentos.findAll({
            where: {
                id_empresa: id_empresa,
                estado: 'INACTIVO'
            }
        });
        if (departamentosEmpresa.length > 0) {
            return res.status(200).send(departamentosEmpresa);
        } else {
            return res.status(404).send({ message: 'No se encontraron departamentos inactivos' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para crear un nuevo departamento
exports.createDepartment = async (req, res) => {
    const { nombre_departamento, descripcion_departamento, presupuesto_asignado, id_gerente, id_empresa } = req.body;
    try {
        const nuevoDepartamento = await departamentos.sequelize.models.departamentos.create({
            nombre_departamento: nombre_departamento,
            descripcion_departamento: descripcion_departamento,
            presupuesto_asignado: presupuesto_asignado,
            id_gerente: id_gerente,
            id_empresa: id_empresa,
            estado: 'ACTIVO'
        });
        return res.status(201).send({ message: 'Departamento creado correctamente', departamento: nuevoDepartamento });
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para inactivar un departamento
exports.inactivateDepartment = async (req, res) => {
    const { id_departamento } = req.body;
    try {
        const departamentoInactivado = await departamentos.sequelize.models.departamentos.update({
            estado: 'INACTIVO'
        }, {
            where: {
                id_departamento: id_departamento
            }
        });
        if (departamentoInactivado > 0) {
            return res.status(200).send({ message: 'Departamento inactivado correctamente', departamento: departamentoInactivado});
        } else {
            return res.status(404).send({ message: 'Error inactivando el departamento', departamento: departamentoInactivado});
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para activar un departamento
exports.activateDepartment = async (req, res) => {
    const { id_departamento } = req.body;
    try {
        const departamentoActivado = await departamentos.sequelize.models.departamentos.update({
            estado: 'ACTIVO'
        }, {
            where: {
                id_departamento: id_departamento
            }
        });
        if (departamentoActivado > 0) {
            return res.status(200).send({ message: 'Departamento activado correctamente', departamento: departamentoActivado});
        } else {
            return res.status(404).send({ message: 'Error activando el departamento', departamento: departamentoActivado});
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para obtener un solo departamento
exports.getOneDepartment = async (req, res) => {
    const { id_departamento } = req.query;
    try {
        const departamento = await departamentos.sequelize.models.departamentos.findOne({
            where: {
                id_departamento: id_departamento
            }
        });
        if (departamento) {
            return res.status(200).send(departamento);
        } else {
            return res.status(404).send({ message: 'Departamento no encontrado' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para actualizar un departamento
exports.updateDepartment = async (req, res) => {
    const { id_departamento, nombre_departamento, descripcion_departamento, presupuesto_asignado, id_gerente } = req.body;
    try {
        const departamentoActualizado = await departamentos.sequelize.models.departamentos.update({
            nombre_departamento: nombre_departamento,
            descripcion_departamento: descripcion_departamento,
            presupuesto_asignado: presupuesto_asignado,
            id_gerente: id_gerente,
            estado: 'ACTIVO'
        }, {
            where: {
                id_departamento: id_departamento
            }
        });
        if (departamentoActualizado > 0) {
            return res.status(200).send({ message: 'Departamento actualizado correctamente', departamento: departamentoActualizado});
        } else {
            return res.status(404).send({ message: 'Error actualizando el departamento'});
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para buscar un departamento por su departamento, descripcion o gerente
exports.searchDepartment = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 9; // Cantidad de resultados por página

    const { id_empresa, search } = req.query;
    try {
        // Consulta para obtener la cantidad total de empleados
        const totalDepartments = await departamentos.sequelize.models.departamentos.count({
            where: {    
                id_empresa: id_empresa,
                estado: 'ACTIVO'
            }
        });

        const totalPages = Math.ceil(totalDepartments / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const departamentosEmpresa = await departamentos.sequelize.query(`
            SELECT
                d.*
            FROM
                departamentos d
            WHERE
                d.nombre_departamento LIKE '%${search}%' OR
                d.descripcion_departamento LIKE '%${search}%'
            LIMIT 
                ${limit} OFFSET ${offset}`, 
            { type: departamentos.sequelize.QueryTypes.SELECT } 
        );
        if (departamentosEmpresa.length === 0) {
            return res.status(404).send({ message: 'No se encontraron departamentos' });
        } else {
            return res.status(200).json({
                totalDepartments: totalDepartments,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                departments: departamentosEmpresa,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};
