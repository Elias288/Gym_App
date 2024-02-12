import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";

import LoginForm from "./LoginForm";
import { GlobalStyles } from "../../Utils/GlobalStyles";
import { useAuthContext } from "../../provider/AuthProvider";
import ShowLog from "../../Utils/ShowLog";
import { CustomMessage } from "../CreateUser/CustomMessage";

const LoginScreen = ({ navigation }) => {
  const {
    isLoading,
    isChargeLoading,
    getUserInfo,
    stopIsChargeLoading,
    stopIsLoading,
  } = useAuthContext();

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(false);

  const goToCreateUser = () => navigation.navigate("CrearUsuario");

  const chargeUserInfo = async () => {
    setMessageType(true);
    const result = await getUserInfo();

    stopIsLoading();
    stopIsChargeLoading();
    if (result.status === "Error") {
      ShowLog("loginScreen/chargeUserInfo/error", result);
      setMessageType(false);
      if (Array.isArray(result.message)) {
        setMessage(result.message.map((err) => "- " + err).join("\n"));
        return;
      }

      setMessage("- " + result.message);
    }
  };

  if (isChargeLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator animating={true} size={100} />
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, marginHorizontal: 40 }}>
        {/* Login form */}
        <View style={{ flex: 1, justifyContent: "center" }}>
          <LoginForm />
          <CustomMessage message={message} type={messageType} />
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
