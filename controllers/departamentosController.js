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
    const { id_empresa } = req.query;
    try {
        const departamentosEmpresa = await departamentos.sequelize.models.departamentos.findAll({
            where: {
                id_empresa: id_empresa
            }
        });
        return res.status(200).send(departamentosEmpresa);
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};