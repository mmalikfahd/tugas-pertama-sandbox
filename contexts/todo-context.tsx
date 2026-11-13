"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { TODO_AWAL } from "@/data/todo";
import { bacaTodo, simpanTodo } from "@/lib/todo-storage";
import type { DrafTodo, Todo } from "@/types/todo";

type TodoContextValue = {
  todo: Todo[];
  jumlahAktif: number;
  jumlahSelesai: number;
  sudahDimuat: boolean;
  tambahTodo: (draf: DrafTodo) => void;
  toggleTodo: (id: string) => void;
  hapusTodo: (id: string) => void;
  ambilTodo: (id: string) => Todo | undefined;
};

const TodoContext = createContext<TodoContextValue | null>(null);

function buatId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `todo-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [daftar, setDaftar] = useState<Todo[]>(TODO_AWAL);
  const [siap, setSiap] = useState(false);

  useEffect(() => {
    const tersimpan = bacaTodo();
    if (tersimpan !== null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sinkronisasi localStorage setelah mount agar tidak hydration mismatch
      setDaftar(tersimpan);
    }
    setSiap(true);
  }, []);

  useEffect(() => {
    if (!siap) return;
    simpanTodo(daftar);
  }, [daftar, siap]);

  const tambahTodo = useCallback((draf: DrafTodo) => {
    const todoBaru: Todo = {
      id: buatId(),
      judul: draf.judul.trim(),
      selesai: false,
      prioritas: draf.prioritas,
      kategori: draf.kategori.trim() || "Umum",
      tenggat: draf.tenggat || null,
      dibuatPada: new Date().toISOString(),
    };

    setDaftar((sebelumnya) => [todoBaru, ...sebelumnya]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setDaftar((sebelumnya) =>
      sebelumnya.map((item) => (item.id === id ? { ...item, selesai: !item.selesai } : item)),
    );
  }, []);

  const hapusTodo = useCallback((id: string) => {
    setDaftar((sebelumnya) => sebelumnya.filter((item) => item.id !== id));
  }, []);

  const ambilTodo = useCallback((id: string) => daftar.find((item) => item.id === id), [daftar]);

  const jumlahAktif = useMemo(() => daftar.filter((item) => !item.selesai).length, [daftar]);
  const jumlahSelesai = useMemo(() => daftar.filter((item) => item.selesai).length, [daftar]);

  const value = useMemo(
    () => ({
      todo: daftar,
      jumlahAktif,
      jumlahSelesai,
      sudahDimuat: siap,
      tambahTodo,
      toggleTodo,
      hapusTodo,
      ambilTodo,
    }),
    [daftar, jumlahAktif, jumlahSelesai, siap, tambahTodo, toggleTodo, hapusTodo, ambilTodo],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos harus dipakai di dalam TodoProvider");
  }
  return context;
}
