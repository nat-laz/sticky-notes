import React, { useState, useEffect, useCallback, useReducer } from "react";
import ListItem from "../ListItem/ListItem";
import styles from "./ListOfAllItems.module.css";
import { v4 as uuid } from "uuid";

const initialState = JSON.parse(localStorage.getItem("data")) || [];

const memoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MEMO":
      return [...state, action.payload];
    case "DELETE_MEMO":
      return state.filter((memo) => memo.id !== action.payload);
    case "EDIT_MEMO":
      return state.map((memo) =>
        memo.id === action.payload.id ? { ...memo, content: action.payload.editedText } : memo
      );
    case "MARK_AS_DONE":
      return state.map((memo) =>
        memo.id === action.payload ? { ...memo, state: true } : memo
      );
    default:
      return state;
  }
};

const ListOfAllItems = () => {
  const [memos, dispatch] = useReducer(memoReducer, initialState);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(memos));
  }, [memos]);

  const generateRandomHexColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;

  const addMemo = useCallback(() => {
    dispatch({
      type: "ADD_MEMO",
      payload: {
        id: uuid(),
        content: inputValue,
        bgColor: generateRandomHexColor(),
        state: false,
      },
    });
    setInputValue("");
  }, [inputValue]);

  const handleAction = useCallback((type, payload) => {
    dispatch({ type, payload });
  }, []);

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
          <button onClick={addMemo} className={styles.button}>Add Note</button>
        </div>
      </div>
      <div className={styles.memoWrapper}>
        {memos.map((item) => (
          <ListItem
            key={item.id}
            details={item}
            deleteMemo={() => handleAction("DELETE_MEMO", item.id)}
            editMemo={(editedText) => handleAction("EDIT_MEMO", { id: item.id, editedText })}
            markAsDone={() => handleAction("MARK_AS_DONE", item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ListOfAllItems;