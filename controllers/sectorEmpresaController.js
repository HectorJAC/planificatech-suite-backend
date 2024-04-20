const sector_empresa = require('../models');

// Función para obtener todos los sectores de empresa
exports.getAllSectors = async (req, res) => {
    try {
        const sectors = await sector_empresa.sequelize.models.sector_empresas.findAll();
        return res.status(200).send(sectors);
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error});
    }
};