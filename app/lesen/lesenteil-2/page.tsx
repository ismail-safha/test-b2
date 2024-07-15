"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Header from "../../components/Header";
import { lesenTeil_2 } from "../../data/Insekten_H/insektenasasi";

type Option = {
  optionID: string;
  option: string;
};

type Question = {
  id: number;
  questionText: string;
  options: Option[];
  correctAnswerID: string;
};

const Lesenteiltow = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const { data: session } = useSession();

  const handleOptionChange = (questionId: number, optionId: string) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const newSelectedAnswers = [...prevSelectedAnswers];
      newSelectedAnswers[questionId] = optionId;
      return newSelectedAnswers;
    });
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const resetAnswers = () => {
    setSelectedAnswers([]);
    setShowResults(false);
  };

  return (
    session && (
      <div className="container mx-auto w-full px-2">
        <Header
          pageHome="/lesen"
          pageTow="/lesen/lesenteil-2"
          pageThree="/lesen/lesenteil-3"
          pageFour="/lesen/sprachbauchteine-1"
          pageFive="/lesen/sprachbauchteine-2"
        />
        <main>
          <div className="w-full bg-blue-900 text-white">
            <h1 className="p-2">Leseverstehen, TEIL 2</h1>
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-[10px]">
            {/* div text */}
            <div className=" w-full lg:w-[50%]  mt-20">
              <p className="bg-yellow-200 text-black rounded-lg p-2">
                Lesen Sie zuerst die beiden Artikel und lösen Sie dann die
                Aufgaben 6-10 zu den Texten.
              </p>
              <div className="mt-30 bg-gray-100 rounded-lg overflow-y-scroll h-[650px]">
                {/* Map through texts array */}
                {lesenTeil_2.texts.map((text, index) => (
                  <div key={index} className="p-5 border border-black">
                    <div className="mb-2 py-4 px-4 border-b border-black">
                      <h1 className="font-bold">{text.title}</h1>
                      <p>{text.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* div answers */}
            <div className=" w-full lg:w-[50%]  mt-[30px] h-fit">
              {lesenTeil_2.questions.map((question) => (
                <div key={question.id} className="bg-[#ccc] rounded-lg my-3">
                  <h1 className="px-3 pt-5 font-bold">
                    {question.questionText}
                  </h1>
                  {question.options.map((option) => (
                    <div
                      className={`flex items-center gap-1 ${
                        showResults &&
                        selectedAnswers[question.id] === option.optionID
                          ? option.optionID === question.correctAnswerID
                            ? "bg-green-300"
                            : "bg-red-300"
                          : ""
                      }`}
                      key={option.optionID}
                    >
                      <input
                        type="radio"
                        name={`question${question.id}`}
                        value={option.optionID}
                        checked={
                          selectedAnswers[question.id] === option.optionID
                        }
                        onChange={() =>
                          handleOptionChange(question.id, option.optionID)
                        }
                        className="w-4 h-4"
                      />
                      <p className="font-bold">{option.optionID}</p>
                      {option.option}
                    </div>
                  ))}
                </div>
              ))}
              <div className="flex justify-between">
                <button
                  onClick={checkAnswers}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                >
                  Check Answers
                </button>
                <button
                  onClick={resetAnswers}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4"
                >
                  Reset Answers
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  );
};

export default Lesenteiltow;
