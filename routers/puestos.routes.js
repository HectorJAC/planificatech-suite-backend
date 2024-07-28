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

// Ruta para inactivar un puesto
router.put('/inactivatePuesto', puestosController.inactivatePuesto);

// Ruta para activar un puesto
router.put('/activatePuesto', puestosController.activatePuesto);

module.exports = router;