import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../../../Utils/GlobalStyles";

const EstadisticasScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Estadisticas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: GlobalStyles.headerHeight,
    backgroundColor: GlobalStyles.colorLightGray,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EstadisticasScreen;
