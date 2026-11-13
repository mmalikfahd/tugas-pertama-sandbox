export type Prioritas = "tinggi" | "sedang" | "rendah";

export type FilterTodo = "semua" | "aktif" | "selesai";

export type FilterPrioritas = Prioritas | "semua";

export interface Todo {
  id: string;
  judul: string;
  selesai: boolean;
  prioritas: Prioritas;
  kategori: string;
  tenggat: string | null;
  dibuatPada: string;
}

export interface DrafTodo {
  judul: string;
  prioritas: Prioritas;
  kategori: string;
  tenggat: string | null;
}
