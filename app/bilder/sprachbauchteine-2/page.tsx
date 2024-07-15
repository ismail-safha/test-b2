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
    { id: 1, number: "A", text: "ABER" },
    { id: 2, number: "B", text: "ANSTATT" },
    { id: 3, number: "C", text: "BESONDERS" },
    { id: 4, number: "D", text: "FÜR" },
    { id: 5, number: "E", text: "KAUM" },
    { id: 6, number: "F", text: "MIT" },
    { id: 7, number: "G", text: "MÜSSTE" },
    { id: 8, number: "H", text: "OHNE" },
    { id: 9, number: "I", text: "SCHON" },
    { id: 10, number: "J", text: "SO" },
    { id: 11, number: "K", text: "SOGAR" },
    { id: 12, number: "L", text: "SOLLTE" },
    { id: 13, number: "M", text: "SONDERN" },
    { id: 14, number: "N", text: "UM" },
    { id: 15, number: "O", text: "VON" },
  ],
};

const initialCartItems: Text[] = [
  { title: "input1", text: "", anserText: "SOGAR" },
  { title: "input2", text: "", anserText: "MIT" },
  { title: "input3", text: "", anserText: "SONDERN" },
  { title: "input4", text: "", anserText: "OHNE" },
  { title: "input5", text: "", anserText: "ANSTATT" },
  { title: "input6", text: "", anserText: "BESONDERS" },
  { title: "input7", text: "", anserText: "ABER" },
  { title: "input8", text: "", anserText: "SOLLTE" },
  { title: "input9", text: "", anserText: "UM" },
  { title: "input10", text: "", anserText: "SCHON" },
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
          pageHome="/bilder"
          pageTow="/bilder/lesenteil-2"
          pageThree="/bilder/lesenteil-3"
          pageFour="/bilder/sprachbauchteine-1"
          pageFive="/bilder/sprachbauchteine-2"
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
                  Online-Sprachkurse & Co. - Wie lernt man heute am besten eine
                  Sprache?{" "}
                </h1>
                <p>
                  Es gibt inzwischen zahlreiche 31 Online-Sprachkurse und
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
                  mit Smartphones kann ma Sprachen lernen. Eine weitere
                  Lernmöglichkeit ist zum Beispiel eine Tandem-Partnerschaft
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
                  einem Muttersprachler. Welche Vorteile und Nachteile haben die
                  unterschiedlichem Methoden? Es gibt inzwischen zahlreiche
                  Online-Lernportale, die leicht zu überblicken und zu bedienen
                  sind. Der Vorteil: Man kann die Wörter nicht nur lesen,
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
                  gleichzeitig auch hören. Außerdem kann man Wörter
                  nachsprechen,
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
                  dass ein ganzer Kurs zuhört. Auch Lerntipps bekommt34 man bei
                  Online-Portalen, bespielsweise diesen: Vokabeln sollte man
                  lieber mehrmals täglich in Fünf-Minuten-Blöcken wiederholen,
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
                  sie in einer Stunde alle auf einmal zu lernen. Wer auch
                  unterwegs 3 5 lernen möchte, kann es mit einer Smartphone-App
                  versuchen, einem kleinen Programm, das auf dem Handy läuft.
                  Viele Programme gibt es kostenlos, andere kosten zwischen
                  einem und mehreren Euro. Die kleinen Helfer sind
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
                  gut zum Vokabellernen geeignet36 - mehr aber meist nicht. Das
                  spielerische Vokabeltraining macht zwar Spaß,
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
                  Satzbau oder andere Grammatikthemen werden allenfalls kurz
                  angesprochen. Ein richtiges Gespräch kann man mit dieser
                  Methode erst recht nicht üben. Dafür
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
                  man besser in einen Kurs gehen oder einen Tandem-Partner
                  suchen. Ein Tandem-Partner ist ein Muttersprachler, der die
                  Grammatik erklärt, die Aussprache verbessert und seinerseits
                  die Muttersprache des anderen lernen möchte. Der schnellste
                  Weg,
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
                  einen passenden Tandem-Partner zu finden, ist die
                  Online-Suche: Muttersprache, Zielsprache und Wohnort eingeben,
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
                  werden alle Treffer angezeigt. Man trifft sich beispielsweise
                  in einem Restaurant, schickt sich Nachrichten oder E-Mails und
                  erklärt sich gegenseitig die eigene Sprache.
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
