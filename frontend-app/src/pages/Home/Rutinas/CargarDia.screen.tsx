import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, IconButton, Portal } from "react-native-paper";

import { GlobalStyles } from "../../../Utils/GlobalStyles";
import { RutinaStackParamList } from "./Rutinas.Navigator";
import InputTextCustom from "../../../components/InputTextCustom.component";
import BorderContainerComponent from "../../../components/borderContainer.component";
import CargarEjercicioModal from "./CargarEjercicio.modal";
import { DiaType, EjercicioType } from "../../../types/rutina.type";
import { ViewEjercicioItem } from "./ViewEjercicioItem";
import { rutinaContext } from "../../../provider/RutinasProvider";

type RutinaStack = NativeStackScreenProps<RutinaStackParamList, "CargarDia">;

const CargarDiaScreen = ({ route, navigation }: RutinaStack) => {
  const { diaInfo, cantDias } = route.params;
  const { dropContenido, createContenido } = rutinaContext();
  const isOnlyOne = cantDias === 1;

  const [diaName, setDiaName] = useState(diaInfo.nombre);
  const [visibleModal, setVisibleModal] = useState(false);
  const [ejercicios, setEjercicios] = useState<Array<EjercicioType>>(
    diaInfo.ejercicios
  );

  const TABLE_HEADER: Partial<EjercicioType> = {
    nombre_ejercicio: "Ejercicio",
    repeticiones: "Repeticiones",
    series: "Series",
  };

  const chargeEjercicio = (ejercicio: EjercicioType) => {
    setEjercicios([...ejercicios, ejercicio]);
  };

  const deleteDia = () => {
    dropContenido(diaInfo.local_id);
    navigation.goBack();
  };

  const Cancel = () => {
    navigation.goBack();
  };

  const onSaveDia = () => {
    createContenido(diaInfo.local_id, diaName, ejercicios);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20, flex: 1 }}>
        <InputTextCustom
          state={setDiaName}
          stateValue={diaName}
          supLabel="Nombre"
          canDisabled={true}
        />

        <BorderContainerComponent titulo="Ejercicios">
          <View style={{ marginTop: 20, maxHeight: 400 }}>
            <FlatList
              data={ejercicios}
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

          <View style={{ alignItems: "center" }}>
            <IconButton
              icon="plus"
              mode="contained"
              onPress={() => setVisibleModal(true)}
            />
          </View>
        </BorderContainerComponent>
      </View>

      <View style={styles.actions}>
        {!isOnlyOne && (
          <Button mode="contained" onPress={deleteDia}>
            Borrar
          </Button>
        )}
        <Button mode="contained" onPress={onSaveDia}>
          Guardar
        </Button>
        <Button mode="contained" onPress={Cancel}>
          Cancelar
        </Button>
      </View>

      <Portal>
        <CargarEjercicioModal
          isVisible={visibleModal}
          onDismiss={() => setVisibleModal(false)}
          onSubmit={chargeEjercicio}
        />
      </Portal>
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
    borderRadius: 0,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    backgroundColor: GlobalStyles.colorLightCian,
  },
  actions: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },
});

export default CargarDiaScreen;
