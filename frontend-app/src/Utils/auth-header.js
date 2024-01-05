import AsyncStorage from "@react-native-async-storage/async-storage";
import ShowLog from "./ShowLog";

async function authHeader() {
  try {
    const token = await AsyncStorage.getItem("@user/token");
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      };
    }
  } catch (error) {
    ShowLog("authHeader/catch", error);
  }

  return {};
}

export default authHeader;
