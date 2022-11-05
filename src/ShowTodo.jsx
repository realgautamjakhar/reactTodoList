import React, { useContext } from "react";
import { TodosContext, TodosDispatchContext } from "./todolist";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const ShowTodo = () => {
  return (
    <Router>
      <div>
        <ul className="category-change">
          <li>
            <Link to="/">All</Link>
          </li>
          <li>
            <Link to="/Completed">Completed</Link>
          </li>
          <li>
            <Link to="/Active">Active</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<AllTodo />}></Route>
          <Route path="/Completed" element={<CompletedTodos />}></Route>
          <Route path="/Active" element={<ActiveTodo />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

const AllTodo = () => {
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
const CompletedTodos = () => {
  const todos = useContext(TodosContext);
  const completedTodos = todos?.length
    ? todos.filter((todo) => todo.done)
    : null;
  return (
    <>
      <ul className="todo-ul">
        {completedTodos.map((todo) => (
          <li key={todo.id}>
            <Todo todo={todo} />
          </li>
        ))}
      </ul>
    </>
  );
};
const ActiveTodo = () => {
  const todos = useContext(TodosContext);
  const activeTodos = todos?.length ? todos.filter((todo) => !todo.done) : null;
  return (
    <>
      <ul className="todo-ul">
        {activeTodos.map((todo) => (
          <li key={todo.id}>
            <Todo todo={todo} />
          </li>
        ))}
      </ul>
    </>
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
        className="remove-btn"
        title="Remove Todo"
        onClick={() => {
          dispatch({
            type: "remove",
            id: todo.id,
          });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="white"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </>
  );
}
export default ShowTodo;
