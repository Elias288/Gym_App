import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InicioScreen from "./Inicio/Inicio.screen";
import EstadisticasScreen from "./Estadisticas/Estadisticas.screen";
import PerfilScreen from "./Perfil/Perfil.screen";
import RutinasNavigator from "./Rutinas/Rutinas.Navigator";
import { CustomHeader } from "../../components/CustomHeader/CustomHeader.component";

const HomeStack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Inicio">
      <HomeStack.Screen
        name="Inicio"
        component={InicioScreen}
        options={{
          header: (props) => (
            <CustomHeader
              title="Inicio"
              hasSideBar={true}
              {...props}
              sideBarSelected="Inicio"
            />
          ),
          headerTransparent: true,
        }}
      />

      <HomeStack.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          header: () => (
            <CustomHeader
              title="Perfil"
              hasSideBar={true}
              sideBarSelected="Perfil"
            />
          ),
          headerTransparent: true,
        }}
      />

      <HomeStack.Screen
        name="Rutinas"
        component={RutinasNavigator}
        options={{
          headerShown: false,
        }}
      />

      <HomeStack.Screen
        name="Estadisticas"
        component={EstadisticasScreen}
        options={{
          header: () => (
            <CustomHeader
              title="Estadisticas"
              hasSideBar={true}
              sideBarSelected="Estadisticas"
            />
          ),
          headerTransparent: true,
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
