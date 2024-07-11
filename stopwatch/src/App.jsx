import React from 'react';
import Stopwatch from './components/Stopwatch';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Stopwatch />
    </div>
  );
}

export default App;