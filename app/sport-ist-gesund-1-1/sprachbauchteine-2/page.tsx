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
    { id: 1, number: "A", text: "ALLEIN" },
    { id: 2, number: "B", text: "AN" },
    { id: 3, number: "C", text: "AUF" },
    { id: 4, number: "D", text: "AUFGRUND" },
    { id: 5, number: "E", text: "DARAUF" },
    { id: 6, number: "F", text: "DURCH" },
    { id: 7, number: "G", text: "DÜRFTEN" },
    { id: 8, number: "H", text: "EINZIGE" },
    { id: 9, number: "I", text: "KNAPP" },
    { id: 10, number: "J", text: "KURZ" },
    { id: 11, number: "K", text: "MÖCHTEN" },
    { id: 12, number: "L", text: "REGE" },
    { id: 13, number: "M", text: "STATTDESSEN" },
    { id: 14, number: "N", text: "WÄHREND" },
    { id: 15, number: "O", text: "WEGEN" },
  ],
};

const initialCartItems: Text[] = [
  { title: "input1", text: "", anserText: "REGE" }, // L
  { title: "input2", text: "", anserText: "AN" }, // B
  { title: "input3", text: "", anserText: "ALLEIN" }, // A
  { title: "input4", text: "", anserText: "DARAUF" }, // E
  { title: "input5", text: "", anserText: "DÜRFTEN" }, // G
  { title: "input6", text: "", anserText: "AUF" }, // C
  { title: "input7", text: "", anserText: "STATTDESSEN" }, // M
  { title: "input8", text: "", anserText: "KURZ" }, // J
  { title: "input9", text: "", anserText: "AUFGRUND" }, // D
  { title: "input10", text: "", anserText: "DURCH" }, // F
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
          pageHome="/sport-ist-gesund-1-1"
          pageTow="/sport-ist-gesund-1-1/lesenteil-2"
          pageThree="/sport-ist-gesund-1-1/lesenteil-3"
          pageFour="/sport-ist-gesund-1-1/sprachbauchteine-1"
          pageFive="/sport-ist-gesund-1-1/sprachbauchteine-2"
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
                <h1 className="text-xl font-bold">Senioren</h1>
                <p>
                  Senioren sind heute hochst
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
                  , aktiv und nutzen vielfach die Chance, sich der so genannten
                  dritten Lebensphase Wünsche oder Träume zu erfüllen. Dazu
                  gehören oft Weiterbildung oder in der Jugend verpasste
                  Bildung. Die Folge: Das Seniorenstudium, wie es
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
                  verschiedenen deutschen Universitäten angeboten wird, erfreut
                  sich zunehmender Beliebtheit.
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
                  in Trier waren im vergangenen Sommersemester über 130 Personen
                  der Altersgruppe 50+ als Gasthörer eingeschrieben und nahmen
                  am regulären Lehrbetrieb teil. Besonders gefragt waren
                  allgemeinbildende Veranstaltungen aus den Fächer Geschichte,
                  Kunstgeschichte und Politik.
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
                  folgten die neueren Sprach- und Literaturwissenschaften sowie
                  Themen aus Philosophie, Psychologie und Pädagogik. Angebote
                  aus den Sozial-, Wirtschafts-, Geo- und Rechtswissenschaften
                  wurden dagegen weniger häufig gewählt. Hier finde ich
                  insbesondere solche Seniorenstudierende wieder, die gezielt an
                  der Vertiefung ihres fachspezifischen Wissens arbeiten. Der
                  größte Teil der studierenden Senioren besteht übrigens aus
                  Frauen. Die Gründe dafür
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
                  sein, dass Frauen in ihren jüngeren Lebensjahren häufig
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
                  einen berufliche Karriere verzichteten.
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
                  setzten sie sich für die Familie und insbesondere für ihre
                  Kinder ein. Nun sind die Kinder erwachsen und aus dem Haus,
                  die Frauen verspüren den Wunsch, ihre geistigen Fähigkeiten,
                  deren Einsatz in den Familienjahren häufig zu
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
                  gekommen war, wieder zu trainieren und zu erweitern. Männern
                  hingegen konnten häufiger während ihres Arbeitslebens ihre
                  Karriere verwirklichen, sich weiterbilden ihr Wissen in
                  gesellschaftlich angesehen Weise an den Mann (weniger an die
                  Frau) bringen.
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
                  dessen sehen sie keine Veranlassung ihren Lebensabend an einer
                  Weiterbildungsinstition oder gar an einer Universität zu
                  verbringen. Lernen ist kein Privileg der Jugend! Vielmehr
                  besteht gerade in Bezug auf das Bildungsangebot für ältere
                  Menschen ein nesiger Bedarf. Er wird gespeist
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
                  die Vitalität und die hohe Bildungsmotivation der heutigen
                  Alten. Mit der wachsenden Fitness der Generation 50+ wächst
                  auch das Interesse, neues Wissen zu erwerben, neue Kompetenzen
                  zu entwickeln und bisher eventuell vernachlässigte Ressourcen
                  zu aktivieren, Gleichzeitig tragen Bildungsaktivitäten
                  wesentlich dazu bei, dass immer mehr Menschen ihre kognitive
                  Leistungsfähigkeit und psychische Gesundheit bis ins hohe
                  Alter erhalten können.
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
