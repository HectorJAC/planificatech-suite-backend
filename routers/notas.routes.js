const express = require('express');
const router = express.Router();
const notasController = require('../controllers/notasController');

// Ruta para crear una nota
router.post('/createNote', notasController.createNote);

// Ruta para obtener las notas de un usuario
router.get('/getNotesByUser', notasController.getNotasByUser);

// Ruta para modificar una nota
router.put('/updateNote', notasController.updateNote);

// Ruta para eliminar una nota
router.delete('/deleteNote', notasController.deleteNote);

// Ruta para obtener una nota
router.get('/getNote', notasController.getNote);

// Ruta para buscar una nota de un usuario por su titulo o descripcion
router.get('/searchNote', notasController.searchNote);

module.exports = router;