import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { IconButton } from "react-native-paper";

import { GlobalStyles } from "../../../Utils/GlobalStyles";
import { useRutinaContext } from "../../../provider/RutinasProvider";
import { RenderRoutine } from "./RenderRoutine";

const ListarRutinaScreen = ({ navigation }) => {
  const { getAllRutinas, rutinas, setRutinas } = useRutinaContext();

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

  /**
   * @param {rutinaType} routine
   */
  const dropRoutine = (routine) => {
    alert("not implemented");
  };

  const goToCrear = () => {
    navigation.navigate("CrearRutina");
  };

  return (
    <View style={styles.container}>
      {rutinas.length === 0 ? (
        <View style={styles.msgContainer}>
          <Text style={styles.msgText}>Empty Routines List</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={rutinas}
            renderItem={({ item }) => (
              <RenderRoutine routine={item} onDelete={dropRoutine} />
            )}
          />
        </>
      )}

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
    padding: GlobalStyles.horizontalPadding,
  },
  msgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  msgText: {
    fontSize: 25,
    fontWeight: "bold",
    color: GlobalStyles.colorGray,
  },
});

export default ListarRutinaScreen;
