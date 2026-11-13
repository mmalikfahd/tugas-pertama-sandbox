export default function KotakCari({
  nilai,
  saatBerubah,
  placeholder = "Cari tulisan...",
}: {
  nilai: string;
  saatBerubah: (teks: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="sr-only">Cari tulisan</span>
      <input
        value={nilai}
        onChange={(e) => saatBerubah(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[var(--garis)] bg-[var(--kartu)] px-3 py-2 text-sm outline-none placeholder:text-[var(--teks-lembut)] focus:border-[var(--aksen)]"
      />
    </label>
  );
}
