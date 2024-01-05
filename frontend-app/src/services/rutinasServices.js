import axios from "axios";
import authHeader from "../Utils/auth-header";

const url = `${process.env.EXPO_PUBLIC_API_URL}/api/rutina`;

/**
 * Create routine service
 * @param {crearRutinaDto} rutinaBody
 */
const crearRutina = async (rutinaBody) => {
  return axios.request({
    timeout: 2000,
    method: "POST",
    url,
    data: rutinaBody,
    headers: await authHeader(),
  });
};

/**
 * List all routines service
 */
const listRoutine = async () => {
  return axios.request({
    timeout: 2000,
    method: "GET",
    url,
    headers: await authHeader(),
  });
};

/**
 * Get routine by local_id service
 * @param {string} rutina_local_Id
 */
const getRutina = async (rutina_local_Id) => {
  return axios.request({
    timeout: 2000,
    method: "GET",
    url: url + `/${rutina_local_Id}`,
    headers: await authHeader(),
  });
};

/**
 * Update routine by id service
 * @param {string} rutina_Id
 * @param {Partial<crearRutinaDto>} updatedRutina
 */
const updateRutina = async (rutina_Id, updatedRutina) => {
  return axios.request({
    timeout: 2000,
    method: "PATCH",
    url: url + `/${rutina_Id}`,
    data: updatedRutina,
    headers: await authHeader(),
  });
};

/**
 * Delete routine service
 * @param {string} rutina_Id
 */
const deleteRutina = async (rutina_Id) => {
  return axios.request({
    timeout: 2000,
    method: "DELETE",
    url: url + `/${rutina_Id}`,
    headers: await authHeader(),
  });
};

export default {
  crearRutina,
  listarRutinas: listRoutine,
  getRutina,
  updateRutina,
  deleteRutina,
};
