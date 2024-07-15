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
    { id: 1, number: "A", text: "ALS" },
    { id: 2, number: "B", text: "AN" },
    { id: 3, number: "C", text: "AUSSERDEM" },
    { id: 4, number: "D", text: "BEI" },
    { id: 5, number: "E", text: "DARUNTER" },
    { id: 6, number: "F", text: "DIE" },
    { id: 7, number: "G", text: "NACHDEM" },
    { id: 8, number: "H", text: "OBWOHL" },
    { id: 9, number: "I", text: "SEIT" },
    { id: 10, number: "J", text: "VOR" },
    { id: 11, number: "K", text: "WARUM" },
    { id: 12, number: "L", text: "WAS" },
    { id: 13, number: "M", text: "WEIL" },
    { id: 14, number: "N", text: "WER" },
    { id: 15, number: "O", text: "WIE" },
  ],
};

const initialCartItems: Text[] = [
  { title: "input1", text: "", anserText: "SEIT" },
  { title: "input2", text: "", anserText: "WIE" },
  { title: "input3", text: "", anserText: "WARUM" },
  { title: "input4", text: "", anserText: "AUSSERDEM" },
  { title: "input5", text: "", anserText: "AN" },
  { title: "input6", text: "", anserText: "ALS" },
  { title: "input7", text: "", anserText: "BEI" },
  { title: "input8", text: "", anserText: "WEIL" },
  { title: "input9", text: "", anserText: "WAS" },
  { title: "input10", text: "", anserText: "WER" },
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
          pageHome="/tanzkurs"
          pageTow="/tanzkurs/lesenteil-2"
          pageThree="/tanzkurs/lesenteil-3"
          pageFour="/tanzkurs/sprachbauchteine-1"
          pageFive="/tanzkurs/sprachbauchteine-2"
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
                  Jugend diskutiert - mach mit!
                </h1>
                <p>
                  Den Wettbewerber “Jugend diskutiert” gibt es bereits
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
                  Herbst 2002. Für das kommende Jahr werden nun wieder
                  Schülerinnen und Schüler gesucht, die an dem Wettbewerb
                  teilnehmen möchten.
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
                  immer bereiten sich die Teilnehmer dann im Unterricht auf
                  “Jugend diskutiert” vor. Du fragst dich,
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
                  du teilnehmen solltest? Ganz einfach: “Jugend diskutiert”
                  bringt dich weiter! Sich einmischen, mitreden, überzeugen -
                  bei der Vorbereitung im Unterricht trainierst du viele
                  Fähigkeiten, die dir in der Schule und im Alltag helfen. Im
                  Austausch mit den anderen entwickelst du deine Persönlichkeit
                  weiter und profitierst langfristig.
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
                  bietet dir “Jugend diskutiert” die Chance, im Wettstreit mit
                  anderen weiterzukommen. Zuerst werden die besten einer Schule
                  ermittelt, die dann
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
                  Regionalwettbewerben teilnehmen. Die Sieger der
                  Regionalwettbewerbe treten im Bundesfinale an.
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
                  Preise kann man professionelle Trainings gewinnen.
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
                  “Jugend diskutiert” kannst du viel lernen. Du hast bessere
                  Chancen im Unterricht und bei Referaten, denn du trainierst,
                  frei zu sprechen und Dinge anschaulich und verständlich zu
                  beschreiben. Du gewinnst mehr Selbstbewusstsein,
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
                  du lernst, wie man das Wort ergreift und auf sich aufmerksam
                  macht. Du kannst überzeugen, da du eigene Argumente finden und
                  die Argumente anderer genau prüfen kannst. Die Sichtweisen der
                  anderen zeigen dir darüber hinaus,
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
                  du vielleicht selbst noch nicht gesehen hast. Du überzeugst
                  bei Auftritten, Prüfungen und Bewerbungen, da du sicher
                  auftrittst.
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
                  das alles im Unterricht gelernt hat, kann gemeinsam mit
                  anderen viel bewegen! Schließlich ist der Wettbewerb “Jugend
                  diskutiert” auch eine Chance, Jugendliche aus ganz Deutschland
                  kennenzulernen und neue Freundschaften zu knüpfen. Weitere
                  Informationen zu Anmeldung und Teilnahme gibt es im Internet
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
                  className="bg-[#c37e2fc7] block lg:hidden hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded mt-4"
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
