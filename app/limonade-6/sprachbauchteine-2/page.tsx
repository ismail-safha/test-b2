"use client";
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Header from "../../components/Header";

interface Text {
  title: string;
  text: string;
  anserText: string;
}

interface Answer {
  id: number;
  number: string;
  text: string;
}

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const sprachbau_2_t = {
  answers: [
    { id: 1, number: "A", text: "ZU" },
    { id: 2, number: "B", text: "WIE" },
    { id: 3, number: "C", text: "SEI" },
    { id: 4, number: "D", text: "NUR" },
    { id: 5, number: "E", text: "NACHWEISEN" },
    { id: 6, number: "F", text: "MUSSTEN" },
    { id: 7, number: "G", text: "LIEFERT" },
    { id: 8, number: "H", text: "KONNTEN" },
    { id: 9, number: "I", text: "HABEN" },
    { id: 10, number: "J", text: "GEBEN" },
    { id: 11, number: "K", text: "FÖRDERTE" },
    { id: 12, number: "L", text: "ERBRINGEN" },
    { id: 13, number: "M", text: "DAZU" },
    { id: 14, number: "N", text: "DAVON" },
    { id: 15, number: "O", text: "BEKANNTLICH" },
  ],
};

const initialCartItems: Text[] = [
  { title: "input1", text: "", anserText: "NACHWEISEN" }, // E
  { title: "input2", text: "", anserText: "ZU" }, // A
  { title: "input3", text: "", anserText: "DAZU" }, // M
  { title: "input4", text: "", anserText: "DAVON" }, // N
  { title: "input5", text: "", anserText: "SEI" }, // C
  { title: "input6", text: "", anserText: "NUR" }, // D
  { title: "input7", text: "", anserText: "KONNTEN" }, // H
  { title: "input8", text: "", anserText: "LIEFERT" }, // G
  { title: "input9", text: "", anserText: "GEBEN" }, // J
  { title: "input10", text: "", anserText: "WIE" },
];

const Sprachbauchteine_2: React.FC = () => {
  const { data: session } = useSession();

  //====

  const [answers, setAnswers] = useState(sprachbau_2_t.answers);

  const shuffleAnswers = () => {
    const texts = answers.map((answer) => answer.text);
    const shuffledTexts = shuffleArray(texts);

    const shuffledAnswers = answers.map((answer, index) => ({
      ...answer,
      text: shuffledTexts[index],
    }));

    setAnswers(shuffledAnswers);
    console.log("answers", answers);
  };
  //====

  const [selectedInputIndex, setSelectedInputIndex] = useState<number | null>(
    null
  );
  const [cartItems, setCartItems] = useState<Text[]>(initialCartItems);
  const [results, setResults] = useState<boolean[] | undefined>(undefined);

  const handleAnswerClick = (answerText: string) => {
    if (selectedInputIndex !== null) {
      const updatedCartItems = cartItems.map((item, index) =>
        index === selectedInputIndex ? { ...item, text: answerText } : item
      );
      setCartItems(updatedCartItems);
    }
  };

  const handleInputClick = (inputIndex: number) => {
    setSelectedInputIndex(inputIndex);
    const updatedCartItems = cartItems.map((item, index) =>
      index === inputIndex ? { ...item, text: "" } : item
    );
    setCartItems(updatedCartItems);
  };

  const checkAnswers = () => {
    const newResults = cartItems.map((item) => item.text === item.anserText);
    setResults(newResults);
  };

  const resetCheckResult = () => {
    setCartItems(initialCartItems);
    setResults(undefined);
    setSelectedInputIndex(null);
  };

  return (
    session && (
      <div className="container m-auto  w-full px-2">
        <Header
          pageHome="/limonade-3"
          pageTow="/limonade-3/lesenteil-2"
          pageThree="/limonade-3/lesenteil-3"
          pageFour="/limonade-3/sprachbauchteine-1"
          pageFive="/limonade-3/sprachbauchteine-2"
        />
        <main>
          <div className="w-full bg-blue-900 text-white">
            <h1 className="p-2">Sprachbauchteine, TEIL 2</h1>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-[20px]">
            {/* div text */}
            <div className="w-full lg:w-[55%] mt-[20px]">
              <p className="bg-[#f6f2bc] text-black rounded-lg p-2">
                Lesen Sie den folgenden Text und entscheiden Sie, welches Wort
                (a, b oder c) in die jeweilige Lücke passt. Markieren Sie Ihre
                Lösungen auf dem Antwortbogen bei den Aufgaben 21 - 30
              </p>
              <div className="mt-[30px] dark:bg-[#1d2a35] dark:text-[#ededed] bg-[#fbfbfb] rounded-lg lg:overflow-y-scroll h-fit  lg:h-[500px] p-4">
                <h1 className="text-xl font-bold">
                  Teamarbeit als Schlüssel zum Erfolg Erstaunliche Erkenntnisse
                  über Teamarbeit bei Affen
                </h1>
                <p>
                  Nicht nur Menschen sind in der Lage, bei der Lösung einer
                  Aufgabe mit anderen zusammenzuarbeiten. Ein deutsch-britisches
                  Forscherteam konnte eindrücklich
                  <input
                    type="text"
                    placeholder="____31"
                    className={`bg-blue-500 rounded-[9px] w-16 text-center mx-2 ${
                      results !== undefined
                        ? results[0]
                          ? "bg-green-300"
                          : "bg-red-300"
                        : ""
                    }`}
                    value={cartItems[0].text}
                    onClick={() => handleInputClick(0)}
                    readOnly
                  />{" "}
                  , dass auch Schimpansen
                  <input
                    type="text"
                    placeholder="____32"
                    className={`bg-blue-500 rounded-[9px] w-16 text-center mx-2 ${
                      results !== undefined
                        ? results[1]
                          ? "bg-green-300"
                          : "bg-red-300"
                        : ""
                    }`}
                    value={cartItems[1].text}
                    onClick={() => handleInputClick(1)}
                    readOnly
                  />{" "}
                  echter Teamarbeit fähig sind. Die Wissenschaftler gaben zwei
                  Schimpansen gemeinsam die Aufgabe, Trauben aus einer Kiste zu
                  holen.
                  <input
                    type="text"
                    placeholder="____33"
                    className={`bg-blue-500 rounded-[9px] w-16 text-center mx-2 ${
                      results !== undefined
                        ? results[2]
                          ? "bg-green-300"
                          : "bg-red-300"
                        : ""
                    }`}
                    value={cartItems[2].text}
                    onClick={() => handleInputClick(2)}
                    readOnly
                  />{" "}
                  bekam einer der beiden Affen zwei Werkzeuge. Um die Aufgabe zu
                  meistern, musste er aber eines
                  <input
                    type="text"
                    placeholder="____34"
                    className={`bg-blue-500 rounded-[9px] w-16 text-center mx-2 ${
                      results !== undefined
                        ? results[3]
                          ? "bg-green-300"
                          : "bg-red-300"
                        : ""
                    }`}
                    value={cartItems[3].text}
                    onClick={() => handleInputClick(3)}
                    readOnly
                  />{" "}
                  an seine Artgenossen weitergeben. Zehn von zwölf Schimpansen
                  taten dies auch, und in über 70 Prozent der Versuche
                  <input
                    type="text"
                    placeholder="____35"
                    className={`bg-blue-500 rounded-[9px] w-16 text-center mx-2 ${
                      results !== undefined
                        ? results[4]
                          ? "bg-green-300"
                          : "bg-red-300"
                        : ""
                    }`}
                    value={cartItems[4].text}
                    onClick={() => handleInputClick(4)}
                    readOnly
                  />{" "}
                  es sogar das richtige Werkzeug gewesen, berichten die
                  Forscher. Ziel der Untersuchung war es, herauszufinden, wo die
                  Fähigkeit des Menschen zur Zusammenarbeit herkommt und ob
                  diese Eigenschaft
                  <input
                    type="text"
                    placeholder="____36"
                    className={`bg-blue-500 rounded-[9px] w-16 text-center mx-2 ${
                      results !== undefined
                        ? results[5]
                          ? "bg-green-300"
                          : "bg-red-300"
                        : ""
                    }`}
                    value={cartItems[5].text}
                    onClick={() => handleInputClick(5)}
                    readOnly
                  />{" "}
                  beim Menschen vorhanden ist. Dass einige Tierarten
                  zusammenarbeiten, beispielsweise bei der Jagd, war bekannt.
                  Unklar war aber bisher, wie viel Teamarbeit bewusst erfolgt.
                  In dem Versuch musste der eine Affe Trauben mit einer Harke
                  durch eine Öffnung in einer Kiste auf eine Platte schubsen.
                  Der andere Affe musste dann mit einem Stock die Platte
                  anheben, damit die Trauben auf den Boden fielen und die Affen
                  sie fressen
                  <input
                    type="text"
                    placeholder="____37"
                    className={`bg-blue-500 rounded-[9px] w-16 text-center mx-2 ${
                      results !== undefined
                        ? results[6]
                          ? "bg-green-300"
                          : "bg-red-300"
                        : ""
                    }`}
                    value={cartItems[6].text}
                    onClick={() => handleInputClick(6)}
                    readOnly
                  />{" "}
                  . Bei den einzelnen Affen dauerte es unterschiedlich lange,
                  bis ein Werkzeug weitergegeben wurde. Hatte einer es jedoch
                  einmal getan, gab er in 97 Prozent der folgenden Versuche
                  wieder ein Werkzeug weiter. Diese Studie
                  <input
                    type="text"
                    placeholder="____38"
                    className={`bg-blue-500 rounded-[9px] w-16 text-center mx-2 ${
                      results !== undefined
                        ? results[7]
                          ? "bg-green-300"
                          : "bg-red-300"
                        : ""
                    }`}
                    value={cartItems[7].text}
                    onClick={() => handleInputClick(7)}
                    readOnly
                  />{" "}
                  erste Hinweise darauf, dass Schimpansen bei einer gemeinsamen
                  Aufgabe auf die Handlungen ihres Partners Acht
                  <input
                    type="text"
                    placeholder="____39"
                    className={`bg-blue-500 rounded-[9px] w-16 text-center mx-2 ${
                      results !== undefined
                        ? results[8]
                          ? "bg-green-300"
                          : "bg-red-300"
                        : ""
                    }`}
                    value={cartItems[8].text}
                    onClick={() => handleInputClick(8)}
                    readOnly
                  />{" "}
                  können. Den Affen scheint bewusst zu sein, dass ihr Artgenosse
                  wichtig ist, um an die Trauben zu kommen. Daraus schließen die
                  Forscher: Genau
                  <input
                    type="text"
                    placeholder="____40"
                    className={`bg-blue-500 rounded-[9px] w-16 text-center mx-2 ${
                      results !== undefined
                        ? results[9]
                          ? "bg-green-300"
                          : "bg-red-300"
                        : ""
                    }`}
                    value={cartItems[9].text}
                    onClick={() => handleInputClick(9)}
                    readOnly
                  />{" "}
                  den Menschen sei es den Affen möglich, strategisch
                  zusammenzuarbeiten
                </p>
              </div>
            </div>

            <div className="w-full lg:w-[45%] mt-[30px] bg-[#ccc] dark:bg-[#777] rounded-lg h-fit p-4">
              <div>
                {sprachbau_2_t.answers.map((answer) => (
                  <div
                    key={answer.id}
                    className="flex items-center cursor-pointer"
                    onClick={() => handleAnswerClick(answer.text)}
                  >
                    <h1 className="pl-3">{answer.number}</h1>
                    <div className="p-[5px] m-[10px] rounded-lg bg-blue-200">
                      {answer.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-[10px] m-[20px]">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={checkAnswers}
                >
                  Check Answers
                </button>
                <button
                  onClick={shuffleAnswers}
                  className="bg-[#c37e2fc7]  hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Shuffle 🔄
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4 ml-2"
                  onClick={resetCheckResult}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  );
};

export default Sprachbauchteine_2;
