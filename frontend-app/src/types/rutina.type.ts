export type crearRutinaDto = {
  local_id: string;
  titulo: string;
  ejercicios: Array<ejercicioType>;
  usuario_id: string;
};

export type ejercicioType = {
  nombre_ejercicio: string;
  repeticiones: string;
  series: string;
};

export type rutinaType = crearRutinaDto & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
