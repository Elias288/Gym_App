import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputTextCustom from "../../../components/InputTextCustom.component";
import { SelectList } from "react-native-dropdown-select-list";
import { Button, Modal } from "react-native-paper";
import { GlobalStyles } from "../../../Utils/GlobalStyles";
import { EjercicioType } from "../../../types/rutina.type";
import { PartialState } from "@react-navigation/native";

type SelectType = {
  key: string;
  value: string;
};
type CargarEjercicioModalProps = {
  isVisible: boolean;
  onDismiss: () => void;
  onSubmit: (ejercicio: EjercicioType) => void;
};
const MAX_NUMBER_OF_SERIES = 15;

const CargarEjercicioModal = ({
  isVisible,
  onDismiss,
  onSubmit,
}: CargarEjercicioModalProps) => {
  const [ejercicioInfo, setEjercicioInfo] = useState<EjercicioType>({
    local_id: "",
    nombre_ejercicio: "",
    repeticiones: "",
    series: "",
  });

  const [cantNumbersOfSeries, setCantNumbersOfSeries] = useState<
    Array<SelectType>
  >([]);

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
      local_id: "",
      nombre_ejercicio: "",
      repeticiones: "",
      series: "",
    });

  const submit = () => {
    if (ejercicioInfo.nombre_ejercicio === "") {
      alert("nombre no puede estar vacio");
      return;
    }
    if (ejercicioInfo.repeticiones === "") {
      alert("repeticiones no puede estar vacio");
      return;
    }

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
            label="00-00"
            keyboardType="numeric"
            styleContainer={{ marginRight: 5, flex: 1 }}
          />

          {/* Series */}
          <View>
            <Text>Series</Text>
            <View style={{ marginTop: 15 }}>
              <SelectList
                data={cantNumbersOfSeries}
                defaultOption={{ key: "1", value: "1" }}
                search={false}
                setSelected={(e: any) => {
                  setEjercicioInfo({ ...ejercicioInfo, series: e });
                }}
                dropdownStyles={{ backgroundColor: "#fff", borderWidth: 0 }}
                boxStyles={{
                  backgroundColor: "#fff",
                  borderWidth: 0,
                  height: 50,
                  alignItems: "center",
                }}
              />
            </View>
          </View>
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
