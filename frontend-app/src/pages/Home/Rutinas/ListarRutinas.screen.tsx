import { View, Text, StyleSheet, ScrollView } from "react-native";

import { GlobalStyles } from "../../../Utils/GlobalStyles";
import { IconButton } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RutinaStackParamList } from "./Rutinas.screen";
import { rutinaContext } from "../../../provider/RutinasProvider";
import { useEffect, useState } from "react";

type RutinaStack = NativeStackScreenProps<RutinaStackParamList, "Listar">;

const ListarRutinaScreen = ({ navigation }: RutinaStack) => {
  const { getAllRutinas, rutinas } = rutinaContext();

  useEffect(() => {
    chargeRutinas();
  }, []);

  const chargeRutinas = () => {
    getAllRutinas().then((result) => {
      if (result.status === "Error") {
        console.log(result.message);
      }
    });
  };

  const goToCrear = () => {
    navigation.navigate("Crear");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ paddingHorizontal: 40 }}>
          <Text>{JSON.stringify(rutinas, null, 4)}</Text>
        </View>
      </ScrollView>
      <IconButton
        icon={"plus"}
        mode="contained"
        containerColor={GlobalStyles.colorCian}
        iconColor={GlobalStyles.colorWhite}
        size={40}
        onPress={goToCrear}
        style={{ position: "absolute", right: 10, bottom: 10 }}
      />
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

export default ListarRutinaScreen;
