import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../../Utils/GlobalStyles";
import { authContext } from "../../../provider/AuthProvider";

const PerfilScreen = () => {
  const { userInfo } = authContext();

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* TODO: Agregar estilos */}
        {/* https://i.pinimg.com/736x/47/e3/f2/47e3f22c5e3253fe86c7ae0a619297d9.jpg */}
        <Text style={{ marginHorizontal: 50 }}>
          {JSON.stringify(userInfo, null, 4)}
        </Text>
      </ScrollView>
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

export default PerfilScreen;
