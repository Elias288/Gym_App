import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

import { ResultType } from "../services/Result.type";
import AuthServices from "../services/authServices";
import UserServices from "../services/usuariosServices";
import { crearUsuarioDto } from "../services/crearUsuarioDto.type";
import ShowLog from "../Utils/ShowLog";
import { usuarioType } from "../services/usuario.type";

const storedToken = "@user/token";

export interface authProps {
  userInfo: usuarioType | undefined;
  isLogin: boolean;
  isLoading: boolean;
  isChargeLoading: boolean;
  message: string;
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
  const [userInfo, setUserInfo] = useState<usuarioType | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isChargeLoading, setIsChargeLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // ****************************** AUXILIAR FUNCTIONS ******************************

  // almacena el token y actualiza el estado
  const saveToken = async (data: string) => {
    ShowLog("useAuth/saveToken");
    await AsyncStorage.setItem(storedToken, data);
    setIsLogin(true);
  };

  // elimina el token almacenado y actualiza los estados
  const clearUserInfo = async () => {
    ShowLog("useAuth/cleardata");
    await AsyncStorage.removeItem(storedToken);
    setUserInfo(undefined);
    setIsLogin(false);
  };

  const catchError = (error: any) => {
    setIsLoading(false);

    if (error.response) {
      let err: string | Array<string> = error.response.data.message;
      if (!Array.isArray(err)) err = [err];

      return { status: "Error", message: err };
    }

    return { status: "Error", message: "Error de conexión" };
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
      .catch(catchError);
  };

  const login = (user_name: string, password: string): Promise<ResultType> => {
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
      .catch(catchError);
  };

  const logout = () => {
    ShowLog("logout");
    clearUserInfo();
  };

  const getUserInfo = async (): Promise<ResultType> => {
    ShowLog("useAuth/getUserInfo");

    const token = await AsyncStorage.getItem(storedToken);
    if (token === null) {
      return { status: "NotLogged", message: "" };
    }

    return UserServices.getUsuarioInfo()
      .then(({ data }: { data: usuarioType }) => {
        ShowLog("useAuth/getUserInfo", JSON.stringify(data, null, 4));

        setUserInfo(data);
        setIsLogin(true);
        return { status: "Ok", message: "" };
      })
      .catch(catchError);
  };

  return {
    isLogin,
    userInfo,
    isLoading,
    isChargeLoading,
    message,
    createUser,
    login,
    logout,
    getUserInfo,
  };
}

export default useAuth;
