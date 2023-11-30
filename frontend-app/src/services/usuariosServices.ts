import axios from "axios";

import authHeader from "../Utils/auth-header";

const url = `${process.env.EXPO_PUBLIC_API_URL}/api/usuario`;

export type crearUsuarioDto = {
  local_id: string;
  user_name: string;
  password: string;
  nombre?: string;
  altura?: string;
  peso?: string;
  genero?: string;
};

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
