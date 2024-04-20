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

// Director General
const directorGeneralRoutes = require('./routers/directorGeneral.routes');
app.use('/director_general', directorGeneralRoutes);

// Sectores empresas
const sectorEmpresaRoutes = require('./routers/sectorEmpresa.routes');
app.use('/sector_empresa', sectorEmpresaRoutes);

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