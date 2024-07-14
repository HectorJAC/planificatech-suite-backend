module.exports = (sequelize, DataTypes) => {
    const usuarios = sequelize.define('usuarios', {
        id_usuario: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        tipo_usuario: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'ACTIVO'
        },
    },{
        tableName: 'usuarios',
        timestamps: false
    });
    return usuarios;
};


