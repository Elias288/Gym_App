import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { TextInput } from "react-native-paper";
import { GlobalStyles } from "../Utils/GlobalStyles";
import { Dispatch, SetStateAction } from "react";
import MaskInput from "react-native-mask-input";

type InputTextProps = {
  supLabel: string;
  label?: string;
  stateValue: string;
  secure?: boolean;
  styleContainer?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  format?: any[];
  state: (value: string) => void;
};

const InputTextCustom = (props: InputTextProps) => {
  return (
    <View style={[props.styleContainer, styles.inputContainer]}>
      <Text style={{ marginBottom: 10 }}>{props.supLabel}</Text>

      {props.format !== undefined ? (
        <MaskInput
          value={props.stateValue}
          onChangeText={props.state}
          mask={props.format}
          placeholder={props.label || ""}
          style={styles.maskInputStyle}
          keyboardType="decimal-pad"
        />
      ) : (
        <TextInput
          mode="outlined"
          label={props.label || ""}
          style={props.style}
          outlineStyle={styles.inputTextOutlineStyle}
          value={props.stateValue}
          onChangeText={props.state}
          secureTextEntry={props.secure || false}
          autoCapitalize='none'
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
    marginBottom: 5,
  },
  inputTextOutlineStyle: {
    borderColor: "transparent",
    borderRadius: 15,
    backgroundColor: GlobalStyles.colorWhite,
  },
  actionContainer: {
    marginVertical: 10,
    flexDirection: "row-reverse",
  },
  maskInputStyle: {
    flex: 1,
    backgroundColor: GlobalStyles.colorWhite,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});

export default InputTextCustom;
