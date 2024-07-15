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
    { id: 2, number: "B", text: "AUF" },
    { id: 3, number: "C", text: "AUS" },
    { id: 4, number: "D", text: "AUßERDEM" },
    { id: 5, number: "E", text: "DASS" },
    { id: 6, number: "F", text: "ENTHALTEN" },
    { id: 7, number: "G", text: "ENTLASTET" },
    { id: 8, number: "H", text: "FÜR" },
    { id: 9, number: "I", text: "HINTER" },
    { id: 10, number: "J", text: "OB" },
    { id: 11, number: "K", text: "SOGAR" },
    { id: 12, number: "L", text: "SONDERN" },
    { id: 13, number: "M", text: "VERWENDET" },
    { id: 14, number: "N", text: "WENN" },
    { id: 15, number: "O", text: "WIRKLICH" },
  ],
};

const initialCartItems: Text[] = [
  { title: "input1", text: "", anserText: "OB" },
  { title: "input2", text: "", anserText: "AUßERDEM" },
  { title: "input3", text: "", anserText: "ENTHALTEN" },
  { title: "input4", text: "", anserText: "HINTER" },
  { title: "input5", text: "", anserText: "ENTLASTET" },
  { title: "input6", text: "", anserText: "AUS" },
  { title: "input7", text: "", anserText: "AUF" },
  { title: "input8", text: "", anserText: "VERWENDET" },
  { title: "input9", text: "", anserText: "WIRKLICH" },
  { title: "input10", text: "", anserText: "DASS" },
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
          pageHome="/lesen"
          pageTow="/lesen/lesenteil-2"
          pageThree="/lesen/lesenteil-3"
          pageFour="/lesen/sprachbauchteine-1"
          pageFive="/lesen/sprachbauchteine-2"
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
                <h1 className="text-xl font-bold">Was steckt hinter “Bio”?</h1>
                <p>
                  Überall gibt es inzwischen Bio-Lebensmittel - aber häufig
                  fehlen den Käufern Hintergrundinformationen. Viele Verbraucher
                  fragen sich beispielsweise,{" "}
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
                  Bio-Produkte nun auch wirklich die gesünderen sind. Skepsis
                  macht sich breit, spätestens wenn wieder einmal ein Skandal in
                  den Nachrichten ist.{" "}
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
                  sind Bio-Produkte teurer - und den Aufpreis will man nur
                  zahlen, wenn man sicher ist, dass die Bio-Lebensmittel die
                  bessere Wahl sind. Der Informationsdienst der
                  Bundesministeriums für Ernährung, Landwirtschaft und
                  Verbraucherschutz gibt darüber eine eindeutige Auskunft:
                  Bio-Lebensmittel sind gesünder. Sie{" "}
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
                  weniger Nitrat, mehr Nährstoffe und sind besser geeignet, wenn
                  man Allergien hat. Doch Bio-Lebensmittel sind nicht nur gut
                  für die Gesundheit. Bei vielen Verbrauchern steht{" "}
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
                  ihrem Einkaufsverhalten ein ökologisches Bewusstsein. Bio-
                  Verbraucher machen sich Gedanken über die Herkunft der
                  Lebensmittel, denn auch die umweltfreundliche Landwirtschaft
                  ist besser für Tiere und Pflanzen, kurz: Sie{" "}
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
                  unsere Umwelt. Und viele Bio-Verbraucher wollen als gesunde
                  Menschen in einer gesunden Umwelt leben und auch der nächsten
                  Generation eine gesunde Umwelt hinterlassen. Bio-Lebensmittel
                  kommen{" "}
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
                  ökologischer Landwirtschaft, die im Einklang mit der Natur
                  steht. Die Mindestrichtlinien der Bio-Landwirtschaft
                  beinhalten eine artgerechte Tierhaltung: Alle Tiere müssen
                  ausreichend Platz haben, es gibt keine langen Tiertransporte,
                  keine Gentechnik. Die Produkte werden möglichst in der näheren
                  Umgebung verkauft, beispielsweise{" "}
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
                  Wochenmärkten oder in Bio-Supermärkten. Außerdem dürfen weder
                  Kunstdünger noch chemische Schädlingsbekämpfungsmittel{" "}
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
                  werden. Wenn die Bio-Lebensmittel weiterverarbeitet werden -
                  beispielsweise aus Bio-Eiern, Bio-Mehl und Bio-Zucker ein
                  Bio-Kuchen gebacken wird -, dürfen{" "}
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
                  nur Bio-Lebensmittel benutzt werden. Für Bio-Produkte gibt es
                  übrigens auch ein Zertifikat, das Bio-Siegel. Diese
                  Richtlinien garantieren,{" "}
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
                  dass die Produkte wirklich “bio” sind.
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

// https://chatgpt.com/c/37cdd3e5-d575-4546-88ef-3e879a0772b9
