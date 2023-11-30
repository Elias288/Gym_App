import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

import Main from "./src/Main";
import AuthProvider from "./src/provider/AuthProvider";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaperProvider>
        <AuthProvider>
          <Main />
          <StatusBar style="auto" />
        </AuthProvider>
      </PaperProvider>
    </SafeAreaView>
  );
}
