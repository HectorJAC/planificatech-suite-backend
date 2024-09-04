const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectosController');

// Ruta para obtener todos los proyectos de una empresa
router.get('/getAllProjects', proyectosController.getAllProjects);

// Ruta para obtener un proyecto por su id con los datos del departamento
router.get('/getProjectById', proyectosController.getProjectById);

// Ruta para obtener un proyecto por su id con los datos del empleado
router.get('/getProjectEmployeeById', proyectosController.getProjectEmployeeById);

// Ruta para obtener la cantidad de proyectos por su estado_proyecto
router.get('/getProjectsByStatus', proyectosController.getProjectsByStatus);

// Ruta para obtener los datos de un proyecto
router.get('/getOneProject', proyectosController.getOneProject);

// Ruta para obtener la cantidad de tareas de un proyecto
router.get('/getTasksProjectByStatus', proyectosController.getTasksProjectByStatus);

// Ruta para obtener todos los datos de la tabla proyectos_empleados mediante el id_proyecto
router.get('/getProjectsEmployees', proyectosController.getProjectsEmployees);

// Ruta para agregar un empleado a la tabla proyectos_empleados
router.post('/addEmployeeToProject', proyectosController.addEmployeeToProject);

// Ruta para agregar un departamento a la tabla proyectos_departamentos
router.post('/addDepartmentToProject', proyectosController.addDepartmentToProject);

// Ruta para obtener todos los empleados de un proyecto
router.get('/getEmployeesByProject', proyectosController.getEmployeesByProject);

// Ruta para obtener todos los departamentos de un proyecto
router.get('/getDepartmentsByProject', proyectosController.getDepartmentsByProject);

// Ruta para obtener todos los proyectos por estado_proyecto
router.get('/getAllProjectsByStatus', proyectosController.getAllProjectsByStatus);

// Ruta para buscar un proyecto por su id o nombre
router.get('/searchProject', proyectosController.searchProject);

// Ruta para obtener la cantidad de tareas por estado de todos los proyectos
router.get('/getAllTasksByStatus', proyectosController.getAllTasksByStatus);

// Ruta para actualizar un proyecto
router.put('/updateProject', proyectosController.updateProject);

// Ruta para crear un proyecto
router.post('/createProject', proyectosController.createProject);

// Ruta para obtener la cantidad de proyectos enviandole su estado_proyecto
router.get('/getCantProjectsByStatus', proyectosController.getCantProjectsByStatus);

// Ruta para agregar una tarea a la tabla tareas_proyectos
router.post('/addTaskToProject', proyectosController.addTaskToProject);

// Ruta para obtener los datos de una tarea de un proyecto
router.get('/getTaskProjectById', proyectosController.getTaskProjectById);

// Ruta para actualizar una tarea de un proyecto
router.put('/updateTaskFromProject', proyectosController.updateTaskFromProject);

// Ruta para eliminar una tarea de un proyecto
router.put('/inactivateTaskFromProject', proyectosController.inactivateTaskFromProject);

module.exports = router;