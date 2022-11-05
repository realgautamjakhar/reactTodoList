import React, { useContext } from "react";
import { motion } from "framer-motion";
import { VscClose } from "react-icons/vsc";
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
        <motion.li
          initial={{ scale: 0, opacity: 0.1 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          key={todo.id}
        >
          <Todo todo={todo} />
        </motion.li>
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
          <motion.li
            initial={{ scale: 0, opacity: 0.1 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={todo.id}
            className="completed-todo"
          >
            <Todo todo={todo} />
          </motion.li>
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
          <motion.li
            initial={{ scale: 0, opacity: 0.1 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={todo.id}
          >
            <Todo todo={todo} />
          </motion.li>
        ))}
      </ul>
    </>
  );
};

function Todo({ todo }) {
  const dispatch = useContext(TodosDispatchContext);

  return (
    <>
      <div className="single-todo">
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
          <VscClose className="icon" />
        </button>
      </div>
    </>
  );
}
export default ShowTodo;
