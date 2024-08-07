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
        id_usuario_creacion: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            references: {
                model: 'usuarios',
                key: 'id_usuario'
            }
        },
        id_usuario_actualizacion: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            references: {
                model: 'usuarios',
                key: 'id_usuario'
            }
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