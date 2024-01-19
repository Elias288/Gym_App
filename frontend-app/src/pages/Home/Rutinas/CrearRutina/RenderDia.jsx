import React from "react";
import { View, StyleSheet, FlatList, Text, Pressable } from "react-native";
import { Divider, IconButton } from "react-native-paper";

import { GlobalStyles } from "../../../../Utils/GlobalStyles";

/**
 * @param {Object} props
 * @param {diaType} props.diaInfo
 * @param {() => void} props.goToCargarDia
 */
export const RenderDia = ({ diaInfo, goToCargarDia }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: !pressed
            ? GlobalStyles.colorWhite
            : GlobalStyles.colorGray,
        },
        ViewDiaItemStyle.container,
      ]}
      onPress={() => goToCargarDia()}
    >
      <View style={ViewDiaItemStyle.dia}>
        <View style={ViewDiaItemStyle.name}>
          <Text style={ViewDiaItemStyle.nameText}>{diaInfo.nombre}</Text>

          <IconButton icon={"pencil"} style={ViewDiaItemStyle.nameIcon} />
        </View>

        {diaInfo.ejercicios.length > 0 && (
          <View style={{ marginTop: 5, paddingHorizontal: 20 }}>
            <FlatList
              data={diaInfo.ejercicios}
              renderItem={({ item }) => (
                <>
                  <Divider style={{ marginTop: 5 }} />
                  <View style={ViewDiaItemStyle.content}>
                    <Text style={{ flex: 3 }}>{item.nombre_ejercicio}</Text>
                    <Text style={{ flex: 2, marginLeft: 10 }}>
                      {item.repeticiones}
                    </Text>
                    <Text style={{ flex: 1 }}>{item.series}</Text>
                  </View>
                </>
              )}
              ListHeaderComponent={() => (
                <View style={ViewDiaItemStyle.content}>
                  <Text style={{ flex: 3, fontWeight: "bold" }}>Nombre</Text>
                  <Text style={{ flex: 2, fontWeight: "bold" }}>
                    Repeticiones
                  </Text>
                  <Text style={{ flex: 1, fontWeight: "bold" }}>Series</Text>
                </View>
              )}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
};
const ViewDiaItemStyle = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 15,
  },
  dia: {
    paddingBottom: 15,
  },
  name: {
    flexDirection: "row",
    gap: 5,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colorLightCian,
    padding: 10,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },
  nameText: {
    fontWeight: "bold",
    textAlign: "right",
    flex: 10,
  },
  nameIcon: {
    padding: 0,
    margin: 0,
    width: 30,
    height: 30,
    borderRadius: 0,
    flex: 9,
    alignItems: "flex-start",
  },
  content: {
    flexDirection: "row",
    marginBottom: 5,
  },
});
