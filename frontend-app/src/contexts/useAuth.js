import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

import AuthServices from "../services/authServices";
import UserServices from "../services/usuariosServices";
import ShowLog from "../Utils/ShowLog";
import catchError from "../Utils/catchError";

const storedTokenPath = "@user/token";

/**
 * @typedef {Object} useAuthProps
 * @property {boolean} isLogin
 * @property {usuarioType} userInfo
 * @property {boolean} isLoading
 * @property {boolean} isChargeLoading
 *
 * @property {(newUsuario: crearUsuarioDto, pass2: string) => Promise<ResultType> | ResultType} createUser
 * @property {(user_name: string, password: string) => Promise<ResultType>} login
 * @property {() => void} logout
 * @property {() => Promise<ResultType>} getUserInfo
 * @property {(userInfo: Partial<crearUsuarioDto>) => Promise<ResultType>} updateUserInfo
 */

/**
 *
 * @returns {useAuthProps}
 */
function useAuth() {
  const [userInfo, setUserInfo] = useState(
    /** @type {(usuarioType | undefined)} */ (undefined)
  );
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChargeLoading, setIsChargeLoading] = useState(true);

  // ****************************** AUXILIAR FUNCTIONS ******************************

  /**
   * Almacena el token y actualiza el estado
   * @param {string} token
   */
  const saveToken = async (token) => {
    ShowLog("useAuth/saveToken");
    await AsyncStorage.setItem(storedTokenPath, token);
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

        ShowLog("useAuth/createUser", { msg: "usuario creado" });

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
        ShowLog("useAuth/loginService:", { data, status });

        saveToken(data.access_token);

        ShowLog("useAuth/loginToken:", { token: data.access_token });

        return UserServices.getUsuarioInfo()
          .then(({ data }) => {
            ShowLog("useAuth/loginUser: ", { data });
            setUserInfo(data);
            setIsLogin(true);
            setIsLoading(false);

            return { status: "Ok", message: "Logged" };
          })
          .catch((e) => {
            setIsLoading(false);
            setIsLogin(false);
            return catchError(e);
          });
      })
      .catch((e) => {
        setIsLoading(false);
        return catchError(e);
      });
  };

  /** Logout */
  const logout = () => {
    ShowLog("useAuth/logout");
    setIsLoading(false);
    setIsChargeLoading(false);
    clearUserInfo();
  };

  /**
   * Get user info
   * @returns {Promise<ResultType>}
   */
  const getUserInfo = async () => {
    const token = await AsyncStorage.getItem(storedTokenPath);
    if (token === null) {
      console.log("not Logged");
      setIsLogin(false);
      setIsChargeLoading(false);
      return { status: "NotLogged", message: "" };
    }
    setIsLoading(true);

    return UserServices.getUsuarioInfo()
      .then(({ data }) => {
        ShowLog("useAuth/getUserInfo", data);
        setUserInfo(data);
        setIsLogin(true);
        setIsChargeLoading(false);
        return { status: "Ok", message: data };
      })
      .catch((e) => {
        setIsChargeLoading(false);
        setIsLoading(false);
        setIsLogin(false);
        return catchError(e);
      });
  };

  /**
   *
   * @param {Partial<crearUsuarioDto>} userInfo
   * @returns {Promise<ResultType>}
   */
  const updateUserInfo = (userInfo) => {
    return UserServices.updateUsuario(userInfo)
      .then(({ data }) => {
        ShowLog("useAuth/updateUserInfo/res", data);

        setUserInfo(data);
        return { status: "Ok", message: data };
      })
      .catch((e) => {
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
    updateUserInfo,
  };
}

export default useAuth;
