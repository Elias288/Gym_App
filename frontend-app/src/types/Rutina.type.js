/**
 * ejercicio type definition
 * @typedef {Object} ejercicioType
 * @property {string} nombre_ejercicio
 * @property {string} repeticiones
 * @property {string} series
 */

/**
 * @typedef {Object} diaType
 * @property {string} nombre
 * @property {Array<ejercicioType>} ejercicios
 */

/**
 * crear rutina Dto definition
 * @typedef {Object} crearRutinaDto
 * @property {string} local_id
 * @property {string} titulo
 * @property {Array<diaType>} contenido
 */

/**
 * rutina type definition
 * @typedef {Object} rutinaType
 * @property {string} _id
 * @property {string} _id
 * @property {string} titulo
 * @property {Array<diaType>} contenido
 * @property {string} usuario_id
 * @property {string} createdAt
 * @property {string} updatedAt
 */
