const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Ruta para crear usuario 
router.post('/createUser', usuariosController.createUser);

// Ruta para obtener los datos de un usuario
router.get('/getUser', usuariosController.getUser);

// Ruta para obtener todos los usuarios
router.get('/getAllUsers', usuariosController.getAllUsers);

module.exports = router;