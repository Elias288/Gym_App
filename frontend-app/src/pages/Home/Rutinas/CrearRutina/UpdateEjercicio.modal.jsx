import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";
import { GlobalStyles } from "../../../../Utils/GlobalStyles";
import InputTextCustom from "../../../../components/InputTextCustom.component";
import CustomModal, {
  customModalStyles,
} from "../../../../components/CustomModal.component";
import ShowLog from "../../../../Utils/ShowLog";

/**
 *
 * @param {Object} props
 * @param {boolean} props.isVisible
 * @param {ejercicioType} props.ejercicio
 * @param {() => void} props.onDismiss
 * @param {(exercise: ejercicioType) => void} props.onDelete
 * @param {(exercise: ejercicioType) => void} props.onSubmit
 */
const UpdateEjercicioModal = ({
  isVisible,
  ejercicio,
  onDismiss,
  onDelete,
  onSubmit,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [ejercicioInfo, setEjercicioInfo] = useState(
    /** @type {ejercicioType} */ (null)
  );

  useEffect(() => {
    if (ejercicio) {
      setEjercicioInfo(ejercicio);
      ShowLog("UpdateEjercicio", ejercicio);
    }
  }, [ejercicio]);

  const submit = () => {
    onDismiss();
    onSubmit(ejercicioInfo);
  };

  const deleteEjercicio = () => {
    onDismiss();
    onDelete(ejercicioInfo);
  };

  return (
    ejercicio && (
      <Modal visible={isVisible} onDismiss={onDismiss}>
        <View style={styles.container}>
          {/* Titulo */}
          <Text style={styles.title}>Actualizar Ejercicio</Text>

          {/* Nombre */}
          <InputTextCustom
            supLabel={"Nombre"}
            state={(/** @type {string} */ e) =>
              setEjercicioInfo({ ...ejercicioInfo, nombre_ejercicio: e })
            }
            stateValue={ejercicioInfo?.nombre_ejercicio}
            label="Ejercicio"
            styleContainer={{ marginBottom: 20 }}
          />

          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            {/* Repeticiones */}
            <InputTextCustom
              supLabel={"Repeticiones"}
              state={(e) =>
                setEjercicioInfo({ ...ejercicioInfo, repeticiones: e })
              }
              stateValue={ejercicioInfo?.repeticiones}
              label="##-##"
              keyboardType="numeric"
              styleContainer={{ marginRight: 5, flex: 2 }}
            />

            {/* Series */}
            <InputTextCustom
              supLabel="Series"
              state={(e) => setEjercicioInfo({ ...ejercicioInfo, series: e })}
              stateValue={ejercicioInfo?.series}
              label="#"
              keyboardType={"numeric"}
              styleContainer={{ flex: 1 }}
            />
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <Button onPress={submit}>Actualizar</Button>
            <Button onPress={() => setShowModal(true)}>Eliminar</Button>
            <Button onPress={onDismiss}>Cancelar</Button>
          </View>
        </View>

        <CustomModal
          isVisible={showModal}
          hideModal={() => setShowModal(false)}
          isAcceptCancel={true}
          onAceptar={deleteEjercicio}
        >
          <Text style={customModalStyles.modalTitle}>Alerta</Text>
          <Text style={customModalStyles.modalMessage}>
            Desea eliminar este ejercicio?
          </Text>
        </CustomModal>
      </Modal>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colorLightGray,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default UpdateEjercicioModal;
