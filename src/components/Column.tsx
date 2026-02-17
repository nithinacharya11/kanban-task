import type { Task, ColumnType } from "../types";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

interface Props {
  column: ColumnType;
  tasks: Task[];
  dispatch: any;
}

const columnTitles: Record<ColumnType, string> = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

export default function Column({ column, tasks, dispatch }: Props) {
const { setNodeRef, isOver } = useDroppable({
  id: column,
});


  const columnTasks = tasks.filter((t) => t.column === column);

  return (
<div
  ref={setNodeRef}
  className={`bg-zinc-900/60 backdrop-blur-md 
                rounded-xl p-5 
                border border-zinc-800 
                min-h-[350px] 
                flex flex-col ${
    isOver ? "ring-2 ring-violet-500" : ""
  }`}
>

<h2 className="font-semibold text-lg mb-4 flex justify-between items-center text-white">
  {columnTitles[column]}
  <span className="text-xs bg-violet-600 px-3 py-1 rounded-full">
    {columnTasks.length}
  </span>
</h2>


      {columnTasks.length === 0 && (
<p className="text-zinc-500 text-sm italic">
  No tasks in this column
</p>

      )}

      <div className="flex flex-col gap-4">
        {columnTasks.map((task) => (
          <TaskCard key={task.id} task={task} dispatch={dispatch} />
        ))}
      </div>
    </div>
  );
}
