module.exports = (sequelize, DataTypes) => {
    const tareas_proyectos = sequelize.define('tareas_proyectos', {
        id_tarea_proyecto: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre_tarea_proyecto: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        descripcion_tarea_proyecto: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        fecha_inicio_tarea_proyecto: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        fecha_fin_tarea_proyecto: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        id_proyecto: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            references: {
                model: 'proyectos',
                key: 'id_proyecto'
            }
        },
        estado_tarea_proyecto: {
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
    return tareas_proyectos;
};