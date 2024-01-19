import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { GlobalStyles } from "../../../../Utils/GlobalStyles";
import { IconButton } from "react-native-paper";

/**
 * @param {Object} props
 * @param {rutinaType} props.routine
 * @param {() => void} props.goToView
 * @param {(rutinaId: string) => void} props.setSelectedRutina
 */
export const RenderRoutine = ({ routine, goToView, setSelectedRutina }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: !pressed
            ? GlobalStyles.colorWhite
            : GlobalStyles.colorGray,
        },
        styles.container,
      ]}
      onLongPress={() => setSelectedRutina(routine._id)}
    >
      <Text style={styles.title}>{routine.titulo}</Text>
      <View style={styles.actions}>
        <IconButton icon={"arrow-right"} onPress={goToView} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    flex: 1,
  },
  actions: {},
});
