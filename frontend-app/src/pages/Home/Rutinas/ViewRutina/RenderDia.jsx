import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { RenderEjercicio } from "./RenderEjercicio";
import { GlobalStyles } from "../../../../Utils/GlobalStyles";
import { Divider } from "react-native-paper";

/** * @type {Partial<ejercicioType>} */
export const TABLE_HEADER = {
  nombre_ejercicio: "Ejercicio",
  repeticiones: "Repeticiones",
  series: "Series",
};

/**
 *
 * @param {Object} props
 * @param {diaType} props.dia
 * @returns
 */
export const RenderDia = ({ dia }) => {
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{dia.nombre}</Text>
      </View>

      <FlatList
        data={dia.ejercicios}
        keyExtractor={(item) => item.nombre_ejercicio}
        renderItem={({ item }) => <RenderEjercicio ejercicio={item} />}
        ListHeaderComponent={() => (
          <RenderEjercicio
            ejercicio={TABLE_HEADER}
            style={styles.tableHeader}
          />
        )}
      />
      <Divider />
    </>
  );
};
const styles = StyleSheet.create({
  constainer: {},
  titleContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
  tableHeader: {
    borderRadius: 0,
    paddingVertical: 5,
    marginBottom: 0,
    backgroundColor: GlobalStyles.colorLightGray,
  },
});
