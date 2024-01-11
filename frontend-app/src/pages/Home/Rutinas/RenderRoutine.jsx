import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";

import { ViewEjercicioItem } from "./ViewEjercicioItem";
import { GlobalStyles } from "../../../Utils/GlobalStyles";
import CustomModal, {
  customModalStyles,
} from "../../../components/CustomModal.component";

/** * @type {Partial<ejercicioType>} */
const TABLE_HEADER = {
  nombre_ejercicio: "Ejercicio",
  repeticiones: "Repeticiones",
  series: "Series",
};

/**
 * @param {Object} props
 * @param {rutinaType} props.routine
 * @param {(routine: rutinaType) => void} props.onDelete
 */
export const RenderRoutine = ({ routine, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: !pressed
              ? GlobalStyles.colorWhite
              : GlobalStyles.colorGray,
          },
          styles.container,
        ]}
        onLongPress={() => setShowDeleteModal(true)}
      >
        <View style={styles.title}>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            {routine.titulo}
          </Text>
        </View>

        <View>
          <FlatList
            data={routine.contenido}
            renderItem={({ item }) => <ViewDiaItem dia={item} />}
          />
        </View>
      </Pressable>

      <CustomModal
        isVisible={showDeleteModal}
        hideModal={() => setShowDeleteModal(false)}
        isAcceptCancel={true}
        onAceptar={() => onDelete(routine)}
      >
        <Text style={customModalStyles.modalTitle}>Alerta</Text>
        <Text style={customModalStyles.modalMessage}>
          Desea eliminar esta rutina?
        </Text>
      </CustomModal>
    </>
  );
};

/**
 *
 * @param {Object} props
 * @param {diaType} props.dia
 * @returns
 */
const ViewDiaItem = ({ dia }) => {
  return (
    <>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          {dia.nombre}
        </Text>

        <FlatList
          data={dia.ejercicios}
          keyExtractor={(item) => item.nombre_ejercicio}
          renderItem={({ item }) => <ViewEjercicioItem ejercicio={item} />}
          ListHeaderComponent={() => (
            <ViewEjercicioItem
              ejercicio={TABLE_HEADER}
              style={styles.tableHeader}
            />
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    flex: 1,
  },
  tableHeader: {
    borderRadius: 0,
    paddingVertical: 5,
    backgroundColor: GlobalStyles.colorLightCian,
  },
  actions: {
    flexDirection: "row",
  },
});
