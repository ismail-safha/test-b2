"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const sections = [
  {
    title: "#Insekten 1",
    links: [
      // { href: "/lesen-test", text: "1.1-Insekten معدل", locked: false },
      { href: "/contact", text: "1.1-Insekten معدل", locked: true },
      { href: "/contact", text: "1.2-Insekten Asasi", locked: true },
      { href: "/contact", text: "1.3-Insekten 3", locked: true },
      { href: "/contact", text: "Schreiben-1", locked: true },
      { href: "/contact", text: "Hören", locked: true },
    ],
    mainColor: "#bfdbfe",
    color: "#60a5fa",
  },
  {
    title: "#Grundschulen 2",
    links: [
      { href: "/contact", text: "1-Grundschulen Asasi", locked: true },
      {
        href: "/contact",
        text: "1.2-Grundschu",
        locked: true,
      },
      { href: "/contact", text: "Schreiben-2", locked: true },
    ],
    mainColor: "#00ff0038",
    color: "#51b951",
  },
  {
    title: "#Kelner 3",
    links: [
      { href: "/contact", text: "1-kelner Asasi", locked: true },
      { href: "/contact", text: "1.2-Kelner المعدل", locked: true },
      { href: "/contact", text: "Schreiben-3", locked: true },
    ],
    mainColor: "#7351d74f",
    color: "#7351d7",
  },
  {
    title: "#Meer-inseln 4",
    links: [
      { href: "/contact", text: "1-meer-inseln Asasi", locked: true },
      { href: "/contact", text: "1.2-Meer-Inseln المعدل", locked: true },
      { href: "/contact", text: "Schreiben-4", locked: true },
    ],
    mainColor: "#ed930640",
    color: "#ed9306",
  },
  {
    title: "#Österreichs 5",
    links: [
      { href: "/contact", text: "1-Österreichs", locked: true },
      { href: "/contact", text: "Schreiben-5", locked: true },
    ],
    mainColor: "#4049544a",
    color: "#23272ccf",
  },
  {
    title: "#Limonade 6",
    links: [
      { href: "/contact", text: "1-limonade-n", locked: true },
      { href: "/contact", text: "2-limonade-1", locked: true },
      { href: "/contact", text: "3-limonade-2", locked: true },
      { href: "/contact", text: "4-limonade-3", locked: true },
      { href: "/contact", text: "5-limonade-4", locked: true },
      { href: "/contact", text: "6-limonade-5", locked: true },
      { href: "/contact", text: "7-limonade-6", locked: true },
      { href: "/contact", text: "8-limonade-7", locked: true },
      { href: "/contact", text: "Schreiben-6", locked: true },
    ],
    mainColor: "#bfdbfe",
    color: "#f708ddcf",
  },
  {
    title: "#Bilder 7",
    links: [
      { href: "/contact", text: "1-Bilder", locked: true },
      { href: "/contact", text: "Schreiben-7", locked: true },
    ],
    mainColor: "#bfdbfe",
    color: "#0d01f1",
  },
  {
    title: "#sport-ist-gesund 8",
    links: [
      {
        href: "/contact",
        text: "1-sport gesund اساسي",
        locked: true,
      },
      {
        href: "/contact",
        text: "2-sport gesund-1.1 معدل",
        locked: true,
      },
      { href: "/schreiben-8", text: "Schreiben-8", locked: true },
    ],
    mainColor: "#bfdbfe",
    color: "#ff0000",
  },
  {
    title: "#Tanzkurs 9",
    links: [
      { href: "/contact", text: "1-Tanzkurs", locked: true },
      { href: "/contact", text: "2 -Tanzkurs", locked: true },
      { href: "/contact", text: "Schreiben-9", locked: true },
    ],
    mainColor: "#bfdbfe",
    color: "#ff6347",
  },
  {
    title: "#kinderhandys 10",
    links: [{ href: "/contact", text: "1-kinderhandys", locked: true }],
    mainColor: "#bf5bfe",
    color: "#ff6387",
  },
  {
    title: "#Drogen 11",
    links: [{ href: "/contact", text: "1-drogen", locked: true }],
    mainColor: "#bb98",
    color: "#01204E",
  },
  {
    title: "#Benzingeld 12",
    links: [{ href: "/contact", text: "1-benzingeld", locked: true }],
    mainColor: "#195c2188",
    color: "#01204E",
  },
  {
    title: "#batata 13",
    links: [{ href: "/contact", text: "1-batata", locked: true }],
    mainColor: "#195c2188",
    color: "#01204E",
  },
  {
    title: "#batata 14",
    links: [{ href: "/contact", text: "1-Nahal", locked: true }],
    mainColor: "#195c2188",
    color: "#01204E",
  },
];

const LockIcon = () => (
  <svg
    className="svg-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9069372 8 4 8.9069372 4 10 L 4 20 C 4 21.093063 4.9069372 22 6 22 L 18 22 C 19.093063 22 20 21.093063 20 20 L 20 10 C 20 8.9069372 19.093063 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 6 10 L 18 10 L 18 20 L 6 20 L 6 10 z M 12 13 C 10.9 13 10 13.9 10 15 C 10 16.1 10.9 17 12 17 C 13.1 17 14 16.1 14 15 C 14 13.9 13.1 13 12 13 z"></path>
  </svg>
);

export default function GetStarted() {
  return (
    <main className="container w-full m-auto px-2 h-[100%]">
      <div className="h-[109px]">
        <div className="">
          <div className="flex flex-col items-center bg-red-800 p-1 ml-1">
            <div className="text-white font-black text-[30px] lg:text-[35px]">
              TEST
            </div>
            <div className="text-white text-[10px] lg:text-[12px]">
              LANGUAGE TESTS
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-center m-auto bg-[#080f26] text-[#fff] font-bold p-5 rounded-2xl mt-[50px]">
        <Link
          href="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300
    "
        >
          Login
        </Link>
      </h1>

      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 gap-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="rounded-xl p-6"
              style={{ background: section.mainColor }}
            >
              <div className="flex items-center mb-4">
                <h1
                  className="border rounded-full py-1 px-4 text-white text-lg font-bold"
                  style={{ background: section.color }}
                >
                  {section.title}
                </h1>
                <hr className="flex-grow border-b border-gray-400 ml-4" />
              </div>
              <div className="flex flex-row justify-around items-center flex-wrap gap-4">
                {section.links.map((link, linkIndex) => (
                  <Link
                    className=" p-[40px] m-[30px] rounded-xl bg-gray-700 hover:bg-gray-800 text-white text-center font-bold transition duration-300 flex flex-col items-center"
                    key={linkIndex}
                    href={link.href}
                    passHref
                  >
                    {link.locked && <LockIcon />}
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
