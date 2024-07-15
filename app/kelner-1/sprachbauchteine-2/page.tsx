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
    { id: 1, number: "A", text: "ANHAND" },
    { id: 2, number: "B", text: "ANSTRENGEND" },
    { id: 3, number: "C", text: "AUF" },
    { id: 4, number: "D", text: "AUS" },
    { id: 5, number: "E", text: "EHER" },
    { id: 6, number: "F", text: "FAST" },
    { id: 7, number: "G", text: "FOLGLICH" },
    { id: 8, number: "H", text: "IN" },
    { id: 9, number: "I", text: "KAUM" },
    { id: 10, number: "J", text: "LANGWEILIG" },
    { id: 11, number: "K", text: "SOWIE" },
    { id: 12, number: "L", text: "VON" },
    { id: 13, number: "M", text: "WEGEN" },
    { id: 14, number: "N", text: "WOHL" },
    { id: 15, number: "O", text: "ZU" },
  ],
};

const initialCartItems: Text[] = [
  { title: "input1", text: "", anserText: "ANHAND" },
  { title: "input2", text: "", anserText: "VON" },
  { title: "input3", text: "", anserText: "SOWIE" },
  { title: "input4", text: "", anserText: "AUS" },
  { title: "input5", text: "", anserText: "AUF" },
  { title: "input6", text: "", anserText: "ANSTRENGEND" },
  { title: "input7", text: "", anserText: "FOLGLICH" },
  { title: "input8", text: "", anserText: "EHER" },
  { title: "input9", text: "", anserText: "ZU" },
  { title: "input10", text: "", anserText: "WOHL" },
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
          pageHome="/kelner-1"
          pageTow="/kelner-1/lesenteil-2"
          pageThree="/kelner-1/lesenteil-3"
          pageFour="/kelner-1/sprachbauchteine-1"
          pageFive="/kelner-1/sprachbauchteine-2"
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
              <p className="bg-[#f6f2bc] text-black rounded-lg p-2 m-1">
                👉 changes : in 31 und 32-33-34-35-36-40 Komm zurück PDF
              </p>
              <div className="mt-[30px] dark:bg-[#1d2a35] dark:text-[#ededed] bg-[#fbfbfb] rounded-lg lg:overflow-y-scroll h-fit  lg:h-[500px] p-4">
                <h1 className="text-xl font-bold">
                  Liebesgrüße aus der Kühltruhe
                </h1>
                <p>
                  Wer sich einen Mann angeln will, sollte einen Blick in dessen
                  Tiefkühlfach werfen. Einer Studie zufolge kann man{" "}
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
                  des Inhalts des Tiefkühlfachs den Charakter seines Besitzers
                  erkennen. Die Meinungsforscher unterscheiden fünf Kategorien{" "}
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
                  Single-Männern: den spontanen Typ, den Bequemen, den
                  Kreativen,{" "}
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
                  den Cocktail- und den Gourmet-Typen. Am häufigsten gibt es in
                  Deutschland den spontanen Typ. Er hat neben kompletten
                  Gerichten auch tiefgekühlte Produkte wie Brokkoligemüse oder
                  Putenfilet in der Truhe,{" "}
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
                  denen er eine Mahlzeit zusammenstellen kann. Dieser Typ liebt
                  die Abwechslung auf dem Teller und auch sonst im Leben. Da
                  wird es vermutlich auch in der Liebe nicht langweilig.
                  Hauptgewinn für jede Frau ist aber der Gourmet-Typ. In seinem
                  Tiefkühlfach liegen Produkte wie Garnelen, Muscheln oder Ente.
                  Dieser Typ liebt es, Frauen zu verwöhnen. Der Nachteil liegt{" "}
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
                  der Hand: Dieser Typ Single-Mann ist selten. Was man in der
                  Teifkühltruhe von bequemen Single-Männern findet, kann man
                  leicht erraten, denn diese Männer haben gar keine Lust zu
                  kochen. Ihnen ist es sogar zu{" "}
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
                  zwei Tüten zu öffnen statt nur einer.{" "}
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
                  kaufen diese Männer am häufigsten komplette Gerichte, die sie
                  nur noch in die Mikrowelle oder den Backofen stellen müssen.
                  Aber ob sie so das Herz einer Frau erobern können? Zumindest
                  Frauen sehen das wohl{" "}
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
                  skeptisch. Doch egal,{" "}
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
                  welcher Kategorie ein Mann gehört - eines haben alle
                  gemeinsam: Sie kaufen immer mehr Tiefkühlkost. Warum das so
                  ist, kann die Studie nicht beantworten - da kann man nur
                  raten: Einige haben vermutlich wenig Zeit zum Kochen, andere{" "}
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
                  eher keine Lust. Dabei wäre das doch der beste Weg, um eine
                  Frau zu erobern.
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
