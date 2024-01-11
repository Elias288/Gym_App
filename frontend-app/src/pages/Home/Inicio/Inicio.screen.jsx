import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";

import { GlobalStyles } from "../../../Utils/GlobalStyles";
import { useRutinaContext } from "../../../provider/RutinasProvider";

const InicioScreen = ({ navigation }) => {
  const { selectedRutina } = useRutinaContext();

  const goToRoutines = () => {
    navigation.navigate("Rutinas");
  };

  return (
    <View style={styles.container}>
      {selectedRutina ? (
        <Text>{JSON.stringify(selectedRutina, null, 4)}</Text>
      ) : (
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: GlobalStyles.colorGray,
          }}
        >
          Not selected routine
        </Text>
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
});

export default InicioScreen;
