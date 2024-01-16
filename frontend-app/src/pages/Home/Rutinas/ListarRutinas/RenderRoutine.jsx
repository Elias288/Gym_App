import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../../../Utils/GlobalStyles";
import { IconButton } from "react-native-paper";

/**
 * @param {Object} props
 * @param {rutinaType} props.routine
 * @param {() => {}} props.goToView
 */
export const RenderRoutine = ({ routine, goToView }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{routine.titulo}</Text>
      <View style={styles.actions}>
        <IconButton icon={"arrow-right"} onPress={goToView} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 30,
    backgroundColor: GlobalStyles.colorWhite,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    flex: 1,
  },
});
