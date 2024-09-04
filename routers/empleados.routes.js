const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleadosController');

// Ruta para obtener todos los empleados de una empresa
router.get('/getAllEmployees', empleadosController.getAllEmployees);

// Ruta para obtener un empleado por su ID
router.get('/getEmployeeById', empleadosController.getEmployeeById);

// Ruta para buscar un empleado por su nombre y apellido
router.get('/searchEmployee', empleadosController.searchEmployee);

// Ruta para crear un nuevo empleado
router.post('/createEmployee', empleadosController.createEmployee);

// Ruta para actualizar un empleado
router.put('/updateEmployee', empleadosController.updateEmployee);

// Ruta para obtener la cantidad de empleados por sexo
router.get('/getEmployeesByGender', empleadosController.getEmployeesByGender);

// Ruta para obtener la cantidad de empleados por fecha de ingreso a la empresa
router.get('/getEmployeesByEntryDate', empleadosController.getEmployeesByEntryDate);

// Ruta para obtener la cantidad de empleados por salario
router.get('/getEmployeesBySalary', empleadosController.getEmployeesBySalary);

// Funcion para obtener todos los empleados de una empresa sin paginacion
router.get('/getAllEmployeesNoPagination', empleadosController.getAllEmployeesNoPagination);

module.exports = router;