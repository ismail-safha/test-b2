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
    { id: 1, number: "A", text: "BEGRIFFE" },
    { id: 2, number: "B", text: "DADURCH" },
    { id: 3, number: "C", text: "DAFÜR" },
    { id: 4, number: "D", text: "DASS" },
    { id: 5, number: "E", text: "DENN" },
    { id: 6, number: "F", text: "EINGRIFFE" },
    { id: 7, number: "G", text: "GING" },
    { id: 8, number: "H", text: "KAM" },
    { id: 9, number: "I", text: "NACHKOMMEN" },
    { id: 10, number: "J", text: "NOCH" },
    { id: 11, number: "K", text: "SODASS" },
    { id: 12, number: "L", text: "SOWIE" },
    { id: 13, number: "M", text: "UM" },
    { id: 14, number: "N", text: "VORKOMMEN" },
    { id: 15, number: "O", text: "WHREND" },
  ],
};

const initialCartItems: Text[] = [
  { title: "input1", text: "", anserText: "WHREND" },
  { title: "input2", text: "", anserText: "DADURCH" },
  { title: "input3", text: "", anserText: "DASS" },
  { title: "input4", text: "", anserText: "UM" },
  { title: "input5", text: "", anserText: "NACHKOMMEN" },
  { title: "input6", text: "", anserText: "DAFÜR" },
  { title: "input7", text: "", anserText: "DENN" },
  { title: "input8", text: "", anserText: "EINGRIFF" },
  { title: "input9", text: "", anserText: "NOCH" },
  { title: "input10", text: "", anserText: "GING" },
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
          pageHome="/osterreichs"
          pageTow="/osterreichs/lesenteil-2"
          pageThree="/osterreichs/lesenteil-3"
          pageFour="/osterreichs/sprachbauchteine-1"
          pageFive="/osterreichs/sprachbauchteine-2"
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
                  Das Schicksal des Braunbärnen
                </h1>

                <p>
                  Klimatische Veränderungen seit der letzten Kaltzeit könnten
                  für den stetigen Rückgang der Braunbären zahl in Europa
                  verantwortlich sein. wie eine aktuelle Studie nahelegt, haben
                  vor allem steigende Wintertemperaturen
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
                  der vergangen 12000 jahre die Fortpflanzungsrate der Tiere
                  verringert, was entscheidend zu deren Verschwinden beigetragen
                  hat. Zudem wurden durch die Klimaveränderung größere Flächen
                  für den Ackerbau nutzbar.
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
                  wurde der Lebensraum der Tiere verkleinert. Es ist längst
                  unumstriten,
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
                  das Verschwinden der der Braunbären mit der Landnutzung durch
                  den Menschen zuzammenhängt. def Ein internationales Experten
                  Team untersuchte nun die Rolle des Klimas beim Rückgang der
                  Bären zahl. In den letzten 12000 jahren ist Winter Temperatur
                  in weiten Teilen Europas
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
                  zwei bis vier Grad angestiegen. In der Folge bekamen die
                  Braunbären weniger
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
                  , und ihre Zahl schrumpfte. Der Grund
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
                  ist, dass Braunbären bei steigenden Wintertemperaturen in mehr
                  Energie für ihre Winterruhe verbrauchen. Braunbärenweibchen
                  benötigen ihre Enrergie reserven auch für die Fortpflanzung,
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
                  sie bringen im Winter ihre ungen zur Welt. Wird mehr Energie
                  für die Winterruhe verbraucht. bleibt nicht so viel für die
                  Fortpflanzung übrig, und gibt es weniger Nachwuchs. steigende
                  Wintertemperaturen könnten auch in direkt für das Schicksal
                  des Braunbären wortlich gewesen sein. Wärmer Winter
                  begünstigten nämlich auch die menschlicher
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
                  in die Naturlandschaften und damit in den Lebensraum der
                  Braunbären. Am Ende der letzten Eiszeit war der Braunbar
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
                  überall in Europa heimlich großes Aussterben gab es in
                  Südwesteuropa vor 7000 bis 5000 jahren. Richtig begrab-
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
                  es mit dem Braunbären aber vor etwa 2000 jahre, als sich
                  verringerte
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
