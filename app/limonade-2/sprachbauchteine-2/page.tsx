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
    { id: 1, number: "A", text: "AB" },
    { id: 2, number: "B", text: "ABER " },
    { id: 3, number: "C", text: "AM " },
    { id: 4, number: "D", text: "AUF " },
    { id: 5, number: "E", text: "DA " },
    { id: 6, number: "F", text: "DARUM" },
    { id: 7, number: "G", text: "DAZU " },
    { id: 8, number: "H", text: "ES" },
    { id: 9, number: "I", text: "OHNE" },
    { id: 10, number: "J", text: "SEIT " },
    { id: 11, number: "K", text: "SONDERN" },
    { id: 12, number: "L", text: "TROTZ" },
    { id: 13, number: "M", text: "UM" },
    { id: 14, number: "N", text: "VOR" },
    { id: 15, number: "O", text: "WEGEN " },
  ],
};

const initialCartItems: Text[] = [
  { title: "input1", text: "", anserText: "SONDERN" },
  { title: "input2", text: "", anserText: "SEIT" },
  { title: "input3", text: "", anserText: "WEGEN" },
  { title: "input4", text: "", anserText: "AB" },
  { title: "input5", text: "", anserText: "AM" },
  { title: "input6", text: "", anserText: "ES" },
  { title: "input7", text: "", anserText: "DA" },
  { title: "input8", text: "", anserText: "DARUM" },
  { title: "input9", text: "", anserText: "AUF" },
  { title: "input10", text: "", anserText: "UM" },
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
          pageHome="/limonade-2"
          pageTow="/limonade-2/lesenteil-2"
          pageThree="/limonade-2/lesenteil-3"
          pageFour="/limonade-2/sprachbauchteine-1"
          pageFive="/limonade-2/sprachbauchteine-2"
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
                  Theater für Kinder und Jugendliche
                </h1>
                <p>
                  Theater fördert nicht nur die Kreativität,
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
                  auch die Körpererfahrung von Kindern. Der Verein “Jugendhilfe
                  Düsseldorf e. V.“ arbeitet
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
                  vielen Jahren in der Jugendförderung, und deshalb unterstützt
                  er auch ein neues Theaterprojekt für Kinder. Üben und spielen
                  werden die Teilnehmer im Jugendzentrum. Das Jugendzentrum ist
                  eine Einrichtung des städtischen Jugendamtes und kümmert sich
                  um Kinder, Jugendliche und junge Volljährige, die
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
                  familiärer und anderer Probleme Hilfe benötigen. Bis zu
                  zwanzig Mädchen und Jungen werden
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
                  dem kommenden Jahr die Welt des Theaters kennenlernen.
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
                  Ende des Projekts werden die Nachwuchsschauspieler bei einem
                  Theaterfestival auftreten, was sicher ein Höhepunkt für alle
                  Teilnehmer sein wird. Geleitet wird die Gruppe vom
                  Schauspieler Wolfgang Neuhausen. Er arbeitet mit dem
                  Jugendzentrum zusammen und wird von zwei Theaterpädagogen
                  unterstützt. Allen Mitarbeitern ist
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
                  wichtig, dass die Kinder auf der Bühne Anerkennung für ihre
                  Leistung bekommen. Ohne die finanzielle Unterstützung wäre das
                  Vorhaben unmöglich,
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
                  bei der Stadt keine Gelder vorhanden waren. Dieses
                  Theaterprojekt ist nicht das erste, das gefördert wird. Im
                  vergangenen Jahr erhielt das Theaterprojekt “Schiller - das
                  wilde, freie Leben“ finanzielle Unterstützung. Allerdings ist
                  nicht nur Geld wichtig: Der Verein kümmert sich auch
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
                  , die Projekte bekannt zu machen. In verschiedenen
                  Theaterhäusern der Stadt werden Plakate aufgehängt, mit denen
                  der Verein für das Jugendtheater wirbt. Man hofft,
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
                  diese Weise noch mehr Unterstützer zu finden. Auch unsere
                  Leser können die Jugendlichen unterstützen: Aktuell sammelt
                  das Jugendzentrum Spenden,
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
                  weitere Projekte finanzieren zu können. Außerdem werden für
                  die Theaterproben und die Aufführungen noch ehrenamtliche
                  Helfer gesucht.
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
