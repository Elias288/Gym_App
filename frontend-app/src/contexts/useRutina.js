import { useState } from "react";

import rutinasServices from "../services/rutinasServices";
import ShowLog from "../Utils/ShowLog";
import catchError from "../Utils/catchError";

const createRutinaTemplate = {
  local_id: "",
  titulo: `Rutina #`,
  contenido: [],
};

function useRutina() {
  const [isLoading, setIsLoading] = useState(false);
  const [rutinas, setRutinas] = useState(/** @type {Array<rutinaType>} */ ([]));
  const [selectedRutina, setSelectedRutina] = useState(
    /** @type {rutinaType | undefined} */ (undefined)
  );

  // ****************************** AUXILIAR FUNCTIONS ******************************

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
    createRutinaTemplate,
    selectedRutina,
    setRutinas,
    createRutina,
    getAllRutinas,
    getRutina,
    setSelectedRutina,
  };
}

export default useRutina;
