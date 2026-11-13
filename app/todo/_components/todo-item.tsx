"use client";

import Link from "next/link";
import { memo } from "react";
import { LABEL_PRIORITAS } from "@/data/todo";
import { formatTanggal } from "@/lib/tanggal";
import styles from "@/styles/todo.module.css";
import type { Prioritas, Todo } from "@/types/todo";

const KELAS_PRIORITAS: Record<Prioritas, string> = {
  tinggi: styles.prioritasTinggi,
  sedang: styles.prioritasSedang,
  rendah: styles.prioritasRendah,
};

type TodoItemProps = {
  item: Todo;
  onToggle: (id: string) => void;
  onHapus: (id: string) => void;
};

function TodoItem({ item, onToggle, onHapus }: TodoItemProps) {
  return (
    <li className={`${styles.item} ${item.selesai ? styles.itemSelesai : ""}`}>
      <input
        type="checkbox"
        checked={item.selesai}
        onChange={() => onToggle(item.id)}
        className={styles.checkbox}
        aria-label={
          item.selesai ? `Tandai ${item.judul} belum selesai` : `Tandai ${item.judul} selesai`
        }
      />

      <div className={styles.isi}>
        <Link href={`/todo/${item.id}`} className={styles.judul}>
          {item.judul}
        </Link>

        <div className={styles.meta}>
          <span className={`${styles.badge} ${KELAS_PRIORITAS[item.prioritas]}`}>
            {LABEL_PRIORITAS[item.prioritas]}
          </span>
          <span className={styles.badge}>{item.kategori}</span>
          <span className={styles.badge}>Tenggat: {formatTanggal(item.tenggat)}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onHapus(item.id)}
        className={styles.hapus}
        aria-label={`Hapus ${item.judul}`}
      >
        Hapus
      </button>
    </li>
  );
}

export default memo(TodoItem);
