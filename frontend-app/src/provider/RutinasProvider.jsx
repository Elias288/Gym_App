import React, { createContext, useContext } from "react";

import useRutina from "../contexts/useRutina";

/** @type {import('react').Context<import("../contexts/useRutina").useRutinaProps>} */
const RutinaContext = createContext(undefined);

/** @param {{ children: jsx.element}} [props] */
const RutinaProvider = ({ children }) => {
  return (
    <RutinaContext.Provider value={useRutina()}>
      {children}
    </RutinaContext.Provider>
  );
};

export function useRutinaContext() {
  const context = useContext(RutinaContext);
  if (!context)
    throw new Error("useRutina debe estar dentro de un RutinaProvider");

  return context;
}

export default RutinaProvider;
