export type CrearRutinaDto = {
  local_id: string;
  titulo: string;
  contenido: Array<DiaType>;
};

export type DiaType = {
  local_id: string;
  nombre: string;
  ejercicios: Array<EjercicioType>;
};

export type EjercicioType = {
  local_id: string;
  nombre_ejercicio: string;
  repeticiones: string;
  series: string;
};

export type rutinaType = CrearRutinaDto & {
  _id: string;
  usuario_id: string;
  createdAt: string;
  updatedAt: string;
};
