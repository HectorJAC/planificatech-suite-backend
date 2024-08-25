const empleados = require('../models');
const departamentos = require('../models');

// Funcion para obtener todos los empleados de una misma empresa
exports.getAllEmployees = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 4; // Cantidad de resultados por página, por defecto 4

    try {
        // Consulta para obtener la cantidad total de empleados
        const totalEmployees = await empleados.sequelize.models.empleados.count();

        const totalPages = Math.ceil(totalEmployees / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento

        const employees = await empleados.sequelize.query(`
            SELECT 
                e.*, 
                d.nombre_departamento AS nombre_departamento,
                u_creacion.username AS usuario_creacion,
                COALESCE(u_actualizacion.username, '') AS usuario_actualizacion
            FROM 
                empleados e
            JOIN 
                departamentos d ON e.id_departamento = d.id_departamento
            JOIN 
                usuarios u_creacion ON e.id_usuario_creacion = u_creacion.id_usuario
            LEFT JOIN 
                usuarios u_actualizacion ON e.id_usuario_actualizacion = u_actualizacion.id_usuario
            WHERE 
                e.id_empresa = 1
            ORDER BY
                e.id_empleado
            LIMIT 
                ${limit} OFFSET ${offset}`, 
            { type: empleados.sequelize.QueryTypes.SELECT }
        );
        if (employees.length === 0) {
            return res.status(404).send({ message: 'No se encontraron empleados' });
        } else {
            return res.status(200).json({
                totalEmployees: totalEmployees,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                employees: employees,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para obtener un empleado por su ID
exports.getEmployeeById = async (req, res) => {
    const { id_empleado } = req.query;

    try {
        const employee = await empleados.sequelize.query(`
            SELECT 
                e.*, 
                d.nombre_departamento AS nombre_departamento,
                p.nombre_puesto AS nombre_puesto,
                u_creacion.username AS usuario_creacion,
                COALESCE(u_actualizacion.username, '') AS usuario_actualizacion
            FROM 
                empleados e
            JOIN 
                departamentos d ON e.id_departamento = d.id_departamento
            JOIN 
                usuarios u_creacion ON e.id_usuario_creacion = u_creacion.id_usuario
            LEFT JOIN 
                usuarios u_actualizacion ON e.id_usuario_actualizacion = u_actualizacion.id_usuario
            JOIN
                puestos p ON e.id_puesto = p.id_puesto
            WHERE 
                e.id_empleado = ${id_empleado}`, 
            { type: empleados.sequelize.QueryTypes.SELECT }
        );
        if (employee !== null) {
            return res.status(200).json(employee[0]);
        } else {
            return res.status(404).send({ message: 'Empleado no encontrado' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para buscar un empleado por su nombre y apellido, solo por el nombre, solo por el apellido o por su cedula
exports.searchEmployee = async (req, res) => {
    const { search } = req.query;
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 4; // Cantidad de resultados por página, por defecto 4

    try {
        const totalEmployees = await empleados.sequelize.models.empleados.count();

        const totalPages = Math.ceil(totalEmployees / limit); // Calcular el total de páginas
        const offset = (page - 1) * limit; // Calcular el desplazamiento


        const employee = await empleados.sequelize.query(`
            SELECT 
                e.*, 
                d.nombre_departamento AS nombre_departamento,
                u_creacion.username AS usuario_creacion,
                COALESCE(u_actualizacion.username, '') AS usuario_actualizacion
            FROM 
                empleados e
            JOIN 
                departamentos d ON e.id_departamento = d.id_departamento
            JOIN 
                usuarios u_creacion ON e.id_usuario_creacion = u_creacion.id_usuario
            JOIN 
                usuarios u_actualizacion ON e.id_usuario_actualizacion = u_actualizacion.id_usuario
            WHERE 
                (e.nombres LIKE '%${search}%' OR 
                e.apellidos LIKE '%${search}%' OR 
                e.cedula LIKE '%${search}%')
            LIMIT 
                ${limit} OFFSET ${offset}`,  
            { type: empleados.sequelize.QueryTypes.SELECT }
        );
        if (employee.length === 0) {
            return res.status(404).send({ message: 'No se encontraron empleados' });
        } else {
            return res.status(200).json({
                totalEmployees: totalEmployees,
                totalPages: totalPages,
                currentPage: page,
                pageSize: limit,
                employees: employee,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para crear un nuevo empleado
exports.createEmployee = async (req, res) => {
    const { 
        nombres, 
        apellidos, 
        cedula, 
        fecha_ingreso_empresa,
        sexo,
        fecha_nacimiento,
        lugar_nacimiento, 
        direccion_residencia, 
        estado_civil,
        numero_telefonico,
        nivel_academico,
        correo,
        salario,
        id_departamento, 
        id_puesto,
        id_empresa,
        id_usuario_creacion,
        estado,
    } = req.body;

    try {
        await empleados.sequelize.models.empleados.create({
            nombres: nombres,
            apellidos: apellidos,
            cedula: cedula,
            fecha_ingreso_empresa: fecha_ingreso_empresa,
            sexo: sexo,
            fecha_nacimiento: fecha_nacimiento,
            lugar_nacimiento: lugar_nacimiento,
            direccion_residencia: direccion_residencia,
            estado_civil: estado_civil,
            numero_telefonico: numero_telefonico,
            nivel_academico: nivel_academico,
            correo: correo,
            salario: salario,
            id_departamento: id_departamento,
            id_puesto: id_puesto,
            id_empresa: id_empresa,
            id_usuario_creacion: id_usuario_creacion,
            estado: estado,
        });
        return res.status(201).json('Empleado creado correctamente');
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para actualizar un empleado
exports.updateEmployee = async (req, res) => {
    const { 
        id_empleado,
        nombres, 
        apellidos, 
        cedula, 
        fecha_ingreso_empresa,
        sexo,
        fecha_nacimiento,
        lugar_nacimiento, 
        direccion_residencia, 
        estado_civil,
        numero_telefonico,
        nivel_academico,
        correo,
        salario,
        id_departamento, 
        id_puesto,
        id_empresa,
        id_usuario_actualizacion,
        estado,
    } = req.body;

    try {
        const employeeUpdated = await empleados.sequelize.models.empleados.update({
            nombres: nombres,
            apellidos: apellidos,
            cedula: cedula,
            fecha_ingreso_empresa: fecha_ingreso_empresa,
            sexo: sexo,
            fecha_nacimiento: fecha_nacimiento,
            lugar_nacimiento: lugar_nacimiento,
            direccion_residencia: direccion_residencia,
            estado_civil: estado_civil,
            numero_telefonico: numero_telefonico,
            nivel_academico: nivel_academico,
            correo: correo,
            salario: salario,
            id_departamento: id_departamento,
            id_puesto: id_puesto,
            id_empresa: id_empresa,
            id_usuario_actualizacion: id_usuario_actualizacion,
            estado: estado,
        }, {
            where: {
                id_empleado: id_empleado
            }
        });
        if (employeeUpdated > 0) {
            return res.status(200).json('Empleado actualizado correctamente');
        } else {
            return res.status(404).send({ message: 'Error actualizando el empleado' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para obtener la cantidad de empleados por sexo
exports.getEmployeesByGender = async (req, res) => {
    const { id_empresa } = req.query;
    try {
        const employeesByGender = await empleados.sequelize.query(`
            SELECT 
                sexo,
                COUNT(*) AS cantidad_empleados
            FROM 
                empleados
            WHERE 
                id_empresa = ${id_empresa}
            GROUP BY
                sexo`, 
            { type: empleados.sequelize.QueryTypes.SELECT }
        );
        if (employeesByGender.length === 0) {
            return res.status(404).send({ message: 'No se encontraron empleados' });
        } else {
            return res.status(200).json(employeesByGender);
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para obtener la cantidad de empleados por fecha de ingreso a la empresa
exports.getEmployeesByEntryDate = async (req, res) => {
    const { id_empresa } = req.query;
    try {
        const employeesByEntryDate = await empleados.sequelize.query(`
            SELECT 
                fecha_ingreso_empresa,
                COUNT(*) AS cantidad_empleados
            FROM 
                empleados
            WHERE 
                id_empresa = ${id_empresa}
            GROUP BY
                fecha_ingreso_empresa`, 
            { type: empleados.sequelize.QueryTypes.SELECT }
        );
        if (employeesByEntryDate.length === 0) {
            return res.status(404).send({ message: 'No se encontraron empleados' });
        } else {
            return res.status(200).json(employeesByEntryDate);
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};

// Funcion para obtener la cantidad de empleados por salario
exports.getEmployeesBySalary = async (req, res) => {
    const { id_empresa } = req.query;
    try {
        const employeesBySalary = await empleados.sequelize.query(`
            SELECT 
                salario,
                COUNT(*) AS cantidad_empleados
            FROM 
                empleados
            WHERE 
                id_empresa = ${id_empresa}
            GROUP BY
                salario`, 
            { type: empleados.sequelize.QueryTypes.SELECT }
        );
        if (employeesBySalary.length === 0) {
            return res.status(404).send({ message: 'No se encontraron empleados' });
        } else {
            return res.status(200).json(employeesBySalary);
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};