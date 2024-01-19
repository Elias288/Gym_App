import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";

import { GlobalStyles } from "../../../Utils/GlobalStyles";
import { useRutinaContext } from "../../../provider/RutinasProvider";
import { useAuthContext } from "../../../provider/AuthProvider";
import ShowLog from "../../../Utils/ShowLog";

const InicioScreen = ({ navigation }) => {
  const { userInfo } = useAuthContext();
  const { selectedRutina, rutinas, selectRutina } = useRutinaContext();

  useEffect(() => {
    selectRutina(userInfo.selectedRoutineId);
  }, []);

  const goToRoutines = () => {
    navigation.navigate("Rutinas");
  };

  return (
    <View style={styles.container}>
      {!selectedRutina && (
        <Text style={styles.notSelectedMsg}>Not selected routine</Text>
      )}

      {selectedRutina && (
        <ScrollView>
          <View style={{ paddingHorizontal: 20, overflow: "auto", width: 500 }}>
            <Text>{JSON.stringify(selectedRutina, null, 4)}</Text>
          </View>
        </ScrollView>
      )}

      <IconButton
        icon={"plus"}
        mode="contained"
        containerColor={GlobalStyles.colorCian}
        iconColor={GlobalStyles.colorWhite}
        size={40}
        onPress={goToRoutines}
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
  notSelectedMsg: {
    fontSize: 25,
    fontWeight: "bold",
    color: GlobalStyles.colorGray,
  },
});

export default InicioScreen;
