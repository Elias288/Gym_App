import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { useState } from "react";

import InputTextCustom from "../../components/InputTextCustom.component";
import { GlobalStyles } from "../../Utils/GlobalStyles";
import { CustomMessage } from "../CreateUser/CustomMessage";
import { authContext } from "../../provider/AuthProvider";

const LoginForm = () => {
  const { login, isLoading } = authContext();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<boolean>(false);

  const handleLogin = async () => {
    setMessage("");
    setMessageType(true);

    const result = await login(username, password);

    if (result.status === "Error") {
      setMessageType(false);
      if (Array.isArray(result.message)) {
        setMessage(result.message.map((err: string) => "- " + err).join("\n"));
      }
      return;
    }
  };

  return (
    <>
      <View style={{ marginBottom: 20 }}>
        <InputTextCustom
          supLabel="Nombre de usuario"
          stateValue={username}
          state={setUsername}
        />

        <InputTextCustom
          supLabel="Contraseña"
          stateValue={password}
          state={setPassword}
          secure={true}
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
        >
          Entrar
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingBottom: 20,
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
