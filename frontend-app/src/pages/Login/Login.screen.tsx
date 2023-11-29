import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import { RootStackParamList } from "../../Main";
import LoginForm from "./LoginForm";
import { GlobalStyles } from "../../Utils/GlobalStyles";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen = ({ navigation }: Props) => {
  const goToCreateUser = () => navigation.navigate("CrearUsuario");

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, marginHorizontal: 40 }}>
        {/* Login form */}
        <View style={{ flex: 1, justifyContent: "center" }}>
          <LoginForm />
        </View>

        <View style={{ padding: 20, alignItems: "center" }}>
          <Button onPress={goToCreateUser}>Crear una cuenta nueva {">"}</Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: GlobalStyles.headerHeight,
    backgroundColor: GlobalStyles.colorLightGray,
  },
  titleContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default LoginScreen;
