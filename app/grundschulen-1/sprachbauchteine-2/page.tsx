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
    { id: 1, number: "A", text: "AUF" },
    { id: 2, number: "B", text: "BEI" },
    { id: 3, number: "C", text: "DABEI" },
    { id: 4, number: "D", text: "DAFÜR" },
    { id: 5, number: "E", text: "DAS" },
    { id: 6, number: "F", text: "DASS" },
    { id: 7, number: "G", text: "DAVON" },
    { id: 8, number: "H", text: "DENNOCH" },
    { id: 9, number: "I", text: "DOCH" },
    { id: 10, number: "J", text: "JEDOCH" },
    { id: 11, number: "K", text: "MIT" },
    { id: 12, number: "L", text: "OBWOHL" },
    { id: 13, number: "M", text: "SONDERN" },
    { id: 14, number: "N", text: "VON" },
    { id: 15, number: "O", text: "WEIL" },
  ],
};

const initialCartItems: Text[] = [
  { title: "input1", text: "", anserText: "MIT" },
  { title: "input2", text: "", anserText: "BEI" },
  { title: "input3", text: "", anserText: "DAS" },
  { title: "input4", text: "", anserText: "DAFÜR" },
  { title: "input5", text: "", anserText: "SONDERN" },
  { title: "input6", text: "", anserText: "OBWOHL" },
  { title: "input7", text: "", anserText: "WEIL" },
  { title: "input8", text: "", anserText: "DASS" },
  { title: "input9", text: "", anserText: "AUF" },
  { title: "input10", text: "", anserText: "VON" },
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
          pageHome="/grundschulen-1"
          pageTow="/grundschulen-1/lesenteil-2"
          pageThree="/grundschulen-1/lesenteil-3"
          pageFour="/grundschulen-1/sprachbauchteine-1"
          pageFive="/grundschulen-1/sprachbauchteine-2"
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
                  Deutschland - ein Paradies für Kinder?
                </h1>
                <p>
                  17 Millionen Kinder leben in Deutschland. Verglichen{" "}
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
                  der Bevölkerungszahl von ungefähr 80 Millionen ist das fast
                  ein Viertel der Einwohner. Doch nur für jedes zehnte Kind
                  unter drei Jahren steht ein Betreuungsplatz in einer
                  Kindertagesstätte zur Verfügung. Die Folge: Nur etwas mehr als
                  die Hälfte der Mütter dieser Kinder ist berufstätig - und nur
                  ein Viertel kann ganztägig zur Arbeit gehen. Um dem
                  entgegenzuwirken, gibt es in Deutschland die dreijährige
                  Elternzeit, die es einem Elternteil ermöglichen soll, drei
                  Jahre{" "}
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
                  dem Kind zu Hause zu bleiben,{" "}
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
                  hat den Vorteil, dass der zu Hause bleibende Elternteil seinen
                  Arbeitsplatz nicht verliert. Dennoch wird die Elternzeit für
                  viele Eltern in finanzieller Hinsicht zu einem gravierenden
                  Problem. Außerdem gilt die Elternzeit nur für Angestellte.
                  Mütter zum Beispiel, die vor der Geburt ihres Kindes
                  selbständig waren und mit dem Baby zu Hause bleiben wollen,
                  stehen weit schlechter da. Kind und Karriere zu vereinbaren
                  ist daher in Deutschland für die meisten Mütter so gut wie
                  unmöglich. Dies scheinen die Hauptgründe{" "}
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
                  zu sein, warum in Deutschland zurzeit weltweit die wenigsten
                  Kinder geboren werden. Doch auch andere Dinge machen Familien
                  mit Kindern in Deutschland das Leben schwer: In Restaurants
                  zum Beispiel sind Kinder selten willkommen. Sie sitzen eben
                  nicht still am Tisch,{" "}
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
                  stören mit ihrem Lachen und lauten Sprechen die anderen
                  (kinderlosen) Gäste. Bei den kinderlosen Erwachsenen werden
                  andere Maßstäbe angelegt.{" "}
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
                  diese selbst häufig lautstark telefonieren, stört das
                  niemanden: Telefonate sind eben wichtiger als Kinder. In
                  zahlreichen deutschen Städten wie Mainz strengen Anwohner
                  Prozesse gegen Kindergärten und Spielplätze an,{" "}
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
                  die Kinder die Ruhe der banachbarten (kinderlosen)
                  Hausbewohner stören. Die Folge: Spielplätze werden von
                  Gerichts wegen geschlossen. An Wiesen, auf denen früher Kinder
                  tobten und Ball spielten, stehen nun Schilder: Betreten und
                  spielen verboten. Bei Zuwiderhandlung drohen Geldstrafen.
                  Eltern, die mit der deutschen Bahn mit ihren Kindern verreisen
                  möchten, haben schlechte Karten. In den meisten Zügen sind die
                  Gänge so angeordnet,{" "}
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
                  mit einem Kinderwagen kein Durchkommen ist. Und in den
                  Mutter-Kind-Abteilen haben sich schon andere Reisende
                  breitgemacht, die nicht einsehen, warum sie Müttern mit Kind
                  Platz machen sollten. Schließlich hätten sie ja eine Fahrkarte
                  gekauft und damit Anspruch{" "}
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
                  einen Platz. In vielen Berichten in Zeitungen oder im
                  Fernsehen, die sich mit Kindern, ihrer Erziehung oder mit dem
                  Schulsystem befassen, spricht man in Deutschland gerne{" "}
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
                  Problemen. Man meint damit die Kinder. Kann eine Gesellschaft,
                  in der ein Kind als ein Problemfall angesehen wird, ein
                  Paradies für Kinder sein?
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
                  className="bg-[#c37e2fc7] hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded mt-4"
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
