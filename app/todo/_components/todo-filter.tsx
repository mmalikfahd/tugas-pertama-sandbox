"use client";

import { OPSI_FILTER, OPSI_PRIORITAS } from "@/data/todo";
import styles from "@/styles/todo.module.css";
import type { FilterPrioritas, FilterTodo } from "@/types/todo";

type TodoFilterProps = {
  filter: FilterTodo;
  onFilter: (filter: FilterTodo) => void;
  prioritas: FilterPrioritas;
  onPrioritas: (prioritas: FilterPrioritas) => void;
  kataCari: string;
  onCari: (kata: string) => void;
};

export default function TodoFilter({
  filter,
  onFilter,
  prioritas,
  onPrioritas,
  kataCari,
  onCari,
}: TodoFilterProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.filterGrup} role="group" aria-label="Filter status tugas">
        {OPSI_FILTER.map((opsi) => (
          <button
            key={opsi.nilai}
            type="button"
            onClick={() => onFilter(opsi.nilai)}
            aria-pressed={filter === opsi.nilai}
            className={`${styles.filter} ${filter === opsi.nilai ? styles.filterAktif : ""}`}
          >
            {opsi.label}
          </button>
        ))}
      </div>

      <div className={styles.pencarian}>
        <label htmlFor="cari-todo" className="sr-only">
          Cari tugas
        </label>
        <input
          id="cari-todo"
          type="search"
          value={kataCari}
          onChange={(event) => onCari(event.target.value)}
          placeholder="Cari judul atau kategori..."
          className={styles.input}
        />
      </div>

      <div className={styles.filterPrioritas}>
        <label htmlFor="filter-prioritas" className="sr-only">
          Filter prioritas
        </label>
        <select
          id="filter-prioritas"
          value={prioritas}
          onChange={(event) => onPrioritas(event.target.value as FilterPrioritas)}
          className={styles.input}
        >
          <option value="semua">Semua prioritas</option>
          {OPSI_PRIORITAS.map((opsi) => (
            <option key={opsi.nilai} value={opsi.nilai}>
              Prioritas {opsi.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
