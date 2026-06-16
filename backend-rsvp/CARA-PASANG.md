# Cara Memasang RSVP Database (Google Sheet)

Tujuan: form RSVP di undangan mengirim data (nama, kehadiran, jumlah, ucapan)
ke sebuah Google Sheet yang bisa kamu buka kapan saja. Gratis, tanpa server.

## Langkah

1. **Buat Spreadsheet** baru di Google Sheets (beri nama mis. "RSVP Pernikahan").
2. Di spreadsheet itu, buka menu **Extensions > Apps Script**.
3. Hapus kode contoh, lalu **tempel seluruh isi `Code.gs`** dari folder ini. Simpan.
4. Klik **Deploy > New deployment**.
   - Klik ikon gerigi > pilih **Web app**.
   - **Execute as:** *Me* (akun kamu).
   - **Who has access:** *Anyone*.
   - Klik **Deploy**, beri izin saat diminta.
5. **Salin "Web app URL"** yang muncul (berakhiran `/exec`).
6. Buka `src/App.jsx`, di objek `DATA`, isi:

   ```js
   rsvpEndpoint: "TEMPEL_URL_DI_SINI",
   ```

7. `npm run dev` lalu coba kirim form. Cek spreadsheet — baris baru akan muncul
   di tab **RSVP**.

## Batasan yang perlu diketahui

- Form mengirim dengan metode **`no-cors`** (fire-and-forget): baris tetap tertulis
  ke Sheet, tetapi browser **tidak bisa membaca balasan server**. Karena itu form
  menampilkan "sukses" secara optimistis. Setelah uji coba pertama, **pastikan baris
  benar-benar masuk** ke spreadsheet.
- Endpoint bersifat publik (tertanam di kode frontend). Apps Script ini hanya
  **menambah baris**, tidak mengembalikan data tamu lain, jadi aman untuk RSVP.
- Jika kamu mengubah `Code.gs`, **deploy ulang** (Deploy > Manage deployments >
  edit > New version) agar perubahan aktif.

## Alternatif (jika butuh lebih)

- **Supabase / Firebase**: database sungguhan + dashboard, ada free tier. Pakai bila
  ingin query, autentikasi, atau menampilkan ucapan tamu secara langsung di halaman.
- **Formspree / Getform**: ganti `rsvpEndpoint` dengan endpoint mereka; tanpa Apps Script.
