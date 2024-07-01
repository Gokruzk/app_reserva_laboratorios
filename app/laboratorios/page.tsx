"use client";
import { getLabs, deleteLab } from "@/api/laboratoriosAPI";
import DeleteButton from "@/components/DeleteButton";
import LinkButton from "@/components/LinkButton";
import userStore from "@/store/auth/userStore";
import { Labo } from "@/types";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function LabsPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Labs />
    </QueryClientProvider>
  );
}

function Labs() {
  
  const user = userStore((state) => state.user);

  const {
    isLoading,
    data: labos,
    isError,
    error,
  } = useQuery({
    queryKey: ["labos"],
    queryFn: getLabs,
    retry: 1000,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    refetchInterval: 3000, // Obtención en tiempo real cada 2 segundos
  });

  const showToastMessage = (mensaje: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(mensaje);
    } else {
      toast.error(mensaje);
    }
  };

  const { mutate: deleteLabMutate } = useMutation({
    mutationFn: deleteLab,
    onSuccess: () => {
      showToastMessage("Laboratorio eliminado correctamente", "success");
    },
    onError: (error) => {
      toast.error(`Error eliminando laboratorio: ${error.message}`);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error {error.message}</div>;

  return (
    <div>
      {/*CODIGO PARA LAS TARJETAS DE LABORATORIOS DISPONIBLES*/}
      <div className="px-9 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {labos?.data.map((labs: Labo) => (
            <div
              key={labs.id_laboratorio}
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Nombre de laboratorio: {labs.nombre_lab}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Capacidad: {labs.capacidad}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Equipos: {labs.equipos}
              </p>
              <div className="flex space-x-2">
                <LinkButton
                  href={`/reservar/${labs.id_laboratorio}`}
                  style="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  title="Reservar ->"
                />
                <LinkButton
                  href={`/laboratorios/${labs.id_laboratorio}`}
                  style="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  title="Actualizar ->"
                />
                <DeleteButton
                  title="Eliminar ->"
                  style="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  onClick={() => {
                    if (labs.id_laboratorio) {
                      deleteLabMutate(labs.id_laboratorio.toString());
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-9 py-5 ml-3">
        <LinkButton
          href="/iniciousuario"
          style="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          title="Regresar"
        />
        <LinkButton
          href="/agregarlaboratorio"
          style="py-2.5 px-5 ml-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          title="Agregar laboratorio"
        />
      </div>
      <ToastContainer />
    </div>
  );
}
