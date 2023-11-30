import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { GlobalStyles } from "../Utils/GlobalStyles";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  action?: (param?: any) => any;
  styles?: StyleProp<ViewStyle>;
};

const CustomPressableComponent = ({ children, action, styles }: Props) => {
  return (
    <Pressable onPress={action} style={[buttonStyles.button, styles]}>
      {children}
    </Pressable>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: "#8071ee",
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 70,
    marginBottom: 10,
    borderBottomColor: GlobalStyles.colorLightGray,
    borderBottomWidth: 1,
  },
});
export default CustomPressableComponent;
