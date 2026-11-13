"use client";

import { memo, useState, type FormEvent } from "react";
import { KATEGORI_AWAL, OPSI_PRIORITAS } from "@/data/todo";
import styles from "@/styles/todo.module.css";
import type { DrafTodo, Prioritas } from "@/types/todo";

type TodoFormProps = {
  onTambah: (draf: DrafTodo) => void;
};

function TodoForm({ onTambah }: TodoFormProps) {
  const [judul, setJudul] = useState("");
  const [prioritas, setPrioritas] = useState<Prioritas>("sedang");
  const [kategori, setKategori] = useState(KATEGORI_AWAL[0] ?? "Umum");
  const [tenggat, setTenggat] = useState("");
  const [galat, setGalat] = useState("");

  function kirim(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const judulBersih = judul.trim();
    if (!judulBersih) {
      setGalat("Judul tugas wajib diisi.");
      return;
    }

    onTambah({
      judul: judulBersih,
      prioritas,
      kategori,
      tenggat: tenggat || null,
    });

    setJudul("");
    setTenggat("");
    setGalat("");
  }

  return (
    <form onSubmit={kirim} className={styles.form}>
      <div className={styles.medan}>
        <label htmlFor="judul-todo" className={styles.labelMedan}>
          Judul tugas
        </label>
        <input
          id="judul-todo"
          value={judul}
          onChange={(event) => {
            setJudul(event.target.value);
            if (galat) setGalat("");
          }}
          placeholder="Contoh: Kerjakan latihan Todo"
          className={styles.input}
          aria-invalid={galat ? true : undefined}
          aria-describedby={galat ? "galat-judul-todo" : undefined}
        />
        {galat ? (
          <p id="galat-judul-todo" role="alert" className={styles.galat}>
            {galat}
          </p>
        ) : null}
      </div>

      <div className={styles.medan}>
        <label htmlFor="prioritas-todo" className={styles.labelMedan}>
          Prioritas
        </label>
        <select
          id="prioritas-todo"
          value={prioritas}
          onChange={(event) => setPrioritas(event.target.value as Prioritas)}
          className={styles.input}
        >
          {OPSI_PRIORITAS.map((opsi) => (
            <option key={opsi.nilai} value={opsi.nilai}>
              {opsi.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.medan}>
        <label htmlFor="kategori-todo" className={styles.labelMedan}>
          Kategori
        </label>
        <select
          id="kategori-todo"
          value={kategori}
          onChange={(event) => setKategori(event.target.value)}
          className={styles.input}
        >
          {KATEGORI_AWAL.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.medan}>
        <label htmlFor="tenggat-todo" className={styles.labelMedan}>
          Tenggat
        </label>
        <input
          id="tenggat-todo"
          type="date"
          value={tenggat}
          onChange={(event) => setTenggat(event.target.value)}
          className={styles.input}
        />
      </div>

      <button type="submit" className={styles.tombolUtama}>
        Tambah tugas
      </button>
    </form>
  );
}

export default memo(TodoForm);
