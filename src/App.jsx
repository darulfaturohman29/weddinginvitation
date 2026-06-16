import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { text } from "framer-motion/client";

/* ============================================================
   DATA UNDANGAN — ubah di sini saja
   ============================================================ */
const DATA = {
  dateText: "Sabtu, 11 Juli 2026",
  day: "11",
  month: "JULI",
  year: "2026",
  weekday: "SABTU",
  targetDate: "2026-07-11T08:00:00+07:00",

  groom: {
    name: "Darul",
    fullName: "Darul Faturohman, S.T.",
    photo: "/pria.jpg",
    parents: "Putra ke-4 dari Bapak H. Mamad S & Ibu Hj. Oon",
    ig: "https://instagram.com/",
  },
  bride: {
    name: "Dilla",
    fullName: "Zuhirna Wulan Dilla, S.I.Kom.",
    photo: "/wanita.jpg",
    parents: "Putri ke-1 dari Bapak Irly Alex & Ibu Nurdina",
    ig: "https://instagram.com/",
  },

  verse:
    "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya.",
  verseRef: "QS. Ar-Rum : 21",

  story: [
    {
      year: "Desember 2025",
      title: "Awal Bertemu",
      text: "npm run devBerawal dari sebuah buku novel yang baru saja aku terbitkan. Saat itu, kamu datang untuk mengambil buku tersebut melalui COD. Tidak ada yang menyangka bahwa pertemuan sederhana itu akan menjadi awal dari cerita kita. Dari obrolan singkat tentang buku, kita mulai saling mengenal lebih jauh.",
    },
    {
      year: "Desember 2025 - Maret 2026",
      title: "Menjalin Kasih",
      text: "Percakapan yang awalnya hanya sesekali perlahan menjadi bagian dari hari-hari kita. Kita berbagi cerita, tawa, mimpi, dan harapan tentang masa depan. Di tengah proses saling mengenal, kita menemukan kenyamanan yang sulit dijelaskan, seolah semesta sedang mengarahkan dua orang yang sebelumnya berjalan sendiri-sendiri untuk saling menemukan.",
    },
    {
      year: "April 2026",
      title: "Lamaran",
      text: "Setelah melalui perjalanan yang penuh keyakinan, kita memutuskan untuk melangkah ke tahap yang lebih serius. Dengan restu kedua keluarga, kita mengikat komitmen dalam sebuah lamaran yang sederhana namun penuh makna. Hari itu menjadi bukti bahwa niat baik selalu menemukan jalannya.",
    },
    {
      year: "Juli 2026",
      title: "Pernikahan",
      text: "Dan akhirnya, kita sampai pada hari yang selama ini kita doakan. Mengucapkan janji suci, menyatukan dua kehidupan dalam satu tujuan yang sama. Dari sebuah buku yang mempertemukan kita, kini kita menulis lembaran baru sebagai pasangan suami istri. Semoga rumah yang kita bangun selalu dipenuhi cinta, keberkahan, dan kebahagiaan hingga akhir hayat.",
    },
    {
      title:
        "Semesta tidak membuat kita terlambat, ia hanya sedang memastikan kita berhenti pada orang yang tepat.",
    },
  ],

  gallery: [
    "/prewedding-1.jpg",
    "/prewedding-2.jpg",
    "/prewedding-3.jpg",
    "/prewedding-4.jpg",
    "/prewedding-5.jpg",
    "/prewedding-6.jpg",
  ],

  events: [
    {
      title: "Akad Nikah",
      time: "07.00 - 11.00 WIB",
      date: "Sabtu, 11 Juli 2026",
      place: "Masjid Ibadurrahman",
      addr: "Tajurhalang, Kec. Tajur Halang, Kabupaten Bogor, Jawa Barat 16320",
      map: "https://maps.app.goo.gl/ajTtpY8a1MDPRJ678",
    },
  ],

  music: "/musik.mp3", // taruh file musik di public/ (yang kamu punya haknya / bebas royalti)
  rsvpEndpoint: "", // tempel URL Apps Script di sini (lihat backend-rsvp/CARA-PASANG.md)
  waNumber: "62812345678", // dipakai sebagai cadangan bila endpoint belum diisi

  video: "/video.mp4",
  frameFlower: "/bunga-frame.png",
  cornerRight: "/bunga-sudut-kanan.png",
  cornerLeft: "/bunga-sudut-kiri.png",
};

const EASE = [0.22, 1, 0.36, 1];

/* ---------- helper ---------- */
function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: "easeOut", delay }}>
      {children}
    </motion.div>
  );
}
function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-softpink" />
      <span className="h-1.5 w-1.5 rounded-full bg-rose" />
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-softpink" />
    </div>
  );
}
const Eyebrow = ({ children }) => (
  <div className="font-sc tracking-[0.42em] uppercase text-[0.78rem] text-rose mb-3">
    {children}
  </div>
);
const SectionTitle = ({ children }) => (
  <h2 className="font-sc font-medium tracking-[0.16em] text-navy text-[clamp(1.7rem,5vw,2.5rem)]">
    {children}
  </h2>
);

/* ---------- tombol musik (tampilan saja; audio dikelola di App) ---------- */
function MusicButton({ playing, toggle, hidden }) {
  if (hidden) return null;
  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Matikan musik" : "Putar musik"}
      className="fixed bottom-5 right-5 z-40 h-12 w-12 rounded-full bg-cream/90 border border-softpink/70 shadow-lg flex items-center justify-center backdrop-blur-sm transition-all hover:shadow-xl">
      <svg
        viewBox="0 0 24 24"
        className={`w-5 h-5 ${playing ? "spin-slow" : ""}`}
        fill="none"
        stroke="currentColor"
        style={{ color: "var(--color-rose)" }}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
        {!playing && <line x1="4" y1="20" x2="20" y2="4" />}
      </svg>
    </button>
  );
}

/* ---------- layar pembuka "Buka Undangan" ---------- */
function Cover({ onOpen, guest, coupleName, dateText }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-drift"
      initial={{ opacity: 1 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.95, ease: EASE }}>
      <div className="absolute inset-0 video-veil" />

      {/* Dekorasi bunga latar belakang pada cover */}
      <svg
        viewBox="0 0 400 400"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(500px,90vw)] opacity-60 pointer-events-none"
        style={{ height: "auto" }}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x = 200 + 105 * Math.cos(rad);
          const y = 200 + 105 * Math.sin(rad);
          return (
            <ellipse
              key={angle}
              cx={x}
              cy={y}
              rx="36"
              ry="70"
              fill="rgba(240, 220, 228, 0.7)"
              transform={`rotate(${angle + 90} ${x} ${y})`}
            />
          );
        })}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x = 200 + 70 * Math.cos(rad);
          const y = 200 + 70 * Math.sin(rad);
          return (
            <ellipse
              key={`mid-${angle}`}
              cx={x}
              cy={y}
              rx="30"
              ry="56"
              fill="rgba(224, 185, 198, 0.6)"
              transform={`rotate(${angle + 90} ${x} ${y})`}
            />
          );
        })}
        <circle cx="200" cy="200" r="34" fill="rgba(232, 208, 217, 0.8)" />
        <circle cx="200" cy="200" r="20" fill="rgba(192, 141, 152, 0.85)" />
      </svg>

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}>
        <div className="font-sc tracking-[0.42em] uppercase text-[0.72rem] text-rosedeep mb-3 text-bold">
          The Wedding Of
        </div>
        <div className="font-script text-navy leading-none text-[clamp(2.8rem,11vw,5rem)]">
          {coupleName}
        </div>
        <Divider />
        <p className="font-bold text-[1.05rem]">{dateText}</p>

        <div className="mt-9 mb-6">
          <p className="font-sc tracking-[0.2em] uppercase text-[0.7rem] text-rosedeep text-bold">
            Kepada Yth.
          </p>
          <p className="font-serif text-[1.25rem] text-navy mt-1">{guest}</p>
        </div>

        <button
          onClick={onOpen}
          className="inline-flex items-center gap-2 font-sc tracking-[0.2em] uppercase text-[0.78rem] text-white bg-rosedeep px-7 py-3 shadow-lg transition-all hover:shadow-xl hover:bg-rose">
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
          Buka Undangan
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ---------- form RSVP (kirim ke Google Sheet) ---------- */
function RSVPForm({ endpoint, waNumber, coupleName }) {
  const [form, setForm] = useState({
    nama: "",
    kehadiran: "Hadir",
    jumlah: 1,
    pesan: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.nama.trim()) {
      setStatus("validasi");
      return;
    }
    setStatus("submitting");
    try {
      const body = new FormData();
      Object.entries(form).forEach(([k, v]) => body.append(k, String(v)));
      // 'no-cors': baris tetap tertulis ke Sheet; respons tidak terbaca → sukses optimistis
      await fetch(endpoint, { method: "POST", mode: "no-cors", body });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (!endpoint) {
    const wa = `https://wa.me/${waNumber}?text=${encodeURIComponent(
      `Halo, saya konfirmasi kehadiran untuk pernikahan ${coupleName}.`
    )}`;
    return (
      <div className="text-center">
        <p className="text-[1.05rem] font-bold">
          Form database belum diaktifkan. Isi{" "}
          <code className="text-rose">rsvpEndpoint</code> di{" "}
          <code className="text-rose">DATA</code> (lihat{" "}
          <em>backend-rsvp/CARA-PASANG.md</em>). Sementara ini gunakan WhatsApp:
        </p>
        <a
          href={wa}
          target="_blank"
          rel="noopener"
          className="inline-block mt-4 font-sc tracking-[0.2em] uppercase text-[0.76rem] text-navy border border-rose px-7 py-3 transition-all hover:bg-rose hover:text-white hover:shadow-md">
          Konfirmasi via WhatsApp
        </a>
      </div>
    );
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="text-center">
        <div className="font-script text-navy text-[2.4rem]">Terima kasih</div>
        <p className="text-[1.08rem] font-bold mt-2">
          Konfirmasimu sudah kami terima. Sampai jumpa di hari bahagia kami.
        </p>
      </motion.div>
    );
  }

  const inputCls =
    "w-full bg-white/70 border border-softpink/50 px-4 py-2.5 text-ink outline-none focus:border-rose transition-colors focus:shadow-md";
  return (
    <div className="text-left max-w-[440px] mx-auto">
      <label className="block font-sc tracking-[0.16em] uppercase text-[0.7rem] text-rose mb-1">
        Nama
      </label>
      <input
        className={inputCls}
        value={form.nama}
        onChange={(e) => set("nama", e.target.value)}
        placeholder="Nama lengkap"
      />

      <label className="block font-sc tracking-[0.16em] uppercase text-[0.7rem] text-rose mt-4 mb-1">
        Kehadiran
      </label>
      <div className="flex gap-3">
        {["Hadir", "Tidak Hadir"].map((opt) => (
          <button
            key={opt}
            onClick={() => set("kehadiran", opt)}
            className={`flex-1 py-2.5 border text-[0.95rem] transition-all ${
              form.kehadiran === opt
                ? "bg-rose text-white border-rose shadow-md"
                : "border-softpink/50 text-ink hover:border-rose hover:shadow-sm"
            }`}>
            {opt}
          </button>
        ))}
      </div>

      {form.kehadiran === "Hadir" && (
        <>
          <label className="block font-sc tracking-[0.16em] uppercase text-[0.7rem] text-rose mt-4 mb-1">
            Jumlah Tamu
          </label>
          <input
            type="number"
            min="1"
            max="10"
            className={inputCls}
            value={form.jumlah}
            onChange={(e) => set("jumlah", e.target.value)}
          />
        </>
      )}

      <label className="block font-sc tracking-[0.16em] uppercase text-[0.7rem] text-rose mt-4 mb-1">
        Ucapan & Doa
      </label>
      <textarea
        rows="3"
        className={inputCls}
        value={form.pesan}
        onChange={(e) => set("pesan", e.target.value)}
        placeholder="Tulis ucapan untuk kedua mempelai"
      />

      {status === "validasi" && (
        <p className="text-navy text-sm mt-2">
          Mohon isi nama terlebih dahulu.
        </p>
      )}
      {status === "error" && (
        <p className="text-navy text-sm mt-2">
          Terjadi kesalahan. Coba lagi sebentar.
        </p>
      )}

      <button
        onClick={submit}
        disabled={status === "submitting"}
        className="w-full mt-5 font-sc tracking-[0.2em] uppercase text-[0.78rem] text-white bg-rosedeep py-3 transition-all hover:opacity-90 hover:shadow-md disabled:opacity-60">
        {status === "submitting" ? "Mengirim..." : "Kirim Konfirmasi"}
      </button>
    </div>
  );
}

/* ---------- foto, countdown, bunga, galeri (sama seperti sebelumnya) ---------- */
function CouplePhoto({ src, initial }) {
  const [err, setErr] = useState(false);
  return (
    <div className="mx-auto w-[180px] aspect-[3/4] rounded-t-full overflow-hidden border-2 border-softpink/60 shadow-[0_12px_35px_rgba(224,185,198,.25)] bg-rose/10 flex items-center justify-center backdrop-blur-sm">
      {err ? (
        <span className="font-script text-[3.4rem] text-navy/40">
          {initial}
        </span>
      ) : (
        <img
          src={src}
          alt=""
          className="w-full h-full object-cover"
          onError={() => setErr(true)}
        />
      )}
    </div>
  );
}
function CountdownBlock() {
  const [t, setT] = useState({ d: "--", h: "--", m: "--", s: "--" });
  useEffect(() => {
    const end = new Date(DATA.targetDate).getTime();
    const pad = (n) => String(n).padStart(2, "0");
    const tick = () => {
      let diff = Math.max(0, end - Date.now());
      const d = Math.floor(diff / 864e5);
      diff -= d * 864e5;
      const h = Math.floor(diff / 36e5);
      diff -= h * 36e5;
      const m = Math.floor(diff / 6e4);
      diff -= m * 6e4;
      setT({ d, h: pad(h), m: pad(m), s: pad(Math.floor(diff / 1e3)) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex justify-center gap-3 sm:gap-4 mt-8">
      {[
        ["Hari", t.d],
        ["Jam", t.h],
        ["Menit", t.m],
        ["Detik", t.s],
      ].map(([l, v]) => (
        <div
          key={l}
          className="relative w-[68px] sm:w-[80px] py-4 border border-softpink/50 bg-white/60 backdrop-blur-md transition-all hover:shadow-lg">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-7 bg-gradient-to-r from-softpink via-rose to-blush" />
          <div className="text-[2rem] sm:text-[2.3rem] font-medium text-navy leading-none tabular-nums">
            {v}
          </div>
          <div className="font-sc tracking-[0.18em] text-[0.6rem] sm:text-[0.66rem] uppercase text-rose mt-2">
            {l}
          </div>
        </div>
      ))}
    </div>
  );
}
function FrameFlower() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(720px,96vw)] pointer-events-none z-0">
      <motion.svg
        viewBox="0 0 400 400"
        className="w-full h-auto block"
        initial={{ clipPath: "inset(0% 50% 0% 50%)", opacity: 0, scale: 0.98 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.8, ease: EASE }}>
        {/* Outer petals dengan gradient - warna soft pink dan rose */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x = 200 + 115 * Math.cos(rad);
          const y = 200 + 115 * Math.sin(rad);
          return (
            <ellipse
              key={angle}
              cx={x}
              cy={y}
              rx="40"
              ry="75"
              fill="rgba(232, 208, 217, 0.9)"
              transform={`rotate(${angle + 90} ${x} ${y})`}
              opacity="0.85"
            />
          );
        })}

        {/* Middle petals */}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x = 200 + 76 * Math.cos(rad);
          const y = 200 + 76 * Math.sin(rad);
          return (
            <ellipse
              key={`mid-${angle}`}
              cx={x}
              cy={y}
              rx="34"
              ry="62"
              fill="rgba(212, 165, 175, 0.75)"
              transform={`rotate(${angle + 90} ${x} ${y})`}
            />
          );
        })}

        {/* Center dengan detail */}
        <circle cx="200" cy="200" r="40" fill="rgba(232, 208, 217, 0.95)" />
        <circle cx="200" cy="200" r="26" fill="rgba(192, 141, 152, 0.95)" />
        <circle cx="200" cy="200" r="14" fill="rgba(168, 187, 165, 0.8)" />
      </motion.svg>
    </div>
  );
}

function CornerFlower({ corner }) {
  const tr = corner === "tr";
  return (
    <motion.svg
      viewBox="0 0 300 300"
      className={`absolute ${
        tr ? "top-0 right-0" : "bottom-0 left-0"
      } w-[min(260px,45vw)] h-auto pointer-events-none z-0`}
      style={{ transform: tr ? "none" : "scaleX(-1)" }}
      initial={{
        clipPath: tr ? "circle(0% at 88% 12%)" : "circle(0% at 12% 88%)",
        opacity: 0,
      }}
      whileInView={{
        clipPath: tr ? "circle(165% at 88% 12%)" : "circle(165% at 12% 88%)",
        opacity: 1,
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 2, ease: EASE }}>
      {/* Main petals (8) dengan gradient */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 150 + 92 * Math.cos(rad);
        const y = 150 + 92 * Math.sin(rad);
        return (
          <ellipse
            key={angle}
            cx={x}
            cy={y}
            rx="35"
            ry="68"
            fill="rgba(224, 185, 198, 0.85)"
            transform={`rotate(${angle + 90} ${x} ${y})`}
            opacity="0.8"
          />
        );
      })}
      {/* Secondary petals untuk detail lebih */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 150 + 65 * Math.cos(rad);
        const y = 150 + 65 * Math.sin(rad);
        return (
          <ellipse
            key={`sec-${angle}`}
            cx={x}
            cy={y}
            rx="28"
            ry="52"
            fill="rgba(212, 165, 175, 0.7)"
            transform={`rotate(${angle + 90} ${x} ${y})`}
          />
        );
      })}
      {/* Leaves */}
      {[45, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 150 + 140 * Math.cos(rad);
        const y = 150 + 140 * Math.sin(rad);
        return (
          <ellipse
            key={`leaf-${angle}`}
            cx={x}
            cy={y}
            rx="20"
            ry="52"
            fill="rgba(168, 187, 165, 0.65)"
            transform={`rotate(${angle + 50} ${x} ${y})`}
          />
        );
      })}
      {/* Center dengan detail */}
      <circle cx="150" cy="150" r="36" fill="rgba(224, 185, 198, 0.9)" />
      <circle cx="150" cy="150" r="22" fill="rgba(192, 141, 152, 0.95)" />
      <circle cx="150" cy="150" r="10" fill="rgba(168, 187, 165, 0.8)" />
    </motion.svg>
  );
}
function Gallery({ photos }) {
  const [idx, setIdx] = useState(null);
  const [hidden, setHidden] = useState({});
  const open = idx !== null;
  const visible = photos.filter((_, i) => !hidden[i]);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % photos.length);
      if (e.key === "ArrowLeft")
        setIdx((i) => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, photos.length]);
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
        {photos.map((src, i) =>
          hidden[i] ? null : (
            <motion.button
              key={i}
              onClick={() => setIdx(i)}
              className="relative aspect-[4/5] overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: EASE, delay: (i % 3) * 0.08 }}>
              <img
                src={src}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={() => setHidden((h) => ({ ...h, [i]: true }))}
              />
              <span className="absolute inset-0 bg-navy/0 group-hover:bg-navy/15 transition-colors" />
            </motion.button>
          )
        )}
      </div>
      {visible.length === 0 && (
        <p className="font-sc tracking-[0.2em] text-navy/70 mt-4">
          Foto prewedding akan tampil di sini.
        </p>
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-ink/85 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIdx(null)}>
            <button
              className="absolute top-5 right-6 text-cream text-3xl leading-none"
              onClick={() => setIdx(null)}
              aria-label="Tutup">
              ×
            </button>
            <button
              className="absolute left-4 md:left-8 text-cream/80 hover:text-cream text-4xl px-2"
              onClick={(e) => {
                e.stopPropagation();
                setIdx((i) => (i - 1 + photos.length) % photos.length);
              }}
              aria-label="Sebelumnya">
              ‹
            </button>
            <motion.img
              key={idx}
              src={photos[idx]}
              alt=""
              className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-4 md:right-8 text-cream/80 hover:text-cream text-4xl px-2"
              onClick={(e) => {
                e.stopPropagation();
                setIdx((i) => (i + 1) % photos.length);
              }}
              aria-label="Berikutnya">
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================ */
export default function App() {
  const coupleName = `${DATA.bride.name} & ${DATA.groom.name}`;

  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [musicHidden, setMusicHidden] = useState(false);
  const audioRef = useRef(null);

  // nama tamu dari link: ?tamu=Budi  (cadangan: Bapak/Ibu/Saudara/i)
  const guest = (() => {
    const p = new URLSearchParams(window.location.search);
    const t = p.get("tamu") || p.get("to");
    return t
      ? decodeURIComponent(t.replace(/\+/g, " "))
      : "Bapak/Ibu/Saudara/i";
  })();

  const playMusic = () => {
    const a = audioRef.current;
    if (a)
      a.play()
        .then(() => setPlaying(true))
        .catch(() => {});
  };
  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else playMusic();
  };
  const handleOpen = () => {
    setOpened(true);
    playMusic();
  };

  // kunci scroll selama layar pembuka masih tampil
  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
  }, [opened]);

  return (
    <div className="font-serif text-ink overflow-x-hidden">
      <audio
        ref={audioRef}
        src={DATA.music}
        loop
        preload="auto"
        onError={() => setMusicHidden(true)}
      />
      <AnimatePresence>
        {!opened && (
          <Cover
            key="cover"
            onOpen={handleOpen}
            guest={guest}
            coupleName={coupleName}
            dateText={DATA.dateText}
          />
        )}
      </AnimatePresence>
      <MusicButton
        playing={playing}
        toggle={toggleMusic}
        hidden={musicHidden}
      />

      <div className="fixed inset-0 -z-20 overflow-hidden bg-cream">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}>
          <source src={DATA.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-drift -z-10" />
      </div>
      <div className="fixed inset-0 -z-10 video-veil" />

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
        <FrameFlower />
        <div className="relative z-10 py-[120px]">
          <Reveal delay={0.15}>
            <div className="font-sc tracking-[0.42em] uppercase text-[0.78rem] text-rose mb-3 pl-2">
              The Wedding Of
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="font-script text-navy leading-none text-[clamp(3.2rem,12vw,5.8rem)]">
              {DATA.bride.name}
            </div>
            <span className="font-script text-navy block text-[clamp(2rem,7vw,3rem)] my-1">
              &amp;
            </span>
            <div className="font-script text-navy leading-none text-[clamp(3.2rem,12vw,5.8rem)]">
              {DATA.groom.name}
            </div>
          </Reveal>
          <Reveal delay={0.45}>
            <Divider />
          </Reveal>
          <Reveal delay={0.6}>
            <p className="text-[1.18rem] font-bold max-w-[34ch] mx-auto">
              {DATA.dateText}
            </p>
          </Reveal>
        </div>
        <div className="absolute bottom-7 left-1/2 scroll-bob font-sc tracking-[0.3em] text-[0.64rem] text-rose">
          SCROLL
        </div>
      </section>

      {/* AYAT */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6">
        <div className="relative z-10 max-w-[760px]">
          <Reveal>
            <Divider />
            <p className="italic font-bold text-[1.12rem] max-w-[40ch] mx-auto">
              {DATA.verse}
            </p>
            <p className="font-sc tracking-[0.42em] uppercase text-[0.78rem] text-rose mt-5">
              {DATA.verseRef}
            </p>
          </Reveal>
        </div>
      </section>

      {/* MEMPELAI */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6 py-24">
        <div className="relative z-10 w-full max-w-[820px]">
          <Reveal>
            <Eyebrow>Mempelai</Eyebrow>
            <SectionTitle>Pengantin</SectionTitle>
            <Divider />
          </Reveal>
          <div className="flex flex-wrap justify-center gap-12 mt-4">
            {[DATA.bride, DATA.groom].map((p, i) => (
              <Reveal
                key={p.fullName}
                delay={0.15 + i * 0.2}
                className="flex-1 min-w-[240px] flex flex-col items-center">
                <CouplePhoto src={p.photo} initial={p.name.charAt(0)} />
                <div className="font-script text-navy text-[2.6rem] leading-tight mt-5 min-h-[5rem] flex items-center justify-center">
                  {p.fullName}
                </div>
                <div className="font-sc tracking-[0.2em] text-rose text-[0.72rem] uppercase my-2">
                  {i === 0 ? "Mempelai Wanita" : "Mempelai Pria"}
                </div>
                <p className="text-[1.05rem] font-bold max-w-[30ch] mx-auto min-h-[3.2rem] flex items-center justify-center">
                  {p.parents}
                </p>
                <a
                  href={p.ig}
                  target="_blank"
                  rel="noopener"
                  className="inline-block mt-3 font-sc tracking-[0.2em] uppercase text-[0.7rem] text-navy border border-rose/70 px-4 py-1.5 transition-all hover:bg-rose hover:text-white hover:shadow-md">
                  Instagram
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6 py-24">
        <div className="relative z-10 w-full max-w-[640px]">
          <Reveal>
            <Eyebrow>Perjalanan Kami</Eyebrow>
            <SectionTitle>Our Story</SectionTitle>
            <Divider />
          </Reveal>
          <div className="mt-6 text-left border-l border-softpink/50 ml-3 md:ml-6">
            {DATA.story.map((s, i) => (
              <Reveal key={s.year} delay={0.1 + i * 0.15}>
                <div className="relative pl-8 pb-10 last:pb-0">
                  <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-rose ring-4 ring-cream" />
                  <div className="font-sc tracking-[0.2em] text-rose text-[0.74rem] uppercase">
                    {s.year}
                  </div>
                  <h3 className="font-sc text-navy text-[1.3rem] tracking-[0.06em] mt-1">
                    {s.title}
                  </h3>
                  <p className="text-[1.05rem] font-bold text-ink mt-1.5">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6">
        <Reveal className="relative z-10">
          <Eyebrow>Menuju Hari Bahagia</Eyebrow>
          <div className="inline-flex border border-rose/50 bg-white/70 backdrop-blur-sm mt-1 shadow-lg">
            <div className="px-6 py-3.5">
              <div className="text-[2.6rem] font-medium text-navy leading-none">
                {DATA.day}
              </div>
              <div className="font-sc tracking-[0.2em] text-[0.72rem] text-rose mt-1.5">
                {DATA.month}
              </div>
            </div>
            <div className="px-6 py-3.5 border-l border-softpink/50">
              <div className="text-[2.6rem] font-medium text-navy leading-none">
                {DATA.year}
              </div>
              <div className="font-sc tracking-[0.2em] text-[0.72rem] text-rose mt-1.5">
                {DATA.weekday}
              </div>
            </div>
          </div>
          <CountdownBlock />
        </Reveal>
      </section>

      {/* ACARA */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6">
        <CornerFlower corner="tr" />
        <CornerFlower corner="bl" />
        <div className="relative z-10 w-full max-w-[760px]">
          <Reveal>
            <SectionTitle>Rangkaian Acara</SectionTitle>
            <Divider />
          </Reveal>
          <div className="flex flex-wrap gap-6 justify-center">
            {DATA.events.map((ev, i) => (
              <Reveal
                key={ev.title}
                delay={0.15 + i * 0.15}
                className="flex-1 min-w-[280px] max-w-[400px]">
                <div className="relative border border-softpink/60 bg-white/70 backdrop-blur-sm px-7 py-9 h-full shadow-lg hover:shadow-xl transition-all">
                  <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-softpink via-rose to-blush" />
                  <h3 className="font-sc tracking-[0.16em] text-[1.4rem] text-navy mb-3">
                    {ev.title}
                  </h3>
                  <p className="text-[1.05rem] font-bold">
                    <strong className="text-navy font-semibold">
                      {ev.time}
                    </strong>
                  </p>
                  <p className="text-[1.05rem] font-bold">{ev.date}</p>
                  <p className="text-[1.05rem] font-bold">{ev.place}</p>
                  <p className="text-[1.05rem] font-bold">{ev.addr}</p>
                  <a
                    href={ev.map}
                    target="_blank"
                    rel="noopener"
                    className="inline-block mt-4 font-sc tracking-[0.2em] uppercase text-[0.76rem] text-navy border border-rose px-6 py-2.5 transition-all hover:bg-rose hover:text-white hover:shadow-md">
                    Lihat Lokasi
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALERI */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6 py-24">
        <div className="relative z-10 w-full max-w-[860px]">
          <Reveal>
            <Eyebrow>Momen Bahagia</Eyebrow>
            <SectionTitle>Galeri Prewedding</SectionTitle>
            <Divider />
          </Reveal>
          <Reveal delay={0.15}>
            <Gallery photos={DATA.gallery} />
          </Reveal>
        </div>
      </section>

      {/* RSVP */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6 py-24">
        <div className="relative z-10 w-full max-w-[560px]">
          <Reveal>
            <Eyebrow>Konfirmasi Kehadiran</Eyebrow>
            <SectionTitle>RSVP</SectionTitle>
            <Divider />
            <p className="text-[1.05rem] font-bold mb-6">
              Mohon konfirmasi kehadiran Anda untuk membantu kami mempersiapkan
              acara.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <RSVPForm
              endpoint={DATA.rsvpEndpoint}
              waNumber={DATA.waNumber}
              coupleName={coupleName}
            />
          </Reveal>
        </div>
      </section>

      {/* PENUTUP */}
      <footer className="relative py-20 text-center px-6">
        <Reveal className="relative z-10">
          <Divider />
          <p className="text-[1.18rem] font-bold mb-4">
            Terima kasih atas doa dan restu Anda.
          </p>
          <div className="font-script text-[2.6rem] text-navy">
            {coupleName}
          </div>
        </Reveal>
      </footer>
    </div>
  );
}
