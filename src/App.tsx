import { useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import type { State } from "./types";
import TaskForm from "./components/TaskForm";
import Board from "./components/Board";

// 🔥 Initialize state from localStorage BEFORE first render
const initializer = (): State => {
  const stored = localStorage.getItem("flow-tasks");

  if (stored) {
    try {
      return { tasks: JSON.parse(stored) };
    } catch {
      return { tasks: [] };
    }
  }

  return { tasks: [] };
};

function App() {
  const [state, dispatch] = useReducer(reducer, undefined, initializer);

  // 🔹 Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("flow-tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
<div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white">
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
<h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-violet-500">
  Flow Kanban Board
</h1>

<p className="text-center text-sm text-zinc-400 mb-8">
  Drag tasks using the ⠿ handle or use the Move buttons to change columns.
</p>


    <TaskForm dispatch={dispatch} />
    <Board tasks={state.tasks} dispatch={dispatch} />
  </div>
</div>


  );
}

export default App;
