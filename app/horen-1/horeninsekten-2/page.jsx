"use client";

import { useState } from "react";
import HeaderHoren from "../../components/HeaderHoren";

const questions = [
  {
    id: 46,
    questionText:
      "Die Zahl der deutschen Mallorca-Urlaub hat nur leicht abgenommen.",
    options: [
      {
        optionID: "richtig",
      },
      {
        optionID: "falsch",
      },
    ],
    correctAnswerID: "falsch",
  },
  {
    id: 47,
    questionText:
      "Nach Professor Kirsch achten die Deutschen bei der Wahl ihrer Urlaubsreisen nicht besonders auf die kosten.",
    options: [
      {
        optionID: "richtig",
      },
      {
        optionID: "falsch",
      },
    ],
    correctAnswerID: "falsch",
  },
  {
    id: 48,
    questionText:
      " Einige Einheimisch in Mallorca haben begonnen, sich gegen das Vordringen der deutschen Sprache zu wehren.",
    options: [
      {
        optionID: "richtig",
      },
      {
        optionID: "falsch",
      },
    ],
    correctAnswerID: "richtig",
  },
  {
    id: 49,
    questionText:
      " In Mallorca wird der Staat wegen der Umwellbelaslungen zu Kasse bitten.",
    options: [
      {
        optionID: "richtig",
      },
      {
        optionID: "falsch",
      },
    ],
    correctAnswerID: "richtig",
  },
  {
    id: 50,
    questionText:
      " Viele Deutsche haben jetzt Rumänien und Ungarn als Reiseziel entdeckt",
    options: [
      {
        optionID: "richtig",
      },
      {
        optionID: "falsch",
      },
    ],
    correctAnswerID: "falsch",
  },
  {
    id: 51,
    questionText:
      " Pfessor Kirsch weist auf günstige Angebote für Golfspieler am Plattensee hin.",
    options: [
      {
        optionID: "richtig",
      },
      {
        optionID: "falsch",
      },
    ],
    correctAnswerID: "falsch",
  },
  {
    id: 52,
    questionText:
      " Bulgarien hat sich als Urlaubsland sehr positiv entwickelt.",
    options: [
      {
        optionID: "richtig",
      },
      {
        optionID: "falsch",
      },
    ],
    correctAnswerID: "richtig",
  },
  {
    id: 53,
    questionText:
      " Viele Westdeutsche meiden Bulgarien, weil die Einreisemodalitäten abschreckend sind.",
    options: [
      {
        optionID: "richtig",
      },
      {
        optionID: "falsch",
      },
    ],
    correctAnswerID: "falsch",
  },
  {
    id: 54,
    questionText:
      " Seit Ende der neunziger Jahre geben die Deutscheh mehr Geld für den Urlaub",
    options: [
      {
        optionID: "richtig",
      },
      {
        optionID: "falsch",
      },
    ],
    correctAnswerID: "falsch",
  },
  {
    id: 55,
    questionText:
      " Durch die Vielzahl aktiver Senioren entsteht eine höhere Nachirage nach Abenteuerreisen in ferne",
    options: [
      {
        optionID: "richtig",
      },
      {
        optionID: "falsch",
      },
    ],
    correctAnswerID: "falsch",
  },
];

const Horen_2 = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleOptionChange = (questionId, optionID) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: optionID });
  };

  const checkAnswers = () => {
    const newResults = {};
    questions.forEach((question) => {
      const selectedOptionID = selectedAnswers[question.id];
      const correctAnswerID = question.correctAnswerID;
      const isCorrect = selectedOptionID === correctAnswerID;
      newResults[question.id] = isCorrect;
    });
    setResults(newResults);
    setShowResults(true);
  };

  const resetAnswers = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <div className="container m-auto  w-full px-2">
      <HeaderHoren
        src="malirka.mp3"
        pageHome="/horen-1"
        pageTow="/horen-1/horeninsekten-2"
        pageThree="/horen-1/horeninsekten-3"
      />
      <div className="m-[100px]">
        <table className="w-fit m-auto divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className=""></th>
              <th className="">richtig</th>
              <th className="">falsch</th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-gray-200">
            {questions.map((question) => (
              <tr key={question.id}>
                <td className="px-6 py-4 whitespace-nowrap">{question.id}</td>
                {question.options.map((option) => (
                  <td
                    key={option.optionID}
                    className={`px-6 py-4 whitespace-nowrap ${
                      showResults &&
                      selectedAnswers[question.id] === option.optionID
                        ? option.optionID === question.correctAnswerID
                          ? "bg-green-300"
                          : "bg-red-300"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question${question.id}`}
                      value={option.optionID}
                      checked={selectedAnswers[question.id] === option.optionID}
                      onChange={() =>
                        handleOptionChange(question.id, option.optionID)
                      }
                    />
                  </td>
                ))}
                <td
                  className={`px-6 py-4 whitespace-nowrap ${
                    showResults &&
                    selectedAnswers[question.id] === question.correctAnswerID
                      ? "bg-green-300"
                      : ""
                  }`}
                >
                  {question.questionText}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between">
          <button
            onClick={checkAnswers}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Check Answers
          </button>
          <button
            onClick={resetAnswers}
            className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Reset Answers
          </button>
        </div>
      </div>
    </div>
  );
};

export default Horen_2;
