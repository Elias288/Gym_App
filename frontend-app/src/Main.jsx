import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "./pages/Login/Login.screen";
import CrearUsuarioScreen from "./pages/CreateUser/CrearUsuario.screen";
import HomeNavigator from "./pages/Home/Home.navigatior";
import { CustomHeader } from "./components/CustomHeader/CustomHeader.component";
import { useAuthContext } from "./provider/AuthProvider";

const RootStack = createNativeStackNavigator();

function Main() {
  const { isLogin } = useAuthContext();

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {!isLogin ? (
          <>
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
          </>
        ) : (
          <>
            <RootStack.Screen
              name="Home"
              component={HomeNavigator}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default Main;
