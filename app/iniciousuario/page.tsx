"use client"
import LinkButton from "@/components/LinkButton";

export default function Iniciousuario() {
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
                HORARIO
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
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">
                <LinkButton href="/iniciousuario" style="" title="Eliminar" />
              </td>
              {/*
                    <td className="px-6 py-4">
                        <LinkButton href="/iniciousuario" style="" title="Modificar"/>
                    </td>*/}
            </tr>
          </tbody>
        </table>
      </div>
    </div>




        


);
}
