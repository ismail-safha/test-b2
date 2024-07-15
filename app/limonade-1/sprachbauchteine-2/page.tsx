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
    { id: 1, number: "A", text: "ANS" },
    { id: 2, number: "B", text: "ALS" },
    { id: 3, number: "C", text: "DA" },
    { id: 4, number: "D", text: "DARÜBER" },
    { id: 5, number: "E", text: "DARUM" },
    { id: 6, number: "F", text: "DAS" },
    { id: 7, number: "G", text: "DASS" },
    { id: 8, number: "H", text: "DÜRFEN" },
    { id: 9, number: "I", text: "INS" },
    { id: 10, number: "J", text: "MÜSSEN" },
    { id: 11, number: "K", text: "NUR" },
    { id: 12, number: "L", text: "SOLLEN" },
    { id: 13, number: "M", text: "SONDERN" },
    { id: 14, number: "N", text: "SOWIE" },
    { id: 15, number: "O", text: "WEDER" },
  ],
};

const initialCartItems: Text[] = [
  { title: "input1", text: "", anserText: "DARÜBER" }, // D
  { title: "input2", text: "", anserText: "NUR" }, // K
  { title: "input3", text: "", anserText: "ANS" }, // A
  { title: "input4", text: "", anserText: "WEDER" }, // O
  { title: "input5", text: "", anserText: "MÜSSEN" }, // J
  { title: "input6", text: "", anserText: "DA" }, // C
  { title: "input7", text: "", anserText: "DAS" }, // F
  { title: "input8", text: "", anserText: "SOLLEN" }, // L
  { title: "input9", text: "", anserText: "DÜRFEN" }, // H
  { title: "input10", text: "", anserText: "DASS" }, // G
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
          pageHome="/limonade-1"
          pageTow="/limonade-1/lesenteil-2"
          pageThree="/limonade-1/lesenteil-3"
          pageFour="/limonade-1/sprachbauchteine-1"
          pageFive="/limonade-1/sprachbauchteine-2"
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
                  Maßgeschneidert nach Bodyscanning
                </h1>
                <p>
                  Haben Sie sich schon einmal
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
                  geärgert, dass Sie zwar in vielen Geschäften viele schöne
                  Kleidungsstücke sehen konnten, Ihnen aber dann bei der Anprobe
                  keines gepasst hat? Dann geht es Ihnen wie zurzeit der
                  Mehrheit der deutschen Bevölkerung: Die Kleidungsstücke, die
                  in den Modehäusern angeboten werden, gibt es fast
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
                  noch in den falschen Größen. Eine Untersuchung des
                  Textilforschungszentrums Hohenstein brachte nun
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
                  Licht, dass die Modeproduzenten den Grund dafür, dass viele
                  Konfektionsgrößen offenbar
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
                  den Kundinnen noch den Kunden passen, in der körperlichen
                  Entwicklung der Bevölkerung in Deutschland suchen
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
                  . Seit den 1960er Jahren seien die Deutschen im Durchschnitt
                  um bis zu acht Zentimeter sowohl größer als auch dicker
                  geworden. Die Länge der Arme habe zugenommen, besonders aber
                  an den Hüften hätten die Deutschen beträchtlich zugelegt.
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
                  der Handel natürlich daran interessiert ist, die
                  Kleidungsstücke in den richtigen Größen in ausreichender Zahl
                  zu produzieren, wurde jetzt ein neues Projekt geplant,
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
                  Aufschluss darüber geben soll, welche Größen die Kunden
                  eigentlich brauchen. Die neue Body-Scan-Technologie soll
                  Männer und Frauen neu vermessen. Mehrere Kameras tasten mit
                  Laserlicht die menschlichen Körper ab und erstellen ein
                  dreidimensionales Ebenbild der gescannten Person. Diese
                  dreidimensionalen Bilder
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
                  es ermöglichen, in Zukunft genauere Informationen über die
                  durchschnittliche Körpergröße zu erhalten. Ähnliche Messungen
                  werden auch in Großbritannien, den Niederlanden, den
                  skandinavischen Ländern, Frankreich und den USA vorgenommen.
                  Mehr als zwei Millionen Euro wollen die Modefirmen dafür
                  investieren, das Ergebnis lohnt sich aber für sie auf jeden
                  Fall. Als Kundinnen und Kunden
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
                  wir uns außerdem darauf freuen,
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
                  sich als Nebenprodukt der Körpervermessung in den
                  verschiedenen Ländern die Modefirmen vielleicht endlich dafür
                  entscheiden, weltweit gleiche Nummern für gleiche Größen
                  einzuführen. Dann ist ein Kleidungsstück mit der Nummer 26
                  überall gleich groß, ob in Nord- oder Südeuropa, in Amerika
                  oder Asien.
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
