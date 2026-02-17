import { useState } from "react";
import type { Task } from "../types";

interface Props {
  dispatch: any;
}

export default function TaskForm({ dispatch }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
if (!title.trim()) {
  alert("Title is required");
  return;
}

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      column: "todo",
    };

    dispatch({ type: "ADD_TASK", payload: newTask });

    setTitle("");
    setDescription("");
  };

  return (
<div className="bg-zinc-900 p-6 rounded-2xl shadow-lg mb-8 border border-zinc-800">
  <div className="flex flex-col gap-4">
    <input
      className="bg-zinc-800 border border-zinc-700 p-3 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
      placeholder="Task title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <textarea
      className="bg-zinc-800 border border-zinc-700 p-3 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
      placeholder="Task description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />

    <button
      onClick={handleSubmit}
      className="bg-violet-600 hover:bg-violet-700 transition px-4 py-2 rounded-lg font-semibold"
    >
      Add Task
    </button>
  </div>
</div>

  );
}
