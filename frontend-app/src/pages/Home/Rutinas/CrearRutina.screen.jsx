import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useEffect } from "react";
import uuid from "react-native-uuid";

import { GlobalStyles } from "../../../Utils/GlobalStyles";
import InputTextCustom from "../../../components/InputTextCustom.component";
import BorderContainerComponent from "../../../components/borderContainer.component";
import { Button } from "react-native-paper";
import { rutinaContext } from "../../../provider/RutinasProvider";

/**
 *
 * @param {Object} props
 * @param {any} props.navigation
 * @param {any} props.route
 */
const CrearRutinaScreen = ({ navigation }) => {
  const {
    rutinas,
    rutinaTemplate,
    setRutinas,
    initTemplate,
    addNewContenido,
    addTituloToRutina,
    createRutina,
  } = rutinaContext();

  useEffect(() => initTemplate(), []);

  const onSave = async () => {
    if (rutinaTemplate.titulo.trim() === "") {
      alert("La rutina debe tener un titulo");
      return;
    }

    const resutl = await createRutina({
      ...rutinaTemplate,
      local_id: uuid.v4().toString().replace(/-/g, ""),
    });

    if (resutl.status === "Error") {
      return;
    }

    if (typeof resutl.message === "string")
      setRutinas([...rutinas, JSON.parse(resutl.message)]);

    navigation.goBack();
  };

  const onCancel = () => {
    navigation.goBack();
  };

  /**
   *
   * @param {string} local_id
   */
  const goToCargarDia = (local_id) => {
    const diaInfo = rutinaTemplate.contenido.find(
      (dia) => dia.local_id === local_id
    );
    if (!diaInfo) return;

    navigation.navigate("CargarDia", {
      diaInfo,
      cantDias: rutinaTemplate.contenido.length,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formulario}>
        <InputTextCustom
          supLabel="Titulo"
          state={(e) => addTituloToRutina(e)}
          stateValue={rutinaTemplate.titulo}
        />

        <BorderContainerComponent titulo="Ejercicios">
          <View style={{ marginTop: 20, maxHeight: 400 }}>
            <FlatList
              data={rutinaTemplate.contenido}
              renderItem={({ item }) => (
                <ViewContenidoItem
                  title={item.nombre}
                  goToCargarDia={() => goToCargarDia(item.local_id)}
                />
              )}
            />

            <View>
              <Button onPress={addNewContenido}>Agregar</Button>
            </View>
          </View>
        </BorderContainerComponent>
      </View>

      <View style={styles.actions}>
        <Button onPress={onSave} mode="contained">
          Guardar
        </Button>
        <Button onPress={onCancel} mode="contained">
          Cancelar
        </Button>
      </View>
    </View>
  );
};

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {() => void} props.goToCargarDia
 */
const ViewContenidoItem = ({ title, goToCargarDia }) => {
  return (
    <View style={styles.dia}>
      <Button onPress={() => goToCargarDia()} mode="elevated">
        {title}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: GlobalStyles.headerHeight,
    backgroundColor: GlobalStyles.colorLightGray,
    paddingHorizontal: GlobalStyles.horizontalPadding,
    paddingBottom: GlobalStyles.horizontalPadding,
  },
  formulario: { flex: 1 },
  dia: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  actions: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },
});

export default CrearRutinaScreen;
