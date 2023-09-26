import React, { useReducer, useRef, useEffect } from "react";
import styles from "./ListItem.module.css";
import { RiChatDeleteLine } from "react-icons/ri";
import { FiEdit, FiSave, FiCheckSquare } from "react-icons/fi";

const initialState = {
  editPermission: false,
  textareaValue: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_EDIT_PERMISSION":
      return { ...state, editPermission: action.payload };
    case "SET_TEXTAREA_VALUE":
      return { ...state, textareaValue: action.payload };
    default:
      throw new Error();
  }
}

const ListItem = ({ details, editMemo, deleteMemo, markAsDone }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    textareaValue: details.content,
  });
  const textAreaRef = useRef(null);

  const edit = () => dispatch({ type: "SET_EDIT_PERMISSION", payload: true });

  const saveUpdate = () => {
    editMemo(details.id, state.textareaValue);
    dispatch({ type: "SET_EDIT_PERMISSION", payload: false });
  };

  useEffect(() => {
    state.editPermission && textAreaRef.current.focus();
  }, [state.editPermission]);

  return (
    <div
      style={{ backgroundColor: `${details.bgColor}` }}
      className={details.state ? styles.checkedMemo : styles.memoItem}
    >
      <div className={styles.iconWrapper}>
        <FiCheckSquare
          className={details.state ? `${styles.doneIcon} ${styles.icon}` : styles.icon}
          onClick={() => markAsDone(details.id)}
          aria-label="Mark as done"
        />
        {!state.editPermission ? (
          <FiEdit className={styles.iconEdit} onClick={edit} aria-label="Edit" />
        ) : (
          <FiSave className={styles.iconSave} onClick={saveUpdate} aria-label="Save" />
        )}
        <RiChatDeleteLine
          className={styles.iconDelete}
          onClick={() => deleteMemo(details.id)}
          aria-label="Delete"
        />
      </div>
      <textarea
        value={state.textareaValue}
        onChange={(e) => dispatch({ type: "SET_TEXTAREA_VALUE", payload: e.target.value })}
        ref={textAreaRef}
        disabled={!state.editPermission}
        readOnly={!state.editPermission}
        className={styles.textarea}
      />
    </div>
  );
};


export default ListItem;