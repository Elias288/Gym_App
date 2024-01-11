import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";

import { GlobalStyles } from "../../../../Utils/GlobalStyles";
import CustomModal, {
  customModalStyles,
} from "../../../../components/CustomModal.component";
import { ViewDiaItem } from "./ViewDiaItem";

/** * @type {Partial<ejercicioType>} */
export const TABLE_HEADER = {
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

  actions: {
    flexDirection: "row",
  },
});
