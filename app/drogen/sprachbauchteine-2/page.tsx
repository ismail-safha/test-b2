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
    { id: 1, number: "A", text: "AUSWAHL" },
    { id: 2, number: "B", text: "CHANCE" },
    { id: 3, number: "C", text: "DA" },
    { id: 4, number: "D", text: "DAGEGEN" },
    { id: 5, number: "E", text: "DENN" },
    { id: 6, number: "F", text: "DURFTEN" },
    { id: 7, number: "G", text: "KÖNNTEN" },
    { id: 8, number: "H", text: "MÖCHTE" },
    { id: 9, number: "I", text: "SOLLTE" },
    { id: 10, number: "J", text: "SONDERN" },
    { id: 11, number: "K", text: "TROTZDEM" },
    { id: 12, number: "L", text: "ÜBERNEHMEN" },
    { id: 13, number: "M", text: "VERFÜGUNG" },
    { id: 14, number: "N", text: "WARUM" },
    { id: 15, number: "O", text: "ZIEHEN" },
  ],
};

const initialCartItems: Text[] = [
  { title: "input1", text: "", anserText: "DENN" },
  { title: "input2", text: "", anserText: "MÖCHTE" },
  { title: "input3", text: "", anserText: "DA" },
  { title: "input4", text: "", anserText: "CHANCE" },
  { title: "input5", text: "", anserText: "WARUM" },
  { title: "input6", text: "", anserText: "ÜBERNEHMEN" },
  { title: "input7", text: "", anserText: "KÖNNTEN" },
  { title: "input8", text: "", anserText: "VERFÜGUNG" },
  { title: "input9", text: "", anserText: "TROTZDEM" },
  { title: "input10", text: "", anserText: "SONDERN" },
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
          pageHome="/drogen"
          pageTow="/drogen/lesenteil-2"
          pageThree="/drogen/lesenteil-3"
          pageFour="/drogen/sprachbauchteine-1"
          pageFive="/drogen/sprachbauchteine-2"
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
                <h1 className="text-xl font-bold">Ausbildung mit über 30</h1>
                <p>
                  Die gelernte Krankenschwester Jaqueline Delgado drückt mit 38
                  Jahren noch einmal die Schulbank.
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
                  sie hat sich für einen beruflichen Neustart entschieden. Da
                  ihr früherer Beruf ihr keinen Spaß mehr machte, begann sie
                  eine Berufsausbildung bei der Polizei. Ihr Ziel: Sie
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
                  in den Streifendienst gehen. Mit über 30 noch einmal einen
                  ganz neuen Job zu erlernen - lange Zeit war das kaum möglich.
                  Arbeitgeber suchten nur junge Berufseinsteiger.
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
                  es heute in vielen Branchen aber an Nachwuchs fehlt, geben sie
                  öfter auch Älteren eine
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
                  . Thomas Neuendorfer, der stellvertretende Sprecher der
                  Polizei Berlin, erklärt,
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
                  sein Arbeitgeber gerne Ältere ausbildet: Sie haben in ihrem
                  Berufsleben Erfahrungen gesammelt, die der Polizei und auch
                  den Bürgern der Stadt zu Gute kommen. Sie seien häufig
                  emotional reifer, außerdem bereit, Verantwortung zu
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
                  , und motiviert, die Ausbildung erfolgreich abzuschließen.
                  Zudem
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
                  sie die Jüngeren unterstützen und ihnen als Vorbild dienen.
                  Davon profitieren dann auch die Arbeitgeber. Gegen die
                  Einstellung von Älteren spreche nur, dass die Unternehmen
                  kürzer vor
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
                  stehen.
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
                  haben ältere Azubis in vielen Bereichen Möglichkeiten: in
                  kaufmännischer oder in gewerblich-technischen Berufen, im
                  Gesundheitswesen oder vor allem in der Gastronomie. Wenn das
                  Azubi-Gehalt nicht für den Lebensunterhalt reicht, hilft die
                  Arbeitsagentur. Der Betrag wird dabei nicht nach dem Alter
                  festgelegt,
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
                  es wird der individuelle, konkrete Bedarf ermittelt. Im August
                  schließt Delgado ihre Ausbildung ab. In dem künftigen
                  Polizei-Job wird sie ihr medizinisches Wissen, ihre
                  Menschenkenntnis sowie ihre spanischen und englischen
                  Sprachkenntnisse wohl gut gebrauchen können.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-[45%] mt-[30px] bg-[#ccc] dark:bg-[#777] rounded-lg h-fit p-4">
              <div>
                {answers.map((answer) => (
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
                  className="bg-[#c37e2fc7] hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded mt-4"
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
