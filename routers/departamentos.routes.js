const express = require('express');
const router = express.Router();
const departamentosController = require('../controllers/departamentosController');

// Ruta para obtener la cantidad de empleados por departamento
router.get('/getEmpleadosPorDepartamento', departamentosController.getEmpleadosPorDepartamento);

// Ruta para obtener todos los departamentos de una empresa
router.get('/getDepartamentos', departamentosController.getDepartamentos);

module.exports = router;