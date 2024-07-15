"use client";

import { useState, useEffect } from "react";

interface AnswerDraggableProps {
  answer: string;
  number: string;
  handleAnswerClick: (answerText: string) => void;
  onClick?: () => void;
  resetActiveState: boolean;
}

const AnswerDraggableTSmal: React.FC<AnswerDraggableProps> = ({
  answer,
  number,
  onClick,
  resetActiveState,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenColor, setIsOpenColor] = useState(false);

  useEffect(() => {
    if (resetActiveState) {
      setIsOpen(false);
      setIsOpenColor(false);
    }
  }, [resetActiveState]);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const toggleIsOpenColor = () => {
    setIsOpenColor(!isOpenColor);
  };

  return (
    <div
      onClick={toggleIsOpenColor}
      className={`flex items-center cursor-pointer ${
        isOpenColor ? "text-white" : ""
      }`}
    >
      <h1 onClick={toggleIsOpen} className="px-2 text-[25px] cursor-pointer">
        {isOpen ? "X" : "O"}
      </h1>
      <h1>{number}</h1>
      <div
        onClick={onClick}
        className={`mt-[17px] ml-[8px] mb-[23px] bg-blue-200 p-[5px] m-[5px] rounded-lg $ `}
      >
        <div
          onClick={toggleIsOpenColor}
          className={`${isOpenColor ? "text-white" : ""}`}
        >
          {answer}
        </div>
      </div>
    </div>
  );
};

export default AnswerDraggableTSmal;
