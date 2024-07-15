"use client";

import Image from "next/image";
import HeaderSchreben from "../components/HeaderSchreben";
import imgschreiben from "../../public/img/schreiben-5.jpg";
import { useState } from "react";

const Schreiben_1 = () => {
  const [textareaValue, setTextareaValue] = useState("");

  // Function to handle textarea change
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  // Function to insert a character into the textarea
  const insertCharacter = (character: string) => {
    setTextareaValue(textareaValue + character);
  };

  return (
    <div className="container m-auto  w-full px-2">
      <HeaderSchreben />

      <main>
        <div className="w-full bg-blue-900 text-white">
          <h1 className="p-2">Leseverstehen, TEIL 1</h1>
        </div>
        <div className="flex justify-between  gap-[20px]">
          {/* div text */}
          <div className=" w-[50%] mt-[20px]">
            <div className="mt-[30px] w-full h-fit">
              <Image
                className="object-cover"
                src={imgschreiben}
                alt="schreiben-1"
                // layout="fill"
                height={900}
                width={900}
              />
            </div>
          </div>
          {/* div answers */}
          <div className="w-[50%] mt-[30px]  rounded-lg h-fit">
            <textarea
              className="w-full h-full p-2"
              rows={30}
              cols={80}
              value={textareaValue} // bind value to state
              onChange={handleTextareaChange} // handle change
            ></textarea>
          </div>
        </div>
        <div className=" flex justify-center ">
          <div className="mt-2 bg-[#ccc] flex p-[12px] gap-[19px] w-fit">
            {/* Buttons to insert characters */}
            <button
              className="mr-2 py-[8px] px-[25px] bg-[#fff] border rounded-lg text-[25px] font-bold"
              onClick={() => insertCharacter("ä")}
            >
              ä
            </button>
            <button
              className="mr-2 py-[8px] px-[25px] bg-[#fff] border rounded-lg text-[25px] font-bold"
              onClick={() => insertCharacter("ö")}
            >
              ö
            </button>
            <button
              className="mr-2 py-[8px] px-[25px] bg-[#fff] border rounded-lg text-[25px] font-bold"
              onClick={() => insertCharacter("ü")}
            >
              ü
            </button>
            <button
              className="mr-2 py-[8px] px-[25px] bg-[#fff] border rounded-lg text-[25px] font-bold"
              onClick={() => insertCharacter("ß")}
            >
              ß
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Schreiben_1;
