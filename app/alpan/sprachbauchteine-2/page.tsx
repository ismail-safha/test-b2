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
    { id: 1, number: "A", text: "ALLES" },
    { id: 2, number: "B", text: "ANSTATT" },
    { id: 3, number: "C", text: "AUSGEHEN" },
    { id: 4, number: "D", text: "BEKOMMEN" },
    { id: 5, number: "E", text: "BILDEN" },
    { id: 6, number: "F", text: "DAGEGEN" },
    { id: 7, number: "G", text: "DAVON" },
    { id: 8, number: "H", text: "GEGEN" },
    { id: 9, number: "I", text: "HÖCHSTENS" },
    { id: 10, number: "J", text: "JEDE" },
    { id: 11, number: "K", text: "MEISTENS" },
    { id: 12, number: "L", text: "SOLCHE" },
    { id: 13, number: "M", text: "UM" },
    { id: 14, number: "N", text: "WILL" },
    { id: 15, number: "O", text: "WUNSCHT" },
  ],
};

const initialCartItems: Text[] = [
  { title: "input1", text: "", anserText: "ANSTATT" }, // B
  { title: "input2", text: "", anserText: "JEDE" }, // J
  { title: "input3", text: "", anserText: "GEGEN" }, // H
  { title: "input4", text: "", anserText: "DAVON" }, // G
  { title: "input5", text: "", anserText: "WILL" }, // N
  { title: "input6", text: "", anserText: "BILDEN" }, // E
  { title: "input7", text: "", anserText: "AUSGEHEN" }, // C
  { title: "input8", text: "", anserText: "SOLCHE" }, // L
  { title: "input9", text: "", anserText: "BEKOMMEN" }, // D
  { title: "input10", text: "", anserText: "MEISTENS" }, // K
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
          pageHome="/batata"
          pageTow="/batata/lesenteil-2"
          pageThree="/batata/lesenteil-3"
          pageFour="/batata/sprachbauchteine-1"
          pageFive="/batata/sprachbauchteine-2"
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
                  Schwarzarbeit kann teuer werden
                </h1>
                <p>
                  Schnäppchen machen, um Rabatte feilschen: Wer billig einkauft,
                  gilt als clever. Vorsicht ist jedoch bei Aufträgen an
                  Schwarzarbeiter geboten. Denn schnell zahlt der Kunde drauf,{" "}
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
                  – wie durch das illegale Arbeitsverhältnis erhofft – Geld zu
                  sparen. Rund ums Haus ist nicht{" "}
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
                  Gelegenheit so günstig, wie sie anfangs scheint: Schwarzarbeit
                  etwa ist nicht nur verboten, sondern es gibt auch ein
                  finanzielles Argument{" "}
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
                  illegale Arbeiter: Oftmals rechnet sich der Dienst gegen
                  Barzahlung gar nicht. "Abgesehen{" "}
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
                  , dass es strafbar ist, Schwarzarbeiter zu beschäftigen, nimmt
                  der Auftraggeber handfeste steuerliche Nachteile in Kauf",
                  warnt Dirk Witte, Steuerberater aus Wildeshausen in
                  Niedersachsen. Wer eine Putzhilfe beschäftigt, kann die
                  Steuerlast auch auf legalem Weg spürbar senken. Auch für die
                  Modernisierung, Renovierung und Sanierung der Wohnung gibt es
                  einen Steuernachlass, allerdings nur für legale Arbeiten. "Das
                  Finanzamt{" "}
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
                  eine ordentliche Rechnung und einen Überweisungsbeleg sehen".
                  Barzahler können daher nichts von der Steuer absetzen. Noch
                  schwerer fällt ins Gewicht, dass ein Kunde seine
                  Haftungsansprüche aufs Spiel setzt, wenn er vordergründig ein
                  paar Euro sparen möchte. Denn mängelfreie Bauten{" "}
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
                  eher die Ausnahme. Und ob ein Kunde die Beseitigung von
                  Mängeln gerichtlich gegen einen Schwarzarbeiter durchsetzen
                  kann, ist von Fall zu Fall zu prüfen. Im Prinzip muss man aber
                  damit rechnen, die Ansprüche zu verlieren. Ebenso dürften
                  Verbraucher leer{" "}
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
                  , wenn beim Bauen etwas zu Bruch geht. Ein ordentlicher
                  Handwerker hat für{" "}
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
                  Fälle eine Haftpflichtversicherung. Richtig teuer werden
                  können auch Unfälle, bei denen sich der illegale Helfer
                  verletzt. Dann zahlen weder Krankenversicherung noch
                  Unfallkasse. Fällt etwa ein Arbeiter vom Gerüst und ist danach
                  dauerhaft querschnittsgelähmt, dann wird der Kunde dafür sein
                  Leben lang zahlen. Die Folgen von Schwarzarbeit lassen sich
                  mit dem Dominoprinzip beschreiben: Fliegt die illegale
                  Beschäftigung auf, dann{" "}
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
                  es gleich mehrere Behörden mit. Post gibt es dann vom
                  Finanzamt, der Staatsanwaltschaft und den
                  Sozialversicherungsträgern. Dann braucht der Auftraggeber{" "}
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
                  einen Anwalt. Und der kostet natürlich auch wieder Geld.
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
