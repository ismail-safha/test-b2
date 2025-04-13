"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import StatusLoading from "../components/StatusLoading";

const sections = [
  {
    title: "#Insekten 1",
    links: [
      { href: "/lesen", text: "Insekten " },
      { href: "/insektenasasi", text: "Insekten 2" },
      { href: "/insektenasasi-3", text: "Insekten 3" },
      { href: "/schreiben-1", text: "Schreiben-1" },
      { href: "/horen-1", text: "Hören" },
    ],
    mainColor: "#bfdbfe",
    color: "#60a5fa",
  },
  {
    title: "#Grundschulen 2",
    links: [
      { href: "/grundschulen", text: "1-Grundschulen Asasi" },
      { href: "/grundschulen-1", text: "1.2-Grundschulen المعدل" },
      { href: "/schreiben-2", text: "Schreiben-2" },
    ],
    mainColor: "#00ff0038",
    color: "#51b951",
  },
  {
    title: "#Kelner 3",
    links: [
      { href: "/kelner", text: "1-kelner Asasi" },
      { href: "/kelner-1", text: "1.2-Kelner المعدل" },
      { href: "/schreiben-3", text: "Schreiben-3" },
    ],
    mainColor: "#7351d74f",
    color: "#7351d7",
  },
  {
    title: "#Meer-inseln 4",
    links: [
      { href: "/meer-inseln-2", text: "1-meer-inseln Asasi" },
      { href: "/meer-inseln", text: "1.2-Meer-Inseln المعدل" },
      { href: "/schreiben-4", text: "Schreiben-4" },
    ],
    mainColor: "#ed930640",

    color: "#ed9306",
  },
  {
    title: "#Österreichs 5",
    links: [
      { href: "/osterreichs", text: "1-Österreichs" },
      { href: "/schreiben-5", text: "Schreiben-5" },
    ],
    mainColor: "#4049544a",

    color: "#23272ccf",
  },
  {
    title: "#Limonade 6",
    links: [
      { href: "/limonade-n", text: "1-limonade-n" },
      { href: "/limonade-1", text: "2-limonade-1" },
      { href: "/limonade-2", text: "3-limonade-2" },
      { href: "/limonade-3", text: "4-limonade-3" },
      { href: "/limonade-4", text: "5-limonade-4" },
      { href: "/limonade-5", text: "6-limonade-5" },
      { href: "/limonade-6", text: "7-limonade-6" },
      { href: "/limonade-7", text: "8-limonade-7" },
      { href: "/schreiben-6", text: "Schreiben-6" },
    ],
    mainColor: "#bfdbfe",

    color: "#f708ddcf",
  },
  {
    title: "#Bilder 7",
    links: [
      { href: "/bilder", text: "1-Bilder" },
      { href: "/schreiben-7", text: "Schreiben-7" },
    ],
    mainColor: "#bfdbfe",

    color: "#0d01f1",
  },
  {
    title: "#sport-ist-gesund 8",
    links: [
      { href: "/sport-ist-gesund-1", text: "1-sport gesund اساسي" },
      { href: "/sport-ist-gesund-1-1", text: "2-sport gesund-1.1 معدل" },
      { href: "/schreiben-8", text: "Schreiben-8" },
    ],
    mainColor: "#bfdbfe",

    color: "#ff0000",
  },
  {
    title: "#Tanzkurs 9",
    links: [
      { href: "/tanzkurs", text: "1-Tanzkurs" },
      { href: "/tanzkurs-1", text: "2 -Tanzkurs" },
      { href: "/schreiben-9", text: "Schreiben-9" },
    ],
    mainColor: "#bfdbfe",

    color: "#ff6347",
  },
  {
    title: "#kinderhandys 10",
    links: [{ href: "/kinderhandys", text: "1-kinderhandys" }],
    mainColor: "#bf5bfe",

    color: "#ff6387",
  },
  {
    title: "#Drogen 11",
    links: [{ href: "/drogen", text: "1-drogen" }],
    mainColor: "#bb98",

    color: "#01204E",
  },
  {
    title: "#benzingeld 12",
    links: [{ href: "/benzingeld", text: "1-benzingeld" }],
    mainColor: "#195c2188",
    color: "#01204E",
  },
  {
    title: "#batata 13",
    links: [{ href: "/batata", text: "1-batata" }],
    mainColor: "#195c2188",
    color: "#01204E",
  },
  {
    title: "#Nahal 14",
    links: [{ href: "/nahal", text: "1-Nahal" }],
    mainColor: "#195c2188",
    color: "#01204E",
  },
  {
    title: "#Alpen  15",
    links: [{ href: "/alpen", text: "1-Alpen " }],
    mainColor: "#195c2188",
    color: "#01204E",
  },
];

// export default async function Home() {
export default function HomePages() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: session, status } = useSession();

  //==

  if (status === "loading") {
    return <StatusLoading />;
  }
  //==

  return (
    session && (
      <main className="container w-full m-auto px-2 h-[100%]">
        <div className="   h-[150px]">
          <div className="flex flex-col items-center  bg-red-800 p-1 ">
            <div className="flex flex-col">
              <div className="text-white font-black text-[30px] lg:text-[35px]">
                TEST
              </div>
              <div className="text-white text-[10px] lg:text-[12px]">
                LANGUAGE TESTS
              </div>
            </div>
          </div>
          <h1 className="font-bold text-[#fff] bg-[#040404] p-[8px] text-center">
            Willkommen🖐 {session.user.name}
            <span
              className={`py-[7px] px-[13px] ${
                session.user.clickCount >= 3 ? "bg-red-500" : "bg-[#519cdd]"
              } text-[15px] rounded-[10px] m-[16px]`}
            >
              {session.user.clickCount}
            </span>
            {session.user.clickCount >= 3 && (
              <div className="text-red-500 py-[7px] px-[13px] rounded-[10px]">
                Your account will be deleted
              </div>
            )}
          </h1>
        </div>

        {/* ===== */}
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 gap-8">
            {/* {visibleSections.map((section, index) => ( */}
            {sections.map((section, index) => (
              <div
                key={index}
                className="rounded-xl p-6"
                style={{ background: section.mainColor }}
              >
                <div className="flex items-center mb-4">
                  <h1
                    className="border rounded-full py-1 px-4  text-white text-lg font-bold"
                    style={{ background: section.color }}
                  >
                    {section.title}
                  </h1>
                  <hr className="flex-grow border-b border-gray-400 ml-4" />
                </div>
                <div className="flex flex-row justify-around items-center flex-wrap gap-4">
                  {section.links.map((link, linkIndex) => (
                    <Link
                      className="block p-[40px] m-[30px] rounded-xl bg-gray-700 hover:bg-gray-800 text-white text-center font-bold  transition duration-300"
                      key={linkIndex}
                      href={link.href}
                      passHref
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    )
  );
}
