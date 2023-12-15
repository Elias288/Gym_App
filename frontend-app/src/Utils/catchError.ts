import { ResultType } from "../types/Result.type";
import ShowLog from "./ShowLog";

const catchError = (error: any): ResultType => {
  ShowLog("catchError", JSON.stringify(error, null, 4));

  if (error.name == "AxiosError") {
    console.log("AxiosError");

    return { status: "Error", message: "Error de conexión" };
  }

  if (error.response) {
    let err: string | Array<string> = error.response.data.message;
    if (!Array.isArray(err)) err = [err];

    return { status: "Error", message: err };
  }

  return { status: "Error", message: "Error de conexión" };
};

export default catchError;
