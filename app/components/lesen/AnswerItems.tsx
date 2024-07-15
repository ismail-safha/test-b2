import React, { useState, useEffect } from "react";

interface AnswerItemsProps {
  answers: { id: number; number: string; text: string };
  handleAnswerClick: (text: string) => void;
  onClick?: () => void;
  resetActiveState: boolean;
}

const AnswerItems: React.FC<AnswerItemsProps> = ({
  answers,
  handleAnswerClick,
  resetActiveState,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (resetActiveState) {
      setIsOpen(false);
    }
  }, [resetActiveState]);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className="flex items-center"
      onClick={() => handleAnswerClick(answers.text)}
    >
      <h1 className="pl-3">{answers.number}</h1>
      <div
        className={`p-[5px] m-[10px] rounded-lg bg-blue-200 cursor-pointer  ${
          isOpen ? "text-white" : ""
        }`}
        onClick={toggleIsOpen}
      >
        {answers.text}
      </div>
    </div>
  );
};

export default AnswerItems;
