import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const labAPI = axios.create({
  baseURL: API_URL,
});

export const getLab = async () => {
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
