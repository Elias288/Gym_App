import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import LoginForm from "./LoginForm";
import { GlobalStyles } from "../../Utils/GlobalStyles";
import { authContext } from "../../provider/AuthProvider";

/**
 *
 * @param {Object} props
 * @param {any} props.navigation
 * @param {any} props.route
 */
const LoginScreen = ({ navigation }) => {
  const { isLoading } = authContext();
  const goToCreateUser = () => navigation.navigate("CrearUsuario");

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, marginHorizontal: 40 }}>
        {/* Login form */}
        <View style={{ flex: 1, justifyContent: "center" }}>
          <LoginForm />
        </View>

        <View style={{ padding: 20, alignItems: "center" }}>
          <Button onPress={goToCreateUser} disabled={isLoading}>
            Crear una cuenta nueva {">"}
          </Button>
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
