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
    { id: 1, number: "A", text: "AN" },
    { id: 2, number: "B", text: "AUS" },
    { id: 3, number: "C", text: "DARAUF" },
    { id: 4, number: "D", text: "DAS" },
    { id: 5, number: "E", text: "DASS" },
    { id: 6, number: "F", text: "DEM" },
    { id: 7, number: "G", text: "DENEN" },
    { id: 8, number: "H", text: "JETZT" },
    { id: 9, number: "I", text: "KEINE" },
    { id: 10, number: "J", text: "NICHT NUR" },
    { id: 11, number: "K", text: "SO DASS" },
    { id: 12, number: "L", text: "ÜBRIGENS" },
    { id: 13, number: "M", text: "WAS" },
    { id: 14, number: "N", text: "WELCHE" },
    { id: 15, number: "O", text: "ZU" },
  ],
};

const initialCartItems: Text[] = [
  { title: "input1", text: "", anserText: "WAS" },
  { title: "input2", text: "", anserText: "JETZT" },
  { title: "input3", text: "", anserText: "AN" },
  { title: "input4", text: "", anserText: "AUS" },
  { title: "input5", text: "", anserText: "DARAUF" },
  { title: "input6", text: "", anserText: "SO DASS" },
  { title: "input7", text: "", anserText: "NICHT NUR" },
  { title: "input8", text: "", anserText: "DENEN" },
  { title: "input9", text: "", anserText: "DASS" },
  { title: "input10", text: "", anserText: "KEINE" },
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
          pageHome="/benzingeld"
          pageTow="/benzingeld/lesenteil-2"
          pageThree="/benzingeld/lesenteil-3"
          pageFour="/benzingeld/sprachbauchteine-1"
          pageFive="/benzingeld/sprachbauchteine-2"
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
                  Der Hund als intelligentes Wesen
                </h1>
                <p>
                  Hunde sind beliebte Begleiter vieler Menschen. Gerade in den
                  Großstädten Deutschlands und Österreichs gibt es eine große
                  Anzahl an Hundebesitzern, die das Tier als Freund, manchmal
                  sogar als Helfer schätzen. Bislang galt die Auffassung, Hunde
                  seien zwar treu, aber
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
                  ihre Intelligenz betrifft, eher mit geringen Begabungen
                  ausgestattet. Doch
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
                  haben wissenschaftliche Experimente
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
                  der Universität Wien und am Max-Planck-Institut in Leipzig die
                  Hundeehre gerettet und bewiesen: Der Hund ist ein
                  außerordentlich intelligentes Lebewesen und kommt in einer
                  Vielzahl von Strategien, die er anwendet, an menschliche
                  Denkmuster durchaus heran. Friederike Range von der
                  Universität Wien setzte ihren Hund vor einen Computer. Der
                  Hund sollte
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
                  verschiedenen Bildern, von denen jeweils zwei auf dem Monitor
                  zu sehen waren, das richtige auswählen und
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
                  entweder einen Menschen oder eine Landschaft erkennen. Der
                  Monitor war mit einem Touchscreen ausgestattet.
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
                  der Hund mit der Schnauze auf das jeweils richtige Bild tippen
                  konnte. Lag er richtig, bekam er ein Stück Trockenfutter als
                  Belohnung, lag er falsch, wurde der Bildschirm kurz rot und
                  zeigte gleich im Anschluss das nächste Bilderpaar. Das
                  Ergebnis war verblüffend. Der Hund hing
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
                  mit einer ähnlichen Begeisterung und Ausdauer am Bildschirm
                  wie manch Jugendlicher an der Playstation, sondern er war auch
                  bei seinen Entscheidungen äußerst treffsicher. Die Leipziger
                  Forscherin Juliane Kaminski setzte ihren Hund vor zwei Gefäße,
                  von
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
                  eins Futter enthielt, das andere nicht. Danach schaute sie in
                  die Richtung des Behälters, in dem das Fleischstück lag. Der
                  Hund beobachtete sie dabei und interpretierte die menschliche
                  Mimik richtig. Dasselbe Experiment mit dem gleichen Ergebnis
                  wurde mit Hundebabys wiederholt. Daraus schließen die Forscher
                  in Leipzig,
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
                  bestimmte Muster menschlicher Gestik und Mimik von den Hunden
                  sehr treffsicher interpretiert werden können und diese
                  Fähigkeiten bereits seit langem bei Hunden vorhanden sein
                  müssen. Man kann also mit Recht annehmen, dass die
                  Interpretationsfähigkeit menschlicher Mimik und Gestik bei den
                  Hunden genetisch verankert ist. Ähnliche Experimente mit
                  Wölfen, die als die Vorfahren des Haushundes gelten, brachten
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
                  vergleichbare Resultate. Ein weiterer Beweis also dafür, dass
                  der Hund diese Fähigkeiten gelernt und verinnerlicht haben
                  muss.
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
