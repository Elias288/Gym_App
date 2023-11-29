import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../Main";
import { Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../Utils/GlobalStyles";
import { Button } from "react-native-paper";
import { authContext } from "../../provider/AuthProvider";
import ShowLog from "../../Utils/ShowLog";

type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home",
  "MyStack"
>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { logout, isLogin, getUserInfo } = authContext();

  const tempLogout = () => {
    logout();
  };

  // TODO: terminar
  const getInfo = async () => {
    const info = await getUserInfo();
    ShowLog("Home/getUserInfo: ", JSON.stringify(info, null, 4));
  };

  return (
    <>
      <View style={styles.container}>
        <Button
          onPress={tempLogout}
          mode="contained"
          style={{ marginBottom: 20 }}
        >
          Logout
        </Button>
        <Button onPress={getInfo} mode="contained">
          getUserInfo
        </Button>
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
