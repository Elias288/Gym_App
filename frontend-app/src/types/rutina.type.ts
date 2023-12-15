export type crearRutinaDto = {
  local_id: string;
  titulo: string;
  ejercicios: Array<dia>;
};

export type dia = {
  nombre: string;
  ejercicios: Array<ejercicioType>;
};

export type ejercicioType = {
  nombre_ejercicio: string;
  repeticiones: string;
  series: string;
};

export type rutinaType = crearRutinaDto & {
  _id: string;
  usuario_id: string;
  createdAt: string;
  updatedAt: string;
};
