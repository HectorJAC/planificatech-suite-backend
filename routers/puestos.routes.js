const express = require('express');
const router = express.Router();
const puestosController = require('../controllers/puestosController');

// Ruta para obtener todos los puestos activos
router.get('/getPuestos', puestosController.getPuestos);

// Ruta para obtener todos los puestos inactivos
router.get('/getPuestosInactivos', puestosController.getPuestosInactivos);

// Ruta para crear un puesto
router.post('/createPuesto', puestosController.createPuesto);

// Ruta para obtener un puesto
router.get('/getPuesto', puestosController.getPuesto);

module.exports = router;