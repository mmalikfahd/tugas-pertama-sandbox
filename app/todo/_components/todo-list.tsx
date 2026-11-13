"use client";

import styles from "@/styles/todo.module.css";
import type { Todo } from "@/types/todo";
import TodoItem from "./todo-item";

type TodoListProps = {
  daftar: Todo[];
  onToggle: (id: string) => void;
  onHapus: (id: string) => void;
};

export default function TodoList({ daftar, onToggle, onHapus }: TodoListProps) {
  if (daftar.length === 0) {
    return (
      <p className={styles.kosong}>
        Belum ada tugas yang cocok. Coba ubah filter atau tambahkan tugas baru.
      </p>
    );
  }

  return (
    <ul className={styles.daftar}>
      {daftar.map((item) => (
        <TodoItem key={item.id} item={item} onToggle={onToggle} onHapus={onHapus} />
      ))}
    </ul>
  );
}
