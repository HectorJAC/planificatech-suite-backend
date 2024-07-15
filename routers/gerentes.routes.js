const express = require('express');
const router = express.Router();
const gerentesController = require('../controllers/gerentesController');

// Ruta para obtener los datos de un gerente mediante el id_usuario
router.get('/getGerenteByUserId', gerentesController.getGerenteByUserId);

// Ruta para buscar el nombre de la empresa a la que pertenece un gerente
router.get('/getEmpresaByGerenteId', gerentesController.getEmpresaByGerenteId);

// Ruta para obtener todos los gerentes de una empresa
router.get('/getGerentesByCompany', gerentesController.getGerentesByCompany);

// Ruta para crear un gerente
router.post('/createGerente', gerentesController.createGerente);

module.exports = router;