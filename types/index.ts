import { AxiosError } from "axios";

export interface User {
  id_usuario: string;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  celular: string;
}

export interface LinkButtonProps {
  title: string;
  href: string;
  style: string;
}

export interface Country {
  cod_ubi: number;
  country: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserName {
  username: string;
}

export interface UserResponse {
  user?: UserName;
  error: AxiosError | null;
}

export interface UserSt {
  username: UserName | null;
  authUser: (user: UserName) => void;
  removeSession: () => void;
}

export interface UserState {
  user: User | null;
  authUser: (user: User) => void;
  removeSession: () => void;
}

export interface UserDates {
  cod_date: number;
  cod_user: number;
  cod_description: number;
  description: {
    cod_description: number;
    description: string;
  };
}
