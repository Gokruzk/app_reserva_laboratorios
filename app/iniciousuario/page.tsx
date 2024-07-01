"use client";
import { getBook } from "@/api/booksAPI";
import LinkButton from "@/components/LinkButton";
import userStore from "@/store/auth/userStore";
import { BookL, BookList } from "@/types";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Inicio() {
  return (
    <QueryClientProvider client={queryClient}>
      <Iniciousuario />
    </QueryClientProvider>
  );
}

function Iniciousuario() {
  const user = userStore((state) => state.user);

  let user_id = "";

  if (user && user.id_usuario) {
    user_id = user.id_usuario;
  }

  const {
    isLoading,
    data: books,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", user?.id_usuario],
    queryFn: () => getBook(user_id),
    retry: 1000,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    refetchInterval: 3000, // Obtención en tiempo real cada 2 segundos
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error {error.message}</div>;

  return (
    <div>
      {/*TABLA DE DE RESERAVAS REALIZDAS POR EL USUARIO*/}
      <div className="relative overflow-x-auto content-center mx-60 my-20 rounded-2xl">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded--2xl">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                LABORATORIO
              </th>
              <th scope="col" className="px-6 py-3">
                FECHA
              </th>
              <th scope="col" className="px-6 py-3">
                HORA INICIO
              </th>
              <th scope="col" className="px-6 py-3">
                HORA FIN
              </th>
              <th scope="col" className="px-6 py-3">
                ELIMINAR RESERVACION
              </th>
              {/*
                    <th scope="col" className="px-6 py-3">
                        MODIFICAR
                    </th>*/}
            </tr>
          </thead>
          <tbody>
            {books?.data.map((books: BookList) => {
              return (
                <tr
                  key={books.id_reserva}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {books.laboratorio.nombre_lab}
                  </th>
                  <td className="px-6 py-4">{books.fecha}</td>
                  <td className="px-6 py-4">{books.hora_inicio}</td>
                  <td className="px-6 py-4">{books.hora_fin}</td>
                  <td className="px-6 py-4">
                    <LinkButton
                      href="/iniciousuario"
                      style=""
                      title="Cancelar"
                    />
                  </td>
                  {/*
                    <td className="px-6 py-4">
                        <LinkButton href="/iniciousuario" style="" title="Modificar"/>
                    </td>*/}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
