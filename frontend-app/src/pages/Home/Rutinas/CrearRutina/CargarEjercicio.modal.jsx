import React from "react";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Modal } from "react-native-paper";

import InputTextCustom from "../../../../components/InputTextCustom.component";
import { GlobalStyles } from "../../../../Utils/GlobalStyles";
import ShowLog from "../../../../Utils/ShowLog";

const MAX_NUMBER_OF_SERIES = 15;

/**
 * @typedef {Object} SelectType
 * @property {string} key
 * @property {string} value
 */

/** @type {ejercicioType} */
const ejercicioTemplate = {
  nombre_ejercicio: "",
  repeticiones: "",
  series: "",
};

/**
 *
 * @param {Object} props
 * @param {boolean} props.isVisible
 * @param {diaType} props.dia
 * @param {() => void} props.onDismiss
 * @param {(ejercicio: ejercicioType) => void} props.onSubmit
 *
 */
const CargarEjercicioModal = ({ isVisible, dia, onDismiss, onSubmit }) => {
  const [ejercicioInfo, setEjercicioInfo] = useState(
    /** @type {ejercicioType} */ (ejercicioTemplate)
  );

  const [cantNumbersOfSeries, setCantNumbersOfSeries] = useState(
    /** @type {Array<SelectType>} */ ([])
  );

  useEffect(() => {
    chargeSeries();
  }, []);

  const chargeSeries = () => {
    for (let i = 1; i < MAX_NUMBER_OF_SERIES; i++) {
      setCantNumbersOfSeries((nums) => [
        ...nums,
        { key: `${i}`, value: `${i}` },
      ]);
    }
  };

  const clearStates = () =>
    setEjercicioInfo({
      nombre_ejercicio: "",
      repeticiones: "",
      series: "",
    });

  /**
   * Carga un ejercicio nuevo a el dia
   */
  const submit = () => {
    if (ejercicioInfo.nombre_ejercicio === "") {
      alert("nombre no puede estar vacio");
      return;
    }

    const isRepeated = dia.ejercicios.find(
      (exer) => exer.nombre_ejercicio === ejercicioInfo.nombre_ejercicio
    );
    if (isRepeated) {
      alert("nombre de ejercicio ya usado");
      return;
    }

    if (ejercicioInfo.repeticiones === "") {
      alert("repeticiones no puede estar vacio");
      return;
    }

    ShowLog("CargarEjercicio/submit", ejercicioInfo);
    onSubmit(ejercicioInfo);
    clearStates();
    onDismiss();
  };

  const dismiss = () => {
    clearStates();
    onDismiss();
  };

  return (
    <Modal visible={isVisible} onDismiss={dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Ejercicio</Text>

        {/* Nombre */}
        <InputTextCustom
          supLabel={"Nombre"}
          state={(e) =>
            setEjercicioInfo({ ...ejercicioInfo, nombre_ejercicio: e })
          }
          stateValue={ejercicioInfo.nombre_ejercicio}
          label="Ejercicio"
          styleContainer={{ marginBottom: 20 }}
        />

        <View style={styles.secondsData}>
          {/* Repeticiones */}
          <InputTextCustom
            supLabel={"Repeticiones"}
            state={(e) =>
              setEjercicioInfo({ ...ejercicioInfo, repeticiones: e })
            }
            stateValue={ejercicioInfo.repeticiones}
            label="##-##"
            keyboardType="numeric"
            styleContainer={{ marginRight: 5, flex: 1 }}
          />

          {/* Series */}
          <InputTextCustom
            supLabel="Series"
            state={(e) => setEjercicioInfo({ ...ejercicioInfo, series: e })}
            stateValue={ejercicioInfo.series}
            label="#"
            keyboardType={"numeric"}
            styleContainer={{ flex: 1 }}
          />
        </View>

        <View style={styles.actions}>
          <Button onPress={submit}>Agregar</Button>
          <Button onPress={dismiss}>Cancelar</Button>
        </View>
      </View>
    </Modal>
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
  secondsData: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default CargarEjercicioModal;
