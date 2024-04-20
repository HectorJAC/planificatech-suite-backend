module.exports = (sequelize, DataTypes) => {
    const departamentos = sequelize.define('departamentos', {
        id_departamento: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre_departamento: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        descripcion_departamento: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        presupuesto_asignado: {
            type: DataTypes.BIGINT(19),
            allowNull: false,
        },
        id_gerente: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            defaultValue: null,
            references: {
                model: 'gerentes',
                key: 'id_gerente'
            }
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
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'ACTIVO'
        }
    },{
        timestamps: false
    });
    return departamentos;
};
