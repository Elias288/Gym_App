import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { Icon, Modal } from "react-native-paper";

import { GlobalStyles } from "../../Utils/GlobalStyles";
import CustomPressableComponent from "../CustomPressable.component";
import React from "react";

/**
 * @param {Object} props
 * @param {boolean} props.isVisible
 * @param {string} props.userName
 * @param {string} props.nombre
 * @param {any} props.navigation
 * @param {string} props.selectedPage
 * @param {() => void} props.hideModal
 * @param {() => void} props.logout
 */
const SideBarComponent = (props) => {
  const { hideModal, logout } = props;

  const Content = () => {
    /**
     * @param {string} page
     */
    const goToPage = (page) => {
      hideModal();
      switch (page) {
        case "Inicio":
          props.navigation.navigate("Inicio");
          break;
        case "Perfil":
          props.navigation.navigate("Perfil");
          break;
        case "Rutinas":
          props.navigation.navigate("Rutinas", { screen: "Listar" });
          break;
        case "Estadisticas":
          props.navigation.navigate("Estadisticas");
          break;
      }
    };

    return (
      <View style={styles.content}>
        {/* user info */}
        <View style={styles.userInfo}>
          <Text style={{ fontSize: 25 }}>{props.userName}</Text>
          <Text>{props.nombre}</Text>
        </View>

        {/* Actions */}
        <View>
          {/* Inicio */}
          <CustomPressableComponent
            action={() => goToPage("Inicio")}
            buttonColor={
              props.selectedPage == "Inicio"
                ? GlobalStyles.colorCian
                : GlobalStyles.transparent
            }
            pressedColor={GlobalStyles.colorCian}
          >
            <View style={{ marginRight: 10 }}>
              <Icon source={"home-outline"} size={20} />
            </View>
            <Text>Inicio</Text>
          </CustomPressableComponent>

          {/* Perfil */}
          <CustomPressableComponent
            action={() => goToPage("Perfil")}
            buttonColor={
              props.selectedPage == "Perfil"
                ? GlobalStyles.colorCian
                : GlobalStyles.transparent
            }
            pressedColor={GlobalStyles.colorCian}
          >
            <View style={{ marginRight: 10 }}>
              <Icon source={"account-outline"} size={20} />
            </View>
            <Text>Perfil</Text>
          </CustomPressableComponent>

          {/* Rutinas */}
          <CustomPressableComponent
            action={() => goToPage("Rutinas")}
            buttonColor={
              props.selectedPage == "Rutinas"
                ? GlobalStyles.colorCian
                : GlobalStyles.transparent
            }
            pressedColor={GlobalStyles.colorCian}
          >
            <View style={{ marginRight: 10 }}>
              <Icon source={"clipboard-list-outline"} size={20} />
            </View>
            <Text>Rutinas</Text>
          </CustomPressableComponent>

          {/* Estadisticas */}
          <CustomPressableComponent
            action={() => goToPage("Estadisticas")}
            buttonColor={
              props.selectedPage == "Estadisticas"
                ? GlobalStyles.colorCian
                : GlobalStyles.transparent
            }
            pressedColor={GlobalStyles.colorCian}
          >
            <View style={{ marginRight: 10 }}>
              <Icon source={"file-chart-outline"} size={20} />
            </View>
            <Text>Estadisticas</Text>
          </CustomPressableComponent>

          {/* Logout */}
          <CustomPressableComponent
            action={logout}
            buttonColor={GlobalStyles.transparent}
            pressedColor={GlobalStyles.colorDanger}
          >
            <View style={{ marginRight: 10 }}>
              <Icon
                source={"logout"}
                size={20}
                color={GlobalStyles.textColorDanger}
              />
            </View>
            <Text style={{ color: GlobalStyles.textColorDanger }}>Logout</Text>
          </CustomPressableComponent>
        </View>
      </View>
    );
  };

  if (!props.isVisible) return null;

  return (
    <Modal
      visible={props.isVisible}
      onDismiss={hideModal}
      contentContainerStyle={styles.container}
    >
      <Content />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: GlobalStyles.colorTranparentWhite,
    width: "80%",
    zIndex: 100,
  },
  content: {},
  userInfo: {
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: GlobalStyles.colorLightGray,
    paddingVertical: 20,
    marginBottom: 20,
  },
});

export default SideBarComponent;
