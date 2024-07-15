"use client";

import { usePathname, useRouter } from "next/navigation";
import { MoonIcon, SunIcon } from "./icons/Icons";
import useThemSwitcher from "./hooks/useThemSwitcher";
import { useState } from "react";
import TimerComponentSch from "./TimerComponentSch";

const HeaderSchreben = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mode, setMode] = useThemSwitcher();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row m-auto justify-between items-center bg-[#02031e] h-[109px] p-4 lg:p-0">
      <div className="flex justify-between items-center w-full lg:w-auto">
        <button
          onClick={() => {
            router.push("/");
          }}
          className="flex flex-col items-center bg-red-800 p-1 ml-1"
        >
          <div className="text-white font-black text-[30px] lg:text-[35px]">
            t-elc
          </div>
          <div className="text-white text-[10px] lg:text-[12px]">
            LANGUAGE TESTS
          </div>
        </button>
        <div className="block lg:hidden">
          <button
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            className={`ml-3 flex items-center justify-center rounded-full p-2 text-[#fff] bg-[#000] dark:bg-[#fff] dark:text-[#000] ${
              mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
            }`}
          >
            {mode === "dark" ? (
              <SunIcon className={"fill-dark "} />
            ) : (
              <MoonIcon className={"fill-dark"} />
            )}
          </button>
        </div>

        <button
          className="lg:hidden text-white text-[35px]"
          onClick={toggleMobileMenu}
        >
          ☰
        </button>
      </div>
      <div
        className={`lg:flex ${
          isMobileMenuOpen ? "block" : "hidden"
        } w-full lg:w-auto`}
      >
        <div className="flex relative  lg:bg-[#02031e] bg-white/30 backdrop-blur-md rounded-lg  flex-col lg:flex-row items-center gap-[10px] lg:gap-[50px] mt-4 lg:mt-0">
          <div
            className={`flex flex-col items-center border border-white rounded-lg p-2 bg-white `}
          >
            <h1 className="font-bold">Schreiben</h1>

            <h3 className="">(45 Punkte)</h3>
          </div>
        </div>
      </div>

      <TimerComponentSch />
    </div>
  );
};

export default HeaderSchreben;
