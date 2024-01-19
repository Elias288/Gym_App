import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import uuid from "react-native-uuid";

import InputTextCustom from "../../components/InputTextCustom.component";
import { GlobalStyles } from "../../Utils/GlobalStyles";
import { GenerosList } from "../../Utils/Generos";
import { CustomMessage } from "./CustomMessage";
import { useAuthContext } from "../../provider/AuthProvider";
import BorderContainerComponent from "../../components/borderContainer.component";

/**
 * @typedef {Object} selectType
 * @property {string} key
 * @property {string} value
 */

const newUserTemplate = {
  local_id: uuid.v4().toString().replace(/-/g, ""),
  user_name: "",
  password: "",
};

/**
 * @param {Object} props
 * @param {() => void} props.onSubmit
 */
const CrearUsuarioForm = ({ onSubmit }) => {
  const { createUser, isLoading, stopIsLoading } = useAuthContext();

  const [generos, setGeneros] = useState(/** @type {Array<selectType>} */ ([]));
  const [newUsuario, setNewUsuario] = useState(
    /** @type {crearUsuarioDto} */ (newUserTemplate)
  );
  const [password2, setPassword2] = useState(/** @type {string} */ "");
  const [messageType, setMessageType] = useState(/** @type {boolean} */ true);
  const [message, setMessage] = useState(/** @type {string} */ "");

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

    const result = await createUser(newUsuario, password2);
    stopIsLoading();

    if (result.status === "Error") {
      setMessageType(false);
      if (Array.isArray(result.message)) {
        setMessage(result.message.map((err) => "- " + err).join("\n"));
        return;
      }

      setMessage("- " + result.message);
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
        stateValue={newUsuario.user_name}
        state={(e) => setNewUsuario({ ...newUsuario, user_name: e })}
        styleContainer={{ marginTop: 20, marginBottom: 5 }}
      />
      <InputTextCustom
        supLabel="Contraseña*"
        stateValue={newUsuario.password}
        state={(e) => setNewUsuario({ ...newUsuario, password: e })}
        secure={true}
        styleContainer={{ marginTop: 20, marginBottom: 5 }}
      />
      <InputTextCustom
        supLabel="Repetir contraseña*"
        stateValue={password2}
        state={setPassword2}
        secure={true}
        styleContainer={{ marginTop: 20, marginBottom: 5 }}
      />

      {/* Información opcional */}
      <BorderContainerComponent titulo="Información de Usuario">
        <InputTextCustom
          supLabel="Nombre"
          stateValue={newUsuario.nombre || ""}
          state={(e) => setNewUsuario({ ...newUsuario, nombre: e })}
          styleContainer={{ marginTop: 20, marginBottom: 5 }}
        />

        <View style={{ marginTop: 10 }}>
          {/* Genero */}
          <Text style={{ marginBottom: 10 }}>Genero</Text>
          <SelectList
            data={generos}
            setSelected={(/** @type {string} */ e) =>
              setNewUsuario({ ...newUsuario, genero: e })
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
            stateValue={newUsuario.altura || ""}
            state={(e) => setNewUsuario({ ...newUsuario, altura: e })}
            format={[/\d/, ",", /\d/, /\d/]}
            label="0,00 m"
            styleContainer={{
              flex: 1,
              paddingRight: 20,
              marginTop: 20,
              marginBottom: 5,
            }}
          />

          {/* Altura */}
          <InputTextCustom
            supLabel="Peso (Kg)"
            stateValue={newUsuario.peso || ""}
            state={(e) => setNewUsuario({ ...newUsuario, peso: e })}
            format={[/\d/, /\d/, ".", /\d/, /\d/]}
            label="00.00 Kg"
            styleContainer={{ flex: 1, marginTop: 20, marginBottom: 5 }}
          />
        </View>
      </BorderContainerComponent>

      {isLoading && (
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
