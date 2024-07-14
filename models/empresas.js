
module.exports = (sequelize, DataTypes) => {
    const empresas = sequelize.define('empresas', {
        id_empresa: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre_empresa: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        rnc_empresa: {
            type: DataTypes.BIGINT(19),
            allowNull: false,
        },
        logo_empresa: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null
        },
        fecha_fundacion: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        direccion_empresa: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        numero_telefonico: {
            type: DataTypes.BIGINT(19),
            allowNull: false,
        },
        correo_empresa: {
            type: DataTypes.STRING(120),
            allowNull: true,
            defaultValue: null
        },
        id_director_general: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            references: {
                model: 'director_general',
                key: 'id_director_general'
            }
        },
        estado: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'ACTIVO'
        }
    },{
        timestamps: false
    });
    return empresas;
};