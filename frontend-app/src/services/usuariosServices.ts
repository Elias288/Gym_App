import axios from "axios";

import authHeader from "../Utils/auth-header";
import { crearUsuarioDto } from "./crearUsuarioDto.type";

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
  const authH = await authHeader();
  return axios.request({
    timeout: 5000,
    method: "GET",
    url,
    headers: authH,
  });
};

const updateUsuario = (token: string, props: Partial<crearUsuarioDto>) => {
  /* return FetchData(
    url,
    {
      method: "PATCH",
      headers: { Authorization: token },
      body: JSON.stringify(props),
    },
    (res) => {
      if (process.env.DEVELOP) console.log(res);
    },
    (err) => {
      if (process.env.DEVELOP) console.log(err);
    }
  ); */
};

export default {
  crearUsuario,
  getUsuarioInfo,
  updateUsuario,
};
