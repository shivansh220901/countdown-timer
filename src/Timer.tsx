import { useEffect, useRef, useState } from "react";

const Timer = () => {
  const [time, setTime] = useState({ seconds: 0, minutes: 0, hours: 0 });
  const [isStarted, setIdStarted] = useState(false);
  let timerRef = useRef(null);
  const INAVLID_TIMER =
    time.hours === 0 && time.minutes === 0 && time.seconds === 0;

  const handleSeconds = (e) => {
    const val = Number(e.target.value);
    setTime((time) => {
      const addedMinutes = Math.floor(val / 60);
      const remainingSeconds = val % 60;

      let totalMinutes = time.minutes + addedMinutes;
      const addedHours = Math.floor(totalMinutes / 60);
      const remainingMinutes = totalMinutes % 60;

      if (val > 60) {
        return {
          ...time,
          seconds: remainingSeconds,
          minutes: remainingMinutes,
          hours: time.hours + addedHours,
        };
      }
      return {
        ...time,
        seconds: val,
      };
    });
  };

  const handleMinutes = (e) => {
    const val = Number(e.target.value);
    console.log(val);

    setTime((time) => {
      const addedHours = Math.floor(val / 60);
      const remainingMinutes = val % 60;
      if (val > 60) {
        return {
          ...time,
          minutes: remainingMinutes,
          hours: time.hours + addedHours,
        };
      }
      return {
        ...time,
        minutes: val,
      };
    });
  };

  const handleHours = (e) => {
    const val = Number(e.target.value);
    console.log(val);

    setTime((time) => ({ ...time, hours: val }));
  };

  const startTimer = () => {
    setIdStarted(true);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIdStarted(false);
  };

  const resetTimer = () => {
    stopTimer();
    setTime((prev) => ({ ...prev, seconds: 0, minutes: 0, hours: 0 }));
    return time;
  };

  useEffect(() => {
    if (isStarted) {
      if (INAVLID_TIMER) return;
      timerRef.current = setInterval(() => {
        setTime((time) => {
          const copyTimer = { ...time };
          copyTimer.seconds--;
          if (copyTimer.seconds < 0) {
            copyTimer.minutes--;
            copyTimer.seconds = 59;
            if (copyTimer.minutes < 0) {
              copyTimer.minutes = 59;
              copyTimer.hours--;
            }
            if (copyTimer.hours < 0) {
              return {
                hours: 0,
                minutes: 0,
                seconds: 0,
              };
            }
          }
          return copyTimer;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isStarted]);

  return (
    <div>
      <div>
        <input
          className="timer"
          type="number"
          disabled={isStarted}
          onChange={handleHours}
          value={time.hours}
        />
        <input
          className="timer"
          type="number"
          disabled={isStarted}
          value={time.minutes}
          onChange={handleMinutes}
        />
        <input
          className="timer"
          type="number"
          disabled={isStarted}
          onChange={handleSeconds}
          value={time.seconds}
        />
      </div>
      <button onClick={startTimer} disabled={isStarted || INAVLID_TIMER}>
        Start
      </button>
      <button onClick={stopTimer} disabled={!isStarted || INAVLID_TIMER}>
        Stop
      </button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};
export default Timer;
