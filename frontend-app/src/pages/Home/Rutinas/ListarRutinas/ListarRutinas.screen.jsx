import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { IconButton } from "react-native-paper";

import { GlobalStyles } from "../../../../Utils/GlobalStyles";
import { useRutinaContext } from "../../../../provider/RutinasProvider";
import { RenderRoutine } from "./RenderRoutine";
import CustomSnackBarComponent from "../../../../components/CustomSnackBar.component";

const ListarRutinaScreen = ({ navigation }) => {
  const { rutinas, selectRutina } = useRutinaContext();

  const [snakbarMessage, setSnakbarMessage] = useState("");
  const [visibleSnakbar, setVisibleSnakbar] = useState(false);

  /**
   *
   * @param {string} rutina_id
   */
  const setSelectedRutina = (rutina_id) => {
    const resp = selectRutina(rutina_id);
    setSnakbarMessage(resp.message);
    setVisibleSnakbar(true);

    setTimeout(() => {
      if (resp.status === "Ok") {
        navigation.navigate("Inicio");
      }
    }, 2000);
  };

  const goToCrear = () => {
    navigation.navigate("CrearRutina");
  };

  /**
   * Navega hacia la pagina ViewRutinaScreen
   * @param {rutinaType} rutina
   */
  const goToViewRutinaScreen = (rutina) => {
    navigation.navigate("ViewRutina", { routine: rutina });
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
              <RenderRoutine
                routine={item}
                goToView={() => goToViewRutinaScreen(item)}
                setSelectedRutina={setSelectedRutina}
              />
            )}
            ListFooterComponent={() => (
              <View style={{ paddingVertical: 40 }}></View>
            )}
          />
        </>
      )}

      <View style={{ marginBottom: 80 }}>
        <CustomSnackBarComponent
          isVisible={visibleSnakbar}
          message={snakbarMessage}
          onDismiss={() => setVisibleSnakbar(false)}
        />
      </View>

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
