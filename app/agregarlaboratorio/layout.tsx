"use client";

import LinkButton from "@/components/LinkButton";
import useStore from "@/store/auth/authStore";
import { UserResponse } from "@/types";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import logout from "../me/logout";
import userStore from "@/store/auth/userStore";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const authUser = useStore((state) => state.authUser);
  const { removeSession } = userStore();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { user, error } = await getUserSession();
      if (error) {
        router.push("/login");
      } else if (user) {
        authUser(user);
      }
      //If the user is logged
      setIsSuccess(true);
    })();
  }, [router, authUser]);

  if (!isSuccess) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }
  return (
    <main>
      <header>
        {/*MENU*/}
        <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                RESERVASNAME
              </span>
            </a>
            <button
              data-collapse-toggle="navbar-dropdown"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-dropdown"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-dropdown"
            >
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <LinkButton
                    href="/"
                    style="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                    title="Inicio"
                  />
                </li>
                <li>
                  <LinkButton
                    href="/laboratorios"
                    style="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    title="Laboratorios"
                  />
                </li>
                <li>
                  <LinkButton
                    href="/acercade"
                    style="alingn-center block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    title="Acerca de"
                  />
                </li>
                <li>
                  <a
                    href="/"
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                    aria-current="page"
                    // onClick={handleLogout}
                  >
                    Cerrar sesión
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {children}
    </main>
  );
};

export default ProfileLayout;

async function getUserSession(): Promise<UserResponse> {
  try {
    const { data } = await axios.get("/me");
    return {
      user: data,
      error: null,
    };
  } catch (e) {
    return {
      error: e as AxiosError,
    };
  }
}
