import React from "react";
import { Text } from "react-native";
import { Snackbar } from "react-native-paper";
import { GlobalStyles } from "../Utils/GlobalStyles";

/**
 *
 * @param {Object} props
 * @param {boolean} props.isVisible
 * @param {string} props.message
 * @param {() => void} props.onDismiss
 * @returns {React.JSX.Element}
 */
const CustomSnackBarComponent = (props) => {
  const { isVisible, message, onDismiss } = props;

  return (
    <Snackbar
      visible={isVisible}
      onDismiss={() => {}}
      action={{ label: "close", onPress: onDismiss }}
    >
      <Text style={{ color: GlobalStyles.colorWhite }}>
        {message ? message : "Empty message"}
      </Text>
    </Snackbar>
  );
};

export default CustomSnackBarComponent;
