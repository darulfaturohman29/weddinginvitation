# Panduan Tampilan — Undangan Pernikahan Digital

Dokumen ini menjelaskan **apa saja yang dibutuhkan agar undangan ini tampil baik.**
Penentu utama bukan kode, melainkan **kualitas aset**: video, foto, dan bunga PNG.
Kode hanya menampung — aset jelek tetap menghasilkan tampilan jelek.

Konteks penting: **mayoritas tamu membuka undangan di HP lewat WhatsApp**, sering
dengan koneksi seluler. Semua keputusan di bawah berpijak pada itu.

---

## 1. Video Latar (`public/video.mp4`)

Bagian paling menentukan kesan pertama, sekaligus paling sering salah.

| Aspek      | Ketentuan                                                              |
|------------|------------------------------------------------------------------------|
| Terang     | **WAJIB terang/lembut** (bokeh putih, kelopak, cahaya halus). Tema blush memakai veil krem terang; video gelap akan terlihat kusam abu-abu. |
| Format     | MP4 (codec H.264).                                                     |
| Resolusi   | 1080p (1920×1080) cukup; 720p bila ingin lebih ringan.                |
| Durasi     | 8–15 detik, gerakan halus agar mulus saat di-loop (hindari potongan tajam). |
| Ukuran     | **Target < 5MB** (idealnya 2–4MB). Ini wajib dikompres.               |
| Audio      | Dibuang — video di-`muted` (tanpa `muted`, iPhone menolak autoplay).  |

Contoh kompres dengan ffmpeg (skala 1280px, buang audio, potong 12 detik):

```bash
ffmpeg -i asli.mp4 -vf scale=1280:-2 -an -t 12 -crf 30 video.mp4
```

Alternatif tanpa perintah: aplikasi **HandBrake** (gratis).
Atribut `muted/loop/autoplay/playsInline` sudah dipasang di kode — jangan diubah.

---

## 2. Bunga PNG (`public/bunga-*.png`)

| File                     | Isi                                            | Lebar ideal | Ukuran   |
|--------------------------|------------------------------------------------|-------------|----------|
| `bunga-frame.png`        | Rangkaian pembingkai nama, tengah kosong       | 1200–1600px | < 500KB  |
| `bunga-sudut-kanan.png`  | Rangkaian pojok kanan-atas                     | 700–900px   | < 400KB  |
| `bunga-sudut-kiri.png`   | **Versi flip horizontal** dari yang kanan      | 700–900px   | < 400KB  |

- **Wajib PNG transparan.** Jangan pakai `.jpg` — JPG punya latar putih solid yang
  akan muncul sebagai kotak putih di atas video.
- Kompres PNG transparan dengan **TinyPNG** (tanpa merusak transparansi).
- Animasi mekar (clip-path) sudah di kode; PNG hanya perlu memenuhi syarat di atas.

---

## 3. Foto Mempelai (`public/wanita.jpg`, `public/pria.jpg`)

| Aspek    | Ketentuan                                                          |
|----------|--------------------------------------------------------------------|
| Rasio    | **Potret 3:4** (mis. 600×800 atau 900×1200 px).                    |
| Crop     | Bingkai memakai `object-cover` + tepi atas melengkung. Foto landscape akan terpotong di sisi — crop ke potret dulu. |
| Komposisi| Wajah jangan terlalu mepet ke tepi atas (bisa kena lengkungan).    |
| Ukuran   | < 300KB per foto.                                                  |

Bila foto belum ada, kotak otomatis menampilkan **inisial nama** — layout tetap rapi.

---

## 4. Galeri Prewedding (`public/prewedding-*.jpg`)

| Aspek    | Ketentuan                                                          |
|----------|--------------------------------------------------------------------|
| Rasio    | Tile tampil 4:5; rasio foto bebas, tapi konsisten lebih rapi.      |
| Lebar    | Maks ~1600px (lightbox tidak perlu lebih besar dari layar).        |
| Ukuran   | **< 400KB per foto** — ini krusial. Foto mentah bisa 5–10MB/foto.  |
| Jumlah   | 6–12 foto ideal. Lebih banyak = beban makin berat.                 |

- Sudah `loading="lazy"`: foto dimuat saat discroll, bukan sekaligus.
- Tambah/kurang foto cukup ubah array `gallery` di `src/App.jsx`.
- Lightbox: klik foto untuk perbesar; navigasi panah ‹ ›, tombol Esc, atau klik di luar untuk menutup.

---

## 5. Tipografi

- Font (Cormorant Garamond + Pinyon Script) dimuat dari Google Fonts via `<link>`
  di `index.html` — **butuh koneksi internet** saat halaman dibuka.
- Untuk tampil lebih cepat / bisa offline, font bisa di-*self-host* (taruh file
  font di `public/` dan `@font-face` di `src/index.css`). Opsional, tingkat lanjut.

---

## 6. Warna & Keterbacaan

- Palet: ivory/krem (latar) · dusty rose (aksen) · sage (hijau daun) · navy (nama/judul).
- Veil krem terang di atas video menjaga teks gelap tetap terbaca.
- **Jika mengganti video ke gelap, warna teks harus ikut diubah** (mis. ke krem),
  jika tidak teks akan tenggelam. Palet diatur lewat blok `@theme` di `src/index.css`.

---

## 7. Performa (target ukuran)

Penentu kecepatan di HP tamu adalah **video + foto**, bukan kode.

- Target muatan halaman pertama: **< 3MB** (video + bunga + 2 foto mempelai).
  Foto galeri lazy-load, tidak dihitung di awal.
- Kode JS aplikasi ~270KB (89KB gzip) — kecil dibanding aset media.
- Urutan prioritas kompres: **video → foto galeri → bunga PNG**.

---

## 8. Responsif & Pengujian

- **Selalu tes di HP sungguhan**, bukan hanya desktop. Sebagian besar tamu pakai HP.
- Periksa: nama panjang tidak terpotong, foto mempelai tidak ke-crop aneh,
  galeri rapi 2 kolom, lightbox bisa ditutup.
- `prefers-reduced-motion` dihormati: pengguna yang mematikan animasi di perangkatnya
  mendapat versi fade sederhana, bukan layar kosong.

---

## 9. Mengganti Isi

Semua teks (nama, tanggal, orang tua, story, acara, nomor WhatsApp, ayat) ada di
objek **`DATA`** paling atas `src/App.jsx`. Ubah di situ saja — layout tidak perlu disentuh.

---

## 10. Menerbitkan (Deploy)

```bash
npm run build      # menghasilkan folder dist/
```

- **Netlify**: seret-lepas folder `dist/` ke situs Netlify (gratis), atau hubungkan repo.
- **Vercel**: impor repo, otomatis terdeteksi sebagai proyek Vite.
- Domain kustom (mis. `andini-bagas.com`) opsional, diatur di panel hosting.

> Catatan: file React mentah tidak bisa dibuka tamu dengan klik dua kali.
> Tamu hanya membuka **hasil deploy** (link hosting). `npm run dev` hanya untukmu saat menyunting.

---

## Checklist tampilan baik

- [ ] Video terang, < 5MB, tanpa audio, gerakan halus
- [ ] Semua bunga PNG **transparan** (bukan JPG), sudah dikompres
- [ ] `bunga-sudut-kiri.png` = flip horizontal dari yang kanan
- [ ] Foto mempelai potret 3:4, wajah tidak mepet tepi, < 300KB
- [ ] Foto galeri < 400KB masing-masing, 6–12 foto
- [ ] Isi `DATA` sudah diganti dari contoh ke data asli (termasuk tahun story)
- [ ] Nomor WhatsApp benar (format 62..., tanpa +)
- [ ] Diuji di HP sungguhan
- [ ] Sudah `npm run build` dan di-deploy

---

## 11. Musik Latar (`public/musik.mp3`)

- Format **MP3**, target **< 3MB** (idealnya 1–2MB). Potong/loop bagian yang enak.
- Gunakan musik yang **kamu punya haknya atau bebas royalti** — ini situs publik.
- **Tidak bisa autoplay bersuara.** Browser memblokirnya; musik mulai pada **sentuhan
  pertama** pengunjung. Ada tombol nyala/matikan mengambang di pojok kanan-bawah.
- Bila file tidak ada, tombol musik otomatis disembunyikan.

## 12. RSVP Database

Frontend statis tidak bisa langsung ke database, jadi RSVP mengirim ke **Google Sheet**
lewat Apps Script. Lihat **`backend-rsvp/CARA-PASANG.md`** untuk langkah lengkap.
Ringkas: buat Sheet > tempel `Code.gs` > Deploy sebagai Web app (Anyone) > salin URL >
isi `rsvpEndpoint` di `DATA`. Selama `rsvpEndpoint` kosong, RSVP otomatis memakai
WhatsApp sebagai cadangan.

## 13. Layar "Buka Undangan" & Link Tamu

- Undangan dibuka dengan layar pembuka. Saat tamu menekan **Buka Undangan**, layar
  tersibak ke atas, isi undangan tampil, **dan musik mulai** (tap inilah yang memenuhi
  syarat gesture browser untuk memutar audio). Selama layar pembuka tampil, scroll dikunci.
- **Link personal per tamu:** tambahkan `?tamu=Nama` di akhir URL.
  Contoh: `https://situs-kamu.com/?tamu=Budi+Santoso` akan menampilkan
  "Kepada Yth. Budi Santoso". Gunakan `+` atau `%20` untuk spasi.
  Tanpa parameter, tampil "Bapak/Ibu/Saudara/i".
