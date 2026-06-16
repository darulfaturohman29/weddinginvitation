# Undangan Digital Estetik - Update Desain

## Perubahan Desain yang Telah Dilakukan

Saya telah mengupdate undangan digital dengan desain yang lebih estetik sesuai permintaan Anda dengan palet warna yang indah dan dekorasi bunga yang canti.

### 🎨 Palet Warna Baru

Warna-warna yang digunakan telah diubah menjadi kombinasi yang lebih lembut dan elegan:

- **Cream**: `#f9f5f0` - Warna dasar yang hangat
- **Putih**: `#ffffff` - Warna kontras yang bersih
- **Soft Pink**: `#f0dce4` - Warna utama yang lembut dan romantis
- **Blush**: `#e8d0d9` - Warna pink yang lebih dalam
- **Rose**: `#d4a5af` - Warna accent untuk dekorasi
- **Rose Deep**: `#c08d98` - Warna untuk button dan elemen penting
- **Navy**: `#3d4a5f` - Warna teks utama yang gelap
- **Sage**: `#a8bba5` - Warna aksen untuk daun bunga

### 🌸 Elemen Dekorasi Bunga

#### Frame Bunga (FrameFlower)

- Bunga besar di tengah halaman dengan 8 kelopak utama dan 8 kelopak sekunder
- Menggunakan gradient untuk efek kedalaman
- Diameter frame diperluas menjadi 720px untuk tampilan yang lebih megah
- Animasi entrance yang smooth dari tengah ke tepi

#### Bunga Sudut (CornerFlower)

- Dua bunga dekoratif di sudut kanan atas dan kiri bawah halaman
- Desain yang lebih detail dengan daun-daun yang elegan
- Ukuran responsif hingga 45vw untuk tampilan mobile yang baik
- Animasi circular reveal yang menarik

#### Bunga di Cover Page

- Bunga dekoratif latar belakang pada halaman pembuka
- Opacity lebih rendah untuk tidak mengganggu teks
- Menciptakan suasana romantis sejak pembuka

### 🎯 Perubahan Komponen Utama

#### 1. **Divider**

- Garis pemisah dengan gradient yang lebih lembut
- Menggunakan warna `softpink` untuk tampilan yang kohesif
- Dot tengah menggunakan `rose` untuk aksen

#### 2. **Eyebrow (Label Seksi)**

- Warna diubah dari `rosedeep` menjadi `rose` untuk tampilan lebih lembut
- Typography tetap elegant dengan tracking yang baik

#### 3. **MusicButton**

- Border diubah ke warna `softpink` yang lebih subtle
- Efek hover ditambahkan untuk interaksi yang lebih baik
- Shadow yang lebih elegan

#### 4. **CouplePhoto**

- Border diubah ke `softpink` dengan opacity yang tepat
- Shadow diperbesar dengan warna yang sesuai dengan palet
- Background menggunakan `rose/10` untuk efek subtle

#### 5. **CountdownBlock**

- Background berubah ke `white/60` untuk contrast yang lebih baik
- Border menggunakan `softpink` untuk konsistensi
- Gradient bar atas menggunakan `softpink` → `rose` → `blush`
- Efek hover dengan shadow

#### 6. **Event Cards**

- Background berubah ke `white/70` untuk tampilan yang lebih bersih
- Border top menggunakan gradient yang indah
- Shadow ditambahkan untuk depth
- Hover effect dengan shadow yang lebih besar

#### 7. **RSVP Form**

- Input background berubah ke `white/70`
- Border menggunakan `softpink/50` untuk subtle look
- Focus state dengan shadow effect
- Button primary menggunakan `rosedeep` dengan hover effect

#### 8. **Story Timeline**

- Border timeline berubah ke `softpink` yang lebih lembut
- Timeline dot menggunakan `rose` dengan ring yang lebih tebal

### 🌅 Background & Styling

#### Body Background

- Gradient linear yang menggabungkan cream, white, dan softpink
- Fixed attachment untuk efek parallax
- Smooth transitions antara warna

#### Video Veil

- Overlay yang dioptimasi untuk readability
- Gradient yang lebih transparan dan elegan

#### Animasi Tambahan

- `floatUp`: Animasi float up untuk elemen bunga (3s)
- `sway`: Animasi gentle sway untuk bunga (4s)
- Bloom blur effect untuk depth

### 📱 Responsive Design

Semua elemen telah dioptimasi untuk:

- Desktop (full size)
- Tablet (medium screens)
- Mobile (small screens)

Bunga dan elemen dekorasi menggunakan `clamp()` dan viewport units untuk scalability sempurna.

## Cara Menjalankan Proyek

### Requirement

- Node.js (v16 atau lebih tinggi)
- npm atau yarn

### Instalasi

```bash
# Masuk ke folder proyek
cd undangan-react

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Server akan berjalan di `http://localhost:5173` (atau port yang ditampilkan di terminal)

### Build untuk Production

```bash
npm run build
```

Hasil build akan tersimpan di folder `dist/`

## Cara Menggunakan

### Mengubah Data Undangan

Edit file `src/App.jsx` dan ubah data dalam object `DATA`:

```javascript
const DATA = {
  dateText: "Sabtu, 11 Juli 2026",
  day: "11",
  month: "JULI",
  year: "2026",
  weekday: "SABTU",
  targetDate: "2026-07-11T08:00:00+07:00",

  groom: {
    name: "Nama Pengantin Pria",
    fullName: "Nama Lengkap Pengantin Pria, S.T.",
    photo: "/pria.jpg",
    parents: "Putra ke-X dari ...",
    ig: "https://instagram.com/...",
  },
  bride: {
    name: "Nama Pengantin Wanita",
    fullName: "Nama Lengkap Pengantin Wanita, S.I.Kom.",
    photo: "/wanita.jpg",
    parents: "Putri ke-X dari ...",
    ig: "https://instagram.com/...",
  },
  // ... dan data lainnya
};
```

### Upload File Aset

Letakkan file foto dan musik di folder `public/`:

- `pria.jpg` - Foto pengantin pria
- `wanita.jpg` - Foto pengantin wanita
- `video.mp4` - Video prewedding (opsional)
- `musik.mp3` - Musik latar (opsional)
- Foto-foto galeri: `prewedding-1.jpg`, `prewedding-2.jpg`, dst

### Setup RSVP Database (Opsional)

Lihat file `backend-rsvp/CARA-PASANG.md` untuk setup Google Apps Script yang terintegrasi dengan Google Sheets.

## Fitur

✨ **Fitur yang tersedia:**

- ✅ Halaman pembuka dengan animasi
- ✅ Countdown timer otomatis
- ✅ Galeri foto prewedding dengan lightbox
- ✅ Timeline cerita perjalanan cinta
- ✅ Form RSVP dengan validasi
- ✅ Musik latar otomatis
- ✅ Responsive design sempurna
- ✅ Animasi smooth dengan Framer Motion
- ✅ Styling dengan Tailwind CSS

## Tips Desain

1. **Foto berkualitas tinggi** - Gunakan foto dengan resolusi tinggi untuk hasil terbaik
2. **Video prewedding** - Tambahkan video untuk menciptakan kesan yang lebih mendalam
3. **Musik yang tepat** - Pilih musik yang sesuai dengan tema dan suasana undangan
4. **Customization warna** - Jika ingin mengubah warna, edit file `src/index.css` pada bagian `@theme`

## Support & Bantuan

Jika ada pertanyaan atau butuh bantuan lebih lanjut dalam customization, silahkan hubungi!

---

**Undangan digital ini dirancang dengan ❤️ untuk membuat acara spesial Anda lebih berkesan.**
