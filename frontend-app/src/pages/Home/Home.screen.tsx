import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../Main";
import { Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../Utils/GlobalStyles";

type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home",
  "MyStack"
>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <>
      <View style={styles.container}>
        <Text>Inicio</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: GlobalStyles.headerHeight,
    backgroundColor: GlobalStyles.colorLightGray,
    alignItems: "center",
  },
});

export default HomeScreen;
