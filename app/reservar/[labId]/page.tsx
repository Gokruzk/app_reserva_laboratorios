"use client";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { BookL, UpdateLabFormProps } from "@/types";
import { getLab } from "@/api/laboratoriosAPI";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LinkButton from "@/components/LinkButton";
import userStore from "@/store/auth/userStore";
import { bookLab } from "@/api/booksAPI";

const queryClient = new QueryClient();

export default function ResLab({ params }: { params: { labId: string } }) {
  const { labId } = params;

  return (
    <QueryClientProvider client={queryClient}>
      <HacerReserva labId={labId} />
    </QueryClientProvider>
  );
}

function HacerReserva({ labId }: UpdateLabFormProps) {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const user = userStore((state) => state.user);

  const {
    isLoading,
    data: data,
    isError,
    error,
  } = useQuery({
    queryKey: ["lab", labId],
    queryFn: () => getLab(labId),
  });

  const bookThisLab = async (formdata: any) => {
    const id_laboratorio = labId;
    const fecha = formdata.birth;
    const timetable = formdata.timetable; // Obtener el horario seleccionado
    const [hora_inicio, hora_fin] = timetable.split(" - ");

    const lab: BookL = {
      id_laboratorio: Number(id_laboratorio),
      id_usuario: Number(user?.id_usuario),
      id_estado: 1,
      fecha: fecha,
      hora_inicio: hora_inicio,
      hora_fin: hora_fin,
    };

    console.log(lab)
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
    mutationFn: (lab: BookL) => {
      return bookLab(lab);
    },
    onSuccess: (data) => {
      if (data.status === 200) {
        showToastMessage("Laboratorio reservado correctamente", "success");
      } else {
        showToastMessage(`Reservación fallida, ${data.error}`, "error");
      }
    },
    onError: (error) => {
      console.log(error);
      showToastMessage(`Reservación fallida, ${error}`, "error");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error {error.message}</div>;

  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              <LinkButton
                title="<- Regresar"
                href="/laboratorios"
                style="font-medium text-primary-600 hover:underline dark:text-primary-500"
              />
            </p>
            <form onSubmit={handleSubmit(bookThisLab)}>
              <label
                htmlFor="birth"
                className="block text-sm font-bold text-gray-900 dark:text-white"
              >
                SELECCIONA UNA FECHA DE RESERVACION
              </label>
              <div className="relative max-w-sm">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input
                  id="birth"
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date"
                  {...register("birth")}
                />
              </div>

              {/*SELECCION DE LA HORA PARA LA RESERVA DE LABORATORIOS */}
              <div
                inline-datepicker
                datepicker-autoselect-today
                className="mx-auto sm:mx-0 flex justify-center my-5 [&>div>div]:shadow-none [&>div>div]:bg-gray-50 [&_div>button]:bg-gray-50"
              ></div>
              <label className="text-sm font-bold text-gray-900 dark:text-white mb-2 block">
                SELECCIONA UN HORARIO
              </label>
              <ul id="timetable" className="grid w-full grid-cols-3 gap-2 mb-5">
                <li>
                  <input
                    type="radio"
                    id="07-09-am"
                    value="07:00 - 09:00"
                    className="hidden peer"
                    {...register("timetable")}
                  />
                  <label
                    htmlFor="07-09-am"
                    className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900"
                  >
                    07:00 - 09:00
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="09-11-am"
                    value="09:00 - 11:00"
                    className="hidden peer"
                    {...register("timetable")}
                  />
                  <label
                    htmlFor="09-11-am"
                    className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900"
                  >
                    09:00 - 11:00
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="11-13-pm"
                    value="11:00 - 13:00"
                    className="hidden peer"
                    {...register("timetable")}
                  />
                  <label
                    htmlFor="11-13-pm"
                    className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900"
                  >
                    11:00 - 13:00
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="15-17-pm"
                    value="15:00 - 17:00"
                    className="hidden peer"
                    {...register("timetable")}
                  />
                  <label
                    htmlFor="15-17-pm"
                    className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900"
                  >
                    15:00 - 17:00
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="17-19-pm"
                    value="17:00 - 19:00"
                    className="hidden peer"
                    {...register("timetable")}
                  />
                  <label
                    htmlFor="17-19-pm"
                    className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900"
                  >
                    17:00 - 19:00
                  </label>
                </li>
              </ul>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Reservar
                </button>
                {/* <BookButton
                  title="Reservar"
                  style="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => {
                    // if (labs.id_laboratorio) {
                    //   deleteLabMutate(labs.id_laboratorio.toString());
                    // }
                  }}
                /> */}
                <LinkButton
                  href="/laboratorios"
                  style="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  title="Cancelar"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
