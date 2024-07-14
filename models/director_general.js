module.exports = (sequelize, DataTypes) => {
    const director_general = sequelize.define('director_general', {
        id_director_general: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
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
        cedula: {
            type: DataTypes.BIGINT(19),
            allowNull: false,
        },
        nombres: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        apellidos: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        sexo: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        fecha_nacimiento: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        lugar_nacimiento: {
            type: DataTypes.STRING(120),
            allowNull: true,
            defaultValue: null
        },
        direccion_residencia: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null
        },
        estado_civil: {
            type: DataTypes.STRING(120),
            allowNull: true,
            defaultValue: null
        },
        numero_telefonico: {
            type: DataTypes.BIGINT(19),
            allowNull: false,
        },
        correo: {
            type: DataTypes.STRING(120),
            allowNull: true,
            defaultValue: null
        },
        estado: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'ACTIVO'
        },
    },{
        tableName: 'director_general',
        timestamps: false
    });
    return director_general;
};


