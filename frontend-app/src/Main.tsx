import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "./pages/Login/Login.screen";
import CrearUsuarioScreen from "./pages/CreateUser/CrearUsuario.screen";
import { CustomHeader } from "./components/CustomHeader.component";

export type RootStackParamList = {
  Login: undefined;
  CrearUsuario: undefined;
};
const RootStack = createNativeStackNavigator<RootStackParamList>();

function Main() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Login">
        <RootStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            header: () => <CustomHeader title="Login" />,
            headerTransparent: true,
          }}
        />
        <RootStack.Screen
          name="CrearUsuario"
          component={CrearUsuarioScreen}
          options={{
            header: () => <CustomHeader title="Crear usuario" />,
            headerTransparent: true,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default Main;
