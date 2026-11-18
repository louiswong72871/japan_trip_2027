import { useEffect, useState } from "react";
import {
  TODO_STORAGE_KEY,
  type TodoItem,
  readTodos,
} from "../data/todos";

export function useTodos() {
  const [todos, setTodos] = useState<TodoItem[]>(readTodos);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    try {
      window.localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    } catch {
      /* ignore quota / private mode */
    }
  }, [todos]);

  const addTodo = () => {
    const text = draft.trim();
    if (text === "") {
      return;
    }
    setTodos((current) => [
      ...current,
      { id: `todo-${Date.now()}`, text, done: false },
    ]);
    setDraft("");
  };

  const toggleTodo = (id: string) => {
    setTodos((current) =>
      current.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  };

  return { todos, draft, setDraft, addTodo, toggleTodo };
}
