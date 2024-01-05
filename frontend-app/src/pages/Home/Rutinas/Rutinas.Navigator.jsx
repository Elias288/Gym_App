import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { HomeStackParamList } from "../Home.screen";
import ListarRutinaScreen from "./ListarRutinas.screen";
import { CustomHeader } from "../../../components/CustomHeader/CustomHeader.component";
import CrearRutinaScreen from "./CrearRutina.screen";
import CargarDiaScreen from "./CargarDia.screen";
import {
  CrearRutinaDto,
  DiaType,
  EjercicioType,
} from "../../../types/rutina.type";
import { Dispatch } from "react";

export type RutinaStackParamList = {
  Listar: undefined;
  CrearRutina: undefined;
  CargarDia: {
    diaInfo: DiaType;
    cantDias: number;
  };
};

const RutinasStack = createNativeStackNavigator<RutinaStackParamList>();

type HomeStack = NativeStackScreenProps<
  HomeStackParamList,
  "Rutinas",
  "MyStack"
>;

const RutinasNavigator = ({}: HomeStack) => {
  return (
    <RutinasStack.Navigator initialRouteName="Listar">
      <RutinasStack.Screen
        name="Listar"
        component={ListarRutinaScreen}
        options={{
          header: () => (
            <CustomHeader
              title="Rutinas"
              hasSideBar={true}
              sideBarSelected="Rutinas"
            />
          ),
          headerTransparent: true,
        }}
      />
      <RutinasStack.Screen
        name="CrearRutina"
        component={CrearRutinaScreen}
        options={{
          header: () => (
            <CustomHeader
              title="Crear Rutina"
              hasSideBar={true}
              sideBarSelected="Rutinas"
            />
          ),
          headerTransparent: true,
        }}
      />
      <RutinasStack.Screen
        name="CargarDia"
        component={CargarDiaScreen}
        options={{
          header: () => <CustomHeader title="Cargar Día" />,
          headerTransparent: true,
        }}
      />
    </RutinasStack.Navigator>
  );
};

export default RutinasNavigator;
