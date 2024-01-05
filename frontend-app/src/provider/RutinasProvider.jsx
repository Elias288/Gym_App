import React, { createContext, useContext } from "react";

import useRutina from "../contexts/useRutina";

const RutinaContext = createContext(useRutina());

export function rutinaContext() {
  const context = useContext(RutinaContext);
  if (!context)
    throw new Error("useRutina debe estar dentro de un RutinaProvider");

  return context;
}

/**
 * @param {Object} props
 * @param {any} props.children
 */
const RutinaProvider = ({ children }) => {
  return (
    <RutinaContext.Provider value={useRutina()}>
      {children}
    </RutinaContext.Provider>
  );
};

export default RutinaProvider;
