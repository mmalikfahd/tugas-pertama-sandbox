# Sand Box — Latihan Next.js

Project latihan Next.js 16 (App Router) yang melanjutkan tugas pertemuan 01–05 dan menambahkan
aplikasi Todo dari materi pertemuan 06.

## Menjalankan project

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Perintah pemeriksaan:

```bash
npm run lint
npx prettier --write app components contexts data lib types styles
npx tsc --noEmit
npm run build
```

## Halaman yang tersedia

| Alamat        | Isi                                                                 |
| ------------- | ------------------------------------------------------------------- |
| `/`           | Beranda Hikmah, jadwal sholat, tombol favorit                       |
| `/tentang`    | Profil singkat                                                      |
| `/kontak`     | Informasi kontak                                                    |
| `/blog`       | Daftar tulisan dengan pencarian                                     |
| `/blog/[slug]`| Halaman detail tulisan + tombol suka dan favorit                    |
| `/demo`       | Demo penghitung                                                     |
| `/todo`       | Aplikasi Todo                                                       |
| `/todo/[id]`  | Halaman detail tugas                                                |

## Fitur Todo

Fitur dasar:

- Tambah tugas lewat form.
- Tandai tugas selesai / belum selesai.
- Hapus tugas.
- Data disimpan di `localStorage` sehingga tetap ada setelah halaman dimuat ulang.
- Halaman detail dinamis di `/todo/[id]`.
- Tautan Todo di menu umum, lengkap dengan jumlah tugas yang belum selesai.

Fitur tambahan yang dipilih:

1. **Prioritas** — tinggi, sedang, rendah. Bisa difilter.
2. **Kategori** — Umum, Belajar, Pekerjaan, Pribadi.
3. **Tenggat** — tanggal batas tugas, ditampilkan di daftar dan halaman detail.
4. **Pencarian** — mencari berdasarkan judul atau kategori.
5. **Statistik** — jumlah total, belum selesai, dan selesai.

## Struktur folder

```text
app/
├── layout.tsx                  # root layout + semua provider + Header
├── globals.css                 # Tailwind + variabel warna tema
├── page.tsx                    # beranda Hikmah
├── blog/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── [slug]/page.tsx
│   ├── [slug]/_components/like-button.tsx
│   └── _components/
│       ├── daftar-tulisan.tsx
│       └── kotak-cari.tsx
├── demo/
│   ├── page.tsx
│   └── _components/penghitung.tsx
├── kontak/page.tsx
├── tentang/page.tsx
├── _components/prayer-times.tsx
└── todo/
    ├── layout.tsx
    ├── page.tsx
    ├── [id]/page.tsx
    └── _components/
        ├── todo-app.tsx
        ├── todo-form.tsx
        ├── todo-filter.tsx
        ├── todo-list.tsx
        ├── todo-item.tsx
        └── todo-detail.tsx

components/
├── header.tsx                  # header umum
├── menu.tsx                    # menu umum + badge jumlah tugas aktif
└── tombol-favorit.tsx

contexts/
├── favorit-context.tsx
├── tema-context.tsx
└── todo-context.tsx            # TodoProvider + useTodos

data/todo.ts                    # data contoh + opsi filter/prioritas/kategori
lib/
├── tanggal.ts                  # format tanggal Indonesia
└── todo-storage.ts             # baca/simpan localStorage + validasi data

types/todo.ts                   # Todo, DrafTodo, Prioritas, FilterTodo
styles/todo.module.css          # CSS Module khusus Todo
```

## Alasan susunan state

- **`TodoProvider` diletakkan di `app/layout.tsx`** agar daftar tugas bisa dibaca oleh halaman
  daftar, halaman detail, dan `components/menu.tsx` sekaligus. Ini juga memenuhi tantangan
  tambahan: menu umum menampilkan jumlah tugas yang belum selesai dari Context yang sama.
- **`TodoApp` menyimpan state UI sementara** (`filter`, `prioritas`, `kataCari`). State ini hanya
  dibutuhkan halaman daftar, jadi tidak perlu masuk ke Context.
- **`useMemo`** dipakai untuk menghitung daftar yang sudah difilter dan statistik jumlah tugas.
  Perhitungan hanya diulang ketika data atau filter berubah.
- **`useCallback`** dipakai untuk `tanganiTambah`, `tanganiToggle`, dan `tanganiHapus` supaya
  referensi fungsi tetap stabil. `TodoItem` dan `TodoForm` dibungkus `memo`, jadi callback yang
  stabil mencegah render ulang yang tidak perlu.
- **`lib/todo-storage.ts`** memisahkan logika baca/tulis `localStorage` dari komponen. Data yang
  dibaca divalidasi dulu agar data rusak tidak merusak aplikasi.
- Pembacaan `localStorage` dilakukan di `useEffect` setelah mount, lalu penulisan baru aktif
  setelah proses baca selesai. Pola ini menghindari hydration mismatch antara render server dan
  browser.

## Catatan

- Data Todo memakai kunci `sandbox:todo`, tema memakai `sandbox:tema`, dan favorit memakai
  `sandbox:favorit`.
- Jadwal sholat mengambil data dari API Aladhan, jadi perlu koneksi internet.
- Halaman dan fitur dari tugas sebelumnya (blog, tentang, kontak, demo, jadwal sholat, tema,
  favorit) tetap tersedia dan sudah diperbaiki import-nya.