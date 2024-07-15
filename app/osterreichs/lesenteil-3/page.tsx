"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Header from "../../components/Header";
import CartDroppable from "../../components/lesen/CartDroppable";

import { lesenTeil_3 } from "../../data/Insekten_H/österreichsData";

import Image from "next/image";
import AnswerDraggableTSmal from "../../components/lesen/AnswerDraggableTSmal";

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const LesenTeil3 = () => {
  const { data: session } = useSession();

  const [cartItems, setCartItems] = useState(lesenTeil_3.carts);
  const [checkResult, setCheckResult] = useState<(boolean | undefined)[]>([]);
  const [selectedCartId, setSelectedCartId] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [resetActiveState, setResetActiveState] = useState(false);

  //====

  const [answers, setAnswers] = useState(lesenTeil_3.answers);

  const shuffleAnswers = () => {
    const texts = answers.map((answer) => answer.text);
    const shuffledTexts = shuffleArray(texts);

    const shuffledAnswers = answers.map((answer, index) => ({
      ...answer,
      text: shuffledTexts[index],
    }));

    setAnswers(shuffledAnswers);
  };
  //====

  const handleDelete = (cartId: number) => {
    const updatedCartItems = cartItems.map((cart) => {
      if (cart.id === cartId) {
        return { ...cart, cartItemAnswers: "" };
      }
      return cart;
    });
    setCartItems(updatedCartItems);
  };

  const checkAnswers = () => {
    const results = cartItems.map(
      (cart) => cart.cartItemAnswers === cart.cartAcoordion
    );
    setCheckResult(results);
  };

  const resetCheckResult = () => {
    setCartItems(
      lesenTeil_3.carts.map((cart) => ({ ...cart, cartItemAnswers: "" }))
    );
    setCheckResult([]);
    setSelectedCartId(null);
    setResetActiveState((prevState) => !prevState);
  };

  const handleAnswerClick = (answerText: string) => {
    if (selectedCartId !== null) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === selectedCartId
          ? { ...item, cartItemAnswers: answerText }
          : item
      );
      setCartItems(updatedCartItems);
    }
  };

  const handleInputClick = (cartId: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === cartId ? { ...item, cartItemAnswers: "" } : item
      )
    );
    setSelectedCartId(cartId);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    setIsVisible(window.scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    session && (
      <div className="container m-auto  w-full px-2">
        <Header
          pageHome="/osterreichs"
          pageTow="/osterreichs/lesenteil-2"
          pageThree="/osterreichs/lesenteil-3"
          pageFour="/osterreichs/sprachbauchteine-1"
          pageFive="/osterreichs/sprachbauchteine-2"
        />

        <main>
          <div className="w-full bg-blue-900 text-white">
            <h1 className="p-2">Leseverstehen, TEIL 3</h1>
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-[20px]">
            {/* div text */}
            <div className=" w-full lg:w-[60%] mt-[20px]">
              <p className="bg-[#f6f2bc] text-black rounded-lg p-2">
                Lesen Sie zuerst die zehn Situationen (11-20) und dann die zwölf
                Info-Texte (a-l). Welcher Info-Text passt zu welcher Situation?
                Sie können jeden Info-Text nur einmal verwenden. Markieren Sie
                Ihre Lösungen auf dem Antwortbogen bei den Aufgaben 11-20.
                Manchmal gibt es keine Lösung. Markieren Sie dann x.
              </p>
              <div className="mt-[30px] bg-[#f6f2bc] dark:bg-[#9e9d98] grid lg:grid-cols-2 lg:overflow-y-scroll lg:h-[650px]">
                {cartItems.map((cart, index) => (
                  <CartDroppable
                    key={cart.id}
                    cart={cart}
                    isCorrect={checkResult[index]}
                    onDelete={() => handleDelete(cart.id)}
                    onClick={() => handleInputClick(cart.id)}
                    resetActiveState={resetActiveState}
                  />
                ))}
              </div>
            </div>
            {/* div answers */}
            <div className="w-full lg:w-[45%] mt-[30px] bg-[#ccc] dark:bg-[#777] rounded-lg h-fit">
              {answers.map((answer) => (
                <AnswerDraggableTSmal
                  key={answer.id}
                  answer={answer.text}
                  number={answer.number}
                  handleAnswerClick={handleAnswerClick}
                  onClick={() => handleAnswerClick(answer.text)}
                  resetActiveState={resetActiveState}
                />
              ))}

              {/* check Answers */}
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

        <button
          className={`fixed bottom-4 right-4 z-[100] ${
            isVisible ? "block" : "hidden"
          }`}
          onClick={scrollToTop}
        >
          <div className="bg-[#60e5de] inline-block p-[5px] rounded-[10px]">
            <Image src="/up.svg" alt="" width={30} height={30} />
          </div>
        </button>
      </div>
    )
  );
};

export default LesenTeil3;
