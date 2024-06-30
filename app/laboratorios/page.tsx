"use client";
import { getLab } from "@/api/laboratoriosAPI";
import LinkButton from "@/components/LinkButton";
import { Labo } from "@/types";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function LabsPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Labs />
    </QueryClientProvider>
  );
}

function Labs() {
  const {
    isLoading,
    data: labos,
    isError,
    error,
  } = useQuery({
    queryKey: ["labos"],
    queryFn: getLab,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    refetchInterval: 3000, // Obtención en tiempo real cada 2 segundos
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error {error.message}</div>;

  return (
    <div>
      {/*CODIGO PARA LAS TARJETAS DE LABORATORIOS DISPONIBLES*/}

      <div className="grid grid-cols-4 gap-10 my-20 mx-72 px-40">
        {labos?.data.map((labs: Labo) => {
          return (
            <div
              key={labs.id_laboratorio}
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
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
              <LinkButton
                href="/reservar"
                style="minline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                title="Reservar ->"
              />
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-4 gap-10 my-20 mx-72 px-40">
        <LinkButton
          href="/iniciousuario"
          style="py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          title="Regresar"
        />
      </div>
    </div>
  );
}
