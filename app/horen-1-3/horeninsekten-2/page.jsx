"use client";

import { useState } from "react";
import HeaderHoren from "../../components/HeaderHoren";

const questions = [
  {
    id: 46,
    questionText:
      "Professor Steiner ist heute gar nicht mehr nervös, wenn er moderieren muss.",
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
      "Steiner vermittelt den Studierenden nicht nur, theoretisches Wissen, sondern fordert auch dass es Praktisch angewendet wird.",
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
    id: 48,
    questionText: "Steiner Hobby ist es experimentelle Film zu machen.",
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
    id: 49,
    questionText:
      "Journalisten sollen Heute auf einzelne Medien spezialisiert sein.",
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
    id: 50,
    questionText:
      "Sport-Journalist zu werden, ist nach Steiner Ansicht Heute fast ausgeschlossen.",
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
      "Journalisten sollten möglichst viele Informationen an die Öffentlichkeit weitergeben.",
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
      "Steiner musste wegen einer Verletzung mit dem Fußballspielen aufhören.",
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
    id: 53,
    questionText:
      "Steiner hat während seines Journalistik-Studiums für das ZDF Fußballspiele moderiert.",
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
      "Steiner ist es wichtig, als Moderator den Sportlern gegenüber neutral zu bleiben.",
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
    id: 55,
    questionText:
      "Steiner rät Abiturienten dazu verschiedene Berufliche Möglichkeiten zu testen.",
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
