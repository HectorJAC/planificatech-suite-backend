const express = require('express');
const router = express.Router();
const sectorEmpresaController = require('../controllers/sectorEmpresaController');

router.get('/', sectorEmpresaController.getAllSectors);

module.exports = router;