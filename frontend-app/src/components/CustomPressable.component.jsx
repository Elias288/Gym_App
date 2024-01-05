import { Pressable, StyleSheet } from "react-native";
import React from "react";

import { GlobalStyles } from "../Utils/GlobalStyles";

/**
 * @param {Object} props
 * @param {any} props.children
 * @param {string} [props.buttonColor]
 * @param {string} [props.pressedColor]
 * @param {any} [props.styles]
 * @param {(param?: any) => any} [props.action]
 */
const CustomPressableComponent = (props) => {
  const colorB = props.buttonColor || "#8071ee";
  const presColorB = props.pressedColor || "#3c3479";

  return (
    <Pressable
      onPress={props.action}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? presColorB : colorB,
        },
        buttonStyles.button,
        props.styles,
      ]}
    >
      {props.children}
    </Pressable>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 70,
    borderBottomColor: GlobalStyles.colorLightGray,
    borderBottomWidth: 1,
  },
});
export default CustomPressableComponent;
