import { Text, View, StyleSheet } from "react-native";

import { GlobalStyles } from "../../Utils/GlobalStyles";

export const CustomMessage = ({
  message,
  type,
}: {
  message: string;
  type: boolean;
}) => {
  return (
    <>
      {message !== "" && (
        <View
          style={
            type
              ? CustomMessageStyles.okContainer
              : CustomMessageStyles.errorContainer
          }
        >
          <Text style={CustomMessageStyles.errorText}>{message}</Text>
        </View>
      )}
    </>
  );
};

const CustomMessageStyles = StyleSheet.create({
  errorContainer: {
    backgroundColor: "rgba(207, 57, 57, 0.8)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  okContainer: {
    backgroundColor: "rgba(34, 156, 63, 0.8)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  errorText: {
    color: GlobalStyles.colorWhite,
  },
});
