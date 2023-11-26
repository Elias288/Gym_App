import React from "react";
import Constants from "expo-constants";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../Utils/GlobalStyles";

export const CustomHeader = ({ title }: { title: string }) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.appTitle}>Gym App</Text>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: GlobalStyles.colorLightGray,
    height: GlobalStyles.headerHeight,
  },
  appTitle: {
    fontSize: 25,
    fontWeight: "bold",
    lineHeight: 80,
    textAlign: "center",
  },
  titleText: {
    fontSize: 25,
    lineHeight: 80,
    textAlign: "center",
  },
});
