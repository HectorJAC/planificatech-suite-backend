module.exports = (sequelize, DataTypes) => {
    const proyectos = sequelize.define('proyectos', {
        id_proyecto: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre_proyecto: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        descripcion_proyecto: {
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
        presupuesto_asigando: {
            type: DataTypes.BIGINT(19),
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
        estado_proyecto: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING(120),
            allowNull: false,
            defaultValue: 'ACTIVO'
        }
    },{
        timestamps: false
    });
    return proyectos;
};