import React from "react";
import { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { Button, IconButton, Portal } from "react-native-paper";

import { GlobalStyles } from "../../../../Utils/GlobalStyles";
import InputTextCustom from "../../../../components/InputTextCustom.component";
import BorderContainerComponent from "../../../../components/borderContainer.component";
import CargarEjercicioModal from "../CrearRutina/CargarEjercicio.modal";
import { RenderEjercicio } from "../ViewRutina/RenderEjercicio";
import UpdateEjercicioModal from "../CrearRutina/UpdateEjercicio.modal";
import CustomModal, {
  customModalStyles,
} from "../../../../components/CustomModal.component";
import ShowLog from "../../../../Utils/ShowLog";
import { PressableEjercicioItem } from "./PressableEjercicioItem";

/**
 * @typedef {Object} RouteParams
 * @property {Object} params
 * @property {rutinaType} params.routine
 * @property {diaType} params.diaInfo
 * @property {number} params.cantDias
 */

/**
 * @param {Object} props
 * @param {any} props.navigation
 * @param {RouteParams} props.route
 * @returns
 */
const CargarDiaScreen = ({ route, navigation }) => {
  const { routine, diaInfo, cantDias } = route.params;
  const isOnlyOne = cantDias === 1;

  const [visibleChargeModal, setVisibleChargeModal] = useState(false);
  const [visibleUpdateModal, setVisibleUpdatModal] = useState(false);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);

  const [newDia, setNewDia] = useState(diaInfo);
  const [selectedEjercicio, setSelectedEjercicio] = useState(
    /** @type {ejercicioType} */ (undefined)
  );

  /** * @type {Partial<ejercicioType>} */
  const TABLE_HEADER = {
    nombre_ejercicio: "Ejercicio",
    repeticiones: "Repeticiones",
    series: "Series",
  };

  /**
   * Guarda el dia en la rutina
   */
  const onSaveDia = () => {
    /**
     * @type {rutinaType}
     * */
    const updateRoutine = {
      ...routine,
      contenido: routine.contenido.map((dia) => {
        if (dia.nombre === newDia.nombre) {
          return newDia;
        }
        return dia;
      }),
    };
    ShowLog("cargarDia/onSaveDia", updateRoutine);
    navigation.navigate("CrearRutina", { updateRoutine });
  };

  /**
   * Elimina el dia actual de la rutina
   */
  const deleteDia = () => {
    /** @type {rutinaType} */
    const updateRoutine = {
      ...routine,
      contenido: routine.contenido.filter(
        (dia) => dia.nombre !== diaInfo.nombre
      ),
    };

    navigation.navigate("CrearRutina", { updateRoutine });
  };

  const Cancel = () => {
    navigation.goBack();
  };

  /**
   * Recibe el nuevo ejercicio y lo carga en la lista
   * @param {ejercicioType} ejercicio
   */
  const chargeEjercicio = (ejercicio) => {
    /** @type {diaType} */
    const updatedDia = {
      ...newDia,
      ejercicios: [...newDia.ejercicios, ejercicio],
    };

    ShowLog("CargarDia/chargeEjercicio", updatedDia);
    setNewDia(updatedDia);
  };

  /**
   * Recibe un ejercicio lo busca y actualiza en la lista de ejercicios
   * @param {ejercicioType} exercise
   */
  const updateExercise = (exercise) => {
    /** @type {diaType} */
    const updatedDia = {
      ...newDia,
      ejercicios: newDia.ejercicios.map((exer) => {
        return exer.nombre_ejercicio === exercise.nombre_ejercicio
          ? exercise
          : exer;
      }),
    };

    ShowLog("CargarDia/updateExercise", updatedDia);
    setNewDia(updatedDia);
  };

  /**
   * Elimina un ejercicio del dia segun su local_id
   * @param {ejercicioType} exercise
   */
  const dropExercise = (exercise) => {
    /** @type {diaType} */
    const updatedDia = {
      ...newDia,
      ejercicios: newDia.ejercicios.filter(
        (exer) => exer.nombre_ejercicio !== exercise.nombre_ejercicio
      ),
    };

    ShowLog("CargarDia/dropExercise", updatedDia);
    setNewDia(updatedDia);
  };

  /**
   *  Selecciona el ejercicio y hace visible el modal
   * @param {ejercicioType} ejercicio
   */
  const updateEjercicio = (ejercicio) => {
    setSelectedEjercicio(ejercicio);
    setVisibleUpdatModal(true);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20, flex: 1 }}>
        <InputTextCustom
          state={(e) => setNewDia({ ...newDia, nombre: e })}
          stateValue={newDia.nombre}
          supLabel="Nombre"
          canDisabled={true}
        />

        <BorderContainerComponent titulo="Ejercicios" style={{ flex: 1 }}>
          <View style={{ marginTop: 20 }}>
            <FlatList
              data={newDia.ejercicios}
              keyExtractor={(item) => item.nombre_ejercicio}
              renderItem={({ item }) => (
                <PressableEjercicioItem
                  ejercicio={item}
                  action={() => updateEjercicio(item)}
                />
              )}
              ListHeaderComponent={() => (
                <RenderEjercicio
                  ejercicio={TABLE_HEADER}
                  style={styles.tableHeader}
                />
              )}
            />
          </View>

          <View style={{ alignItems: "center" }}>
            <IconButton
              icon="plus"
              mode="contained"
              onPress={() => setVisibleChargeModal(true)}
            />
          </View>
        </BorderContainerComponent>
      </View>

      <View style={styles.actions}>
        {!isOnlyOne && (
          <Button
            mode="contained"
            onPress={() => setVisibleDeleteModal(true)}
            style={{ marginRight: 5 }}
          >
            Borrar
          </Button>
        )}
        <Button mode="contained" onPress={onSaveDia} style={{ marginRight: 5 }}>
          Guardar
        </Button>
        <Button mode="contained" onPress={Cancel}>
          Cancelar
        </Button>
      </View>

      <Portal>
        {/* Add exercise */}
        <CargarEjercicioModal
          dia={newDia}
          isVisible={visibleChargeModal}
          onDismiss={() => setVisibleChargeModal(false)}
          onSubmit={chargeEjercicio}
        />

        {/* Update exercise */}
        <UpdateEjercicioModal
          isVisible={visibleUpdateModal}
          onDismiss={() => setVisibleUpdatModal(false)}
          ejercicio={selectedEjercicio}
          onSubmit={updateExercise}
          onDelete={dropExercise}
        />
      </Portal>

      <CustomModal
        isVisible={visibleDeleteModal}
        hideModal={() => setVisibleDeleteModal(false)}
        isAcceptCancel={true}
        onAceptar={deleteDia}
      >
        <Text style={customModalStyles.modalTitle}>Alerta</Text>
        <Text style={customModalStyles.modalMessage}>
          Desea eliminar este día?
        </Text>
      </CustomModal>
    </View>
  );
};

// TODO: mejorar estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: GlobalStyles.headerHeight,
    backgroundColor: GlobalStyles.colorLightGray,
    paddingHorizontal: GlobalStyles.horizontalPadding,
    paddingBottom: GlobalStyles.horizontalPadding,
  },
  form: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  formTitleContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  tableHeader: {
    backgroundColor: GlobalStyles.colorLightCian,
  },
  actions: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },
});

export default CargarDiaScreen;
