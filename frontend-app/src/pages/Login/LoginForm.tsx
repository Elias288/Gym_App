import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { GlobalStyles } from "../../Utils/GlobalStyles";
import { useState } from "react";
import InputTextCustom from "../../components/InputTextCustom.component";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = () => {
    alert("no implementado");
  };

  return (
    <>
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

      <View style={styles.actionContainer}>
        <Button
          mode="contained"
          style={{ borderRadius: 15 }}
          onPress={onSubmit}
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
