import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../Utils/GlobalStyles";

const InicioScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Incio</Text>
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
