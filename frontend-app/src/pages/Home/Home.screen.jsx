import React from "react";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { RootStackParamList } from "../../Main";
import InicioScreen from "./Inicio/Inicio.screen";
import EstadisticasScreen from "./Estadisticas/Estadisticas.screen";
import PerfilScreen from "./Perfil/Perfil.screen";
import RutinasNavigator, {
  RutinaStackParamList,
} from "./Rutinas/Rutinas.Navigator";
import { CustomHeader } from "../../components/CustomHeader/CustomHeader.component";
import { NavigatorScreenParams } from "@react-navigation/native";

export type HomeStackParamList = {
  Inicio: undefined;
  Perfil: undefined;
  Rutinas: NavigatorScreenParams<RutinaStackParamList>;
  Estadisticas: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

type RootStack = NativeStackScreenProps<RootStackParamList, "Home", "MyStack">;

const HomeScreen = ({}: RootStack) => {
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

export default HomeScreen;
