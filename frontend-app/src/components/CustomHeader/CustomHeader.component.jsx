import React, { useState } from "react";
import Constants from "expo-constants";
import { StyleSheet, Text, View } from "react-native";
import { IconButton, Portal } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import SideBarComponent from "./SideBar.component";
import { GlobalStyles } from "../../Utils/GlobalStyles";
import { authContext } from "../../provider/AuthProvider";

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {string} [props.sideBarSelected]
 * @param {boolean} [props.hasSideBar]
 */
export const CustomHeader = ({ title, hasSideBar, sideBarSelected }) => {
  const { logout, userInfo } = authContext();
  const navigator = useNavigation();

  const [visibleSideBar, setVisibleSideBar] = useState(
    /** @type {boolean} */ false
  );

  return (
    <View style={styles.titleContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.appTitle}>Gym App</Text>
      </View>

      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={[styles.textContainer, { marginRight: 10 }]}>
          <Text style={styles.titleText}>{title}</Text>
        </View>

        {hasSideBar && (
          <>
            <View style={styles.iconButtonContainer}>
              <IconButton
                icon={!visibleSideBar ? "menu" : "menu-open"}
                size={30}
                onPress={() => setVisibleSideBar(true)}
              />
            </View>

            <Portal>
              <SideBarComponent
                isVisible={visibleSideBar}
                hideModal={() => setVisibleSideBar(false)}
                logout={logout}
                userName={userInfo ? userInfo.user_name : "not charged"}
                nombre={userInfo?.nombre ? userInfo.nombre : "not charged"}
                navigation={navigator}
                selectedPage={sideBarSelected || "Inicio"}
              />
            </Portal>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: GlobalStyles.colorLightGray,
    height: GlobalStyles.headerHeight,
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
  },
  appTitle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleText: {
    fontSize: 25,
    textAlign: "center",
  },
  iconButtonContainer: {
    display: "flex",
    justifyContent: "center",
  },
});
