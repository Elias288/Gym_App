import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../../../Utils/GlobalStyles";
import { useAuthContext } from "../../../provider/AuthProvider";

const PerfilScreen = () => {
  const { userInfo } = useAuthContext();

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* TODO: Agregar estilos */}
        {/* https://i.pinimg.com/736x/47/e3/f2/47e3f22c5e3253fe86c7ae0a619297d9.jpg */}
        <Text style={{ marginHorizontal: 50 }}>
          {JSON.stringify(
            {
              ...userInfo,
              password: "",
            },
            null,
            4
          )}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 700,
    marginTop: GlobalStyles.headerHeight,
    backgroundColor: GlobalStyles.colorLightGray,
  },
});

export default PerfilScreen;
