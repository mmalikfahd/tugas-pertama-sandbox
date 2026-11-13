"use client";

import { useCallback, useMemo, useState } from "react";
import { useTodos } from "@/contexts/todo-context";
import styles from "@/styles/todo.module.css";
import type { DrafTodo, FilterPrioritas, FilterTodo } from "@/types/todo";
import TodoFilter from "./todo-filter";
import TodoForm from "./todo-form";
import TodoList from "./todo-list";

export default function TodoApp() {
  const { todo, jumlahAktif, jumlahSelesai, tambahTodo, toggleTodo, hapusTodo } = useTodos();
  const [filter, setFilter] = useState<FilterTodo>("semua");
  const [prioritas, setPrioritas] = useState<FilterPrioritas>("semua");
  const [kataCari, setKataCari] = useState("");

  const daftarTampil = useMemo(() => {
    const kata = kataCari.trim().toLowerCase();

    return todo.filter((item) => {
      const cocokStatus = filter === "semua" || (filter === "aktif" ? !item.selesai : item.selesai);
      const cocokPrioritas = prioritas === "semua" || item.prioritas === prioritas;
      const cocokKata =
        kata === "" ||
        item.judul.toLowerCase().includes(kata) ||
        item.kategori.toLowerCase().includes(kata);

      return cocokStatus && cocokPrioritas && cocokKata;
    });
  }, [todo, filter, prioritas, kataCari]);

  const tanganiTambah = useCallback(
    (draf: DrafTodo) => {
      tambahTodo(draf);
      setFilter("semua");
      setPrioritas("semua");
      setKataCari("");
    },
    [tambahTodo],
  );

  const tanganiToggle = useCallback((id: string) => toggleTodo(id), [toggleTodo]);
  const tanganiHapus = useCallback((id: string) => hapusTodo(id), [hapusTodo]);

  return (
    <div className={styles.halaman}>
      <header className={styles.hero}>
        <p className={styles.label}>Tugas pertemuan 06</p>
        <h1 className={styles.judulHalaman}>Aplikasi Todo</h1>
        <p className={styles.deskripsi}>
          Kelola tugas harian dengan prioritas, kategori, dan tenggat. Semua perubahan disimpan
          otomatis di <code>localStorage</code> browser.
        </p>

        <div className={styles.ringkasan}>
          <div className={styles.statistik}>
            <span className={styles.angka}>{todo.length}</span>
            <span className={styles.label}>Total tugas</span>
          </div>
          <div className={styles.statistik}>
            <span className={styles.angka}>{jumlahAktif}</span>
            <span className={styles.label}>Belum selesai</span>
          </div>
          <div className={styles.statistik}>
            <span className={styles.angka}>{jumlahSelesai}</span>
            <span className={styles.label}>Selesai</span>
          </div>
        </div>
      </header>

      <section className={styles.panel} aria-labelledby="judul-tambah-todo">
        <h2 id="judul-tambah-todo" className={styles.judulBagian}>
          Tambah tugas
        </h2>
        <TodoForm onTambah={tanganiTambah} />
      </section>

      <section className={styles.panel} aria-labelledby="judul-daftar-todo">
        <h2 id="judul-daftar-todo" className={styles.judulBagian}>
          Daftar tugas
        </h2>
        <TodoFilter
          filter={filter}
          onFilter={setFilter}
          prioritas={prioritas}
          onPrioritas={setPrioritas}
          kataCari={kataCari}
          onCari={setKataCari}
        />
        <p className={styles.infoHasil} aria-live="polite">
          Menampilkan {daftarTampil.length} dari {todo.length} tugas.
        </p>
        <TodoList daftar={daftarTampil} onToggle={tanganiToggle} onHapus={tanganiHapus} />
      </section>
    </div>
  );
}
