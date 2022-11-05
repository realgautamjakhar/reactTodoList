import "./App.css";
import { motion } from "framer-motion";
import Todolist from "./todolist";

function App() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="App"
      >
        <Todolist />
      </motion.div>
    </>
  );
}

export default App;
