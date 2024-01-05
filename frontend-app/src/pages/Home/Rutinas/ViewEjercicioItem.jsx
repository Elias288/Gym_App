import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * @param {Object} props
 * @param {Partial<ejercicioType>} props.ejercicio
 * @param {any} [props.style]
 */
export const ViewEjercicioItem = ({ ejercicio, style }) => {
  return (
    <View style={[style.container, style]}>
      <Text style={{ flex: 3 }}>{ejercicio.nombre_ejercicio}</Text>
      <Text style={{ flex: 2 }}>{ejercicio.repeticiones}</Text>
      <Text style={{ flex: 1 }}>{ejercicio.series}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 5,
    borderRadius: 10,
  },
});
