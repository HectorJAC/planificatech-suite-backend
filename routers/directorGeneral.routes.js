const express = require('express');
const router = express.Router();
const directorGeneralController = require('../controllers/directorGeneralController');

// Ruta para obtener los datos de un director general mediante el id_usuario
router.get('/getDirectorGeneralByUserId', directorGeneralController.getDirectorGeneralByUserId);

// Ruta para obtener todos los datos de un director general
router.get('/getDirectorGeneral', directorGeneralController.getDirectorGeneral);

// Ruta para crear un director general
router.post('/createDirectorGeneral', directorGeneralController.createDirectorGeneral);

// Ruta para actualizar los datos de un director general
router.put('/updateDirectorGeneral', directorGeneralController.updateDirectorGeneral);

module.exports = router;