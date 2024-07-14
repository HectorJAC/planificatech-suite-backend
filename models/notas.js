module.exports = (sequelize, DataTypes) => {
    const notas = sequelize.define('notas', {
        id_nota: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        titulo_nota: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        descripcion_nota: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        fecha_creacion_nota: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        id_usuario: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            references: {
                model: 'usuarios',
                key: 'id_usuario'
            }
        },
        estado: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'ACTIVO'
        },
    },{
        tableName: 'notas',
        timestamps: false
    });
    return notas;
};


