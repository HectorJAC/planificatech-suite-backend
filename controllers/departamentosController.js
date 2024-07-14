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
        if (departamentosEmpresa.length > 0) {
            return res.status(200).send(departamentosEmpresa);
        } else {
            return res.status(404).send({ message: 'No se encontraron departamentos' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};