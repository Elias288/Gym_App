import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text, Pressable } from "react-native";
import { useEffect } from "react";
import uuid from "react-native-uuid";

import { GlobalStyles } from "../../../Utils/GlobalStyles";
import InputTextCustom from "../../../components/InputTextCustom.component";
import BorderContainerComponent from "../../../components/borderContainer.component";
import { Button, Divider, IconButton } from "react-native-paper";
import { useRutinaContext } from "../../../provider/RutinasProvider";
import ShowLog from "../../../Utils/ShowLog";

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
          local_id: uuid.v4().toString().replace(/-/g, ""),
          nombre: "Día 1",
          ejercicios: [],
        },
      ],
    });
  }, []);

  useEffect(() => {
    if (route.params?.updateRoutine) {
      ShowLog(
        "crearRutina/params/updateRutine",
        JSON.stringify(route.params.updateRoutine, null, 4)
      );
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

    ShowLog("CrearRutina/onSave/newRoutine", resutl.message);
    navigation.goBack();
  };

  const onCancel = () => {
    navigation.goBack();
  };

  /**
   * @param {string} local_id
   */
  const goToCargarDia = (local_id) => {
    const diaInfo = newRoutine.contenido.find(
      (dia) => dia.local_id === local_id
    );
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
          local_id: uuid.v4().toString().replace(/-/g, ""),
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
                <ViewDiaItem
                  diaInfo={item}
                  goToCargarDia={() => goToCargarDia(item.local_id)}
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

/**
 * @param {Object} props
 * @param {diaType} props.diaInfo
 * @param {() => void} props.goToCargarDia
 */
const ViewDiaItem = ({ diaInfo, goToCargarDia }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: !pressed
            ? GlobalStyles.colorWhite
            : GlobalStyles.colorGray,
        },
        ViewDiaItemStyle.container,
      ]}
      onPress={() => goToCargarDia()}
    >
      <View style={ViewDiaItemStyle.dia}>
        <View style={ViewDiaItemStyle.name}>
          <Text style={{ fontWeight: "bold", textAlign: "center" }}>
            {diaInfo.nombre}
          </Text>
        </View>

        {diaInfo.ejercicios.length > 0 && (
          <View style={{ marginTop: 5, paddingHorizontal: 20 }}>
            <FlatList
              data={diaInfo.ejercicios}
              renderItem={({ item }) => (
                <>
                  <Divider style={{ marginTop: 5 }} />
                  <View style={ViewDiaItemStyle.content}>
                    <Text style={{ flex: 3 }}>{item.nombre_ejercicio}</Text>
                    <Text style={{ flex: 2, marginLeft: 10 }}>
                      {item.repeticiones}
                    </Text>
                    <Text style={{ flex: 1 }}>{item.series}</Text>
                  </View>
                </>
              )}
              ListHeaderComponent={() => (
                <View style={ViewDiaItemStyle.content}>
                  <Text style={{ flex: 3, fontWeight: "bold" }}>Nombre</Text>
                  <Text style={{ flex: 2, fontWeight: "bold" }}>
                    Repeticiones
                  </Text>
                  <Text style={{ flex: 1, fontWeight: "bold" }}>Series</Text>
                </View>
              )}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
};

const ViewDiaItemStyle = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 15,
  },
  dia: {
    paddingBottom: 15,
  },
  name: {
    backgroundColor: GlobalStyles.colorLightCian,
    padding: 10,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },
  content: {
    flexDirection: "row",
    marginBottom: 5,
  },
});

export default CrearRutinaScreen;
