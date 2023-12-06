import { useState } from "react";
import { crearRutinaDto, rutinaType } from "../types/rutina.type";
import rutinasServices from "../services/rutinasServices";
import ShowLog from "../Utils/ShowLog";
import { ResultType } from "../types/Result.type";
import catchError from "../Utils/catchError";

export interface rutinaProps {
  isLoading: boolean;
  createRutina: ({
    newRutina,
  }: {
    newRutina: crearRutinaDto;
  }) => Promise<ResultType>;
  getAllRutinas: () => Promise<ResultType>;
  getRutina: ({ local_id }: { local_id: string }) => Promise<ResultType>;
}

function useRutina(): rutinaProps {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedRutina, setSelectedRutina] = useState<
    rutinaType | undefined
  >();
  // ****************************** AUXILIAR FUNCTIONS ******************************

  // *********************************** FUNCTIONS ***********************************
  const createRutina = ({
    newRutina,
  }: {
    newRutina: crearRutinaDto;
  }): Promise<ResultType> => {
    ShowLog("useRutina/createRutina");
    setIsLoading(true);

    return rutinasServices
      .crearRutina({ rutinaBody: newRutina })
      .then(({ data }) => {
        return { status: "Ok", message: "" };
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
    createRutina,
    getAllRutinas,
    getRutina,
  };
}

export default useRutina;
