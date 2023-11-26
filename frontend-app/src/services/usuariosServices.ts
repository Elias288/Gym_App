import axios from "axios";

import { API_URL } from "@env";

const url = `${API_URL}/api/usuario`;

export type crearUsuarioDto = {
  local_id: string;
  user_name: string;
  password: string;
  nombre?: string;
  altura?: string;
  peso?: string;
  genero?: string;
};

export const crearUsuario = (usuarioBody: crearUsuarioDto) => {
  console.log(usuarioBody);

  return axios
    .post(url, usuarioBody, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res)
    .catch((error) => {
      if (error.response) {
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
};

export const login = (user_name: string, password: string) => {
  /* return FetchData(
    "auth/login",
    {
      method: "POST",
      body: JSON.stringify({ user_name, password }),
    },
    (res) => {
      if (DEVELOP) console.log(res);
    },
    (err) => {
      if (DEVELOP) console.log(err);
    }
  ); */
};

export const getUsuarioInfo = (token: string) => {
  /* return FetchData(
    url,
    {
      method: "GET",
      headers: { Authorization: token },
    },
    (res) => {
      if (DEVELOP) console.log(res);
    },
    (err) => {
      if (DEVELOP) console.log(err);
    }
  ); */
};

export const updateUsuario = (
  token: string,
  props: Partial<crearUsuarioDto>
) => {
  /* return FetchData(
    url,
    {
      method: "PATCH",
      headers: { Authorization: token },
      body: JSON.stringify(props),
    },
    (res) => {
      if (DEVELOP) console.log(res);
    },
    (err) => {
      if (DEVELOP) console.log(err);
    }
  ); */
};
