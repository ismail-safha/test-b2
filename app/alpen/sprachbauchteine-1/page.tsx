"use client";
import { useState } from "react";
import Header from "../../components/Header";
import { sprachbau_1 } from "../../data/Insekten_H/alpanData";
import { useSession } from "next-auth/react";

const Sprachbauchteine_1 = () => {
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
      <div className="container m-auto  w-full px-2">
        <Header
          pageHome="/alpan"
          pageTow="/alpan/lesenteil-2"
          pageThree="/alpan/lesenteil-3"
          pageFour="/alpan/sprachbauchteine-1"
          pageFive="/alpan/sprachbauchteine-2"
        />
        <main>
          <div className="w-full bg-blue-900 text-white">
            <h1 className="p-2">Sprachbauchteine, TEIL 1</h1>
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-[20px]">
            {/* div text */}
            <div className=" w-full lg:w-[55%] mt-[20px]">
              <p className="bg-[#f6f2bc] text-black rounded-lg p-2">
                Lesen Sie den folgenden Text und entscheiden Sie, welches Wort
                (a, b oder c) in die jeweilige Lücke passt. Markieren Sie Ihre
                Lösungen auf dem Antwortbogen bei den Aufgaben 21 - 30
              </p>
              <div className="mt-[30px] bg-[#fbfbfb] rounded-lg  lg:overflow-y-scroll h-fit  lg:h-[500px]">
                {/* Map through texts array */}
                {sprachbau_1.texts.map((text, index) => (
                  <div key={index} className="p-5">
                    <h1 className="font-bold">{text.title}</h1>
                    <p className="font-semibold">{text.text}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* div answers */}
            <div className=" w-full lg:w-[45%] mt-[30px] h-fit">
              {/* Map through aufgabens array */}
              {sprachbau_1.questions.map((question) => (
                <div
                  key={question.id}
                  className="bg-[#ccc] rounded-lg my-3 flex gap-4 items-center p-[10px]"
                >
                  <h1 className=" text-[#fff] bg-[#040416] p-1 rounded-[50%] font-bold">
                    {question.questionText}
                  </h1>
                  <div className="flex justify-around">
                    {question.options.map((option) => (
                      <div
                        className={`flex gap-2  py-1 items-center ${
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

export default Sprachbauchteine_1;
