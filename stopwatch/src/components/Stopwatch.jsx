
import React, { useState, useEffect, useCallback } from 'react';
import styles from './Stopwatch.module.css';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [lastTime, setLastTime] = useState(null);

  const formatNumber = (number) => {
    return number < 10 ? '0' + number : number.toString();
  };
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    return [
      formatNumber(minutes),
      formatNumber(seconds),
      formatNumber(centiseconds)
    ].join(':');
  };

  const startPause = useCallback(() => {
    setIsRunning(!isRunning);
  }, [isRunning]);

  const stop = useCallback(() => {
    setIsRunning(false);
    setLastTime(time);
    setTimeout(() => {
      setTime(0);
    }, 500);
  }, [time]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTime(0);
    setLastTime(null);
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTime(prevTime => prevTime + 10), 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className={styles.stopwatchContainer}>
      <div className={styles.timeDisplay}>{formatTime(time)}</div>
      <div className={styles.buttonGroup}>
        <button 
          className={`${styles.button} ${styles.startStop}`} 
          onClick={startPause}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button 
          className={`${styles.button} ${styles.stop}`} 
          onClick={stop}
        >
          Stop
        </button>
        <button 
          className={`${styles.button} ${styles.reset}`} 
          onClick={reset}
        >
          Reset
        </button>
      </div>
      {lastTime !== null && (
        <div className={styles.lastTimeDisplay}>
          Last Time: {formatTime(lastTime)}
        </div>
      )}
    </div>
  );
};

export default Stopwatch;