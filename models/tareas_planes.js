module.exports = (sequelize, DataTypes) => {
    const tareas_planes = sequelize.define('tareas_planes', {
        id_tarea_plan: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre_tarea_plan: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        descripcion_tarea_plan: {
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
        id_plan: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            references: {
                model: 'planes',
                key: 'id_plan'
            }
        },
        estado_tarea_plan: {
            type: DataTypes.STRING(20),
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
    return tareas_planes;
};