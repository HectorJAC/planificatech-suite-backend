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
    const { id_puesto } = req.query;
    try {
        const puesto = await puestos.sequelize.models.puestos.findOne({
            where: {
                id_puesto: id_puesto
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

// Funcion para inactivar un puesto
exports.inactivatePuesto = async (req, res) => {
    const { id_puesto } = req.body;
    try {
        const puestoInactivado = await puestos.sequelize.models.puestos.update({
            estado: 'INACTIVO'
        }, {
            where: {
                id_puesto: id_puesto
            }
        });
        if (puestoInactivado > 0) {
            return res.status(200).send({ message: 'Puesto inactivado correctamente', puesto: puestoInactivado});
        } else {
            return res.status(404).send({ message: 'Error inactivando el puesto', puesto: puestoInactivado});
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};

// Funcion para activae un puesto
exports.activatePuesto = async (req, res) => {
    const { id_puesto } = req.body;
    try {
        const puestoActivado = await puestos.sequelize.models.puestos.update({
            estado: 'ACTIVO'
        }, {
            where: {
                id_puesto: id_puesto
            }
        });
        if (puestoActivado > 0) {
            return res.status(200).send({ message: 'Puesto inactivado correctamente', puesto: puestoActivado});
        } else {
            return res.status(404).send({ message: 'Error inactivando el puesto', puesto: puestoActivado});
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor', error: error });
    }
};
