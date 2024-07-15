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
    { id: 1, number: "A", text: "erheblich" },
    { id: 2, number: "B", text: "schnell" },
    { id: 3, number: "C", text: "immer" },
    { id: 4, number: "D", text: "wird" },
    { id: 5, number: "E", text: "dass" },
    { id: 6, number: "F", text: "einem" },
    { id: 7, number: "G", text: "aller" },
    { id: 8, number: "H", text: "sollte" },
    { id: 9, number: "I", text: "ist" },
    { id: 10, number: "J", text: "sind" },
    { id: 11, number: "K", text: "bequem" },
    { id: 12, number: "L", text: "unter" },
    { id: 13, number: "M", text: "bei" },
    { id: 14, number: "N", text: "dabei" },
    { id: 15, number: "O", text: "wie" },
  ],
};

const initialCartItems: Text[] = [
  { title: "input1", text: "", anserText: "bequem" },
  { title: "input2", text: "", anserText: "sind" },
  { title: "input3", text: "", anserText: "dabei" },
  { title: "input4", text: "", anserText: "ist" },
  { title: "input5", text: "", anserText: "sollte" },
  { title: "input6", text: "", anserText: "dass" },
  { title: "input7", text: "", anserText: "aller" },
  { title: "input8", text: "", anserText: "einem" },
  { title: "input9", text: "", anserText: "bei" },
  { title: "input10", text: "", anserText: "wie" },
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
          pageHome="/kinderhandys"
          pageTow="/kinderhandys/lesenteil-2"
          pageThree="/kinderhandys/lesenteil-3"
          pageFour="/kinderhandys/sprachbauchteine-1"
          pageFive="/kinderhandys/sprachbauchteine-2"
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
                  Joggen: Mehr als nur Laufen
                </h1>
                <p>
                  Auto, Rolltreppe, Fahrstuhl - das moderne Leben ist
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
                  geworden. Ein Großteil der Bevölkerung verbringt den Tag
                  sitzend. Zum Leidwesen unseres Körpers, denn das geht zu
                  Lasten der Gesundheit. Herz-Kreislauf-Erkrankungen
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
                  in den westlichen Industrieländern mittlerweile die
                  Todesursache Nummer Eins. Dennoch: Rund zehn Millionen
                  Menschen in Deutschland joggen, etwa acht Millionen gehen
                  Inline-Skaten oder Rad fahren, jeder Dritte schwimmt. Wer
                  regelmäßig, richtig und vor allem in Maßen trainiert, fördert
                  Gesundheit, Körper- und Selbstbewusstsein. Zahlreiche
                  Sportarten bieten einen einfachen und abwechslungsreichen
                  Einstieg auch für Ungeübte. Vom Klassiker Jogging bis hin zu
                  Walking, Radfahren, Schwimmen, Aerobic, Inline-Skating und
                  Langlauf im Winter. Wichtig ist
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
                  richtig zu trainieren, den Körper nicht zu überfordern - vor
                  allem nach einer längeren Sportpause: Empfehlenswert ist
                  aerobes Herz-Kreislauf-Training. Das bedeutet Ausdauertraining
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
                  Verbrennung von Sauerstoff. Dreimal in der Woche 30 bis 40
                  Minuten genügen. Dabei
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
                  der Puls kontrolliert werden. Der Richtwert ist hier 180 minus
                  Lebensalter. Dann wird auch Fett verbrannt, der Körper nicht
                  überfordert.
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
                  mehr Menschen den Schritt in ein aktiveres Leben wagen
                  sollten, machen zahlreiche Studien deutlich: Rund 40 Prozent
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
                  Deutschen bringen zu viel auf die Waage, jeder zehnte ist
                  sogar stark fettleibig - Tendenz steigend. Auch vor Kindern
                  und Jugendlichen macht diese Entwicklung nicht halt. Oft fehlt
                  die Zeit für regelmäßiges Essen, Sport und Entspannung. Der
                  Körper quittiert dies meist mit Herz-Kreislauf-Erkrankungen,
                  nicht selten mit
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
                  Herzinfarkt - auch, und immer häufiger
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
                  Frauen. Ausdauersport hingegen wirkt auf Herz, Gefäße,
                  Muskeln, Körpergewicht, Hormone und Stimmungen. Stress wird
                  wegtrainiert, Krankheiten geheilt und vorgebeugt. Zusammen mit
                  der richtigen Ernährung minimiert sich das Risiko, einen
                  Herzinfarkt oder Schlaganfall zu erleiden,
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
                  Milch und Milchprodukte, pflanzliche Lebensmittel wie
                  Vollkornprodukte, Obst, Gemüse, Salat, magere Wurst und
                  Käsesorten unterstützen das richtige Training.
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
