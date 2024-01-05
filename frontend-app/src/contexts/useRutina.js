import { useState } from "react";
import uuid from "react-native-uuid";

import rutinasServices from "../services/rutinasServices";
import ShowLog from "../Utils/ShowLog";
import catchError from "../Utils/catchError";

const createRutinaTemplate = {
  local_id: "",
  titulo: "",
  contenido: [
    {
      local_id: uuid.v4().toString().replace(/-/g, ""),
      nombre: "Día 1",
      ejercicios: [],
    },
  ],
};

function useRutina() {
  const [isLoading, setIsLoading] = useState(false);
  const [rutinas, setRutinas] = useState(/** @type {Array<rutinaType>} */ ([]));
  const [selectedRutina, setSelectedRutina] = useState(
    /** @type {rutinaType | undefined} */ (undefined)
  );

  const [rutinaTemplate, setRutinaTemplate] = useState(
    /** @type {crearRutinaDto} */ (createRutinaTemplate)
  );

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

  /**
   * Add title to routine
   * @param {string} titulo
   */
  const addTituloToRutina = (titulo) => {
    setRutinaTemplate({
      ...rutinaTemplate,
      titulo,
    });
  };

  /**
   * Add new content
   */
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

  /**
   * Delete content
   * @param {string} local_id
   */
  const dropContenido = (local_id) => {
    setRutinaTemplate({
      ...rutinaTemplate,
      contenido: rutinaTemplate.contenido.filter(
        (dia) => dia.local_id !== local_id
      ),
    });
  };

  /**
   * Create content
   * @param {string} local_id
   * @param {string} nombre
   * @param {Array<ejercicioType>} ejercicios
   */
  const createContenido = (local_id, nombre, ejercicios) => {
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

  /**
   * Delete exercise
   * @param {string} local_id_contenido
   * @param {string} local_id_ejercicio
   */
  const dropEjercicio = (local_id_contenido, local_id_ejercicio) => {
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

  /**
   * Create routine
   * @param {crearRutinaDto} newRutina
   * @returns {Promise<ResultType>}
   */
  const createRutina = (newRutina) => {
    ShowLog("useRutina/createRutina", JSON.stringify(newRutina, null, 4));
    setIsLoading(true);

    return rutinasServices
      .crearRutina(newRutina)
      .then(({ data }) => {
        ShowLog("useRutina/rutinaCreada", JSON.stringify(data, null, 4));
        return { status: "Ok", message: JSON.stringify(data) };
      })
      .catch((err) => {
        return catchError(err);
      });
  };

  /**
   * Get all routines
   * @returns {Promise<ResultType>}
   */
  const getAllRutinas = () => {
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

  /**
   * Get routine of user
   * @param {string} local_id
   * @returns {Promise<ResultType>}
   */
  const getRutina = (local_id) => {
    ShowLog("useRutina/getAllRutinas");

    return rutinasServices
      .getRutina(local_id)
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
