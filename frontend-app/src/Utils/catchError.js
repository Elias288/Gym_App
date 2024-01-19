import ShowLog from "./ShowLog";

/**
 * @param {any} error
 * @returns {ResultType}
 */
const catchError = (error) => {
  if (error.response) {
    /** @type {string | Array<string>} */
    let err = error.response.data.message;
    if (!Array.isArray(err)) err = [err];

    return { status: "Error", message: err };
  }

  return { status: "Error", message: "Error de conexión" };
};

export default catchError;
