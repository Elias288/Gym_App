import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { GlobalStyles } from "../Utils/GlobalStyles";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  action?: (param?: any) => any;
  styles?: StyleProp<ViewStyle>;
  buttonColor?: string;
  pressedColor?: string;
};

const CustomPressableComponent = ({
  children,
  action,
  styles,
  buttonColor,
  pressedColor,
}: Props) => {
  const colorB = buttonColor || "#8071ee";
  const presColorB = pressedColor || "#3c3479";

  return (
    <Pressable
      onPress={action}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? presColorB : colorB,
        },
        buttonStyles.button,
        styles,
      ]}
    >
      {children}
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
