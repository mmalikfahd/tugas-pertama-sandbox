"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { LABEL_PRIORITAS } from "@/data/todo";
import { useTodos } from "@/contexts/todo-context";
import { formatTanggal, formatWaktu } from "@/lib/tanggal";
import styles from "@/styles/todo.module.css";

export default function TodoDetail({ id }: { id: string }) {
  const { ambilTodo, toggleTodo, hapusTodo, sudahDimuat } = useTodos();
  const router = useRouter();
  const item = ambilTodo(id);

  if (!item && !sudahDimuat) {
    return (
      <div className={styles.halaman}>
        <p className={styles.kosong}>Memuat tugas...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className={styles.halaman}>
        <div className={styles.kosong}>
          <h1 className={styles.judulHalaman}>Tugas tidak ditemukan</h1>
          <p className={styles.deskripsi}>
            Tugas dengan id &ldquo;{id}&rdquo; tidak ada atau sudah dihapus.
          </p>
          <Link href="/todo" className={`${styles.tombolUtama} mt-4`}>
            Kembali ke daftar
          </Link>
        </div>
      </div>
    );
  }

  function tanganiHapus() {
    hapusTodo(id);
    router.push("/todo");
  }

  return (
    <div className={styles.halaman}>
      <Link href="/todo" className={styles.kembali}>
        ← Kembali ke daftar
      </Link>

      <article className={styles.detail}>
        <div className={styles.detailAtas}>
          <h1 className={styles.detailJudul}>{item.judul}</h1>
          <span className={item.selesai ? styles.statusSelesai : styles.statusAktif}>
            {item.selesai ? "Selesai" : "Aktif"}
          </span>
        </div>

        <dl className={styles.detailGrid}>
          <div>
            <dt className={styles.detailLabel}>Prioritas</dt>
            <dd>{LABEL_PRIORITAS[item.prioritas]}</dd>
          </div>
          <div>
            <dt className={styles.detailLabel}>Kategori</dt>
            <dd>{item.kategori}</dd>
          </div>
          <div>
            <dt className={styles.detailLabel}>Tenggat</dt>
            <dd>{formatTanggal(item.tenggat)}</dd>
          </div>
          <div>
            <dt className={styles.detailLabel}>Dibuat</dt>
            <dd>{formatWaktu(item.dibuatPada)}</dd>
          </div>
        </dl>

        <div className={styles.aksi}>
          <button type="button" onClick={() => toggleTodo(item.id)} className={styles.tombolUtama}>
            {item.selesai ? "Tandai belum selesai" : "Tandai selesai"}
          </button>
          <button type="button" onClick={tanganiHapus} className={styles.hapus}>
            Hapus tugas
          </button>
        </div>
      </article>
    </div>
  );
}
