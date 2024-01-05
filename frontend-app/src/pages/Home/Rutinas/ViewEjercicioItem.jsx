import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { EjercicioType } from "../../../types/rutina.type";

type ViewEjercicioItemProps = {
  ejercicio: Partial<EjercicioType>;
  style?: StyleProp<ViewStyle>;
};

export const ViewEjercicioItem = ({
  ejercicio,
  style: customStyle,
}: ViewEjercicioItemProps) => {
  return (
    <View style={[style.container, customStyle]}>
      <Text style={{ flex: 3 }}>{ejercicio.nombre_ejercicio}</Text>
      <Text style={{ flex: 2 }}>{ejercicio.repeticiones}</Text>
      <Text style={{ flex: 1 }}>{ejercicio.series}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 5,
    borderRadius: 10,
  },
});
