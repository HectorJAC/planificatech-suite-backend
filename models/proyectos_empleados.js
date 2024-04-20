module.exports = (sequelize, DataTypes) => {
    const proyectos_empleados = sequelize.define('proyectos_empleados', {
        id_proyectos_empleado: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_empleado: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            references: {
                model: 'empleados',
                key: 'id_empleado'
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
        id_gerente: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            references: {
                model: 'gerentes',
                key: 'id_gerente'
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
    return proyectos_empleados;
};