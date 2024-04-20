const { Op } = require('sequelize');
const puestos = require('../models');

// Funcion para obtener todos los puestos que esten activos
exports.getPuestos = async (req, res) => {
    try {
        const puestosTrabajo = await puestos.sequelize.models.puestos.findAll({
            where: {
                estado: 'ACTIVO'
            }
        });
        return res.status(200).send(puestosTrabajo);
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para obtener todos los puestos que esten inactivos
exports.getPuestosInactivos = async (req, res) => {
    try {
        const puestosTrabajo = await puestos.sequelize.models.puestos.findAll({
            where: {
                estado: 'INACTIVO'
            }
        });
        return res.status(200).send(puestosTrabajo);
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para crear un puesto
exports.createPuesto = async (req, res) => {
    const { nombre_puesto, descripcion_puesto } = req.body;
    try {
        await puestos.sequelize.models.puestos.create({
            nombre_puesto: nombre_puesto,
            descripcion_puesto: descripcion_puesto,
            estado: 'ACTIVO'
        });
        return res.status(201).send({ message: 'Puesto creado correctamente' });
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para obtener un puesto
exports.getPuesto = async (req, res) => {
    const { nombre_puesto } = req.query;
    try {
        const puesto = await puestos.sequelize.models.puestos.findOne({
            where: {
                nombre_puesto: {[Op.like]: `%${nombre_puesto}%`},
                estado: 'ACTIVO'
            }
        });
        if (puesto !== null) {
            return res.status(200).send(puesto);
        } else {
            return res.status(404).send({ message: 'No se encontraron datos del puesto' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error });
    }
};