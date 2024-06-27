import LinkButton from "@/components/LinkButton";

export default function Iniciousuario(){
    return(
        <div className="content-center">
            
            <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">RESERVAS NAME</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit quam magnam nemo similique sunt placeat debitis soluta dolores iste eaque. Dolorum et porro sed quas numquam fugit rerum dolore debitis.
                </p>
                <br /><br />
                <LinkButton href="/acercade" style="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" title="Regresar"/>
            </a>

        </div>
    );
}