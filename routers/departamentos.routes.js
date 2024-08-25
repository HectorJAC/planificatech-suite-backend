const express = require('express');
const router = express.Router();
const departamentosController = require('../controllers/departamentosController');

// Ruta para obtener la cantidad de empleados por departamento
router.get('/getEmpleadosPorDepartamento', departamentosController.getEmpleadosPorDepartamento);

// Ruta para obtener todos los departamentos de una empresa
router.get('/getDepartamentos', departamentosController.getDepartamentos);

// Ruta para obtener todos los departamentos inactivos de una empresa
router.get('/getInactiveDepartamentos', departamentosController.getInactiveDepartamentos);

// Ruta para crear un nuevo departamento
router.post('/createDepartment', departamentosController.createDepartment);

// Ruta para inactivar un departamento
router.put('/inactivateDepartment', departamentosController.inactivateDepartment);

// Ruta para inactivar un departamento
router.put('/activateDepartment', departamentosController.activateDepartment);

// Ruta para obtener un solo departamento
router.get('/getOneDepartment', departamentosController.getOneDepartment);

// Ruta para actualizar un departamento
router.put('/updateDepartment', departamentosController.updateDepartment);

// Ruta para buscar los departamentos
router.get('/searchDepartment', departamentosController.searchDepartment);

module.exports = router;