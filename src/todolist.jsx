import React, { createContext, useReducer } from "react";
import AddTodo from "./AddTodo";
import ShowTodo from "./ShowTodo";
import { motion } from "framer-motion";
const initialTodos = [
  { id: 1, text: "learn javascript", done: true },
  { id: 2, text: "Learn react", done: false },
  { id: 3, text: "learn Tailwind", done: true },
];

export const TodosContext = createContext(null);
export const TodosDispatchContext = createContext(null);

function reducer(todos, action) {
  const { type } = action;
  switch (type) {
    case "add":
      const { id, text } = action;
      return [...todos, { id, text, done: false }];

    case "change":
      const updatedTodo = action.todo;
      return todos.map((existingTodo) => {
        if (existingTodo.id === updatedTodo.id) {
          return updatedTodo;
        } else {
          return existingTodo;
        }
      });

    case "remove":
      console.log(action.id);
      const todoId = action.id;
      return todos.filter((todo) => todo.id !== todoId);
    default:
      console.log("error");
  }
}

const Todolist = () => {
  const [todos, dispatch] = useReducer(reducer, initialTodos);
  return (
    <TodosContext.Provider value={todos}>
      <TodosDispatchContext.Provider value={dispatch}>
        <main className="container">
          <h1 className="heading">Todo App</h1>
          <div className="todo">
            <AddTodo />
          </div>
          <div className="todo-list-container">
            <ShowTodo />
          </div>
        </main>
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
};

export default Todolist;
