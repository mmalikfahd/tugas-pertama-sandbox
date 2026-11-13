import type { Prioritas, Todo } from "@/types/todo";

const KUNCI_PENYIMPANAN = "sandbox:todo";
const PRIORITAS_VALID: Prioritas[] = ["tinggi", "sedang", "rendah"];

function adalahTodo(nilai: unknown): nilai is Todo {
  if (typeof nilai !== "object" || nilai === null) return false;

  const data = nilai as Record<string, unknown>;

  return (
    typeof data.id === "string" &&
    typeof data.judul === "string" &&
    typeof data.selesai === "boolean" &&
    typeof data.prioritas === "string" &&
    PRIORITAS_VALID.includes(data.prioritas as Prioritas) &&
    typeof data.kategori === "string" &&
    (data.tenggat === null || typeof data.tenggat === "string") &&
    typeof data.dibuatPada === "string"
  );
}

export function bacaTodo(): Todo[] | null {
  if (typeof window === "undefined") return null;

  try {
    const mentah = window.localStorage.getItem(KUNCI_PENYIMPANAN);
    if (!mentah) return null;

    const data: unknown = JSON.parse(mentah);
    if (!Array.isArray(data)) return null;

    return data.filter(adalahTodo);
  } catch {
    return null;
  }
}

export function simpanTodo(daftar: Todo[]): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(KUNCI_PENYIMPANAN, JSON.stringify(daftar));
  } catch {
    // localStorage bisa penuh atau diblokir browser
  }
}
