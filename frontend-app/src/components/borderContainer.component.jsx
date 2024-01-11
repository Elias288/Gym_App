import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { GlobalStyles } from "../Utils/GlobalStyles";

/**
 * @param {Object} children
 * @param {Object} props
 * @param {string} [props.titulo]
 * @param {any} [props.style]
 */
const BorderContainerComponent = ({ titulo, children, style }) => {
  return (
    <View style={[style, styles.container]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{titulo}</Text>
      </View>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingBottom: 20,
    marginVertical: 20,
    borderColor: "#c2c2c2",
  },
  titleContainer: {
    flexDirection: "row",
    marginTop: -10,
    paddingHorizontal: 10,
  },
  title: {
    backgroundColor: GlobalStyles.colorLightGray,
    paddingHorizontal: 5,
  },
});

export default BorderContainerComponent;
