import Icon from "./PlayIcon";
import React, { useEffect, useState } from "react";

const CountdownTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [minutes, setMinutes] = useState("");

  const getHours = (ms) => ("0" + ((ms / 10) % 100)).slice(-2);
  const getSeconds = (ms) => ("0" + Math.floor((ms / 1000) % 60)).slice(-2);
  const getMinutes = (ms) =>
    ("0" + (Math.floor(ms / 1000 / 60) % 60)).slice(-2);

  const formatTime = (ms) =>
    `${getMinutes(ms)}:${getSeconds(ms)}:${getHours(ms)}`;

  const handleChange = (e) => {
    setMinutes(e.target.value);
  };

  const isValidTime = () => {
    const minutesNumeric = parseInt(minutes, 10);

    return !isNaN(minutesNumeric) && minutesNumeric <= 60 && minutesNumeric > 0;
  };

  const handleStart = () => {
    const minutesNumeric = parseInt(minutes, 10);
    if (minutesNumeric > 60) {
      alert("You cannot enter more than 60 minutes.");
      setIsRunning(false);
      return;
    } else if (minutes === "") {
      alert("Please enter a valid number of minutes.");
      setIsRunning(false);
      return;
    } else {
      if(minutes == 0) {
        alert("You cannot enter less than 1 minute");
        setIsRunning(false);
        return;
      }
    }

    setIsRunning(true);
    setTime(minutesNumeric * 60000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleStart();
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setMinutes("");
  };

  const handlePause = () => {
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    let interval = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 10) {
            clearInterval(interval);
            return 0;
          }
          return prevTime - 10;
        });
      }, 10);
    } else if (!isRunning || time === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  return (
    <>
      <h1>Countdown Timer</h1>
      <div className="form-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="minutes-input">Enter Minutes:</label>
          <div>
            <input
              id="minutes-input"
              type="text"
              value={minutes}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div onClick={handleStart}>
            {!isRunning && !time ? <Icon className="icon" /> : null}
          </div>
          <div className="time">{formatTime(time)}</div>

          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>

          <button
            className="pause-btn"
            onClick={() => {
              handlePause();
              handleStart();
            }}
            disabled={!isValidTime()}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CountdownTimer;
