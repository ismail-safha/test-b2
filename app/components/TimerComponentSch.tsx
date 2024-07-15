"use client";
import React, { useState, useEffect } from "react";

const TimerComponentSch = () => {
  const initialTime = 30 * 60; // 90 minutes in seconds
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    let timerId: string | number | NodeJS.Timeout | undefined;

    if (isRunning && time > 0) {
      timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [isRunning, time]);

  useEffect(() => {
    if (time === 0) {
      setIsRunning(false);
      // You can add additional logic when the timer reaches 0
    }
  }, [time]);

  return (
    <div className="text-white flex flex-col items-start mr-[8px] gap-2">
      <div className="flex flex-col items-start">
        <h1>Deutsch-B2</h1>
        <span>{formatTime(time)}</span>
      </div>
      <button
        className="bg-blue-600 text-center py-[1px] px-[8px] rounded-lg"
        onClick={toggleTimer}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default TimerComponentSch;
