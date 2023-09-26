import React, { useState, useEffect } from "react";
import ListItem from "../ListItem/ListItem";
import styles from "./ListOfAllItems.module.css";
import { v4 as uuid } from "uuid";

const ListOfAllItems = () => {
  const [memos, setMemos] = useState(
    JSON.parse(localStorage.getItem("data")) === null
      ? []
      : JSON.parse(localStorage.getItem("data"))
  );

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(memos));
  }, [memos]);

  const generateRandomHexColor = () => {
    let charset = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += charset[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const addMemo = () => {
    const memoDetails = {
      id: uuid(),
      content: inputValue,
      bgColor: generateRandomHexColor(),
      state: false,
    };
    setMemos([...memos, memoDetails]);
    setInputValue("");
  };

  const deleteMemo = (itemId) => {
    const filteredMemos = memos.filter((memo) => memo.id !== itemId);
    setMemos(filteredMemos);
  };

  const editMemo = (id, editedText) => {
    const editedMemo = memos.map((memo) => {
      if (id === memo.id) {
        return { ...memo, content: editedText };
      }
      return memo;
    });
    setMemos(editedMemo);
  };

  const markAsDone = (id) => {

    const doneMemo = memos.map((memo) => {
      if (id === memo.id) {
        return { ...memo, state: true };
      }
      return memo;
    });
    setMemos(doneMemo);
  };


  return (
    <div className={styles.main}>
      <div className={styles.inputBar}>
        <div className={styles.inBtn}>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            className={styles.input}
          />
          <button onClick={addMemo} className={styles.button}>add note</button>
        </div>
      </div>
      <div className={styles.memoWrapper}>
        {memos.map((item) => (
          <ListItem
            key={item.id}
            details={item}
            deleteMemo={deleteMemo}
            editMemo={editMemo}
            markAsDone={markAsDone}
          />
        ))}
      </div>
    </div>
  );
};

export default ListOfAllItems;