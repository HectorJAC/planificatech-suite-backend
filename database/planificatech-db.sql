-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               8.2.0 - MySQL Community Server - GPL
-- Server OS:                    Linux
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for planificatech-db
CREATE DATABASE IF NOT EXISTS `planificatech-db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `planificatech-db`;

-- Dumping structure for table planificatech-db.departamentos
CREATE TABLE IF NOT EXISTS `departamentos` (
  `id_departamento` int NOT NULL AUTO_INCREMENT,
  `nombre_departamento` varchar(120) NOT NULL,
  `descripcion_departamento` varchar(255) DEFAULT NULL,
  `presupuesto_asignado` bigint NOT NULL,
  `id_gerente` int DEFAULT NULL,
  `id_empresa` int NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_departamento`),
  KEY `id_gerente` (`id_gerente`),
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `departamentos_ibfk_1` FOREIGN KEY (`id_gerente`) REFERENCES `gerentes` (`id_gerente`),
  CONSTRAINT `departamentos_ibfk_2` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.departamentos: ~4 rows (approximately)
INSERT INTO `departamentos` (`id_departamento`, `nombre_departamento`, `descripcion_departamento`, `presupuesto_asignado`, `id_gerente`, `id_empresa`, `estado`) VALUES
	(3, 'Departamento de Tecnologia', 'Se encarga de la tecnologia en la empresa', 50000, 1, 1, 'ACTIVO'),
	(4, 'Departamento de Recursos Humanos', 'Nuevo Comentario', 50000, 2, 1, 'ACTIVO'),
	(5, 'Departamento de Auditoria', 'Auditar', 40000, NULL, 1, 'ACTIVO'),
	(6, 'Departamento de Negocios', 'Negocios', 25000, NULL, 1, 'ACTIVO');

-- Dumping structure for table planificatech-db.director_general
CREATE TABLE IF NOT EXISTS `director_general` (
  `id_director_general` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `cedula` bigint NOT NULL,
  `nombres` varchar(120) NOT NULL,
  `apellidos` varchar(120) NOT NULL,
  `sexo` varchar(20) NOT NULL,
  `fecha_nacimiento` datetime NOT NULL,
  `lugar_nacimiento` varchar(120) DEFAULT NULL,
  `direccion_residencia` varchar(255) DEFAULT NULL,
  `estado_civil` varchar(120) DEFAULT NULL,
  `numero_telefonico` bigint NOT NULL,
  `correo` varchar(120) DEFAULT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_director_general`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `director_general_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.director_general: ~1 rows (approximately)
INSERT INTO `director_general` (`id_director_general`, `id_usuario`, `cedula`, `nombres`, `apellidos`, `sexo`, `fecha_nacimiento`, `lugar_nacimiento`, `direccion_residencia`, `estado_civil`, `numero_telefonico`, `correo`, `estado`) VALUES
	(1, 1, 12345678901, 'Hector', 'Aramboles', 'masculino', '2001-12-10 00:00:00', 'La Vega', 'La Vega', 'Soltero(a)', 8293258520, 'hector@hotmail.com', 'ACTIVO');

-- Dumping structure for table planificatech-db.empleados
CREATE TABLE IF NOT EXISTS `empleados` (
  `id_empleado` int NOT NULL AUTO_INCREMENT,
  `cedula` bigint NOT NULL,
  `nombres` varchar(120) NOT NULL,
  `apellidos` varchar(120) NOT NULL,
  `sexo` varchar(20) NOT NULL,
  `fecha_nacimiento` datetime NOT NULL,
  `lugar_nacimiento` varchar(120) DEFAULT NULL,
  `direccion_residencia` varchar(255) DEFAULT NULL,
  `estado_civil` varchar(120) DEFAULT NULL,
  `numero_telefonico` bigint NOT NULL,
  `nivel_academico` varchar(120) DEFAULT NULL,
  `correo` varchar(120) DEFAULT NULL,
  `fecha_ingreso_empresa` datetime NOT NULL,
  `salario` bigint NOT NULL,
  `id_departamento` int NOT NULL,
  `id_puesto` int NOT NULL,
  `id_empresa` int NOT NULL,
  `id_usuario_creacion` int NOT NULL,
  `id_usuario_actualizacion` int DEFAULT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_empleado`),
  KEY `id_departamento` (`id_departamento`),
  KEY `id_puesto` (`id_puesto`),
  KEY `id_empresa` (`id_empresa`),
  KEY `usuario_creacion` (`id_usuario_creacion`),
  KEY `usuario_actualizacion` (`id_usuario_actualizacion`),
  CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id_departamento`),
  CONSTRAINT `empleados_ibfk_2` FOREIGN KEY (`id_puesto`) REFERENCES `puestos` (`id_puesto`),
  CONSTRAINT `empleados_ibfk_3` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`),
  CONSTRAINT `usuario_actualizacion` FOREIGN KEY (`id_usuario_actualizacion`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `usuario_creacion` FOREIGN KEY (`id_usuario_creacion`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.empleados: ~11 rows (approximately)
INSERT INTO `empleados` (`id_empleado`, `cedula`, `nombres`, `apellidos`, `sexo`, `fecha_nacimiento`, `lugar_nacimiento`, `direccion_residencia`, `estado_civil`, `numero_telefonico`, `nivel_academico`, `correo`, `fecha_ingreso_empresa`, `salario`, `id_departamento`, `id_puesto`, `id_empresa`, `id_usuario_creacion`, `id_usuario_actualizacion`, `estado`) VALUES
	(1, 41848159595, 'Leyla', 'Crespo', 'femenino', '1990-01-17 00:00:00', 'La Vega', 'La Vega', 'Soltero(a)', 8292258876, 'Universitario', 'leyla35@gmail.com', '2021-01-15 00:00:00', 25000, 3, 3, 1, 1, 1, 'ACTIVO'),
	(2, 71193489775, 'Josefina', 'Alvarez', 'femenino', '1990-01-17 00:00:00', 'La Vega', 'La Vega', 'Soltero(a)', 8299281464, 'Universitario', 'josefina36@gmail.com', '2021-01-15 00:00:00', 25000, 4, 3, 1, 1, 3, 'ACTIVO'),
	(3, 85475645641, 'Juan', 'Santos', 'masculino', '1990-01-17 00:00:00', 'La Vega', 'La Vega', 'Soltero(a)', 8093586711, 'Universitario', 'juan12@gmail.com', '2021-01-15 00:00:00', 30000, 5, 1, 1, 1, 1, 'ACTIVO'),
	(4, 72333928467, 'Sterling', 'Catalan', 'masculino', '1990-01-17 00:00:00', 'La Vega', 'La Vega', 'Soltero(a)', 8291626934, 'Universitario', 'sterling34@gmail.com', '2021-01-15 00:00:00', 30000, 3, 1, 1, 1, 2, 'ACTIVO'),
	(5, 48659973314, 'Lucas', 'Roman', 'masculino', '1990-01-17 00:00:00', 'La Vega', 'La Vega', 'Soltero(a)', 8293692016, 'Universitario', 'lucas@gmail.com', '2021-01-15 00:00:00', 30000, 5, 1, 1, 1, 2, 'ACTIVO'),
	(6, 39748862225, 'Rosalie', 'Casillas', 'femenino', '1990-01-17 00:00:00', 'La Vega', 'La Vega', 'Soltero(a)', 8298327537, 'Universitario', 'rosalie5@gmail.com', '2021-01-15 00:00:00', 20000, 4, 2, 1, 1, 3, 'ACTIVO'),
	(7, 75202146532, 'Sebastian Ernesto', 'Lora Concepcion', 'masculino', '1996-06-15 04:00:00', 'La Vega', 'Santiago', 'Casado(a)', 8296532587, 'Universitario', 'sebasernest@hotmail.com', '2022-08-25 04:00:00', 30000, 4, 1, 1, 1, 3, 'ACTIVO'),
	(8, 95236012584, 'Carla Teresa', 'Espaillat Polanco', 'femenino', '1998-10-12 04:00:00', 'La Vega', 'Santiago', 'Soltero(a)', 8296353549, 'Diplomado', 'cartaes@hotmail.com', '2022-07-14 04:00:00', 15000, 4, 4, 1, 1, NULL, 'ACTIVO'),
	(9, 85232145695, 'Monica Esmeralda', 'Perez Diaz', 'femenino', '1997-02-18 04:00:00', 'La Vega', 'La Vega', 'Soltero(a)', 8296543202, 'Diplomado', 'monices97@hotmail.com', '2021-08-25 04:00:00', 25000, 3, 3, 1, 1, NULL, 'ACTIVO'),
	(10, 74125963204, 'Nicolas Jose', 'Paredes Martinez', 'masculino', '1995-10-26 04:00:00', 'La Vega', 'La Vega', 'Soltero(a)', 8296547485, 'Universitario', 'nicoj10@gmail.com', '2022-03-26 04:00:00', 15000, 3, 4, 1, 1, NULL, 'ACTIVO'),
	(11, 95321569852, 'Cecilia Teresa', 'De Leon Reyes', 'femenino', '2000-04-12 04:00:00', 'La Vega', 'La Vega', 'Casado(a)', 8296302140, 'Diplomado', 'ceciliateresa@gmail.com', '2023-09-06 04:00:00', 20000, 4, 4, 1, 1, NULL, 'ACTIVO');

-- Dumping structure for table planificatech-db.empresas
CREATE TABLE IF NOT EXISTS `empresas` (
  `id_empresa` int NOT NULL AUTO_INCREMENT,
  `nombre_empresa` varchar(120) NOT NULL,
  `rnc_empresa` bigint NOT NULL,
  `logo_empresa` varchar(255) DEFAULT NULL,
  `fecha_fundacion` datetime DEFAULT NULL,
  `direccion_empresa` varchar(255) NOT NULL,
  `numero_telefonico` bigint NOT NULL,
  `correo_empresa` varchar(120) DEFAULT NULL,
  `id_director_general` int NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_empresa`),
  KEY `id_director_general` (`id_director_general`),
  CONSTRAINT `empresas_ibfk_1` FOREIGN KEY (`id_director_general`) REFERENCES `director_general` (`id_director_general`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.empresas: ~1 rows (approximately)
INSERT INTO `empresas` (`id_empresa`, `nombre_empresa`, `rnc_empresa`, `logo_empresa`, `fecha_fundacion`, `direccion_empresa`, `numero_telefonico`, `correo_empresa`, `id_director_general`, `estado`) VALUES
	(1, 'Empresa Prueba 1', 1234567890122, 'logoEmpresa1.jpg', '2015-06-10 00:00:00', 'La Vega', 8096524086, 'empresaprueba1@gmail.com', 1, 'ACTIVO');

-- Dumping structure for table planificatech-db.gerentes
CREATE TABLE IF NOT EXISTS `gerentes` (
  `id_gerente` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `cedula` bigint NOT NULL,
  `nombres` varchar(120) NOT NULL,
  `apellidos` varchar(120) NOT NULL,
  `sexo` varchar(20) NOT NULL,
  `fecha_nacimiento` datetime NOT NULL,
  `lugar_nacimiento` varchar(120) DEFAULT NULL,
  `direccion_residencia` varchar(255) DEFAULT NULL,
  `estado_civil` varchar(120) DEFAULT NULL,
  `numero_telefonico` bigint NOT NULL,
  `correo` varchar(120) DEFAULT NULL,
  `id_empresa` int NOT NULL,
  `fecha_ingreso_empresa` datetime DEFAULT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_gerente`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `gerentes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `gerentes_ibfk_2` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.gerentes: ~2 rows (approximately)
INSERT INTO `gerentes` (`id_gerente`, `id_usuario`, `cedula`, `nombres`, `apellidos`, `sexo`, `fecha_nacimiento`, `lugar_nacimiento`, `direccion_residencia`, `estado_civil`, `numero_telefonico`, `correo`, `id_empresa`, `fecha_ingreso_empresa`, `estado`) VALUES
	(1, 2, 74512659852, 'Juan', 'Perez', 'masculino', '1995-02-15 00:00:00', 'La Vega', 'La Vega', 'Soltero(a)', 8096541257, 'juan@correo.com', 1, '2023-06-06 00:00:00', 'ACTIVO'),
	(2, 3, 85412960258, 'Lucas', 'Santos', 'masculino', '1995-02-07 00:00:00', 'La Vega', 'La Vega', 'Soltero(a)', 8092014569, 'lucas@correo.com', 1, '2023-06-06 00:00:00', 'ACTIVO');

-- Dumping structure for table planificatech-db.notas
CREATE TABLE IF NOT EXISTS `notas` (
  `id_nota` int NOT NULL AUTO_INCREMENT,
  `titulo_nota` varchar(120) NOT NULL,
  `descripcion_nota` varchar(255) NOT NULL,
  `fecha_creacion_nota` datetime NOT NULL,
  `id_usuario` int NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_nota`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `notas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.notas: ~7 rows (approximately)
INSERT INTO `notas` (`id_nota`, `titulo_nota`, `descripcion_nota`, `fecha_creacion_nota`, `id_usuario`, `estado`) VALUES
	(1, 'Nota Prueba 1 Actualizada', 'Primera Prueba', '2024-05-02 04:00:00', 1, 'ACTIVO'),
	(2, 'Nota prueba 2', 'Nota 2', '2024-05-02 04:00:00', 1, 'ACTIVO'),
	(3, 'Nota Prueba 3', 'Nota 3', '2024-05-02 04:00:00', 1, 'ACTIVO'),
	(9, 'Nueva nota', 'S debe recargar la pagina', '2024-08-13 04:00:00', 1, 'ACTIVO'),
	(13, 'Nota Paginacion 1', 'Prueba paginacion', '2024-08-25 04:00:00', 1, 'ACTIVO'),
	(14, 'Nota paginacion 2', 'Prueba paginacion 2', '2024-08-25 04:00:00', 1, 'ACTIVO'),
	(15, 'Nota paginacion 3', 'Prueba paginacion 3', '2024-08-25 04:00:00', 1, 'ACTIVO');

-- Dumping structure for table planificatech-db.proyectos
CREATE TABLE IF NOT EXISTS `proyectos` (
  `id_proyecto` int NOT NULL AUTO_INCREMENT,
  `nombre_proyecto` varchar(120) NOT NULL,
  `descripcion_proyecto` varchar(255) NOT NULL,
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `presupuesto_asignado` bigint DEFAULT NULL,
  `tipo_proyecto` int NOT NULL,
  `id_gerente` int DEFAULT NULL,
  `id_empresa` int NOT NULL,
  `estado_proyecto` varchar(120) NOT NULL,
  `estado` varchar(120) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_proyecto`),
  KEY `id_empresa` (`id_empresa`),
  KEY `id_gerente` (`id_gerente`),
  CONSTRAINT `id_gerente` FOREIGN KEY (`id_gerente`) REFERENCES `gerentes` (`id_gerente`),
  CONSTRAINT `proyectos_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.proyectos: ~6 rows (approximately)
INSERT INTO `proyectos` (`id_proyecto`, `nombre_proyecto`, `descripcion_proyecto`, `fecha_inicio`, `fecha_fin`, `presupuesto_asignado`, `tipo_proyecto`, `id_gerente`, `id_empresa`, `estado_proyecto`, `estado`) VALUES
	(1, 'Entrenar a nuevos empleados', 'Diferentes pasos para entrenar a los nuevos empleados en el funcionamiento de la empresa', '2024-08-26 10:49:50', NULL, NULL, 1, 1, 1, 'Trabajando', 'ACTIVO'),
	(2, 'Crear modulo de proyectos en la app movil', 'Un nuevo modulo que se encargue de administrar nuestros proyectos en la app movil de la empresa', '2024-08-26 13:59:49', '2024-12-15 13:59:52', NULL, 2, 1, 1, 'En Espera', 'ACTIVO'),
	(3, 'Elaboracion de plan de capacitacion del departamento de tecnologia', 'Crear un plan con los pasos a seguir con la nueva capacitacion que necesita el departamento de tecnologia', '2024-08-26 14:02:08', NULL, 35000, 1, 2, 1, 'En Espera', 'ACTIVO'),
	(4, 'Actualizar la app de soporte en el servidor de la empresa', 'Se requeire que la app usada por soporte sea actualizada en el servidor de la empresa', '2024-08-26 16:22:09', '2024-08-29 16:22:10', 20000, 2, 2, 1, 'Finalizado', 'ACTIVO'),
	(10, 'Proyecto de Prueba 1', 'Descripcion de Proyecto de Prueba 1', '2024-09-11 04:00:00', '2024-09-13 04:00:00', NULL, 1, 2, 1, 'Finalizado', 'ACTIVO'),
	(11, 'Proyecto de Prueba 2', 'Descripcion del proyecto de prueba 2', '2024-08-29 04:00:00', NULL, NULL, 2, 1, 1, 'En Espera', 'ACTIVO');

-- Dumping structure for table planificatech-db.proyectos_departamentos
CREATE TABLE IF NOT EXISTS `proyectos_departamentos` (
  `id_proyectos_departamentos` int NOT NULL AUTO_INCREMENT,
  `id_departamento` int NOT NULL,
  `id_proyecto` int NOT NULL,
  `estado` varchar(120) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_proyectos_departamentos`),
  KEY `id_departamento` (`id_departamento`),
  KEY `id_proyecto` (`id_proyecto`),
  CONSTRAINT `proyectos_departamentos_ibfk_1` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id_departamento`),
  CONSTRAINT `proyectos_departamentos_ibfk_2` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.proyectos_departamentos: ~4 rows (approximately)
INSERT INTO `proyectos_departamentos` (`id_proyectos_departamentos`, `id_departamento`, `id_proyecto`, `estado`) VALUES
	(1, 4, 1, 'ACTIVO'),
	(2, 6, 1, 'ACTIVO'),
	(3, 5, 10, 'ACTIVO'),
	(5, 6, 10, 'ACTIVO');

-- Dumping structure for table planificatech-db.proyectos_empleados
CREATE TABLE IF NOT EXISTS `proyectos_empleados` (
  `id_proyectos_empleado` int NOT NULL AUTO_INCREMENT,
  `id_empleado` int NOT NULL,
  `id_proyecto` int NOT NULL,
  `estado` varchar(120) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_proyectos_empleado`),
  KEY `id_empleado` (`id_empleado`),
  KEY `id_proyecto` (`id_proyecto`),
  CONSTRAINT `proyectos_empleados_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`),
  CONSTRAINT `proyectos_empleados_ibfk_2` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.proyectos_empleados: ~8 rows (approximately)
INSERT INTO `proyectos_empleados` (`id_proyectos_empleado`, `id_empleado`, `id_proyecto`, `estado`) VALUES
	(1, 1, 4, 'ACTIVO'),
	(2, 4, 2, 'ACTIVO'),
	(3, 9, 2, 'ACTIVO'),
	(6, 1, 2, 'ACTIVO'),
	(7, 2, 2, 'ACTIVO'),
	(8, 3, 2, 'ACTIVO'),
	(9, 9, 11, 'ACTIVO'),
	(10, 6, 11, 'ACTIVO');

-- Dumping structure for table planificatech-db.puestos
CREATE TABLE IF NOT EXISTS `puestos` (
  `id_puesto` int NOT NULL AUTO_INCREMENT,
  `nombre_puesto` varchar(120) NOT NULL,
  `descripcion_puesto` varchar(255) DEFAULT NULL,
  `id_usuario_creacion` int NOT NULL,
  `id_usuario_actualizacion` int DEFAULT NULL,
  `estado` varchar(120) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_puesto`),
  KEY `id_usuario_creacion` (`id_usuario_creacion`),
  KEY `id_usuario_actualizacion` (`id_usuario_actualizacion`),
  CONSTRAINT `id_usuario_actualizacion` FOREIGN KEY (`id_usuario_actualizacion`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `id_usuario_creacion` FOREIGN KEY (`id_usuario_creacion`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.puestos: ~4 rows (approximately)
INSERT INTO `puestos` (`id_puesto`, `nombre_puesto`, `descripcion_puesto`, `id_usuario_creacion`, `id_usuario_actualizacion`, `estado`) VALUES
	(1, 'Desarrollador Backend', 'Se encarga de crear los servicios necesarios para que la infraestructura del backend de la aplicacion funcione', 1, 1, 'ACTIVO'),
	(2, 'Desarrollador Frontend', 'Se encarga del diseño y del funcionamiento de la aplicacion de parte del cliente', 1, 1, 'ACTIVO'),
	(3, 'Encargado de Redes', 'Comentario de prueba NUEVO', 1, 1, 'ACTIVO'),
	(4, 'Soporte', 'Nueva prueba', 1, 1, 'ACTIVO');

-- Dumping structure for table planificatech-db.tareas_proyectos
CREATE TABLE IF NOT EXISTS `tareas_proyectos` (
  `id_tarea_proyecto` int NOT NULL AUTO_INCREMENT,
  `nombre_tarea_proyecto` varchar(120) NOT NULL,
  `descripcion_tarea_proyecto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fecha_inicio_tarea_proyecto` datetime NOT NULL,
  `fecha_fin_tarea_proyecto` datetime DEFAULT NULL,
  `id_proyecto` int NOT NULL,
  `estado_tarea_proyecto` varchar(20) NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_tarea_proyecto`) USING BTREE,
  KEY `id_proyecto` (`id_proyecto`),
  CONSTRAINT `tareas_proyectos_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.tareas_proyectos: ~10 rows (approximately)
INSERT INTO `tareas_proyectos` (`id_tarea_proyecto`, `nombre_tarea_proyecto`, `descripcion_tarea_proyecto`, `fecha_inicio_tarea_proyecto`, `fecha_fin_tarea_proyecto`, `id_proyecto`, `estado_tarea_proyecto`, `estado`) VALUES
	(1, 'Realizar Charla de Bienvenida', 'Charla inicial a los nuevos empleados para que conozcan lo basico de la empresa', '2024-08-26 16:27:24', '2024-08-27 16:28:15', 1, 'Trabajando', 'ACTIVO'),
	(2, 'Crear presentacion de Bienvenida', 'Crear una presentacion audiovisual de bienvenida', '2024-08-26 21:26:06', NULL, 1, 'En Espera', 'ACTIVO'),
	(3, 'Entregar panfletos informativos', 'Dar a los nuevos empleados panfletos con informacion general de la empresa', '2024-08-26 23:58:09', '2024-08-26 23:58:11', 1, 'En Espera', 'ACTIVO'),
	(4, 'Cambiar la antigua base de datos por la nueva', 'Se ha creado una nueva base de datos por lo que hay que intercambiarla por la que esta en el servidor', '2024-08-27 09:46:59', NULL, 4, 'En Espera', 'ACTIVO'),
	(5, 'Iniciar diseño del nuevo modulo de la app movil', 'Construir de forma grafica el diseño inicial del modulo de proyectos de la app movil', '2024-08-27 10:45:46', '2024-08-27 10:45:47', 2, 'Finalizado', 'ACTIVO'),
	(6, 'Actualizar tablas en la base de datos', 'Mover las tablas de la antigua base de datos a la nueva', '2024-08-30 04:00:00', '2024-08-30 04:00:00', 4, 'En Espera', 'ACTIVO'),
	(7, 'Probar conexion de las computadoras al servidor', 'Comprobar que todas las pc de la empresa se puedan conectar al servidor', '2024-08-30 04:00:00', '2024-08-31 04:00:00', 4, 'Finalizado', 'ACTIVO'),
	(8, 'Tarea de prueba 1', 'Tarea de prueba 1', '2024-08-30 04:00:00', NULL, 10, 'Trabajando', 'ACTIVO'),
	(9, 'Tarea de prueba 2', 'Tarea de prueba 2', '2024-09-11 04:00:00', '2024-09-13 04:00:00', 10, 'En Espera', 'INACTIVO'),
	(10, 'Tarea 1 del proyecto de prueba 2', 'Tarea 1 del proyecto de prueba 2', '2024-08-30 04:00:00', '2024-08-30 04:00:00', 11, 'Trabajando', 'ACTIVO');

-- Dumping structure for table planificatech-db.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `username` varchar(120) NOT NULL,
  `password` varchar(120) NOT NULL,
  `tipo_usuario` varchar(20) NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.usuarios: ~3 rows (approximately)
INSERT INTO `usuarios` (`id_usuario`, `username`, `password`, `tipo_usuario`, `estado`) VALUES
	(1, 'hector', '1234', '1', 'ACTIVO'),
	(2, 'juan', '12345', '2', 'ACTIVO'),
	(3, 'lucas', '1234', '2', 'ACTIVO');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
