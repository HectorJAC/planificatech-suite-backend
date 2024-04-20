const empleados = require('../models');
const departamentos = require('../models');

// Funcion para obtener todos los empleados de una misma empresa
exports.getAllEmployees = async (req, res) => {
    const { id_empresa } = req.query;
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 4; // Cantidad de resultados por página, por defecto 4

    try {
        // Consulta para obtener la cantidad total de empleados
        const totalEmployees = await empleados.sequelize.models.empleados.count({
            where: {
                id_empresa: id_empresa
            }
        });

        const totalPages = Math.ceil(totalEmployees / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const employees = await empleados.sequelize.query(`
            SELECT 
                e.*, 
                d.nombre_departamento AS nombre_departamento
            FROM 
                empleados e 
            JOIN 
                departamentos d ON e.id_departamento = d.id_departamento 
            WHERE
                e.id_empresa = ${id_empresa}
            LIMIT 
                ${limit} OFFSET ${offset}`, 
            { type: empleados.sequelize.QueryTypes.SELECT }
        );
        return res.status(200).json({
            totalEmployees: totalEmployees,
            totalPages: totalPages,
            currentPage: page,
            pageSize: limit,
            employees: employees,
        });
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};