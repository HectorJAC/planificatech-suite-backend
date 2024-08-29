const proyectos = require('../models');
const proyectos_empleados = require('../models');
const proyectos_departamentos = require('../models');

// Funcion para obtener todos los proyectos de una empresa
exports.getAllProjects = async (req, res) => {
    const { id_empresa } = req.query;
    try {
        const proyectosEmpresa = await proyectos.sequelize.query(`
            SELECT
                p.*,
                g.nombres AS nombre_gerente,
                g.apellidos AS apellido_gerente
            FROM
                proyectos p
            JOIN
                gerentes g
            ON
                p.id_gerente = g.id_gerente
            WHERE
                p.id_empresa = ${id_empresa}`,
            { type: proyectos.sequelize.QueryTypes.SELECT }
        );
        if (proyectosEmpresa.length === 0) {
            return res.status(404).send({ message: 'No se encontraron proyectos de la empresa' });
        } else {
            return res.status(200).send(proyectosEmpresa);
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para obtener los datos de un solo proyecto
exports.getOneProject = async (req, res) => {
    const { id_proyecto } = req.query;
    try {
        const proyecto = await proyectos.sequelize.models.proyectos.findOne({
            where: { 
                id_proyecto: id_proyecto
            }
        });

        if (proyecto !== null) {
            return res.status(200).send(proyecto);
        } else {
            return res.status(404).send({ message: 'Proyecto no encontrado' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para obtener un proyecto por su id junto con los datos del departamento
exports.getProjectById = async (req, res) => {
    const { id_proyecto } = req.query;
    try {
        const proyecto = await proyectos.sequelize.query(`
            SELECT
                p.*,
                pd.id_departamento,
                tp.*,
                d.nombre_departamento,
                g.nombres AS nombre_gerente,
                g.apellidos AS apellido_gerente
            FROM
                proyectos p
            JOIN
                proyectos_departamentos pd
            ON
                p.id_proyecto = pd.id_proyecto
            JOIN
                tareas_proyectos tp
            ON
                p.id_proyecto = tp.id_proyecto
            JOIN
                departamentos d
            ON
                pd.id_departamento = d.id_departamento
            JOIN
                gerentes g
            ON
                p.id_gerente = g.id_gerente
            WHERE
                p.id_proyecto = ${id_proyecto}`,
            { type: proyectos.sequelize.QueryTypes.SELECT }
        );
        if (proyecto.length === 0) {
            return res.status(404).send({ message: 'No se encontraron datos del proyecto' });
        } else {
            return res.status(200).send(proyecto);
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para obtener un proyecto por su id junto con los datos del empleado
exports.getProjectEmployeeById = async (req, res) => {
    const { id_proyecto } = req.query;
    try {
        const proyecto = await proyectos.sequelize.query(`
            SELECT
                p.*,
                pe.id_empleado,
                tp.*,
                e.nombres AS nombre_empleado,
                e.apellidos AS apellido_empleado,
                e.cedula AS cedula_empleado,
                e.id_departamento,
                e.fecha_ingreso_empresa AS fecha_ingreso_empleado,
                e.estado AS estado_empleado,
                g.nombres AS nombre_gerente,
                g.apellidos AS apellido_gerente
            FROM
                proyectos p
            JOIN
                proyectos_empleados pe
            ON
                p.id_proyecto = pe.id_proyecto
            JOIN
                tareas_proyectos tp
            ON
                p.id_proyecto = tp.id_proyecto
            JOIN
                empleados e
            ON
                pe.id_empleado = e.id_empleado
            JOIN
                gerentes g
            ON
                p.id_gerente = g.id_gerente
            WHERE
                p.id_proyecto = ${id_proyecto}`,
            { type: proyectos.sequelize.QueryTypes.SELECT }
        );
        if (proyecto.length === 0) {
            return res.status(404).send({ message: 'No se encontraron datos del proyecto' });
        } else {
            return res.status(200).send(proyecto);
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para obtener la cantidad de proyectos por su estado_proyecto
exports.getProjectsByStatus = async (req, res) => {
    const { id_empresa } = req.query;
    try {
        const proyectosEstado = await proyectos.sequelize.query(`
            SELECT
                p.estado_proyecto,
                COUNT(p.estado_proyecto) AS cantidad_proyectos
            FROM
                proyectos p
            WHERE
                p.id_empresa = ${id_empresa}
            GROUP BY
                p.estado_proyecto`,
            { type: proyectos.sequelize.QueryTypes.SELECT }
        );
        if (proyectosEstado.length === 0) {
            return res.status(404).send({ message: 'No se encontraron proyectos de la empresa' });
        } else {
            return res.status(200).send(proyectosEstado);
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para obtener la cantidad de tareas por su estado_tarea de un solo proyecto
exports.getTasksProjectByStatus = async (req, res) => {
    const { id_proyecto } = req.query;
    try {
        const tareasEstado = await proyectos.sequelize.query(`
            SELECT
                tp.estado_tarea_proyecto,
                COUNT(tp.estado_tarea_proyecto) AS cantidad_tareas
            FROM
                tareas_proyectos tp
            WHERE
                tp.id_proyecto = ${id_proyecto}
            GROUP BY
                tp.estado_tarea_proyecto`,
            { type: proyectos.sequelize.QueryTypes.SELECT }
        );
        if (tareasEstado.length === 0) {
            return res.status(404).send({ message: 'No se encontraron tareas del proyecto' });
        } else {
            return res.status(200).send(tareasEstado);
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para obtener todos los datos de la tabla proyectos_empleados mediante el id_proyecto
exports.getProjectsEmployees = async (req, res) => {
    const { id_proyecto } = req.query;
    try {
        const proyectosEmpleados = await proyectos.sequelize.models.proyectos_empleados.findAll({
            where: {
                id_proyecto: id_proyecto
            }
        });
        if (proyectosEmpleados.length === 0) {
            return res.status(404).send({ message: 'No se encontraron empleados en el proyecto' });
        } else {
            return res.status(200).send(proyectosEmpleados);
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para agregar un empleado en la tabla proyectos_empleados
exports.addEmployeeToProject = async (req, res) => {
    const { id_empleado, id_proyecto } = req.body;
    try {
        const proyectoEmpleado = await proyectos_empleados.sequelize.models.proyectos_empleados.create({
            id_empleado: id_empleado,
            id_proyecto: id_proyecto,
            estado: 'ACTIVO'
        });
        if (proyectoEmpleado !== null) {
            return res.status(201).send({ message: 'Empleado agregado al proyecto', proyectoEmpleado });
        } else {
            return res.status(400).send({ message: 'No se pudo agregar el empleado al proyecto' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para agregar un departamento en la tabla proyectos_departamentos
exports.addDepartmentToProject = async (req, res) => {
    const { id_departamento, id_proyecto } = req.body;
    try {
        const proyectoDepartamento = await proyectos_departamentos.sequelize.models.proyectos_departamentos.create({
            id_departamento: id_departamento,
            id_proyecto: id_proyecto,
            estado: 'ACTIVO'
        });
        if (proyectoDepartamento !== null) {
            return res.status(201).send({ message: 'Departamento agregado al proyecto', proyectoDepartamento });
        } else {
            return res.status(400).send({ message: 'No se pudo agregar el departamento al proyecto' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para obtener todos los empledos de un proyecto de la tabla proyectos_empleados
exports.getEmployeesByProject = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 5; // Cantidad de resultados por página, por defecto 4

    const { id_proyecto } = req.query;
    try {
        // Consulta para obtener la cantidad total de empleados
        const totalEmployees = await proyectos_empleados.sequelize.models.proyectos_empleados.count({
            where: {
                id_proyecto: id_proyecto
            }
        });

        const totalPages = Math.ceil(totalEmployees / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const empleadosProyecto = await proyectos.sequelize.query(`
            SELECT
                e.*,
                d.nombre_departamento AS nombre_departamento
            FROM
                proyectos_empleados pe
            JOIN
                empleados e
            ON
                pe.id_empleado = e.id_empleado
            JOIN 
                departamentos d ON e.id_departamento = d.id_departamento
            WHERE
                pe.id_proyecto = ${id_proyecto}
            ORDER BY
                e.id_empleado
            LIMIT 
                ${limit} OFFSET ${offset}`,
            { type: proyectos_empleados.sequelize.QueryTypes.SELECT }
        );
        if (empleadosProyecto.length === 0) {
            return res.status(404).send({ message: 'No se encontraron empleados en el proyecto' });
        } else {
            return res.status(200).json({
                totalEmployees: totalEmployees,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                employees: empleadosProyecto,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para obtener todos los departamentos de un proyecto de la tabla departamentos
exports.getDepartmentsByProject = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 5; // Cantidad de resultados por página, por defecto 4

    const { id_proyecto } = req.query;
    try {
        // Consulta para obtener la cantidad total de departamentos
        const totalDepartments = await proyectos_departamentos.sequelize.models.proyectos_departamentos.count({
            where: {
                id_proyecto: id_proyecto
            }
        });

        const totalPages = Math.ceil(totalDepartments / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const departamentosProyecto = await proyectos.sequelize.query(`
            SELECT
                d.*
            FROM
                proyectos_departamentos pd
            JOIN
                departamentos d
            ON
                pd.id_departamento = d.id_departamento
            WHERE
                pd.id_proyecto = ${id_proyecto}
            ORDER BY
                d.id_departamento
            LIMIT 
                ${limit} OFFSET ${offset}`,
            { type: proyectos_departamentos.sequelize.QueryTypes.SELECT }
        );
        if (departamentosProyecto.length === 0) {
            return res.status(404).send({ message: 'No se encontraron departamentos en el proyecto' });
        } else {
            return res.status(200).json({
                totalDepartments: totalDepartments,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                departments: departamentosProyecto,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para buscar un proyecto mediante el id_proyecto y el nombre_proyecto
exports.searchProject = async (req, res) => {
    const { id_proyecto, nombre_proyecto } = req.query;
    try {
        const proyecto = await proyectos.sequelize.models.proyectos.findOne({
            where: {
                id_proyecto: id_proyecto,
                nombre_proyecto: nombre_proyecto
            }
        });
        if (proyecto !== null) {
            return res.status(200).send(proyecto);
        } else {
            return res.status(404).send({ message: 'Proyecto no encontrado' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};
