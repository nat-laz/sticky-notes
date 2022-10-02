import React, { useState, useRef, useEffect } from "react";
import "./ListItem.css";
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
      className={details.state ? "checked_memo" : "memo-item"}
    >
      <div className="icon-wrapper">
        <FiCheckSquare
          className={details.state ? "done-icon icon" : "icon"}
          onClick={() => markAsDone(details.id)}
        />
        {!editPermision ? (
          <FiEdit className="icon-edit" onClick={edit} />
        ) : (
          <FiSave className="icon-save" onClick={saveUpdate} />
        )}
        <RiChatDeleteLine
          className="icon-delete"
          onClick={() => deleteMemo(details.id)}
        />
      </div>
      <textarea
        value={textareaValue}
        onChange={(e) => {
          setTextAreaValue(e.target.value);
        }}
        ref={textAreaRef}
        disabled={!editPermision}
        readOnly={!editPermision}
      />
    </div>
  );
};

export default ListItem;
