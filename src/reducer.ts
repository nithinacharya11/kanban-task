import type { State, Task, ColumnType } from "./types";

type Action =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "MOVE_TASK"; payload: { id: string; column: ColumnType } }
  | { type: "LOAD_TASKS"; payload: Task[] };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TASK":
      return { tasks: [...state.tasks, action.payload] };

    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

    case "MOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, column: action.payload.column }
            : task,
        ),
      };

    case "LOAD_TASKS":
      return { tasks: action.payload };

    default:
      return state;
  }
}
