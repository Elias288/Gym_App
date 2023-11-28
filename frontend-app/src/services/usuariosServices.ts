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

type ResultType = {
  status: string;
  message: Array<string>;
};

export const crearUsuario = (
  usuarioBody: crearUsuarioDto,
  password2: string
): Promise<ResultType> | ResultType => {
  if (usuarioBody.password !== password2) {
    return {
      status: "Error",
      message: ["Las contraseñas no coinciden"],
    };
  }

  return axios
    .request({
      timeout: 2000,
      method: "POST",
      url,
      data: usuarioBody,
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res)
    .then(() => {
      const result: ResultType = { status: "Ok", message: ["Usuario Creado"] };
      return result;
    })
    .catch((error) => {
      if (error.response) {
        let err: string | Array<string> = error.response.data.message;
        if (!Array.isArray(err)) err = [err];

        return { status: "Error", message: err };
      }

      return { status: "Error", message: ["Error de conexión"] };
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
