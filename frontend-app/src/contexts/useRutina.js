import { useEffect, useState } from "react";

import rutinasServices from "../services/rutinasServices";
import ShowLog from "../Utils/ShowLog";
import catchError from "../Utils/catchError";
import { useAuthContext } from "../provider/AuthProvider";

/** @type {crearRutinaDto} */
const createRutinaTemplate = {
  local_id: "",
  titulo: `Rutina #`,
  contenido: [],
};

/**
 * @typedef {Object} useRutinaProps
 * @property {boolean} isLoading
 * @property {rutinaType[]} rutinas
 * @property {crearRutinaDto} createRutinaTemplate
 * @property {rutinaType} selectedRutina
 *
 * @property {React.Dispatch<React.SetStateAction<rutinaType[]>>} setRutinas
 * @property {(newRutina: crearRutinaDto) => Promise<ResultType>} createRutina
 * @property {() => Promise<ResultType>} getAllRutinas
 * @property {(local_id: string) => Promise<ResultType>} getRutina
 * @property {(rutinaLocalId: string) => {message: string, status: string}} selectRutina
 */

/**
 * custom hook to use rutina
 * @returns {useRutinaProps}
 */
function useRutina() {
  const { updateUserInfo, userInfo } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [rutinas, setRutinas] = useState(/** @type {Array<rutinaType>} */ ([]));
  const [selectedRutina, setSelectedRutina] = useState(
    /** @type {rutinaType | undefined} */ (undefined)
  );

  useEffect(() => {
    getAllRutinas().then((result) => {
      if (result.status === "Error") {
        ShowLog("useRutina/useEffect/getAllRutinas", {
          msg: "error al obtener las rutinas",
        });
        return;
      }

      const rutinas = result.message;
      ShowLog("useRutina/useEffect/rutinas", rutinas);
      setRutinas(rutinas);

      // Set selected rutina
      const selectedRutine = rutinas.find(
        (rut) => rut._id === userInfo.selectedRoutineId
      );
      ShowLog("useRutina/useEffect/selectedRutina", userInfo.selectedRoutineId);
      setSelectedRutina(selectedRutine);
    });
  }, []);

  // ****************************** AUXILIAR FUNCTIONS ******************************

  /**
   * Define la rutina seleccionada, (solo puede ser 1) y la guarda localmente y remotamente
   * @param {string} rutinaId _id de la rutina seleccionada
   * @returns {{message: string, status: string}} resp
   */
  const selectRutina = (rutinaId) => {
    // TODO: cambiar a funcionamiento local
    const rutina = rutinas.find((rut) => rut._id === rutinaId);
    if (!rutina) return { message: "Rutina no encontrada", status: "Error" };

    setSelectedRutina(rutina);

    updateUserInfo({ selectedRoutineId: rutina._id });
    return { message: "Rutina seleccionada", status: "Ok" };
  };

  // TODO: comprobar si se está conectado a wifi si hay una rutina seleccionada

  // *********************************** FUNCTIONS ***********************************

  /**
   * Create routine
   * @param {crearRutinaDto} newRutina
   * @returns {Promise<ResultType>}
   */
  const createRutina = (newRutina) => {
    ShowLog("useRutina/createRutina", newRutina);
    setIsLoading(true);

    return rutinasServices
      .crearRutina(newRutina)
      .then(({ data }) => {
        ShowLog("useRutina/rutinaCreada", data);
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
    createRutinaTemplate,
    selectedRutina,
    setRutinas,
    createRutina,
    getAllRutinas,
    getRutina,
    selectRutina,
  };
}

export default useRutina;
