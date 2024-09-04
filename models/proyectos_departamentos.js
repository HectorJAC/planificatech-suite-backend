module.exports = (sequelize, DataTypes) => {
    const proyectos_departamentos = sequelize.define('proyectos_departamentos', {
        id_proyectos_departamentos: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_departamento: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            references: {
                model: 'departamentos',
                key: 'id_departamento'
            }
        },
        id_proyecto: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            references: {
                model: 'proyectos',
                key: 'id_proyecto'
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
    return proyectos_departamentos;
};