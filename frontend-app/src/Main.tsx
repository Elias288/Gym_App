import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { View } from "react-native";

import LoginScreen from "./pages/Login/Login.screen";
import CrearUsuarioScreen from "./pages/CreateUser/CrearUsuario.screen";
import HomeScreen from "./pages/Home/Home.screen";
import { CustomHeader } from "./components/CustomHeader/CustomHeader.component";
import { authContext } from "./provider/AuthProvider";

export type RootStackParamList = {
  Login: undefined;
  CrearUsuario: undefined;
  Home: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function Main() {
  const { isLogin, isChargeLoading } = authContext();

  if (isChargeLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator animating={true} size={100} />
      </View>
    );

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
              component={HomeScreen}
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
