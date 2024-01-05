import { useState } from "react";
import uuid from "react-native-uuid";

import {
  CrearRutinaDto,
  EjercicioType,
  rutinaType,
} from "../types/rutina.type";
import { ResultType } from "../types/Result.type";
import rutinasServices from "../services/rutinasServices";
import ShowLog from "../Utils/ShowLog";
import catchError from "../Utils/catchError";

export interface rutinaProps {
  isLoading: boolean;
  rutinas: Array<rutinaType>;
  rutinaTemplate: CrearRutinaDto;
  setRutinas: (rutinas: rutinaType[]) => void;
  initTemplate: () => void;
  addTituloToRutina: (titulo: string) => void;
  addNewContenido: () => void;
  createContenido: (
    local_id: string,
    nombre: string,
    ejercicios: Array<EjercicioType>
  ) => void;
  dropContenido: (local_id: string) => void;
  dropEjercicio: (local_id_dia: string, local_id_ejercicio: string) => void;
  createRutina: ({
    newRutina,
  }: {
    newRutina: CrearRutinaDto;
  }) => Promise<ResultType>;
  getAllRutinas: () => Promise<ResultType>;
  getRutina: ({ local_id }: { local_id: string }) => Promise<ResultType>;
}

function useRutina(): rutinaProps {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rutinas, setRutinas] = useState<Array<rutinaType>>([]);
  const [selectedRutina, setSelectedRutina] = useState<rutinaType>();

  const [rutinaTemplate, setRutinaTemplate] = useState<CrearRutinaDto>({
    local_id: "",
    titulo: "",
    contenido: [
      {
        local_id: uuid.v4().toString().replace(/-/g, ""),
        nombre: "Día 1",
        ejercicios: [],
      },
    ],
  });

  // ****************************** AUXILIAR FUNCTIONS ******************************

  const initTemplate = () => {
    setRutinaTemplate({
      local_id: "",
      titulo: "",
      contenido: [
        {
          local_id: uuid.v4().toString().replace(/-/g, ""),
          nombre: "Día 1",
          ejercicios: [],
        },
      ],
    });
  };

  const addTituloToRutina = (titulo: string) => {
    setRutinaTemplate({
      ...rutinaTemplate,
      titulo,
    });
  };

  const addNewContenido = () => {
    if (rutinaTemplate.contenido.length >= 7) return;

    setRutinaTemplate({
      ...rutinaTemplate,
      contenido: [
        ...rutinaTemplate.contenido,
        {
          local_id: uuid.v4().toString().replace(/-/g, ""),
          nombre: `Día ${rutinaTemplate.contenido.length + 1}`,
          ejercicios: [],
        },
      ],
    });
  };

  const dropContenido = (local_id: string) => {
    setRutinaTemplate({
      ...rutinaTemplate,
      contenido: rutinaTemplate.contenido.filter(
        (dia) => dia.local_id !== local_id
      ),
    });
  };

  const createContenido = (
    local_id: string,
    nombre: string,
    ejercicios: Array<EjercicioType>
  ) => {
    setRutinaTemplate({
      ...rutinaTemplate,
      contenido: rutinaTemplate.contenido.map((dia) =>
        dia.local_id === local_id
          ? {
              local_id: dia.local_id,
              nombre: nombre,
              ejercicios: ejercicios,
            }
          : dia
      ),
    });
  };

  const dropEjercicio = (
    local_id_contenido: string,
    local_id_ejercicio: string
  ) => {
    setRutinaTemplate({
      ...rutinaTemplate,
      contenido: rutinaTemplate.contenido.map((dia) =>
        dia.local_id === local_id_contenido
          ? {
              ...dia,
              ejercicios: dia.ejercicios.filter(
                (ejercicio) => ejercicio.local_id !== local_id_ejercicio
              ),
            }
          : dia
      ),
    });
  };

  // *********************************** FUNCTIONS ***********************************
  const createRutina = ({
    newRutina,
  }: {
    newRutina: CrearRutinaDto;
  }): Promise<ResultType> => {
    ShowLog("useRutina/createRutina", JSON.stringify(newRutina, null, 4));
    setIsLoading(true);

    return rutinasServices
      .crearRutina({ rutinaBody: newRutina })
      .then(({ data }) => {
        ShowLog("useRutina/rutinaCreada", JSON.stringify(data, null, 4));
        return { status: "Ok", message: JSON.stringify(data) };
      })
      .catch((err) => {
        return catchError(err);
      });
  };

  const getAllRutinas = (): Promise<ResultType> => {
    ShowLog("useRutina/getAllRutinas");

    return rutinasServices
      .listarRutinas()
      .then(({ data }) => {
        setRutinas(data);
        return { status: "Ok", message: data };
      })
      .catch((err) => {
        setIsLoading(false);
        return catchError(err);
      });
  };

  const getRutina = ({
    local_id,
  }: {
    local_id: string;
  }): Promise<ResultType> => {
    ShowLog("useRutina/getAllRutinas");

    return rutinasServices
      .getRutina({ rutina_local_Id: local_id })
      .then(({ data }) => {
        return { status: "Ok", message: data };
      })
      .catch((err) => {
        setIsLoading(false);
        return catchError(err);
      });
  };

  return {
    isLoading,
    rutinas,
    rutinaTemplate,
    setRutinas,
    initTemplate,
    addTituloToRutina,
    addNewContenido,
    createContenido,
    dropContenido,
    dropEjercicio,
    createRutina,
    getAllRutinas,
    getRutina,
  };
}

export default useRutina;
