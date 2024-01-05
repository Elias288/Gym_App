import { useState } from "react";
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { TextInput, Checkbox } from "react-native-paper";
import MaskInput from "react-native-mask-input";

import { GlobalStyles } from "../Utils/GlobalStyles";

type InputTextProps = {
  supLabel?: string;
  label?: string;
  stateValue: string;
  secure?: boolean;
  styleContainer?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  format?: any[];
  canDisabled?: boolean;
  keyboardType?: KeyboardTypeOptions;
  state: (value: string) => void;
};

const InputTextCustom = (props: InputTextProps) => {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <View style={[props.styleContainer, styles.inputContainer]}>
      {props.supLabel && (
        <Text style={{ marginBottom: 10 }}>{props.supLabel}</Text>
      )}

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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            mode="outlined"
            label={props.label || ""}
            style={[props.style, { flex: 1 }]}
            outlineStyle={styles.inputTextOutlineStyle}
            value={props.stateValue}
            onChangeText={props.state}
            secureTextEntry={props.secure || false}
            autoCapitalize="none"
            disabled={props.canDisabled && !isDisabled}
            keyboardType={props.keyboardType || "default"}
          />

          {props.canDisabled && (
            <Checkbox
              status={isDisabled ? "checked" : "unchecked"}
              onPress={() => setIsDisabled(!isDisabled)}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {},
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
    backgroundColor: GlobalStyles.colorWhite,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});

export default InputTextCustom;
