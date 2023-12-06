import axios from "axios";

import authHeader from "../Utils/auth-header";
import { crearUsuarioDto } from "../types/usuario.type";

const url = `${process.env.EXPO_PUBLIC_API_URL}/api/usuario`;

const crearUsuario = (usuarioBody: crearUsuarioDto) => {
  return axios.request({
    timeout: 2000,
    method: "POST",
    url,
    data: usuarioBody,
    headers: { "Content-Type": "application/json" },
  });
};

const getUsuarioInfo = async () => {
  return axios.request({
    timeout: 5000,
    method: "GET",
    url,
    headers: await authHeader(),
  });
};

const updateUsuario = async (
  user_Id: string,
  updatedUser: Partial<crearUsuarioDto>
) => {
  return axios.request({
    timeout: 2000,
    method: "PATCH",
    url: url + `/${user_Id}`,
    data: updatedUser,
    headers: await authHeader(),
  });
};

export default {
  crearUsuario,
  getUsuarioInfo,
  updateUsuario,
};
