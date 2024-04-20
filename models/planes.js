module.exports = (sequelize, DataTypes) => {
    const planes = sequelize.define('planes', {
        id_plan: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre_plan: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        descripcion_plan: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        fecha_fin: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        estado_plan: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        id_empresa: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            references: {
                model: 'empresas',
                key: 'id_empresa'
            }
        },
        estado: {
            type: DataTypes.STRING(120),
            allowNull: false,
            defaultValue: 'ACTIVO'
        }
    },{
        timestamps: false
    });
    return planes;
};