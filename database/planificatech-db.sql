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
  `descripcion_departamento` varchar(255) NOT NULL,
  `presupuesto_asignado` bigint NOT NULL,
  `id_gerente` int DEFAULT NULL,
  `id_empresa` int NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_departamento`),
  KEY `FK_departamentos_gerentes` (`id_gerente`),
  KEY `FK_departamentos_empresas` (`id_empresa`),
  CONSTRAINT `FK_departamentos_empresas` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`),
  CONSTRAINT `FK_departamentos_gerentes` FOREIGN KEY (`id_gerente`) REFERENCES `gerentes` (`id_gerente`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.departamentos: ~3 rows (approximately)
INSERT INTO `departamentos` (`id_departamento`, `nombre_departamento`, `descripcion_departamento`, `presupuesto_asignado`, `id_gerente`, `id_empresa`, `estado`) VALUES
	(1, 'Recursos Humanos', 'Departamento de recursos humanos', 500000, NULL, 1, 'ACTIVO'),
	(2, 'Tecnologia', 'Departamento de tecnologia', 650000, NULL, 1, 'ACTIVO'),
	(3, 'Contabilidad', 'Departamento de Contabilidad', 450000, NULL, 1, 'ACTIVO');

-- Dumping structure for table planificatech-db.director_general
CREATE TABLE IF NOT EXISTS `director_general` (
  `id_director_general` int NOT NULL AUTO_INCREMENT,
  `username` varchar(120) NOT NULL,
  `password` varchar(120) NOT NULL,
  `cedula` bigint NOT NULL,
  `nombres` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `apellidos` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sexo` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `lugar_nacimiento` varchar(120) DEFAULT NULL,
  `direccion_residencia` varchar(255) DEFAULT NULL,
  `estado_civil` varchar(120) DEFAULT NULL,
  `numero_telefonico` bigint NOT NULL,
  `nivel_academico` varchar(120) DEFAULT NULL,
  `correo` varchar(120) DEFAULT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_director_general`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.director_general: ~1 rows (approximately)
INSERT INTO `director_general` (`id_director_general`, `username`, `password`, `cedula`, `nombres`, `apellidos`, `sexo`, `fecha_nacimiento`, `lugar_nacimiento`, `direccion_residencia`, `estado_civil`, `numero_telefonico`, `nivel_academico`, `correo`, `estado`) VALUES
	(1, 'admin', '1234', 40214129518, 'Sr', 'Administrador', 'masculino', '2001-12-10', 'La Vega', 'El Hatico, calle Jose Marti', 'Soltero(a)', 8293688053, 'Secundario', 'hjac10@hotmail.com', 'ACTIVO');

-- Dumping structure for table planificatech-db.empleados
CREATE TABLE IF NOT EXISTS `empleados` (
  `id_empleado` int NOT NULL AUTO_INCREMENT,
  `cedula` bigint NOT NULL,
  `nombres` varchar(120) NOT NULL,
  `apellidos` varchar(120) NOT NULL,
  `sexo` varchar(50) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `lugar_nacimiento` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `direccion_residencia` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `estado_civil` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `numero_telefonico` bigint NOT NULL,
  `nivel_academico` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `correo` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fecha_ingreso_empresa` date NOT NULL,
  `id_departamento` int NOT NULL,
  `id_puesto` int NOT NULL,
  `id_empresa` int NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_empleado`),
  KEY `FK_empleados_departamentos` (`id_departamento`),
  KEY `FK_empleados_puestos` (`id_puesto`),
  KEY `FK_empleados_empresas` (`id_empresa`),
  CONSTRAINT `FK_empleados_departamentos` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id_departamento`),
  CONSTRAINT `FK_empleados_empresas` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`),
  CONSTRAINT `FK_empleados_puestos` FOREIGN KEY (`id_puesto`) REFERENCES `puestos` (`id_puesto`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.empleados: ~6 rows (approximately)
INSERT INTO `empleados` (`id_empleado`, `cedula`, `nombres`, `apellidos`, `sexo`, `fecha_nacimiento`, `lugar_nacimiento`, `direccion_residencia`, `estado_civil`, `numero_telefonico`, `nivel_academico`, `correo`, `fecha_ingreso_empresa`, `id_departamento`, `id_puesto`, `id_empresa`, `estado`) VALUES
	(1, 41848159595, 'Leyla', 'Crespo', '', '1990-01-17', 'La Vega', 'La Vega', 'Soltero(a)', 8292258876, 'Universitario', 'leyla35@gmail.com', '2021-01-15', 1, 3, 1, 'ACTIVO'),
	(2, 71193489775, 'Josefina', 'Alvarez', '', '1990-01-17', 'La Vega', 'La Vega', 'Soltero(a)', 8299281464, 'Universitario', 'josefina36@gmail.com', '2021-01-15', 1, 3, 1, 'ACTIVO'),
	(3, 85475645641, 'Juan', 'Perez', '', '1990-01-17', 'La Vega', 'La Vega', 'Soltero(a)', 8093586711, 'Universitario', 'juan12@gmail.com', '2021-01-15', 2, 1, 1, 'ACTIVO'),
	(4, 72333928467, 'Sterling', 'Catalan', '', '1990-01-17', 'La Vega', 'La Vega', 'Soltero(a)', 8291626934, 'Universitario', 'sterling34@gmail.com', '2021-01-15', 2, 1, 1, 'ACTIVO'),
	(5, 48659973314, 'Lucas', 'Roman', '', '1990-01-17', 'La Vega', 'La Vega', 'Soltero(a)', 8293692016, 'Universitario', 'lucas@gmail.com', '2021-01-15', 2, 1, 1, 'ACTIVO'),
	(6, 39748862225, 'Rosalie', 'Casillas', '', '1990-01-17', 'La Vega', 'La Vega', 'Soltero(a)', 8298327537, 'Universitario', 'rosalie5@gmail.com', '2021-01-15', 3, 2, 1, 'ACTIVO');

-- Dumping structure for table planificatech-db.empresas
CREATE TABLE IF NOT EXISTS `empresas` (
  `id_empresa` int NOT NULL AUTO_INCREMENT,
  `nombre_empresa` varchar(120) NOT NULL,
  `rnc_empresa` bigint NOT NULL,
  `logo_empresa` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fecha_fundacion` date DEFAULT NULL,
  `direccion_empresa` varchar(255) NOT NULL,
  `numero_telefonico` bigint NOT NULL,
  `correo_empresa` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `id_sector` int NOT NULL,
  `id_director_general` int NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_empresa`),
  KEY `FK_empresas_sector_empresas` (`id_sector`),
  KEY `FK_empresas_director_general` (`id_director_general`),
  CONSTRAINT `FK_empresas_director_general` FOREIGN KEY (`id_director_general`) REFERENCES `director_general` (`id_director_general`),
  CONSTRAINT `FK_empresas_sector_empresas` FOREIGN KEY (`id_sector`) REFERENCES `sector_empresas` (`id_sector_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.empresas: ~1 rows (approximately)
INSERT INTO `empresas` (`id_empresa`, `nombre_empresa`, `rnc_empresa`, `logo_empresa`, `fecha_fundacion`, `direccion_empresa`, `numero_telefonico`, `correo_empresa`, `id_sector`, `id_director_general`, `estado`) VALUES
	(1, 'Empresa Prueba 1', 1234567890123, 'logoEmpresa1.jpg', '2024-03-23', 'Santiago', 8096547878, 'empresaprueba@hotmail.com', 2, 1, 'ACTIVO');

-- Dumping structure for table planificatech-db.gerentes
CREATE TABLE IF NOT EXISTS `gerentes` (
  `id_gerente` int NOT NULL AUTO_INCREMENT,
  `username` varchar(120) NOT NULL,
  `password` varchar(120) NOT NULL,
  `cedula` bigint NOT NULL,
  `nombres` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `apellidos` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sexo` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `lugar_nacimiento` varchar(120) DEFAULT NULL,
  `direccion_residencia` varchar(120) DEFAULT NULL,
  `estado_civil` varchar(120) DEFAULT NULL,
  `numero_telefonico` bigint NOT NULL,
  `nivel_academico` varchar(120) DEFAULT NULL,
  `correo` varchar(120) DEFAULT NULL,
  `id_empresa` int NOT NULL,
  `fecha_ingreso_empresa` date DEFAULT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_gerente`),
  KEY `FK_gerentes_empresas` (`id_empresa`),
  CONSTRAINT `FK_gerentes_empresas` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.gerentes: ~0 rows (approximately)

-- Dumping structure for table planificatech-db.planes
CREATE TABLE IF NOT EXISTS `planes` (
  `id_plan` int NOT NULL AUTO_INCREMENT,
  `nombre_plan` varchar(120) NOT NULL,
  `descripcion_plan` varchar(255) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `estado_plan` varchar(20) NOT NULL,
  `id_empresa` int NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_plan`),
  KEY `FK_planes_empresas` (`id_empresa`),
  CONSTRAINT `FK_planes_empresas` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.planes: ~0 rows (approximately)

-- Dumping structure for table planificatech-db.proyectos
CREATE TABLE IF NOT EXISTS `proyectos` (
  `id_proyecto` int NOT NULL AUTO_INCREMENT,
  `nombre_proyecto` varchar(120) NOT NULL,
  `descripcion_proyecto` varchar(120) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `presupuesto_asignado` bigint NOT NULL,
  `id_empresa` int NOT NULL,
  `estado_proyecto` varchar(20) NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_proyecto`),
  KEY `FK__empresas` (`id_empresa`),
  CONSTRAINT `FK__empresas` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.proyectos: ~0 rows (approximately)

-- Dumping structure for table planificatech-db.proyectos_departamentos
CREATE TABLE IF NOT EXISTS `proyectos_departamentos` (
  `id_proyecto_departamento` int NOT NULL AUTO_INCREMENT,
  `id_departamento` int NOT NULL,
  `id_proyecto` int NOT NULL,
  `id_gerente` int NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_proyecto_departamento`),
  KEY `FK__departamentos` (`id_departamento`),
  KEY `FK_proyectos_departamentos_proyectos` (`id_proyecto`),
  KEY `FK_proyectos_departamentos_gerentes` (`id_gerente`),
  CONSTRAINT `FK__departamentos` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id_departamento`),
  CONSTRAINT `FK_proyectos_departamentos_gerentes` FOREIGN KEY (`id_gerente`) REFERENCES `gerentes` (`id_gerente`),
  CONSTRAINT `FK_proyectos_departamentos_proyectos` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.proyectos_departamentos: ~0 rows (approximately)

-- Dumping structure for table planificatech-db.proyectos_empleados
CREATE TABLE IF NOT EXISTS `proyectos_empleados` (
  `id_proyecto_empleado` int NOT NULL AUTO_INCREMENT,
  `id_empleado` int NOT NULL,
  `id_proyecto` int NOT NULL,
  `id_gerente` int NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_proyecto_empleado`),
  KEY `FK__empleados` (`id_empleado`),
  KEY `FK_proyectos_empleados_proyectos` (`id_proyecto`),
  KEY `FK_proyectos_empleados_gerentes` (`id_gerente`),
  CONSTRAINT `FK__empleados` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`),
  CONSTRAINT `FK_proyectos_empleados_gerentes` FOREIGN KEY (`id_gerente`) REFERENCES `gerentes` (`id_gerente`),
  CONSTRAINT `FK_proyectos_empleados_proyectos` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.proyectos_empleados: ~0 rows (approximately)

-- Dumping structure for table planificatech-db.puestos
CREATE TABLE IF NOT EXISTS `puestos` (
  `id_puesto` int NOT NULL AUTO_INCREMENT,
  `nombre_puesto` varchar(120) NOT NULL,
  `descripcion_puesto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_puesto`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.puestos: ~5 rows (approximately)
INSERT INTO `puestos` (`id_puesto`, `nombre_puesto`, `descripcion_puesto`, `estado`) VALUES
	(1, 'Programador Web', NULL, 'ACTIVO'),
	(2, 'Administrador de Base de Datos', NULL, 'ACTIVO'),
	(3, 'Contable', NULL, 'ACTIVO'),
	(4, 'Ingeniero de Redes', NULL, 'INACTIVO'),
	(5, 'Soporte Tecnico', '', 'ACTIVO');

-- Dumping structure for table planificatech-db.sector_empresas
CREATE TABLE IF NOT EXISTS `sector_empresas` (
  `id_sector_empresa` int NOT NULL AUTO_INCREMENT,
  `nombre_sector` varchar(120) NOT NULL,
  `descripcion_sector` varchar(255) NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_sector_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.sector_empresas: ~4 rows (approximately)
INSERT INTO `sector_empresas` (`id_sector_empresa`, `nombre_sector`, `descripcion_sector`, `estado`) VALUES
	(1, 'Sector Primario', 'Son aquellas empresas que se dedican a la explotación de recursos naturales, así como la extracción o siembra de los mismos.', 'ACTIVO'),
	(2, 'Sector Secundario', 'Son aquellas empresas que se dedican a la producción de materias primas. Se encargan de transformar la materia prima que es extraída por el sector primario.', 'ACTIVO'),
	(3, 'Sector Terciario', 'Son empresas que se dedican a la venta de productos o servicios y no requieren de transformación de materias primas.', 'ACTIVO'),
	(4, 'Sector Cuaternario', 'Son las empresas TIC que corresponden a las tecnologías de la información, innovación, desarrollo y investigación.', 'ACTIVO');

-- Dumping structure for table planificatech-db.tareas_planes
CREATE TABLE IF NOT EXISTS `tareas_planes` (
  `id_tarea_plan` int NOT NULL AUTO_INCREMENT,
  `nombre_tarea_plan` varchar(120) NOT NULL,
  `descripcion_tarea_plan` varchar(255) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `id_plan` int NOT NULL,
  `estado_tarea_plan` varchar(20) NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_tarea_plan`),
  KEY `FK__planes` (`id_plan`),
  CONSTRAINT `FK__planes` FOREIGN KEY (`id_plan`) REFERENCES `planes` (`id_plan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.tareas_planes: ~0 rows (approximately)

-- Dumping structure for table planificatech-db.tareas_proyectos
CREATE TABLE IF NOT EXISTS `tareas_proyectos` (
  `id_tarea_proyecto` int NOT NULL AUTO_INCREMENT,
  `nombre_tarea_proyecto` varchar(120) NOT NULL,
  `descripcion_tarea_proyecto` varchar(255) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `id_proyecto` int NOT NULL,
  `estado_tarea_proyecto` varchar(20) NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_tarea_proyecto`),
  KEY `FK__proyectos` (`id_proyecto`),
  CONSTRAINT `FK__proyectos` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table planificatech-db.tareas_proyectos: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
