import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import AuthServices from "../services/authServices";
import UserServices from "../services/usuariosServices";
import ShowLog from "../Utils/ShowLog";
import catchError from "../Utils/catchError";

const storedTokenPath = "@user/token";
const storedUserInfoPath = "@user/info";

/**
 * @typedef {Object} useAuthProps
 * @property {boolean} isLogin
 * @property {usuarioType | undefined} userInfo
 * @property {boolean} isLoading
 * @property {boolean} isChargeLoading
 *
 * @property {(newUsuario: crearUsuarioDto, pass2: string) => Promise<ResultType> | ResultType} createUser
 * @property {(user_name: string, password: string) => Promise<ResultType>} login
 * @property {() => void} logout
 * @property {() => Promise<ResultType>} getUserInfo
 * @property {(userInfo: Partial<crearUsuarioDto>) => Promise<ResultType>} updateUserInfo
 * @property {() => void} startIsLoading
 * @property {() => void} stopIsLoading
 * @property {() => void} startIsChargeLoading
 * @property {() => void} stopIsChargeLoading
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

  useEffect(() => {
    verifyLoggedUser();
  }, []);

  // ****************************** AUXILIAR FUNCTIONS ******************************

  /**
   * Verifica si el usuario está logueado o no. Si la conexion con la api no es posible pero el usuario está logueado pasa igual
   */
  const verifyLoggedUser = async () => {
    const token = await AsyncStorage.getItem(storedTokenPath);
    const localUserInfo = await AsyncStorage.getItem(storedUserInfoPath);

    // No logueado
    if (!token) {
      ShowLog("useAuth/verifyLoggedUser/notLogged", isLogin);
      setIsLogin(false);
      setIsChargeLoading(false);
      return;
    }

    setIsLogin(true);
    ShowLog("useAuth/verifyLoggedUser", res);

    // Logueado
    const res = await getUserInfo();

    if (res.status === "Error") {
      setUserInfo(JSON.parse(localUserInfo));
      return;
    }

    // Almacena en local la información del usuario
    setUserInfo(res.message);
    await AsyncStorage.setItem(storedUserInfoPath, JSON.stringify(res.message));
  };

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

  const startIsLoading = () => setIsLoading(true);
  const startIsChargeLoading = () => setIsChargeLoading(true);

  const stopIsLoading = () => setIsLoading(false);
  const stopIsChargeLoading = () => setIsChargeLoading(false);

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
      return {
        status: "Error",
        message: "Las contraseñas no coinciden",
      };
    }

    return UserServices.crearUsuario(newUsuario)
      .then(() => {
        ShowLog("useAuth/createUser", { msg: "usuario creado" });

        return {
          status: "Ok",
          message: "Usuario Creado",
        };
      })
      .catch((e) => {
        return catchError(e);
      });
  };

  /**
   * Login, obtiene el token lo almacena y guarda la información del usuario
   * @param {string} user_name
   * @param {string} password
   * @returns {Promise<ResultType>}
   */
  const login = (user_name, password) => {
    setIsLoading(true);

    return AuthServices.loginService(user_name, password)
      .then(({ data, status }) => {
        // Guarda el token generado
        saveToken(data.access_token);
        ShowLog("useAuth/loginToken:", { token: data.access_token });

        // Obtiene la información del usuario
        return UserServices.getUsuarioInfo()
          .then(async ({ data }) => {
            setUserInfo(data);

            setIsLogin(true);
            await AsyncStorage.setItem(
              storedUserInfoPath,
              JSON.stringify(data)
            );

            ShowLog("useAuth/loginUser: ", { data });
            return { status: "Ok", message: "Logged" };
          })
          .catch((e) => {
            setIsLogin(false);
            return catchError(e);
          });
        return getUserInfo();
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
   * Get user info by token
   * @returns {Promise<ResultType>}
   */
  const getUserInfo = async () => {
    const token = await AsyncStorage.getItem(storedTokenPath);
    if (token === null) {
      // setIsLogin(false);

      ShowLog("useAuth/getUserInfo", { msg: "not Logged" });
      return { status: "NotLogged", message: "" };
    }
    setIsLoading(true);

    return UserServices.getUsuarioInfo()
      .then(({ data }) => {
        // setUserInfo(data);

        // setIsLogin(true);

        ShowLog("useAuth/getUserInfo", data);
        return { status: "Ok", message: data };
      })
      .catch((e) => {
        // setIsLogin(false);
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
    startIsLoading: startIsLoading,
    stopIsLoading: stopIsLoading,
    startIsChargeLoading,
    stopIsChargeLoading,
  };
}

export default useAuth;
