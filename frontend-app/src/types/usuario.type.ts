export type crearUsuarioDto = {
  local_id: string;
  user_name: string;
  password: string;
  nombre?: string;
  altura?: string;
  peso?: string;
  genero?: string;
};

export type usuarioType = crearUsuarioDto & {
  _id: string;
  rutinas: [];
  createdAt: string;
  updatedAt: string;
};
