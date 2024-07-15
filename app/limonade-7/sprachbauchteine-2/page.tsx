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
    { id: 3, number: "C", text: "BEINAHE" },
    { id: 4, number: "D", text: "DAFÜR" },
    { id: 5, number: "E", text: "DANN" },
    { id: 6, number: "F", text: "DENN" },
    { id: 7, number: "G", text: "DÜRFEN" },
    { id: 8, number: "H", text: "FAST" },
    { id: 9, number: "I", text: "INNERHALB" },
    { id: 10, number: "J", text: "KAUM" },
    { id: 11, number: "K", text: "MÜSSEN" },
    { id: 12, number: "L", text: "SOLLEN" },
    { id: 13, number: "M", text: "STATT" },
    { id: 14, number: "N", text: "VOR" },
    { id: 15, number: "O", text: "ZUMEIST" },
  ],
};

const initialCartItems: Text[] = [
  { title: "input1", text: "", anserText: "KAUM" },
  { title: "input2", text: "", anserText: "AUF" },
  { title: "input3", text: "", anserText: "ZUMEIST" },
  { title: "input4", text: "", anserText: "STATT" },
  { title: "input5", text: "", anserText: "INNERHALB" },
  { title: "input6", text: "", anserText: "MÜSSEN" },
  { title: "input7", text: "", anserText: "AN" },
  { title: "input8", text: "", anserText: "SOLLEN" },
  { title: "input9", text: "", anserText: "DANN" },
  { title: "input10", text: "", anserText: "DENN" },
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
          pageHome="/limonade-7"
          pageTow="/limonade-7/lesenteil-2"
          pageThree="/limonade-7/lesenteil-3"
          pageFour="/limonade-7/sprachbauchteine-1"
          pageFive="/limonade-7/sprachbauchteine-2"
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
                  Das Fahrrad: ernsthafte Konkurrenz fürs Auto?
                </h1>
                <p>
                  Welches Fortbewegungsmittel, denken Sie, wird in Deutschland
                  am häufigsten benutzt? Natürlich das Automobil. Volkswagen,
                  Porsche, Mercedes Benz, BMW, Audi: In
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
                  einem anderen Land gibt es so viele Automobilfabriken wie in
                  Deutschland, spielt die Automobilindustrie eine so große
                  Rolle. Nahezu jeder Haushalt verfügt über mindestens ein Auto,
                  das Auto spielt im Leben der Deutschen eine große Rolle,
                  sowohl als Fortbewegungsmittel zum Arbeitsplatz oder in den
                  Urlaub als auch als Statussymbol: Zeig mir dein Auto und ich
                  weiß, wer du bist. Doch hat das Autofahren auch
                  Schattenseiten. Mangelnde Bewegungsmöglichkeiten,
                  gesundheitliche Probleme und Stress bringen zumindest in den
                  Großstädten immer mehr Autofahrer dazu, sich vom Automobil
                  freizumachen und
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
                  ein anderes Verkehrsmittel umzusteigen, das in dem Ruf steht,
                  gesünder zu sein als das Auto: das Fahrrad. Nicht nur in der
                  Freizeit, sondern auch auf dem Weg zum Arbeitsplatz wird das
                  Rad benutzt. Ich habe keine Lust, Morgen für Morgen im Stau zu
                  stehen und Zeit zu verlieren, sagt Bettina Meier (25): Da ist
                  es viel entspannender, auf den
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
                  gut ausgebauten Fahrradwegen an den im Stau wartenden
                  Fahrzeugen und ausgeruht am Arbeitsplatz anzukommen. Dass
                  Fahrradfahren um einiges gesünder ist, als hinter dem Lenkrad
                  zu sitzen, bestätigen auch die Mediziner. Wer Fahrrad fährt
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
                  zu sitzen, bringt seinen Blutkreislauf in Schwung, stärkt die
                  Abwehrkräfte des Körpers und trainiert seinen Körper. Auch die
                  Bewegung an der frischen Luft tut Menschen gut, die sich sonst
                  die meiste Zeit
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
                  geschlossener Räume in Büros, Schulen oder Fabriken aufhalten
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
                  . Auch die Geschäftswelt hat die Fahrradfahrer als Kunden
                  entdeckt. Ein breites Angebot
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
                  Zubehör für Fahrräder von schicken Radfelgen über sportliche
                  Mehrganggetriebe, mit denen Berge kein Problem mehr
                  darstellen, bis zur Designer-Trinkflasche machen aus dem
                  einfachen Fahrrad ein exlusives Fahrzeug. Und natürlich darf
                  bei keinem Fahrradfahrer eine aufwändige
                  Sicherheitsausstattung mehr fehlen: Schutzhelme, Ellenbogen-
                  und Knieschützer, die das Fahrrad im Falle eines Unfalls fast
                  so sicher wie einen Panzer machen
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
                  . Nur wenn es regnet - und das passiert in Deutschland leider
                  nicht so selten -,
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
                  sind die Autoschlangen wieder länger.
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
                  einen praktischen Wetterschutz für Radfahrer haben die
                  Geschäfte noch nicht im Angebot.
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
