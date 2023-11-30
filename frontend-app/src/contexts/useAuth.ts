import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import { ResultType } from "../services/ResultType";
import AuthServices from "../services/authServices";
import UserServices, { crearUsuarioDto } from "../services/usuariosServices";
import ShowLog from "../Utils/ShowLog";

const storedToken = "@user/token";

export interface authProps {
  userInfo: {};
  isLogin: boolean;
  isLoading: boolean;
  isChargeLoading: boolean;
  createUser: (
    newUsuario: crearUsuarioDto,
    pass2: string
  ) => Promise<ResultType> | ResultType;
  login: (userName: string, password: string) => Promise<ResultType>;
  getUserInfo: () => Promise<ResultType>;
  logout: () => void;
}

function useAuth(): authProps {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isChargeLoading, setIsChargeLoading] = useState<boolean>(false);

  // ****************************** AUXILIAR FUNCTIONS ******************************

  useEffect(() => {
    chargeUserInfo();
  }, []);

  // almacena el token y actualiza el estado
  const saveToken = async (data: string) => {
    ShowLog("useAuth/saveToken");
    await AsyncStorage.setItem(storedToken, data);
    setIsLogin(true);
  };

  // se ejecuta para obtener el token guardado
  const chargeUserInfo = async () => {
    setIsChargeLoading(true);

    try {
      const token = await AsyncStorage.getItem(storedToken);

      if (token !== null) {
        const result = await getUserInfo();

        if (result.status === "Error") {
          clearUserInfo();
        }

        setUserInfo(result.message);
        setIsLogin(true);
      }
    } catch (error) {
      console.log("chargeUserInfoError: ", error);
    }
    setIsChargeLoading(false);
  };

  // elimina el token almacenado y actualiza los estados
  const clearUserInfo = async () => {
    ShowLog("useAuth/cleardata");
    await AsyncStorage.removeItem(storedToken);
    setUserInfo({});
    setIsLogin(false);
  };

  const catchError = (error: any) => {
    setIsLoading(false);
    if (error.response) {
      let err: string | Array<string> = error.response.data.message;
      if (!Array.isArray(err)) err = [err];

      return { status: "Error", message: err };
    }

    return { status: "Error", message: ["Error de conexión"] };
  };

  // *********************************** FUNCTIONS ***********************************

  const createUser = (
    newUsuario: crearUsuarioDto,
    pass2: string
  ): Promise<ResultType> | ResultType => {
    setIsLoading(true);
    if (newUsuario.password !== pass2) {
      setIsLoading(false);
      return {
        status: "Error",
        message: ["Las contraseñas no coinciden"],
      };
    }

    return UserServices.crearUsuario(newUsuario)
      .then(() => {
        setIsLoading(false);

        ShowLog("useAuth/createUser", "usuario creado");

        return {
          status: "Ok",
          message: ["Usuario Creado"],
        };
      })
      .catch(catchError);
  };

  const login = (user_name: string, password: string) => {
    setIsLoading(true);

    return AuthServices.loginService(user_name, password)
      .then(({ data, status }) => {
        ShowLog(
          "useAuth/loginService:",
          JSON.stringify({ data, status }, null, 4)
        );

        saveToken(data.access_token);

        ShowLog("useAuth/loginToken:", data.access_token);

        setIsLoading(false);
        return { status: "Ok", message: ["Logged"] };
      })
      .catch(catchError);
  };

  const logout = () => {
    ShowLog("logout");
    clearUserInfo();
  };

  const getUserInfo = (): Promise<ResultType> => {
    return UserServices.getUsuarioInfo()
      .then(({ data }) => {
        return { status: "Ok", message: data };
      })
      .catch(catchError);
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
