import type { Task } from "../types";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
  dispatch: any;
}

export default function TaskCard({ task, dispatch }: Props) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const getNextColumn = () => {
  if (task.column === "todo") return "inprogress";
  if (task.column === "inprogress") return "done";
  return null;
};

const nextColumn = getNextColumn();

const getPrevColumn = () => {
  if (task.column === "done") return "inprogress";
  if (task.column === "inprogress") return "todo";
  return null;
};

const prevColumn = getPrevColumn();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-zinc-800 rounded-lg p-4 
                 border border-zinc-700 
                 hover:border-violet-500 
                 transition-all duration-200 
                 shadow-md hover:shadow-violet-500/20"
    >
      {/* Header row */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-white text-lg">
          {task.title}
        </h3>

        {/* ✅ DRAG HANDLE ONLY */}
        <div
          {...listeners}
          {...attributes}
          className="cursor-grab active:cursor-grabbing text-zinc-400 hover:text-violet-400 text-sm"
        >
          ⠿
        </div>
      </div>

      <p className="text-sm text-zinc-400 mb-4">
        {task.description}
      </p>

      {/* Buttons row */}
      <div className="flex justify-between items-center">
<div className="flex gap-2">
  {prevColumn && (
    <button
      onClick={() =>
        dispatch({
          type: "MOVE_TASK",
          payload: {
            id: task.id,
            column: prevColumn,
          },
        })
      }
      className="px-3 py-1 text-xs rounded bg-zinc-700 hover:bg-zinc-600 transition"
    >
      Move to {prevColumn === "inprogress" ? "In Progress" : "Todo"}
    </button>
  )}
{/* etsest */}
  {nextColumn && (
    <button
      onClick={() =>
        dispatch({
          type: "MOVE_TASK",
          payload: {
            id: task.id,
            column: nextColumn,
          },
        })
      }
      className="px-3 py-1 text-xs rounded bg-violet-600 hover:bg-violet-700 transition"
    >
      Move to {nextColumn === "inprogress" ? "In Progress" : "Done"}
    </button>
  )}
</div>

        <button
          onClick={() =>
            dispatch({ type: "DELETE_TASK", payload: task.id })
          }
          className="text-red-400 hover:text-red-300 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
