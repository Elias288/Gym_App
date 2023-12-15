import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { HomeStackParamList } from "../Home.screen";
import ListarRutinaScreen from "./ListarRutinas.screen";
import { CustomHeader } from "../../../components/CustomHeader/CustomHeader.component";
import CrearRutinaScreen from "./CrearRutina.screen";

export type RutinaStackParamList = {
  Listar: undefined;
  Crear: undefined;
};

const RutinasStack = createNativeStackNavigator<RutinaStackParamList>();

type HomeStack = NativeStackScreenProps<
  HomeStackParamList,
  "Rutinas",
  "MyStack"
>;

const RutinasScreen = ({}: HomeStack) => {
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
        name="Crear"
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
    </RutinasStack.Navigator>
  );
};

export default RutinasScreen;
