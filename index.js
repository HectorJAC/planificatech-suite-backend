const express = require('express');
const cors = require('cors');
const db = require('./models');
const port = require('./config/port');

const app = express();
app.use(express.json());
app.use(cors());

// Routes

// Login
const loginRoutes = require('./routers/login.routes');
app.use('/login', loginRoutes);

// Forget password
const forgetPasswordRoutes = require('./routers/forgetPassword.routes');
app.use('/forget_password', forgetPasswordRoutes);

// Usuarios
const usuariosRoutes = require('./routers/usuarios.routes');
app.use('/usuarios', usuariosRoutes);

// Notas
const notasRoutes = require('./routers/notas.routes');
app.use('/notas', notasRoutes);

// Director General
const directorGeneralRoutes = require('./routers/directorGeneral.routes');
app.use('/director_general', directorGeneralRoutes);

// Gerentes
const gerentesRoutes = require('./routers/gerentes.routes');
app.use('/gerentes', gerentesRoutes);

// Empresas
const empresasRoutes = require('./routers/empresas.routes');
app.use('/empresas', empresasRoutes);

// Departamentos
const departamentosRoutes = require('./routers/departamentos.routes');
app.use('/departamentos', departamentosRoutes);

// Empleados
const empleadosRoutes = require('./routers/empleados.routes');
app.use('/empleados', empleadosRoutes);

// Puestos
const puestosRoutes = require('./routers/puestos.routes');
app.use('/puestos', puestosRoutes);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
});