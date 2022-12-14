import React, { useContext, useState } from "react";
import { TodosDispatchContext } from "./todolist";
let nextId = 4;
const AddTodo = () => {
  const dispatch = useContext(TodosDispatchContext);
  const [text, setText] = useState("");
  return (
    <>
      <input
        type="text"
        name="newTodo"
        id="newTodo"
        placeholder="Any New Todo?... Type Here!!!"
        className="todo-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="btn"
        onClick={() => {
          dispatch({
            type: "add",
            id: nextId++,
            text,
          });
          setText("");
        }}
      >
        Add Todo
      </button>
    </>
  );
};

export default AddTodo;
