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
    { id: 1, number: "A", text: "DAFÜR" },
    { id: 2, number: "B", text: "DAHER" },
    { id: 3, number: "C", text: "DAMIT" },
    { id: 4, number: "D", text: "DARAN" },
    { id: 5, number: "E", text: "DASS" },
    { id: 6, number: "F", text: "DAVON" },
    { id: 7, number: "G", text: "DAZU" },
    { id: 8, number: "H", text: "DENN" },
    { id: 9, number: "I", text: "FÜR" },
    { id: 10, number: "J", text: "GEGEN" },
    { id: 11, number: "K", text: "IRGENDEIN" },
    { id: 12, number: "L", text: "WAS" },
    { id: 13, number: "M", text: "WEITER" },
    { id: 14, number: "N", text: "ZU" },
    { id: 15, number: "O", text: "ZWISCHEN" },
  ],
};

const initialCartItems: Text[] = [
  { title: "input1", text: "", anserText: "DENN" },
  { title: "input2", text: "", anserText: "FÜR" },
  { title: "input3", text: "", anserText: "ZWISCHEN" },
  { title: "input4", text: "", anserText: "IRGENDEIN" },
  { title: "input5", text: "", anserText: "DAFÜR" },
  { title: "input6", text: "", anserText: "DAVON" },
  { title: "input7", text: "", anserText: "WEITER" },
  { title: "input8", text: "", anserText: "DAZU" },
  { title: "input9", text: "", anserText: "DASS" },
  { title: "input10", text: "", anserText: "DARAN" },
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
                <h1 className="text-xl font-bold">
                  Man(n) kocht selbst Immer mehr deutsche Männer nehmen die
                  Töpfe selbst in die Hand
                </h1>
                <p>
                  Selbst ist der Mann. Von der Wahrheit dieser alten deutschen
                  Redewendung haben Frauen Generationen lang geträumt, wenn es
                  um typische Hausarbeiten wie Waschen, Putzen oder Kochen ging.
                  Zumindest bei Letzterem scheint sich jedoch in der letzten
                  Jahren vieles zu ändern.
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
                  immer mehr Männer in Deutschland greifen jetzt selbst zum
                  Kochtopf. Ein Grund
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
                  diese Entwicklung mag sein, dass es immer mehr
                  Ein-Personen-Haushalte in Deutschland gibt. Es ist einfach
                  niemand anderes da, der die Kocharbeit übernehmen könnte. Und
                  Hunger zwingt bekanntlich zum Handeln. Andererseits ist das
                  Kochen inzwischen ein allgemein akzeptiertes Hobby geworden,
                  besonders unter Männern. Doch welch ein Unterschied besteht
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
                  den Ansprüchen einer traditionellen Hausfrau und denen eines
                  Hobbykochs, was die Ausstattung der Küche angeht! Nicht
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
                  Topf darf es für den selbsternannten Drei-Sterne-Küchenchef
                  sein: Gebürsteter Edelstahl mit versiegelter
                  Antibehaftbeschichtung und integrierter digitaler
                  Temperaturanzeige ist der Mindeststandard für einen echten
                  kochenden Mann. Alles andere gilt als stillos. Die zweite
                  Voraussetzung
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
                  , dass die Gerichte auch gelingen, ist das Wissen, wie man
                  welche Speise am besten zubereitet. Zu diesem Zweck bieten die
                  Buchhandlungen Berge von Kochbüchern an - mit Rezepten von
                  Alaska bis Zimbabwe, mit oder ohne Fleisch, für zu Dicke und
                  zu Dünne. Jetzt hängt es nur noch
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
                  ab, was der Hobbykoch aus den Kochideen der Buchautoren macht.
                  Wird es ein exzellentes Mahl oder wäre unser “Chefkoch” nicht
                  doch lieber zum Dönerstand um die Ecke gegangen?
                  Überraschungen gehören zum Kochen dazu. Helfen die Bücher
                  nicht
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
                  , bieten zum Beispiel die Volkshochschulen zahlreiche
                  Kochkurse an, die in der Regel - zumeist von kochwilligen
                  Männern - gut besucht sind. Das Kursangebot umfasst neben
                  deutscher Hausmannskost wie Schnitzel, Krautwickel oder
                  Rinderbraten zumeist auch die mediterrane und die asiatische
                  Küche. Das führt
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
                  , dass man(n) zu Hause immer öfter international kocht. Das
                  größte Problem der Hobbyköche ist aber,
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
                  es viel zu aufwändig ist, für sich alleine zu kochen. Daher
                  sind zurzeit Internetseiten wie www.allein-kochen-ist-doof.de
                  beliebt, wo sich Hobbyköche und -köchinnen Kochpartner für das
                  gemeinsame Kochen und Essen suchen können. Das Interessante
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
                  ist, dass dabei unsere männlichen Chefköche feststellen
                  müssen, dass es andere Menschen gibt, die mit vielleicht
                  weniger Aufwand genauso gut ein Festmahl zubereiten können wie
                  sie: nämlich die Frauen.
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
