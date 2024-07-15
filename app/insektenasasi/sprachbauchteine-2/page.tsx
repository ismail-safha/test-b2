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
    { id: 1, number: "A", text: "ALS" },
    { id: 2, number: "B", text: "BEHÄLT" },
    { id: 3, number: "C", text: "BERETT" },
    { id: 4, number: "D", text: "BLEIBT" },
    { id: 5, number: "E", text: "DAGEGEN" },
    { id: 6, number: "F", text: "FERTIG" },
    { id: 7, number: "G", text: "GEHÖREN" },
    { id: 8, number: "H", text: "JEDER" },
    { id: 9, number: "I", text: "KLAR" },
    { id: 10, number: "J", text: "MANCHER" },
    { id: 11, number: "K", text: "MIT" },
    { id: 12, number: "L", text: "TAKT" },
    { id: 13, number: "M", text: "TIPP" },
    { id: 14, number: "N", text: "WAS" },
    { id: 15, number: "O", text: "WINK" },
  ],
};

const initialCartItems: Text[] = [
  { title: "input1", text: "", anserText: "GEHÖREN" },
  { title: "input2", text: "", anserText: "BEHÄLT" },
  { title: "input3", text: "", anserText: "MANCHEM" },
  { title: "input4", text: "", anserText: "MIT" },
  { title: "input5", text: "", anserText: "DAGEGEN" },
  { title: "input6", text: "", anserText: "WINK" },
  { title: "input7", text: "", anserText: "FERTIG" },
  { title: "input8", text: "", anserText: "TAKTGEFÜHL" },
  { title: "input9", text: "", anserText: "KLAR" },
  { title: "input10", text: "", anserText: "WAS" },
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
          pageHome="/insektenasasi"
          pageTow="/insektenasasi/lesenteil-2"
          pageThree="/insektenasasi/lesenteil-3"
          pageFour="/insektenasasi/sprachbauchteine-1"
          pageFive="/insektenasasi/sprachbauchteine-2"
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
                <h1 className="text-xl font-bold">Im Restaurant</h1>
                <p>
                  Eine unterhaltsame, schöne und gesellige Zeit. Das stellt man
                  sich unter einem guten Essen vor. Störend wirkt da der
                  anschauliche Erlebnisbericht der letzten Operation im
                  Krankenhaus oder das Klingeln des Handys. Sowohl Gastgeber als
                  Gast sollen alles dafür tun, dass das gemeinsame Essen Freude
                  macht. Das Handy stellt man selbstverständlich ab. Das Essen
                  beginnt, wenn der Gastgeber zur Serviette greift oder zum Gruß
                  sein Glas erhebt. Besonders bei Kindern ein unbeliebtes Thema:
                  die richtige Körperhaltung beim Essen. Die Arme{" "}
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
                  nicht auf den Tisch und die Hände nicht unter den Tisch. Mal
                  sitzt gerade, ohne unruhig hin und her zu rücken. Die Beine
                  werden nebeneinander gestellt, nicht übereinander gelegt. Die
                  Schuhe{" "}
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
                  />
                  in jedem Fall an. Nur keine Angst vor guten Restaurants mit
                  ihrem Luxus! Denn je besser die Küche, umso aufmerksamer ist
                  in der Regel das Personal. Doch schon bei der Anrede der
                  Bedienung steht so{" "}
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
                  vor einem Problem. Die Bedienung
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
                  Fräulein an den Tisch zu rufen, ist in Zeiten dert
                  Gleichberechtigung veraltet. Herr Ober oder Bedienung ist{" "}
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
                  noch möglich, aber auch schon etwas ungewöhnlich. Am besten
                  versucht man sich Blickkontakt zu verschaffen, um mit einem
                  kleinen{" "}
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
                  mit der Hand den Kellner an den Tisch zu bitten. Zudem gibt es
                  zwischen Gast und Service eine Zeichensprache. Schließt der
                  Gast die Speisekarte und legt sie auf den Tisch, ist dies für
                  den Kellner das Signal, die Bestellung aufzunehmen. Ist man
                  mit dem Essen{" "}
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
                  , legt man das Besteck parallel nebeneinander auf den rechten
                  Tellerrand. Der Kellner wir dann abräumen. Macht man hingegen
                  nur eine Pause, wird es gekreuzt oder offen auf den Teller
                  gelegt. Beim Bezahlen ist{" "}
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
                  gefragt. Übernimmt ein Gastgeber die Kosten, macht er dies dem
                  Kellner{" "}
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
                  . Ein Bringen Sie mir bitte die Rechnung reicht da völlig aus.
                  Möchte man hingegen getrennt bezahlen,{" "}
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
                  durchaus üblich ist, teilt man dies ebenfalls rechtzeitig der
                  Bedienung mit. In Deutschland gibt man, je nach Zufriedenheit
                  mit dem Service und der Höhe der Gesamtsumme zwischen drei und
                  zehn Prozent Trinkgeld. Ist man mit dem Service unzufrieden
                  gewesen, gibt man kein Trinkgeld.
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
