import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";

/**
 * @param {Object} props
 * @param {Partial<ejercicioType>} props.ejercicio
 * @param {any} [props.style]
 */
export const RenderEjercicio = ({ ejercicio, style }) => {
  return (
    <>
      <Divider />
      <View style={[ViewEjercicioItemStyle.container, style]}>
        <Text style={{ flex: 3 }}>{ejercicio.nombre_ejercicio}</Text>

        <Text style={{ flex: 2, marginLeft: 10 }}>
          {ejercicio.repeticiones}
        </Text>

        <Text style={{ flex: 1 }}>{ejercicio.series}</Text>
      </View>
    </>
  );
};

const ViewEjercicioItemStyle = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
