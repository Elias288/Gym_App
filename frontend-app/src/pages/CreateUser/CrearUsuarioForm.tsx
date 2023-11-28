import { Text, View, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button } from "react-native-paper";
import uuid from "react-native-uuid";

import InputTextCustom from "../../components/InputTextCustom.component";
import { GlobalStyles } from "../../Utils/GlobalStyles";
import { SelectList } from "react-native-dropdown-select-list";
import { GenerosList } from "../../Utils/Generos";
import { crearUsuario, crearUsuarioDto } from "../../services/usuariosServices";
import { CustomMessage } from "./CustomMessage";

type selectType = {
  key: string;
  value: string;
};

const CrearUsuarioForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const [generos, setGeneros] = useState<Array<selectType>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [password2, setPassword2] = useState<string>("");
  const [createUser, setCreateUser] = useState<crearUsuarioDto>({
    local_id: uuid.v4().toString().replace(/-/g, ""),
    user_name: "",
    password: "",
  });

  const [messageType, setMessageType] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    chargeGeneros();
  }, []);

  const chargeGeneros = () => {
    setGeneros([]);
    GenerosList.map((g) => {
      setGeneros((geList) => [...geList, { key: g.value, value: g.genero }]);
    });
  };

  const submit = async () => {
    setMessageType(true);
    setMessage("");

    setLoading(true);
    const result = await crearUsuario(createUser, password2);
    // console.log("crearUserRes:", JSON.stringify(result, null, 4));

    setLoading(false);
    if (result.status === "Error") {
      setMessageType(false);
      setMessage(result.message.map((err: string) => "- " + err).join("\n"));
      return;
    }

    setMessageType(true);
    setMessage("Usuario registrado");
    setTimeout(() => {
      onSubmit();
    }, 2000);
  };

  return (
    <>
      <InputTextCustom
        supLabel="Nombre de usuario*"
        stateValue={createUser.user_name}
        state={(e) => setCreateUser({ ...createUser, user_name: e })}
      />
      <InputTextCustom
        supLabel="Contraseña*"
        stateValue={createUser.password}
        state={(e) => setCreateUser({ ...createUser, password: e })}
        secure={true}
      />
      <InputTextCustom
        supLabel="Repetir contraseña*"
        stateValue={password2}
        state={setPassword2}
        secure={true}
      />

      {/* Información opcional */}
      <View style={styles.optionalContainer}>
        <View
          style={{
            flexDirection: "row",
            marginTop: -10,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              backgroundColor: GlobalStyles.colorLightGray,
              paddingHorizontal: 5,
            }}
          >
            Información de Usuario
          </Text>
        </View>

        <InputTextCustom
          supLabel="Nombre"
          stateValue={createUser.nombre || ""}
          state={(e) => setCreateUser({ ...createUser, nombre: e })}
        />

        <View style={{ marginTop: 10 }}>
          <Text style={{ marginBottom: 10 }}>Genero</Text>
          <SelectList
            data={generos}
            setSelected={(e: any) =>
              setCreateUser({ ...createUser, genero: e })
            }
            search={false}
            boxStyles={{
              backgroundColor: GlobalStyles.colorWhite,
              borderWidth: 0,
            }}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          {/* Peso */}
          <InputTextCustom
            supLabel="Altura (m)"
            stateValue={createUser.altura || ""}
            state={(e) => setCreateUser({ ...createUser, altura: e })}
            format={[/\d/, ",", /\d/, /\d/]}
            label="0,00 m"
            styleContainer={{
              flex: 1,
              paddingRight: 20,
            }}
          />

          {/* Altura */}
          <InputTextCustom
            supLabel="Peso (Kg)"
            stateValue={createUser.peso || ""}
            state={(e) => setCreateUser({ ...createUser, peso: e })}
            format={[/\d/, /\d/, ".", /\d/, /\d/]}
            label="00.00 Kg"
            styleContainer={{ flex: 1 }}
          />
        </View>
      </View>

      {loading && (
        <View style={{ marginVertical: 10 }}>
          <ActivityIndicator animating={true} size={"large"} />
        </View>
      )}
      <CustomMessage message={message} type={messageType} />

      {/* Actions */}
      <View style={styles.actionContainer}>
        <Button
          mode="contained"
          style={{ borderRadius: 15, marginRight: 5 }}
          onPress={onSubmit}
        >
          Cancelar
        </Button>
        <Button mode="contained" style={{ borderRadius: 15 }} onPress={submit}>
          Crear
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
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  optionalContainer: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingBottom: 20,
    marginVertical: 20,
    borderColor: "#c2c2c2",
  },
});

export default CrearUsuarioForm;
