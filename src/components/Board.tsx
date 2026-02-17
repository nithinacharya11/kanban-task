import type { Task, ColumnType } from "../types";
import Column from "./Column";
import { DndContext, closestCenter } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";

interface Props {
  tasks: Task[];
  dispatch: any;
}

export default function Board({ tasks, dispatch }: Props) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newColumn = over.id as ColumnType;

    dispatch({
      type: "MOVE_TASK",
      payload: { id: taskId, column: newColumn },
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div
        className="grid gap-6 mt-10 
                grid-cols-1 
                sm:grid-cols-2 
                lg:grid-cols-3"
      >
        <Column column="todo" tasks={tasks} dispatch={dispatch} />
        <Column column="inprogress" tasks={tasks} dispatch={dispatch} />
        <Column column="done" tasks={tasks} dispatch={dispatch} />
      </div>
    </DndContext>
  );
}
