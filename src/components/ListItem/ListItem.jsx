import React, { useState, useRef, useEffect } from "react";
import styles from "./ListItem.module.css";
import { RiChatDeleteLine } from "react-icons/ri";
import { FiEdit, FiSave, FiCheckSquare } from "react-icons/fi";

const ListItem = ({ details, deleteMemo, editMemo, markAsDone }) => {
  const [editPermision, setEditPermision] = useState(false);
  const [textareaValue, setTextAreaValue] = useState(details.content);
  const textAreaRef = useRef(null);

  const edit = () => setEditPermision(true);

  const saveUpdate = () => {
    editMemo(details.id, textareaValue);
    setEditPermision(false);
  };

  useEffect(() => {
    editPermision && textAreaRef.current.focus();
  }, [editPermision]);

  return (
    <div
      style={{ backgroundColor: `${details.bgColor}` }}
      className={details.state ? styles.checkedMemo : styles.memoItem}
    >
      <div className={styles.iconWrapper}>
        <FiCheckSquare
          className={details.state ? `${styles.doneIcon} ${styles.icon}` : styles.icon}
          onClick={() => markAsDone(details.id)}
          aria-label="Mark as done" // Accessibility: Providing alternative text
        />
        {!editPermision ? (
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
        value={textareaValue}
        onChange={(e) => setTextAreaValue(e.target.value)}
        ref={textAreaRef}
        disabled={!editPermision}
        readOnly={!editPermision}
        className={styles.textarea}
      />
    </div>
  );
};

export default ListItem;