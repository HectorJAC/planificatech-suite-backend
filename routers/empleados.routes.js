const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empeladosController');

// Ruta para obtener todos los empleados de una empresa
router.get('/getAllEmployees', empleadosController.getAllEmployees);

module.exports = router;