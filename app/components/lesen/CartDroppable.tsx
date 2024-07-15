"use client";

import React, { useEffect, useState } from "react";

interface ICartDroppable {
  cart: {
    id: number;
    idText?: string;
    titleText?: string;
    title: string;
    cartItemAnswers: string;
    cartAcoordion?: string;
  };
  onDelete?: () => void;
  onClick?: () => void;
  isCorrect?: boolean;
  resetActiveState: boolean;
}

const CartDroppable: React.FC<ICartDroppable> = ({
  cart,
  isCorrect,
  onClick,
  resetActiveState,
}) => {
  const [isAccordionOpen, setAccordionOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (resetActiveState) {
      setIsActive(false);
    }
  }, [resetActiveState]);

  const toggleAccordion = () => {
    setAccordionOpen(!isAccordionOpen);
  };

  const handleH1Click = () => {
    setIsActive(!isActive);
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`bg-[#777] p-[10px] m-[3px]  ${
        isCorrect !== undefined
          ? isCorrect
            ? "bg-green-300"
            : "bg-red-300"
          : ""
      }`}
    >
      <span className="px-2 py-1 text-[#0b0b0b] text-center border border-[#fff]">
        {cart.idText}
      </span>

      <h1
        onClick={handleH1Click}
        className={`p-[10px] m-[10px] cursor-pointer flex justify-between items-center rounded-[9px] ${
          isActive ? "bg-[#77a0e3] border border-[#0b0b0b]" : "bg-blue-500"
        }`}
      >
        {cart.cartItemAnswers}
      </h1>

      <div className="bg-[#efefef] dark:bg-[#1d2a35] dark:text-[#ededed] font-semibold p-[10px] m-[10px]">
        <div className="font-bold"> {cart.titleText}</div>
        {cart.title}
      </div>

      <h1 onClick={toggleAccordion} className="accordion-header">
        {isAccordionOpen ? "Hide" : "Show"}
      </h1>
      {isAccordionOpen && (
        <div className="cart-accordion">{cart.cartAcoordion}</div>
      )}
    </div>
  );
};

export default CartDroppable;
