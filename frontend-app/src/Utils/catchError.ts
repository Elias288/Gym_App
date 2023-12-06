const catchError = ({ error }: { error: any }) => {
  if (error.response) {
    let err: string | Array<string> = error.response.data.message;
    if (!Array.isArray(err)) err = [err];

    return { status: "Error", message: err };
  }

  return { status: "Error", message: "Error de conexión" };
};

export default catchError;
