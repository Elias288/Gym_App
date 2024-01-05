import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Login service
 * @param {string} user_name
 * @param {string} password
 */
const loginService = (user_name, password) => {
  return axios.request({
    timeout: 10000,
    method: "POST",
    url: `${process.env.EXPO_PUBLIC_API_URL}/api/auth/login`,
    data: { user_name, password },
    headers: { "Content-Type": "application/json" },
  });
};

const logout = async () => {
  await AsyncStorage.removeItem("user");
};

export default {
  loginService,
  logout,
};
