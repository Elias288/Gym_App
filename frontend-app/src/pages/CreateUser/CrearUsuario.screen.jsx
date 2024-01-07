import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import CrearUsuarioForm from "./CrearUsuarioForm";
import { GlobalStyles } from "../../Utils/GlobalStyles";

const CrearUsuarioScreen = ({ navigation }) => {
  const onSubmit = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingVertical: 40 }}>
        <View style={{ flex: 1, marginHorizontal: 40 }}>
          {/* Crear usuario form */}
          <View style={{ flex: 1, justifyContent: "center" }}>
            <CrearUsuarioForm onSubmit={onSubmit} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: GlobalStyles.headerHeight,
    backgroundColor: GlobalStyles.colorLightGray,
  },
  titleContainer: {
    flexDirection: "row",
    paddingHorizontal: GlobalStyles.horizontalPadding,
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default CrearUsuarioScreen;
