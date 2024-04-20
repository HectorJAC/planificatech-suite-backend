module.exports = (sequelize, DataTypes) => {
    const sector_empresas = sequelize.define("sector_empresas", {
        id_sector_empresa: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre_sector: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        descripcion_sector: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'ACTIVO'
        }
    },{
        timestamps: false
    });
    return sector_empresas;
};     