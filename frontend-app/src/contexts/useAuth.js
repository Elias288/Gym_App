import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

import AuthServices from "../services/authServices";
import UserServices from "../services/usuariosServices";
import ShowLog from "../Utils/ShowLog";
import catchError from "../Utils/catchError";

const storedTokenPath = "@user/token";

function useAuth() {
  const [userInfo, setUserInfo] = useState(/** @type {(usuarioType | undefined)} */(undefined));
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChargeLoading, setIsChargeLoading] = useState(false);

  // ****************************** AUXILIAR FUNCTIONS ******************************

  /**
   * Almacena el token y actualiza el estado
   * @param {string} token
   */
  const saveToken = async (token) => {
    ShowLog("useAuth/saveToken");
    await AsyncStorage.setItem(storedTokenPath, token);
    setIsLogin(true);
  };

  /**
   * Elimina el token almacenado y actualiza los estados
   */
  const clearUserInfo = async () => {
    ShowLog("useAuth/cleardata");
    await AsyncStorage.removeItem(storedTokenPath);
    setUserInfo(undefined);
    setIsLogin(false);
  };

  // *********************************** FUNCTIONS ***********************************

  /**
   * Create user
   * @param {crearUsuarioDto} newUsuario
   * @param {string} pass2
   * @returns {Promise<ResultType> | ResultType}
   */
  const createUser = (newUsuario, pass2) => {
    setIsLoading(true);
    if (newUsuario.password !== pass2) {
      setIsLoading(false);
      return {
        status: "Error",
        message: "Las contraseñas no coinciden",
      };
    }

    return UserServices.crearUsuario(newUsuario)
      .then(() => {
        setIsLoading(false);

        ShowLog("useAuth/createUser", "usuario creado");

        return {
          status: "Ok",
          message: "Usuario Creado",
        };
      })
      .catch((e) => {
        setIsLoading(false);
        return catchError(e);
      });
  };

  /**
   * Login
   * @param {string} user_name
   * @param {string} password
   * @returns {Promise<ResultType>}
   */
  const login = (user_name, password) => {
    setIsLoading(true);

    return AuthServices.loginService(user_name, password)
      .then(({ data, status }) => {
        ShowLog(
          "useAuth/loginService:",
          JSON.stringify({ data, status }, null, 4)
        );

        saveToken(data.access_token);

        ShowLog("useAuth/loginToken:", data.access_token);

        UserServices.getUsuarioInfo().then(({ data }) => {
          ShowLog("useAuth/loginUser: ", JSON.stringify(data, null, 4));
          setUserInfo(data);
          setIsLoading(false);
          return { status: "Ok", message: "Logged" };
        });

        return { status: "Error", message: "Error obteniendo usuario" };
      })
      .catch((e) => {
        setIsLoading(false);
        return catchError(e);
      });
  };

  /** Logout */
  const logout = () => {
    ShowLog("logout");
    setIsChargeLoading(false);
    clearUserInfo();
  };

  /**
   * Get user info
   * @returns {Promise<ResultType>}
   */
  const getUserInfo = async () => {
    ShowLog("useAuth/getUserInfo");

    const token = await AsyncStorage.getItem(storedTokenPath);
    if (token === null) {
      console.log("not Logged");
      return { status: "NotLogged", message: "" };
    }
    setIsLoading(true);

    return UserServices.getUsuarioInfo()
      .then(({ data }) => {
        ShowLog("useAuth/getUserInfo", JSON.stringify(data, null, 4));

        setIsLoading(false);
        setUserInfo(data);
        setIsLogin(true);
        return { status: "Ok", message: data };
      })
      .catch((e) => {
        setIsLoading(false);
        return catchError(e);
      });
  };

  return {
    isLogin,
    userInfo,
    isLoading,
    isChargeLoading,
    createUser,
    login,
    logout,
    getUserInfo,
  };
}

export default useAuth;
