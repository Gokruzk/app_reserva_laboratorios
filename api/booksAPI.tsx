import { BookL, Labo } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const labAPI = axios.create({
  baseURL: API_URL,
});

export const getBooks = async () => {
  try {
    const res = await labAPI.get(`/reservas`);
    if (res.status == 200) {
      return { status: 200, data: res.data };
    } else {
      return { status: 400, error: "Error consultando reservas" };
    }
  } catch (error) {
    console.log(error);
  }
  return { status: 400, error: "Error consultando reservas" };
};

export const getBook = async (id_usuario: string) => {
  try {
    const res = await labAPI.get(`/reservas/user/${id_usuario}`);
    if (res.status == 200) {
      return { status: 200, data: res.data };
    } else {
      return { status: 400, error: "Error consultando reservas" };
    }
  } catch (error) {
    console.log(error);
  }
  return { status: 400, error: "Error consultando reservas" };
};

export const deleteBook = async (lab: Labo) => {
  try {
    const res = await labAPI.post(`/laboratorios`, lab);
    if (res.status == 200) {
      return { status: 200, data: res.data };
    } else {
      return { status: 400, error: "Error retreiving labs" };
    }
  } catch (error) {
    console.log(error);
  }
  return { status: 400, error: "Error consultando laboratorios" };
};

export const deleteLab = async (labId: string) => {
  try {
    const res = await labAPI.delete(`/laboratorios/${labId}`);
    if (res.status == 200) {
      return { status: 200, data: res.data };
    } else {
      return { status: 400, error: "Error retreiving labs" };
    }
  } catch (error) {
    console.log(error);
  }
  return { status: 400, error: "Error consultando laboratorios" };
};

export const updateLab = async (lab: Labo) => {
  try {
    const res = await labAPI.put(`/laboratorios/${lab.id_laboratorio}`, lab);
    if (res.status == 200) {
      return { status: 200, data: res.data };
    } else {
      return { status: 400, error: "Error actualizando laboratorio" };
    }
  } catch (error) {
    console.log(error);
  }
  return { status: 400, error: "Error actualizando laboratorio" };
};

export const bookLab = async (lab: BookL) => {
  try {
    const res = await labAPI.post(`/reservas`, lab);
    if (res.status == 200) {
      return { status: 200, data: res.data };
    } else {
      return { status: 400, error: "Error retreiving labs" };
    }
  } catch (error) {
    console.log(error);
  }
  return { status: 400, error: "Error consultando laboratorios" };
};
