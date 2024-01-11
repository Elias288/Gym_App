import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ViewEjercicioItem } from "./ViewEjercicioItem";
import { GlobalStyles } from "../../../../Utils/GlobalStyles";
import { TABLE_HEADER } from "./RenderRoutine";

/**
 *
 * @param {Object} props
 * @param {diaType} props.dia
 * @returns
 */
export const ViewDiaItem = ({ dia }) => {
  return (
    <View>
      <Text style={ViewDiaItemStyle.title}>{dia.nombre}</Text>

      <FlatList
        data={dia.ejercicios}
        keyExtractor={(item) => item.nombre_ejercicio}
        renderItem={({ item }) => <ViewEjercicioItem ejercicio={item} />}
        ListHeaderComponent={() => (
          <ViewEjercicioItem
            ejercicio={TABLE_HEADER}
            style={ViewDiaItemStyle.tableHeader}
          />
        )}
      />
    </View>
  );
};
const ViewDiaItemStyle = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
  tableHeader: {
    borderRadius: 0,
    paddingVertical: 5,
    backgroundColor: GlobalStyles.colorLightCian,
  },
});
