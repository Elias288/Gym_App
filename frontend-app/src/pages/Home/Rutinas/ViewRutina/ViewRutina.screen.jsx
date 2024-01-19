import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../../../Utils/GlobalStyles";
import { Button, Divider } from "react-native-paper";
import { RenderDia } from "./RenderDia";

const ViewRutinaScreen = ({ navigation, route }) => {
  const { routine } = route.params;
  /** @type {rutinaType} */
  const rut = routine;

  return (
    <View style={styles.container}>
      <View style={styles.tituloContainer}>
        <Text style={styles.titulo}>{routine.titulo}</Text>
      </View>

      <Divider />

      <FlatList
        data={rut.contenido}
        renderItem={({ item }) => <RenderDia dia={item} />}
        contentContainerStyle={styles.content}
      />

      <View style={styles.actions}>
        <Button mode="contained">Borrar</Button>
        <Button mode="contained">Editar</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: GlobalStyles.headerHeight,
  },
  tituloContainer: {
    paddingVertical: 10,
    backgroundColor: GlobalStyles.colorLightCian,
  },
  titulo: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
  },
  content: {
    paddingBottom: 200,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  actions: {
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default ViewRutinaScreen;
