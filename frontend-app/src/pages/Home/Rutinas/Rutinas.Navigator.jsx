import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CustomHeader } from "../../../components/CustomHeader/CustomHeader.component";
import ListarRutinaScreen from "./ListarRutinas.screen";
import CrearRutinaScreen from "./CrearRutina.screen";
import CargarDiaScreen from "./CargarDia.screen";

const RutinasStack = createNativeStackNavigator();

const RutinasNavigator = () => {
  return (
    <RutinasStack.Navigator initialRouteName="Listar">
      <RutinasStack.Screen
        name="Listar"
        component={ListarRutinaScreen}
        options={{
          header: () => (
            <CustomHeader
              title="Rutinas"
              hasSideBar={true}
              sideBarSelected="Rutinas"
            />
          ),
          headerTransparent: true,
        }}
      />

      <RutinasStack.Screen
        name="CrearRutina"
        component={CrearRutinaScreen}
        options={{
          header: () => (
            <CustomHeader
              title="Crear Rutina"
              hasSideBar={true}
              sideBarSelected="Rutinas"
            />
          ),
          headerTransparent: true,
        }}
      />

      <RutinasStack.Screen
        name="CargarDia"
        component={CargarDiaScreen}
        options={{
          header: () => <CustomHeader title="Cargar Día" />,
          headerTransparent: true,
        }}
      />
    </RutinasStack.Navigator>
  );
};

export default RutinasNavigator;
