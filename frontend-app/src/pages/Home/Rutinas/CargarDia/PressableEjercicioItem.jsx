import React from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import { GlobalStyles } from "../../../../Utils/GlobalStyles";

/**
 * @param {Object} props
 * @param {Partial<ejercicioType>} props.ejercicio
 * @param {(ejercicio: ejercicioType) => void} props.action
 */
export const PressableEjercicioItem = ({ ejercicio, action }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: !pressed
            ? GlobalStyles.colorWhite
            : GlobalStyles.colorGray,
        },
        pressableEjercicioItemStyle.container,
      ]}
      onLongPress={action}
    >
      <Text style={{ flex: 3 }}>{ejercicio.nombre_ejercicio}</Text>
      <Text style={{ flex: 2 }}>{ejercicio.repeticiones}</Text>
      <Text style={{ flex: 1 }}>{ejercicio.series}</Text>
    </Pressable>
  );
};
const pressableEjercicioItemStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 5,
    borderRadius: 10,
  },
});
