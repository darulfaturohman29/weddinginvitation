# Undangan Pernikahan — React + Vite + Tailwind + Framer Motion

Undangan pernikahan digital dengan video background dan animasi bunga mekar (clip-path).

## Cara menjalankan di komputer lokal

1. Pasang **Node.js** (versi 18 ke atas) dari https://nodejs.org — sekali saja.
2. Buka terminal di folder ini, lalu:

   ```bash
   npm install      # unduh dependency (sekali saja)
   npm run dev      # jalankan server pengembangan
   ```

3. Buka alamat yang muncul di terminal (biasanya http://localhost:5173).

### Membuat versi siap-unggah (hosting)

   ```bash
   npm run build    # hasilnya di folder dist/
   npm run preview  # mengintip hasil build secara lokal
   ```

   Isi folder `dist/` itulah yang diunggah ke hosting (Netlify, Vercel, GitHub Pages, dll).

## Menaruh aset (gambar & video)

Letakkan file berikut di dalam folder **`public/`** dengan nama PERSIS:

| File                      | Isi                                                        |
|---------------------------|------------------------------------------------------------|
| `video.mp4`               | Video latar (TERANG/lembut). Kompres < 5MB, 720–1080p.     |
| `bunga-frame.png`         | Bunga pembingkai nama (PNG transparan).                    |
| `bunga-sudut-kanan.png`   | Bunga pojok kanan-atas (PNG transparan).                   |
| `bunga-sudut-kiri.png`    | Versi dibalik horizontal untuk pojok kiri-bawah.           |

Kalau sebuah file belum ada, elemennya otomatis disembunyikan—layout tetap rapi.

## Mengubah isi

Semua teks (nama, tanggal, lokasi, nomor WhatsApp, ayat) ada di objek `DATA`
di bagian atas `src/App.jsx`. Cukup ubah di situ; layout tidak perlu disentuh.

## Bagian yang tersedia

Hero · Ayat · **Mempelai (foto pria & wanita)** · **Our Story (timeline)** ·
Countdown · Rangkaian Acara · **Galeri Prewedding (klik untuk perbesar)** · RSVP · Penutup

- Foto mempelai: `wanita.jpg` & `pria.jpg` di `public/`. Kalau kosong, otomatis jadi inisial nama.
- Galeri: ubah daftar foto pada array `gallery` di `src/App.jsx`. Klik foto untuk lightbox; navigasi dengan panah ‹ ›, tombol Esc, atau klik di luar untuk menutup.
- Data mempelai, story, acara, dll. semuanya di objek `DATA` paling atas `src/App.jsx`.

## Dokumentasi tampilan

Lihat **DOKUMENTASI.md** untuk spesifikasi aset (video, foto, bunga), target ukuran file, dan checklist tampilan baik.

## RSVP database & musik

- **Musik**: taruh `musik.mp3` di `public/`. Mulai pada sentuhan pertama; ada tombol on/off di pojok.
- **RSVP ke Google Sheet**: ikuti **backend-rsvp/CARA-PASANG.md**, lalu isi `rsvpEndpoint` di `DATA`.
# weddinginvitation
