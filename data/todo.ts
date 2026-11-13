import type { FilterTodo, Prioritas, Todo } from "@/types/todo";

export const TODO_AWAL: Todo[] = [
  {
    id: "contoh-1",
    judul: "Baca materi Context API",
    selesai: false,
    prioritas: "tinggi",
    kategori: "Belajar",
    tenggat: "2026-11-14",
    dibuatPada: "2026-11-12T08:00:00.000Z",
  },
  {
    id: "contoh-2",
    judul: "Rapikan struktur folder tugas",
    selesai: true,
    prioritas: "sedang",
    kategori: "Belajar",
    tenggat: "2026-11-13",
    dibuatPada: "2026-11-11T10:30:00.000Z",
  },
  {
    id: "contoh-3",
    judul: "Belanja kebutuhan mingguan",
    selesai: false,
    prioritas: "rendah",
    kategori: "Pribadi",
    tenggat: "2026-11-16",
    dibuatPada: "2026-11-10T14:15:00.000Z",
  },
  {
    id: "contoh-4",
    judul: "Olahraga pagi 30 menit",
    selesai: true,
    prioritas: "rendah",
    kategori: "Pribadi",
    tenggat: null,
    dibuatPada: "2026-11-09T06:00:00.000Z",
  },
];

export const OPSI_FILTER: { nilai: FilterTodo; label: string }[] = [
  { nilai: "semua", label: "Semua" },
  { nilai: "aktif", label: "Belum selesai" },
  { nilai: "selesai", label: "Selesai" },
];

export const OPSI_PRIORITAS: { nilai: Prioritas; label: string }[] = [
  { nilai: "tinggi", label: "Tinggi" },
  { nilai: "sedang", label: "Sedang" },
  { nilai: "rendah", label: "Rendah" },
];

export const LABEL_PRIORITAS: Record<Prioritas, string> = {
  tinggi: "Tinggi",
  sedang: "Sedang",
  rendah: "Rendah",
};

export const KATEGORI_AWAL = ["Umum", "Belajar", "Pekerjaan", "Pribadi"];
