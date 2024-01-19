import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { useState } from "react";

import InputTextCustom from "../../components/InputTextCustom.component";
import { GlobalStyles } from "../../Utils/GlobalStyles";
import { CustomMessage } from "../CreateUser/CustomMessage";
import { useAuthContext } from "../../provider/AuthProvider";

const LoginForm = () => {
  const { login, isLoading } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(false);

  const handleLogin = async () => {
    setMessage("");
    setMessageType(true);

    const result = await login(username, password);

    if (result.status === "Error") {
      setMessageType(false);
      if (Array.isArray(result.message)) {
        setMessage(result.message.map((err) => "- " + err).join("\n"));
        return;
      }
      setMessage("- " + result.message);
    }
  };

  return (
    <>
      <View style={{ marginBottom: 20 }}>
        <InputTextCustom
          supLabel="Nombre de usuario"
          stateValue={username}
          state={setUsername}
          styleContainer={{ marginTop: 20, marginBottom: 5 }}
        />

        <InputTextCustom
          supLabel="Contraseña"
          stateValue={password}
          state={setPassword}
          secure={true}
          styleContainer={{ marginTop: 20, marginBottom: 5 }}
        />
      </View>

      {isLoading && (
        <View style={{ marginVertical: 10 }}>
          <ActivityIndicator animating={true} size={"large"} />
        </View>
      )}
      <CustomMessage message={message} type={messageType} />

      <View style={styles.actionContainer}>
        <Button
          mode="contained"
          style={{ borderRadius: 15 }}
          onPress={handleLogin}
          disabled={isLoading}
        >
          Entrar
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingBottom: GlobalStyles.horizontalPadding,
  },
  inputTextOutlineStyle: {
    borderColor: "transparent",
    borderRadius: 15,
    backgroundColor: GlobalStyles.colorWhite,
  },
  actionContainer: {
    marginVertical: 10,
    flexDirection: "row-reverse",
  },
});

export default LoginForm;
