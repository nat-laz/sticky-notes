import React from "react";
import ListOfAllItems from "./components/ListOfAllItems/ListOfAllItems";
import styles from './App.module.css';

function App() {
  return (
    <main>
      <header className={styles.header}>
        <h1>What are the plans for today?</h1>
      </header>
      <ListOfAllItems />
    </main>
  );
}

export default App;
