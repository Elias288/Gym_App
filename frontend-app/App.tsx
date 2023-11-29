import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

import Main from "./src/Main";
import AuthProvider from "./src/provider/AuthProvider";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthProvider>
        <Main />
        <StatusBar style="auto" />
      </AuthProvider>
    </SafeAreaView>
  );
}
