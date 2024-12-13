import { useState, useEffect } from "react";

const Timer = ({ duration, onTimeout, isPaused, onReset }) => {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    if (isPaused) return; // Pause timer if isPaused is true

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, onTimeout]);

  // Reset timer when onReset is called
  useEffect(() => {
    setTime(duration);
  }, [onReset, duration]);

  return <div>Time Remaining: {time}s</div>;
};

export default Timer;
