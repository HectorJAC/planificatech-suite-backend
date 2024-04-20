module.exports = (sequelize, DataTypes) => {
    const gerentes = sequelize.define('gerentes', {
        id_gerente: {
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
        id_empresa: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            references: {
                model: 'empresas',
                key: 'id_empresa'
            }
        },
        fecha_ingreso_empresa: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        estado: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'ACTIVO'
        }
    },{
        timestamps: false
    });
    return gerentes;
};