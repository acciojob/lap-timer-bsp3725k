import React, { useState, useRef, useEffect } from "react";
import './../styles/App.css';

const App = () => {
  const [time, setTime] = useState(0); // Timer value in centiseconds
  const [isRunning, setIsRunning] = useState(false); // Track if the timer is running
  const [laps, setLaps] = useState([]); // Array to store lap times
  const timerRef = useRef(null); // Mutable reference to the interval timer

  // Start button handler
  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10); // Update every 10ms (centiseconds)
    }
  };

  // Stop button handler
  const handleStop = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(timerRef.current);
    }
  };

  // Lap button handler
  const handleLap = () => {
    if (isRunning) {
      setLaps((prevLaps) => [...prevLaps, time]);
    }
  };

  // Reset button handler
  const handleReset = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setTime(0);
    setLaps([]);
  };

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  // Format time to MM:SS:CC
  const formatTime = (timeInCentiseconds) => {
    const minutes = String(Math.floor(timeInCentiseconds / 6000)).padStart(2, "0");
    const seconds = String(Math.floor((timeInCentiseconds % 6000) / 100)).padStart(
      2,
      "0"
    );
    const centiseconds = String(timeInCentiseconds % 100).padStart(2, "0");
    return `${minutes}:${seconds}:${centiseconds}`;
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Lap Timer</h1>
      <p style={{ fontSize: "2em", marginBottom: "20px" }}>{formatTime(time)}</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={handleStop} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={handleLap} disabled={!isRunning}>
          Lap
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2>Lap Times</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {laps.map((lap, index) => (
            <li key={index} style={{ fontSize: "1.2em" }}>
              Lap {index + 1}: {formatTime(lap)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
