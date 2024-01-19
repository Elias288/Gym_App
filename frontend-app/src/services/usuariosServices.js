import axios from "axios";

import authHeader from "../Utils/auth-header";

const url = `${process.env.EXPO_PUBLIC_API_URL}/api/usuario`;

/**
 * Create user service
 * @param {crearUsuarioDto} usuarioBody
 * @returns
 */
const crearUsuario = (usuarioBody) => {
  return axios.request({
    timeout: 2000,
    method: "POST",
    url,
    data: usuarioBody,
    headers: { "Content-Type": "application/json" },
  });
};

/**
 * Get user Info by token service
 * @returns
 */
const getUsuarioInfo = async () => {
  return axios.request({
    timeout: 5000,
    method: "GET",
    url,
    headers: await authHeader(),
  });
};

/**
 * Update user by id service
 * @param {Partial<crearUsuarioDto>} updatedUser
 * @returns
 */
const updateUsuario = async (updatedUser) => {
  return axios.request({
    timeout: 2000,
    method: "PATCH",
    url,
    data: updatedUser,
    headers: await authHeader(),
  });
};

export default {
  crearUsuario,
  getUsuarioInfo,
  updateUsuario,
};
