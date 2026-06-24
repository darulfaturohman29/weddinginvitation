# Cara Memasang Backend Ucapan (Google Sheet)

Tujuan: setiap ucapan yang dikirim tamu tersimpan ke Google Sheet dan
ditampilkan kembali saat halaman undangan dibuka.

## Langkah

1. **Buat Spreadsheet** baru di Google Sheets (mis. "Ucapan Pernikahan").
2. Di spreadsheet itu, buka menu **Extensions > Apps Script**.
3. Hapus kode contoh, lalu **tempel seluruh isi `Code.gs`** dari folder ini. Simpan.
4. Klik **Deploy > New deployment**.
   - Klik ikon gerigi > pilih **Web app**.
   - **Execute as:** *Me* (akun kamu).
   - **Who has access:** *Anyone*.
   - Klik **Deploy**, beri izin saat diminta.
5. **Salin "Web app URL"** yang muncul (berakhiran `/exec`).
6. Buka file **`.env`** di root proyek, isi:

   ```
   VITE_UCAPAN_SCRIPT_URL=TEMPEL_URL_DI_SINI
   ```

7. `npm run dev` lalu coba kirim ucapan. Cek spreadsheet — baris baru
   akan muncul di tab **Ucapan**.
8. Saat halaman di-refresh, semua ucapan yang tersimpan akan tampil kembali.

## Cara kerja

| Aksi              | URL yang dipanggil                                  |
|-------------------|-----------------------------------------------------|
| Baca semua ucapan | `GET /exec`                                         |
| Simpan ucapan     | `GET /exec?action=save&nama=...&ucapan=...`         |

Keduanya menggunakan GET agar tidak ada masalah CORS/redirect dari browser.

## Catatan

- URL endpoint tertanam di frontend — hanya bisa **menambah dan membaca** baris,
  tidak bisa menghapus, jadi aman untuk dibuka publik.
- Jika mengubah `Code.gs`, **deploy ulang** (Deploy > Manage deployments >
  edit > New version) agar perubahan aktif.
