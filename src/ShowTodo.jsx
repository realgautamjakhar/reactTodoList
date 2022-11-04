import React, { useContext } from "react";
import { TodosContext, TodosDispatchContext } from "./todolist";

const ShowTodo = () => {
  const todos = useContext(TodosContext);

  return (
    <ul className="todo-ul">
      {todos.map((todo) => (
        <li key={todo.id}>
          <Todo todo={todo} />
        </li>
      ))}
    </ul>
  );
};
function Todo({ todo }) {
  const dispatch = useContext(TodosDispatchContext);

  return (
    <>
      <input
        type="checkbox"
        name={`${todo.id}-done`}
        id={`${todo.id}-done`}
        checked={todo.done}
        onChange={(e) => {
          dispatch({
            type: "change",
            todo: { ...todo, done: e.target.checked },
          });
        }}
      />
      {todo.text}
      <button
        onClick={() => {
          dispatch({
            type: "remove",
            id: todo.id,
          });
        }}
      >
        x
      </button>
    </>
  );
}
export default ShowTodo;
