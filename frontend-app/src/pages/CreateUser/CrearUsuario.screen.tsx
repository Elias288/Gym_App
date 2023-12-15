import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, StyleSheet, ScrollView } from "react-native";

import CrearUsuarioForm from "./CrearUsuarioForm";
import { RootStackParamList } from "../../Main";
import { GlobalStyles } from "../../Utils/GlobalStyles";

type CreateUserProps = NativeStackScreenProps<
  RootStackParamList,
  "CrearUsuario"
>;

const CrearUsuarioScreen = ({ navigation }: CreateUserProps) => {
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
