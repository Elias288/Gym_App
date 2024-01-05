import axios from "axios";
import authHeader from "../Utils/auth-header";
import { CrearRutinaDto } from "../types/rutina.type";

const url = `${process.env.EXPO_PUBLIC_API_URL}/api/rutina`;

const crearRutina = async ({ rutinaBody }: { rutinaBody: CrearRutinaDto }) => {
  return axios.request({
    timeout: 2000,
    method: "POST",
    url,
    data: rutinaBody,
    headers: await authHeader(),
  });
};

const listarRutinas = async () => {
  return axios.request({
    timeout: 2000,
    method: "GET",
    url,
    headers: await authHeader(),
  });
};

const getRutina = async ({ rutina_local_Id }: { rutina_local_Id: string }) => {
  return axios.request({
    timeout: 2000,
    method: "GET",
    url: url + `/${rutina_local_Id}`,
    headers: await authHeader(),
  });
};

const updateRutina = async ({
  rutina_Id,
  updatedRutina,
}: {
  rutina_Id: string;
  updatedRutina: Partial<CrearRutinaDto>;
}) => {
  return axios.request({
    timeout: 2000,
    method: "PATCH",
    url: url + `/${rutina_Id}`,
    data: updatedRutina,
    headers: await authHeader(),
  });
};

const deleteRutina = async (rutina_Id: string) => {
  return axios.request({
    timeout: 2000,
    method: "DELETE",
    url: url + `/${rutina_Id}`,
    headers: await authHeader(),
  });
};

export default {
  crearRutina,
  listarRutinas,
  getRutina,
  updateRutina,
  deleteRutina,
};
