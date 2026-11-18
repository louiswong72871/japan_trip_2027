import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { DayId } from "../data/pages";
import {
  TODO_STORAGE_KEY,
  type TodoItem,
  readTodos,
} from "../data/todos";

type TodosContextValue = {
  todos: TodoItem[];
  addTodo: (day: DayId, text: string) => void;
  toggleTodo: (id: string) => void;
  todosForDay: (day: DayId) => TodoItem[];
};

const TodosContext = createContext<TodosContextValue | null>(null);

export function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<TodoItem[]>(readTodos);

  useEffect(() => {
    try {
      window.localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    } catch {
      /* ignore quota / private mode */
    }
  }, [todos]);

  const addTodo = useCallback((day: DayId, text: string) => {
    const value = text.trim();
    if (value === "") {
      return;
    }
    setTodos((current) => [
      ...current,
      { id: `todo-${Date.now()}`, text: value, done: false, days: [day] },
    ]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((current) =>
      current.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  }, []);

  const todosForDay = useCallback(
    (day: DayId) => {
      const items = todos.filter((item) => item.days.includes(day));
      return [
        ...items.filter((item) => !item.done),
        ...items.filter((item) => item.done),
      ];
    },
    [todos],
  );

  const value = useMemo(
    () => ({ todos, addTodo, toggleTodo, todosForDay }),
    [todos, addTodo, toggleTodo, todosForDay],
  );

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
}

export function useTodos() {
  const value = useContext(TodosContext);
  if (!value) {
    throw new Error("useTodos must be used within TodosProvider");
  }
  return value;
}
