import { BookL, Labo } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const labAPI = axios.create({
  baseURL: API_URL,
});

export const getLab = async (labId: string) => {
  try {
    const res = await labAPI.get(`/laboratorios/${labId}`);
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

export const getLabs = async () => {
  try {
    const res = await labAPI.get(`/laboratorios`);
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

export const addLab = async (lab: Labo) => {
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