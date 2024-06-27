import LinkButton from "@/components/LinkButton";

export default function Regresar() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="px-9 pt-5">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reserva de laboratorios
            </h1>
          </div>
          <div className="px-9 py-5">
            <LinkButton
              href="/login"
              style="m-5 bg-red-500 sm:bg-orange-400 text-center hover:bg-red-200 py-5 px-8 font-bold text-white rounded"
              title="Login"
            />
            <LinkButton
              href="/registro"
              style="m-5 bg-red-500 sm:bg-orange-400 text-center hover:bg-red-200 py-5 px-8 font-bold text-white rounded"
              title="Registro"
            />
            <LinkButton
              href="/acercade"
              style="m-5 bg-red-500 sm:bg-orange-400 text-center hover:bg-red-200 py-5 px-8 font-bold text-white rounded"
              title="Nosotros"
            />

              <LinkButton
              href="/iniciousuario"
              style="m-5 bg-red-500 sm:bg-orange-400 text-center hover:bg-red-200 py-5 px-8 font-bold text-white rounded"
              title="ELIMINAR BOTON AL FINAL"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
