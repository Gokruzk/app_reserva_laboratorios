"use server";

import { UserLogin } from "@/types";
import axios from "axios";

const API_URL = process.env.NEX_PUBLIC_API_URL;
const key = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_KEY);

const userAPI = axios.create({
  baseURL: API_URL,
});

export const auth = async (user: UserLogin) => {};
