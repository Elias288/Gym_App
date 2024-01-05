import { ReactNode, createContext, useContext } from "react";
import useRutina, { rutinaProps } from "../contexts/useRutina";

const RutinaContext = createContext<rutinaProps | undefined>(undefined);

export function rutinaContext() {
  const context = useContext(RutinaContext);
  if (!context)
    throw new Error("useRutina debe estar dentro de un RutinaProvider");

  return context;
}

const RutinaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <RutinaContext.Provider value={useRutina()}>
      {children}
    </RutinaContext.Provider>
  );
};

export default RutinaProvider;
