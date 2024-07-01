"use client";

import Link from "next/link";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { Labo } from "@/types";
import { useRouter } from "next/navigation";
import { addLab } from "@/api/laboratoriosAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function CreateL() {
  return (
    <QueryClientProvider client={queryClient}>
      <CreateLab />
    </QueryClientProvider>
  );
}

const CreateLab = () => {
  const router = useRouter();
  const registerLab = async (formdata: FormData) => {
    const nombre_lab = formdata.get("nombre_lab") as string;
    const equipos = formdata.get("equipos") as string;
    const capacidad = formdata.get("capacidad") as string;

    const lab: Labo = {
      nombre_lab: nombre_lab,
      equipos: Number(equipos),
      capacidad: Number(capacidad),
    };

    addUserMutation.mutate({
      ...lab,
    });
  };

  const showToastMessage = (mensaje: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(mensaje);
    } else {
      toast.error(mensaje);
    }
    setTimeout(() => {
      router.push("/laboratorios");
    }, 1500);
  };

  const addUserMutation = useMutation({
    mutationFn: addLab,
    onSuccess: (data) => {
      if (data.status === 200) {
        showToastMessage("Laboratorio agregado correctamente", "success");
      } else {
        showToastMessage(`Creación fallida, ${data.error}`, "error");
      }
    },
    onError: (error) => {
      console.log(error);
      showToastMessage(`Creación fallida, ${error}`, "error");
    },
  });

  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              <Link
                href={"/laboratorios"}
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                {"<-"} Regresar
              </Link>
            </p>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Agregar laboratorio
            </h1>
            <form className="space-y-4 md:space-y-6" action={registerLab}>
              <div>
                <label
                  htmlFor="nombre_lab"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre de laboratorio
                </label>
                <input
                  name="nombre_lab"
                  id="nombre_lab"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nombre de laboratorio"
                  required
                />
                <label
                  htmlFor="equipos"
                  className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Cantidad de equipos
                </label>
                <input
                  type="number"
                  name="equipos"
                  id="equipos"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Cantidad de equipos"
                  required
                  min={5}
                />
                <label
                  htmlFor="capacidad"
                  className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Capacidad de laboratorio
                </label>
                <input
                  type="number"
                  name="capacidad"
                  id="capacidad"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Capacidad de laboratorio"
                  required
                  min={5}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Agregar
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};
