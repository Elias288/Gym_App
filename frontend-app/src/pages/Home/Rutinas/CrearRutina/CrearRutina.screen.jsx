import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button } from "react-native-paper";
import uuid from "react-native-uuid";

import { GlobalStyles } from "../../../../Utils/GlobalStyles";
import InputTextCustom from "../../../../components/InputTextCustom.component";
import BorderContainerComponent from "../../../../components/borderContainer.component";
import { useRutinaContext } from "../../../../provider/RutinasProvider";
import ShowLog from "../../../../Utils/ShowLog";
import { RenderDia } from "./RenderDia";

const CrearRutinaScreen = ({ navigation, route }) => {
  const { rutinas, createRutinaTemplate, createRutina, setRutinas } =
    useRutinaContext();

  const [newRoutine, setNewRoutine] = useState(
    /** @type {crearRutinaDto} */ (createRutinaTemplate)
  );

  useEffect(() => {
    // init new routine
    setNewRoutine({
      ...newRoutine,
      titulo: `Rutina #${rutinas.length + 1}`,
      local_id: uuid.v4().toString().replace(/-/g, ""),
      contenido: [
        {
          nombre: "Día 1",
          ejercicios: [],
        },
      ],
    });
  }, []);

  useEffect(() => {
    if (route.params?.updateRoutine) {
      ShowLog("crearRutina/params/updateRutine", {
        updateRoutine: route.params.updateRoutine,
      });
      setNewRoutine(route.params.updateRoutine);
    }
  }, [route.params?.updateRoutine]);

  const onSave = async () => {
    if (newRoutine.titulo.trim() === "") {
      alert("La rutina debe tener un titulo");
      return;
    }

    const hasOneDayWithoutExercise = !newRoutine.contenido.every((dia) => {
      return dia.ejercicios.length > 0;
    });
    if (hasOneDayWithoutExercise) {
      alert("La rutina no puede tener dias vacios");
      return;
    }

    const resutl = await createRutina(newRoutine);

    if (resutl.status === "Error") return;

    if (typeof resutl.message === "string")
      setRutinas([...rutinas, JSON.parse(resutl.message)]);

    ShowLog("CrearRutina/onSave/newRoutine", JSON.parse(resutl.message));
    navigation.goBack();
  };

  const onCancel = () => {
    navigation.goBack();
  };

  /**
   * @param {string} nombre
   */
  const goToCargarDia = (nombre) => {
    const diaInfo = newRoutine.contenido.find((dia) => dia.nombre === nombre);
    if (!diaInfo) return;

    navigation.navigate("CargarDia", {
      routine: newRoutine,
      diaInfo,
      cantDias: newRoutine.contenido.length,
    });
  };

  const addNewDia = () => {
    setNewRoutine({
      ...newRoutine,
      contenido: [
        ...newRoutine.contenido,
        {
          nombre: `Día ${newRoutine.contenido.length + 1}`,
          ejercicios: [],
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formulario}>
        <InputTextCustom
          supLabel="Titulo"
          state={(e) => setNewRoutine({ ...newRoutine, titulo: e })}
          stateValue={newRoutine.titulo}
        />

        <BorderContainerComponent titulo="Ejercicios" style={{ flex: 1 }}>
          <View
            style={{
              marginTop: 20,
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <FlatList
              data={newRoutine.contenido}
              renderItem={({ item }) => (
                <RenderDia
                  diaInfo={item}
                  goToCargarDia={() => goToCargarDia(item.nombre)}
                />
              )}
            />

            <View
              style={{
                marginTop: 20,
              }}
            >
              <Button onPress={addNewDia}>Agregar</Button>
            </View>
          </View>
        </BorderContainerComponent>
      </View>

      <View style={styles.actions}>
        <Button onPress={onSave} mode="contained" style={{ marginRight: 5 }}>
          Guardar
        </Button>
        <Button onPress={onCancel} mode="contained">
          Cancelar
        </Button>
      </View>
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
  actions: {
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: 20,
  },
});

export default CrearRutinaScreen;
