const express = require('express');
const router = express.Router();
const empresasController = require('../controllers/empresasController');

// Ruta para buscar todas las empresas
router.get('/findAllCompany', empresasController.findAllCompany);

// Ruta para buscar si existe una empresa relacionada con un director general
router.get('/findCompanyByDirector', empresasController.findCompanyByDirector);

// Ruta para crear una empresa
router.post('/createCompany', empresasController.createCompany);

// Ruta para asegurar que la empresa creada no tenga el mismo rnc que otra empresa ya registrada
router.get('/verifyRNC', empresasController.verifyRNC);

// Ruta para editar una empresa
router.put('/updateCompany', empresasController.updateCompany);

module.exports = router;