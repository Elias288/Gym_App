// @ts-nocheck
import React from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

import Main from "./src/Main";
import AuthProvider from "./src/provider/AuthProvider";
import RutinaProvider from "./src/provider/RutinasProvider";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaperProvider>
        <AuthProvider>
          <RutinaProvider>
            <Main />
          </RutinaProvider>
          <StatusBar style="auto" />
        </AuthProvider>
      </PaperProvider>
    </SafeAreaView>
  );
}
