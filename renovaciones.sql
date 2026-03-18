-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 17-03-2026 a las 08:47:34
-- Versión del servidor: 10.11.15-MariaDB-cll-lve
-- Versión de PHP: 8.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sidreri3_Dsspe9OW`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `w47fa_iv_clientes_renovaciones`
--

CREATE TABLE `w47fa_iv_clientes_renovaciones` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre_cliente` varchar(255) NOT NULL,
  `empresa` varchar(255) DEFAULT NULL,
  `giro_bancario` tinyint(1) NOT NULL DEFAULT 0,
  `b_flag` tinyint(1) NOT NULL DEFAULT 0,
  `precio` decimal(10,2) DEFAULT NULL,
  `fecha_renovacion` date NOT NULL,
  `comentarios` text DEFAULT NULL,
  `servicios_contratados` text DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Volcado de datos para la tabla `w47fa_iv_clientes_renovaciones`
--

INSERT INTO `w47fa_iv_clientes_renovaciones` (`id`, `nombre_cliente`, `empresa`, `giro_bancario`, `b_flag`, `precio`, `fecha_renovacion`, `comentarios`, `servicios_contratados`, `telefono`, `email`, `created_at`, `updated_at`) VALUES
(349, 'Ana Rosa', 'El Llagu Villa', 1, 0, 199.89, '2000-12-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(350, 'Pepe', 'Casas de Aldea Teixois', 0, 0, 90.44, '2000-12-01', 'nada', '2 x dominio', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(351, 'Marocs, Noemí, Pedro', 'Oscos Eo', 1, 0, 252.05, '2008-02-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2026-02-11 10:42:19'),
(352, 'Jose', 'Ribadesella Rural', 1, 0, 221.62, '2008-10-01', 'nada', 'web, dominio, hosting, calidadrural.com', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(353, 'Ana Rosa', 'El llagu Villa', 1, 0, 242.56, '2009-05-01', 'reservas@', 'por definir', '985402551', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(354, 'Jose Antonio', 'Viveros los Molinos', 1, 0, 40.00, '2009-10-01', 'nada', 'dominio, hosting, 1 x correo', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(355, 'Olga', 'Central de Reservas Taramundi Verde', 1, 0, 205.30, '2010-04-01', 'nada', 'web, dominio, hosting, calidadrural.com', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(356, 'Montse', 'Taberna de Montse', 0, 0, 205.30, '2010-04-01', 'nada', '1 x dominio, 1 x email, calidadrural.com', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(357, 'Luis', 'Conjunto Etnográfico de Teixois', 1, 0, 295.18, '2010-07-05', 'nada', 'web, dominio, hosting, 1 x correo', '608248913', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(358, 'German', 'Inmobiliaria Degrain', 1, 0, 221.13, '2010-12-01', 'nada', 'dominio, hosting, correo', 'por definir', '', '2025-12-02 13:23:54', '2025-12-07 16:00:47'),
(359, 'Paco', 'Hotel Petronila', 0, 0, 165.94, '2011-07-01', 'nada', 'dominio, hosting, email', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(360, 'Pedro', 'Hotel Casa Pedro', 1, 0, 44.92, '2011-08-01', 'nada', 'dominio, 2 x bd', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(361, 'Antonio', 'La Trapela', 1, 0, 178.60, '2012-02-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2026-02-11 10:42:19'),
(362, 'Manolo', 'Casas da Lexa', 1, 0, 50.09, '2012-04-13', 'nada', 'dominio, hosting, BD', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(363, 'Paco', 'Petronila', 0, 0, 40.19, '2012-07-04', 'nada', '2 x dominio, hosting', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(364, 'Manolo', 'Casas da Lexa', 1, 0, 193.00, '2012-10-01', 'nada', 'dominio, hosting, BD, 1 x email', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(365, 'Pepe', 'Casas Teixois', 0, 0, 117.83, '2012-11-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(366, 'Manolo', 'Casas da Lexa', 1, 0, 45.21, '2012-12-23', 'nada', 'hotelruralcasapedro.com', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(367, 'Andrea', 'Casa tia Vicenta', 1, 0, 277.20, '2020-09-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(368, 'Antonio', 'La portiella', 0, 0, 196.27, '2014-05-01', 'nada', 'Dominio casasdalexa.es', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(369, 'Jose', 'Hotel Oscos', 1, 0, 138.53, '2014-06-01', 'nada', 'correo attcliente@', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(370, 'Rocío', 'Casa Freixe', 1, 0, 185.29, '2014-08-01', 'nada', 'web + hosting + bd', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(371, 'Loli', 'Casa Colo', 1, 0, 158.52, '2014-11-01', 'nada', '4 dominios licencia a 25/dominio', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(372, 'Jose', 'Hotel Oscos', 0, 0, 43.84, '2014-12-01', 'nada', '1 dominio casasdalexa.com', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(373, 'Yolanda', 'Asturias tierra y mar', 0, 0, 105.36, '2014-12-24', 'nada', '2x dom, host, email', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(374, 'Jose', 'Tecnomedica', 1, 0, 268.54, '2015-02-01', 'nada', 'dominio + email + web', 'por definir', '', '2025-12-02 13:23:54', '2026-02-11 10:42:19'),
(375, 'Pilar Argudín', 'Maingourd Joyeros', 1, 0, 198.83, '2015-02-01', 'nada', 'solo hosting', 'por definir', '', '2025-12-02 13:23:54', '2026-02-11 10:42:19'),
(376, 'Antonio', 'Casa Viduedo', 0, 0, 84.52, '2015-04-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(377, 'Celia', 'El Valle de oscos', 1, 0, 192.25, '2015-06-01', 'nada', 'web host dominio email', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(378, 'Ruben', 'Ribadesella Rural', 1, 0, 42.26, '2015-07-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(379, 'Ana Gil', 'Vital Centro', 1, 0, 248.95, '2015-07-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(380, 'Gustavo', 'Remasela', 1, 0, 199.12, '2015-11-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(381, 'Carlos', 'Regalaria', 0, 0, 95.00, '2015-11-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(382, 'Jorge', 'aeiebiochemical', 0, 0, 37.30, '2016-04-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(383, 'Pilar o Tamara', 'TvisT Moda', 1, 0, 252.55, '2016-05-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(384, 'Sergio', 'El Majo', 0, 0, 215.90, '2016-06-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(385, 'Ana', 'Vega de Llan', 0, 0, 231.14, '2016-07-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(386, 'Beatriz', 'Puertas Burg', 0, 0, 231.14, '2016-07-01', 'nada', 'hosting, 1dominio, 4 correos', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(387, 'Jose Ignacio', 'Hotel Reyes Astures', 1, 0, 195.00, '2016-08-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(388, 'Yo mismo', 'Webdevelopersdubai.com', 0, 0, 0.00, '2016-09-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(389, 'Sabino o Esther Llamazares', 'Cofradía del Colesterol', 0, 0, 34.00, '2016-09-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(390, 'Prudencio (marido Concha)', 'DyDasesores', 0, 0, 60.00, '2016-09-16', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(391, 'Paloma', 'Paloma Briansó', 0, 0, 168.71, '2016-10-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-11 11:46:49'),
(392, 'Jorge', 'aeiebiochemical', 0, 0, 210.61, '2016-11-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(393, 'Pedro Rustarazo', 'Fisio Activate', 0, 0, 169.30, '2016-11-01', 'prustarazo@moorestephens-addveris.es', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-11 11:34:50'),
(394, 'Javier', 'Optima Vision', 0, 0, 215.05, '2017-01-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-30 09:11:43'),
(395, 'Jorge Eixard', 'Dr Pascua Pilar', 0, 0, 215.05, '2017-01-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-30 09:11:43'),
(397, 'Carmen', 'Manduca Hispania', 1, 0, 220.08, '2017-02-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2026-02-11 10:42:19'),
(398, 'María Busta', 'Casa Eutimio', 0, 0, 210.03, '2017-02-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2026-02-11 10:42:19'),
(399, 'Esther', 'Hospital Veterinario de Asturias', 0, 0, 201.70, '2017-03-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2026-02-25 10:53:40'),
(400, 'Carmen o Javier', 'Adanez', 0, 0, 182.86, '2017-04-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(401, 'Ana o Javier', 'Optima Vision', 0, 0, 34.63, '2017-05-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(402, 'Azulina', 'El Reguero de Villamarin', 0, 0, 65.49, '2017-05-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(403, 'Noemi, Pedro..', 'Oscos EO', 1, 0, 67.12, '2017-06-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(404, 'Santiago Brime', 'Argañosa Clinica Dental', 0, 0, 223.98, '2017-07-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(405, 'Azulina', 'El Reguero de Villamarin', 0, 0, 188.47, '2017-07-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(406, 'Mercedes', 'Rte Savanna', 0, 0, 229.76, '2017-11-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(407, 'Jose Luis', 'San Pelayo Export', 0, 0, 178.15, '2017-12-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(408, 'Gabi', 'Mesón Siero', 0, 0, 194.88, '2017-12-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(409, 'Cristina', 'Veterinaria Grado', 1, 0, 192.23, '2018-01-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-30 09:11:43'),
(410, 'María Jesús', 'Aeiebiochemical.com', 0, 0, 46.48, '2018-01-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-30 09:11:43'),
(412, 'Ignacio', 'Ignacio Granda', 0, 0, 42.20, '2018-04-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(413, 'Jose Ramón', 'Estudios Dentales', 0, 0, 195.23, '2018-06-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(414, 'Borja', 'Borgonlia', 0, 0, 197.06, '2018-07-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(415, 'Julio', 'Ovethus', 0, 0, 48.00, '2018-08-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(416, 'María Jesús', 'Aeie Biochemical', 1, 0, 31.70, '2019-05-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(417, 'SSL', 'Tecno Oviedo', 1, 0, 31.70, '2019-05-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(418, 'Diego', 'La Biesca', 1, 0, 197.79, '2019-07-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(419, 'Carmela', 'Clínica Tamargo', 0, 0, 197.79, '2025-07-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(420, 'David Motilva', 'La Fiesta del Castillo', 1, 0, 60.00, '2019-08-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(421, 'Marlon', 'Entrenos', 0, 0, 200.00, '2019-08-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(422, 'Leti', 'Unileon BD Trincheras Hismecon', 0, 0, 193.90, '2019-09-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(423, 'Esther Llamazares', 'Ascege', 1, 0, 203.27, '2019-10-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(424, 'María', 'Peñanes y Mariana (CARDEO)', 0, 0, 203.74, '2019-10-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(425, 'María Jose o Carlos BNI Optmiza', 'Porta de Grandas', 0, 0, 215.47, '2019-10-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(426, 'Amador', 'Peñón Blanco', 0, 0, 40.00, '2019-10-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(427, 'Esther Llamazares', 'Ascege', 0, 0, 58.21, '2019-10-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(428, 'Pelayo Braña', 'Clínica Braña', 1, 0, 197.83, '2019-12-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(429, 'Yolanda', 'Asturias Tierra y Mar', 1, 0, 195.52, '2019-12-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(430, 'Amador', 'Peñón Blanco', 0, 0, 238.92, '2019-12-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(431, 'María', 'Peñanes y Mariana (CARDEO)', 0, 0, 34.95, '2019-12-21', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(432, 'Montse Ribao', 'Univigo Montse', 0, 0, 38.09, '2020-01-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-30 09:11:43'),
(433, 'Montse Ribao', 'Univigo Montse', 0, 0, 195.70, '2020-02-01', 'nada', 'hosting', 'por definir', '', '2025-12-02 13:23:54', '2026-02-11 10:42:19'),
(435, 'German', 'degrain', 1, 0, 42.11, '2020-03-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2026-02-25 10:53:40'),
(436, 'Javier o Sandra', 'Palacio de Cutre', 1, 0, 234.09, '2020-03-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2026-02-25 10:53:40'),
(437, 'Paloma', 'Paloma Briansó', 0, 0, 39.35, '2020-03-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2026-02-25 10:53:40'),
(438, 'Jose', 'La Tienda del Tixileiro', 1, 0, 72.45, '2020-04-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(439, 'Noemí', 'Hotel Entreviñes', 0, 0, 186.87, '2020-05-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(440, 'Jose', 'La Tienda del Tixileiro', 1, 0, 175.00, '2020-06-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(441, 'Lola', 'Casa Rodil (2023 ojo lee)', 0, 0, 40.00, '2020-06-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(442, 'Irene', 'Hotel Sella', 0, 0, 41.32, '2020-06-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(443, 'María José', 'Pavimentos Vetusta', 1, 0, 209.19, '2020-07-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(444, 'Noemí', 'Hotel Entreviñes', 0, 0, 67.56, '2020-07-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(445, 'Irene', 'Hotel Sella', 0, 0, 197.06, '2020-07-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(446, 'Pedro', 'Hotel Casa Pedro', 1, 0, 39.90, '2020-09-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(447, 'Paco', 'Hotel Petronila', 1, 0, 39.90, '2020-09-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(448, 'Pepe', 'Casas de Aldea Teixois', 1, 0, 39.90, '2020-09-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(449, 'Manolo', 'Casas da Lexa', 1, 0, 39.90, '2020-09-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(450, 'Henrique Balto', 'Cartonajes VIR', 0, 0, 281.73, '2020-09-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(451, 'Pedro', 'Pejarca', 0, 0, 80.00, '2020-09-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(452, 'Estefanía', 'Quesería La Collada', 1, 0, 68.02, '2020-10-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(453, 'Lucía Noval', 'Farmacia Colloto', 1, 0, 40.00, '2020-10-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(454, 'Isabel Ron', 'Tratamiento Térmico Vulcano', 0, 0, 241.31, '2020-10-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(455, 'Estefanía', 'Quesería La Collada', 0, 0, 60.00, '2020-10-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(456, 'Jose', 'Metalyca', 1, 0, 205.57, '2020-11-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(457, 'Marcos', 'istram buhodra', 1, 0, 43.72, '2021-02-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2026-02-11 10:42:19'),
(458, 'Carmen', 'Manduca Selección', 0, 0, 82.32, '2021-02-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2026-02-11 10:42:19'),
(459, 'Marcos', 'Hotel Casa Pedro', 0, 0, 184.54, '2021-05-01', 'nada', 'web + dominios', 'por definir', '', '2025-12-02 13:23:54', '2025-12-11 11:40:16'),
(460, 'Javier Prado', 'Bermeyes ruta el alba', 0, 0, 193.00, '2021-05-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(461, 'Ana', 'Vital Centro', 0, 0, 10.33, '2021-06-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(462, 'Salvador', 'La Curuxa', 0, 0, 39.90, '2021-06-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(463, 'Kelvin o Nerea', 'Kelvin Piña', 1, 0, 182.28, '2021-07-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(464, 'Kelvin o Nerea', 'Kelvin Piña', 1, 0, 213.35, '2021-08-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(465, 'María José', 'Pavimentos Vetusta', 1, 0, 39.90, '2021-09-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(466, 'Carlos', 'La Llevanza', 1, 0, 232.05, '2021-10-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(467, 'Manolo', 'Manuel García Rubio', 0, 0, 61.62, '2021-10-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(468, 'Kelvin', 'Kelvin Piña', 1, 0, 70.68, '2021-11-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(469, 'Azulina', 'Cursed Escapes', 0, 0, 200.17, '2021-11-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(470, 'David', 'Roc Neige', 0, 0, 790.00, '2021-11-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(471, 'María José', 'Pavimentos vetusta', 1, 0, 15.94, '2022-01-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-30 09:11:43'),
(472, 'David Pitcairn', 'Picarin abogados', 1, 0, 0.00, '2022-01-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(473, 'Manolo', 'Manuel García Rubio', 0, 0, 183.81, '2022-02-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2026-02-11 10:42:19'),
(474, 'Ignacio', 'Promociones Recove', 1, 0, 213.23, '2022-03-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2026-02-25 10:53:40'),
(476, 'Jaime García Pacho', 'Betica F Carburantes', 0, 0, 191.66, '2022-07-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(477, 'Asterio', 'Quimica Oviedo', 0, 0, 237.24, '2022-07-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(478, 'Carlos', 'Santa Cristina pastelería', 0, 0, 360.00, '2022-08-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(479, 'María José', 'Pavimentos Vetusta', 0, 0, 15.00, '2022-08-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(480, 'Ro y Carlos', 'Asturias Holidays', 0, 0, 189.99, '2022-09-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(481, 'Cesar', 'Escuela Real Oviedo', 0, 0, 48.86, '2022-12-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(482, 'Joaquín Nacho Heli', 'FLC', 0, 0, 277.07, '2023-01-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-30 09:11:43'),
(483, 'Sergio', 'El Majo', 0, 0, 12.00, '2023-02-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(484, 'Cesar', 'Escuela Real Oviedo', 0, 0, 12.00, '2023-02-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(485, 'Ignacio', 'Promociones Recove', 0, 0, 41.16, '2023-02-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2026-02-11 10:42:19'),
(486, 'Cesar Martin', 'Escuela Real Oviedo', 0, 0, 48.00, '2023-02-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(487, 'Marcos', 'Istram Buhodra', 0, 0, 129.98, '2023-03-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2026-02-25 10:53:40'),
(489, 'María', 'Mapsicologos', 0, 0, 240.00, '2023-03-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(490, 'Eugenia', 'Dra Eugenia Bousoño', 0, 0, 165.00, '2023-03-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(491, 'Marcos', 'Istram Buhodra', 0, 0, 206.00, '2023-04-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(492, 'Marcos', 'Istram Buhodra', 0, 0, 41.20, '2023-04-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(493, 'Cesar Martin', 'Escuela Real Oviedo', 0, 0, 190.55, '2023-04-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(494, 'José Ramón', 'Oviedo Clinica Dental', 0, 0, 234.49, '2023-05-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(495, 'Mónica', 'Necesito Espacio', 0, 0, 222.09, '2023-06-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(496, 'Adrian', 'Proinlec Norte', 0, 0, 196.27, '2023-06-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(497, 'Sara', 'El Castro de Oscos', 0, 0, 229.00, '2023-06-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(498, 'Nacho y yo', 'Ruta Mágica', 0, 0, 220.00, '2023-07-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(499, 'Celia', 'Nantia', 0, 0, 80.00, '2023-08-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(500, 'Ignacio', 'Ignacio Granda', 0, 0, 39.90, '2023-10-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(501, 'Celia o Salomé', 'Nantia', 0, 0, 189.99, '2023-10-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(502, 'Cesar Martin', 'Escuela Real Oviedo', 0, 0, 12.00, '2023-12-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(503, 'Pedro', 'Pejarca', 0, 0, 618.60, '2023-12-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(504, 'Carlos', 'Caicoya Cecchini', 0, 0, 190.55, '2024-01-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-30 09:11:43'),
(505, 'Alberto', 'Transfer VTC', 0, 0, 249.00, '2024-02-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(506, 'Natalia Arevalo', 'La Casa de Amparo', 0, 0, 82.32, '2024-02-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2026-02-11 10:42:19'),
(507, 'Ignacio', 'Ignacio Granda', 0, 0, 189.48, '2024-03-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2026-02-25 10:53:40'),
(508, 'Alvaro', 'Alvaro Queipo', 0, 0, 82.40, '2024-04-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(509, 'Manolo o David', 'Tecno Oviedo', 0, 0, 422.30, '2024-04-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(510, 'Orlando', 'IASCI', 0, 0, 40.00, '2024-04-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(511, 'Natalia Arevalo', 'Las Terrazas de Candas', 0, 0, 80.00, '2024-04-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(512, 'PP Asturias', 'PP Asturias', 0, 0, 319.30, '2024-04-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(513, 'César', 'Escuela Real Oviedo', 0, 0, 12.28, '2024-05-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(514, 'Carlos', 'Regalaria', 0, 0, 40.96, '2024-05-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(515, 'Eugenia', 'Eugenia Bousoño', 0, 0, 80.00, '2024-05-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(516, 'Pablo', 'Guisasola y Leiva Abogados', 0, 0, 185.00, '2024-05-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(517, 'Mari Carmen', 'Casa Chanos', 0, 0, 170.00, '2024-05-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(518, 'Estefanía', 'Partido Popular', 0, 0, 230.00, '2024-06-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(519, 'Colegio Bembibre', 'Colegio Bembibre', 0, 0, 40.00, '2024-06-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(520, 'Natalia Arevalo', 'La Casa de Amparo', 0, 0, 185.00, '2024-08-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(521, 'Federico', 'Farmacia Alonso Luengo', 0, 0, 189.00, '2024-07-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(522, 'Federico', 'Farmacia Alonso Luengo', 0, 0, 60.00, '2024-07-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(523, 'Federico', 'Farmacia Alonso Luengo', 0, 0, 40.00, '2024-07-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(524, 'César', 'Escuela Real Oviedo', 0, 0, 120.00, '2024-10-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(525, 'Ana', 'Vital Centro', 0, 0, 29.90, '2024-10-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(526, 'Jaime', 'Jaime García Pacho Betica F', 0, 0, 45.00, '2024-10-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(527, 'Manolo Rubio', 'Inclinica', 0, 0, 240.00, '2024-10-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(528, 'Veronica', 'Esoterismo Senda Mágica', 0, 0, 82.48, '2025-12-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(529, 'John Breman', 'San Julian Rurales', 0, 0, 246.40, '2024-12-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(530, 'Natalia Arevalo', 'Las Terrazas de Candas', 0, 0, 190.37, '2025-02-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2026-02-11 10:42:19'),
(531, 'Jacobo', 'Paunero', 0, 0, 185.00, '2025-02-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(532, 'estefanía', 'PP Asturias', 0, 0, 12.00, '2025-02-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(533, 'Javier Cuesta', 'Gotten Consultant', 0, 0, 190.37, '2025-02-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2026-02-11 10:42:19'),
(534, 'David', 'Tecno Oviedo', 0, 0, 24.70, '2025-02-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2026-02-11 10:42:19'),
(535, 'Ana', 'Ana Valdes Peluqueros', 0, 0, 194.48, '2025-02-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2026-02-11 10:42:19'),
(536, 'Pîlar', 'Pilar Vara', 0, 0, 249.00, '2025-06-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(537, 'Antonio', 'La Portiella', 0, 0, 40.00, '2025-05-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(538, 'Natalia Arevalo', 'Las Terrazas de Candas', 0, 0, 0.00, '2024-02-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(539, 'kelvin', 'Instituto konarium', 0, 0, 20.00, '2024-06-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(540, 'Juan Carlos', 'Viveros los Molinos', 0, 0, 30.00, '2025-06-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(541, 'Angel', 'Notaría Ceyanes', 0, 0, 195.00, '2025-07-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(542, 'Sofía', 'Cartonajes VIR', 0, 0, 36.00, '2025-09-01', '2 x precio de piensa', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-11 11:57:45'),
(543, 'Laura', 'Veliter', 0, 0, 185.00, '2025-11-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(544, 'María Fernández', 'Team View', 0, 0, 185.00, '2025-11-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(545, 'Gonzalo Cobian', 'PP Asturias', 0, 0, 35.00, '2025-11-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(546, 'Nel', 'Nelaique', 0, 0, 185.00, '2025-10-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(547, 'Beatriz López Escobar', 'Congreso Turismo Rural', 0, 0, 215.00, '2025-11-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(548, 'Pablo Granero', 'Consulta dr Granero', 0, 0, 190.55, '2025-01-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-30 09:11:43'),
(549, 'Verónica', 'Esoterismo Senda Mágica', 0, 0, 185.00, '2025-03-01', 'nada', 'por definir', 'por definir', '', '2025-12-02 13:23:54', '2025-12-02 13:23:54'),
(552, 'Chema', 'Bancor Life', 0, 0, 40.00, '2025-12-01', '', 'Dominio', '', 'chema@bancorlife.com', '2025-12-10 13:04:42', '2025-12-10 13:04:42'),
(554, 'Chema', 'Bancor Life', 0, 0, 180.00, '2025-12-01', '', 'hosting web', '', 'chema@bancorlife.com', '2025-12-10 13:18:29', '2025-12-10 13:18:29'),
(555, 'Sara', 'Casa de Riba.', 1, 0, 225.71, '2025-09-01', 'Girar y facturar a El Castro de Oscos SL', '', '', '', '2025-12-10 13:31:50', '2026-01-02 13:18:57'),
(556, 'Agustin Oterino', 'Agustin Oterino', 0, 0, 191.99, '2025-04-01', '', 'dom + web', '', '', '2025-12-11 11:26:24', '2025-12-11 11:26:38'),
(557, 'Rafael', 'Carpas a Mosca', 0, 1, 185.00, '2025-02-01', '', '', '', '', '2025-12-11 11:30:12', '2025-12-11 11:30:12'),
(558, 'Alex', 'TSA Construcción', 0, 0, 185.00, '2025-02-01', '', '', '', '', '2025-12-11 11:53:58', '2025-12-11 11:53:58'),
(559, 'Elena', 'Hotel Peña Grande', 1, 0, 216.05, '2025-01-01', '', '', '', '', '2025-12-11 11:55:54', '2025-12-30 09:11:43'),
(560, 'Jenny', 'Casa Viduedo', 1, 0, 270.00, '2025-09-01', '', '', '', '', '2025-12-11 12:00:18', '2025-12-11 12:00:18'),
(561, 'Alberto', 'Asturvivienda', 0, 0, 190.00, '2026-01-01', 'Habría que trasladar el dominio pero no lo he conseguido porque no sabemos a qué cuenta de administrador del mismo llegó', 'Hosting web', '', '', '2026-01-29 16:15:30', '2026-01-29 16:15:30'),
(562, 'Juan (Bembibre)', 'Pinaster', 0, 0, 185.00, '2026-02-01', '', 'dominio + hosting', '', '', '2026-02-11 10:38:56', '2026-02-11 10:38:56'),
(563, 'María José', 'Pavimentos Vetusta', 1, 0, 12.00, '2026-02-01', '', 'cuenta email', '', '', '2026-02-23 12:15:50', '2026-02-23 12:15:50'),
(564, 'Juan', 'Pinaster Medio Ambiente', 1, 0, 40.00, '2026-02-01', '', 'Dominio pinastermedioambiente', '', '', '2026-02-23 12:17:15', '2026-02-23 12:17:15'),
(565, 'Ruben o Noelia', 'La Noceda', 0, 0, 195.00, '2026-02-25', '', 'hosting, dominio, email', '', '', '2026-03-02 11:45:07', '2026-03-02 11:45:07'),
(566, 'Mercedes', 'Restaurante Savannah', 1, 0, 225.00, '2026-03-11', '', 'Hosting + Dominio', '', '', '2026-03-11 11:51:21', '2026-03-11 11:51:21');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `w47fa_iv_clientes_renovaciones`
--
ALTER TABLE `w47fa_iv_clientes_renovaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fecha_renovacion` (`fecha_renovacion`),
  ADD KEY `email` (`email`),
  ADD KEY `nombre_cliente` (`nombre_cliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `w47fa_iv_clientes_renovaciones`
--
ALTER TABLE `w47fa_iv_clientes_renovaciones`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=567;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
