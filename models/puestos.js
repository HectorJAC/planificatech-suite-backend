module.exports = (sequelize, DataTypes) => {
    const puestos = sequelize.define('puestos', {
        id_puesto: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre_puesto: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        descripcion_puesto: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null
        },
        estado: {
            type: DataTypes.STRING(120),
            allowNull: false,
            defaultValue: 'ACTIVO',
        },
    },{
        timestamps: false
    });
    return puestos;
};