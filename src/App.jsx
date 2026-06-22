import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    photo: import.meta.env.BASE_URL + "pria.jpeg",
    parents: "Putra ke-4 dari Bapak H. Mamad S & Ibu Hj. Oon",
    ig: "https://instagram.com/roelan29",
  },
  bride: {
    name: "Dilla",
    fullName: "Zuhirna Wulan Dilla, S.I.Kom.",
    photo: import.meta.env.BASE_URL + "wanita.jpeg",
    parents: "Putri ke-1 dari Bapak Irly Alex Martherus, S.Sos & Ibu Nurdina",
    ig: "https://instagram.com/dilla_zwd",
  },

  verse:
    "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya.",
  verseRef: "QS. Ar-Rum : 21",

  verse2:
    '"Semesta tidak membuat kita terlambat, ia hanya sedang memastikan kita berhenti pada orang yang tepat."',

  story: [
    {
      year: "Desember 2025",
      title: "Awal Bertemu",
      text: "Semua berawal dari sebuah buku novel yang baru saja diterbitkan oleh Dilla. Tanpa diduga, Darul menghubungi Dilla dengan niat membeli novel tersebut. Setelah berbincang singkat, keduanya sepakat untuk bertemu. Pertemuan sederhana itu menjadi momen pertama Dilla dan Darul saling bertatap muka. Tidak ada yang menyangka, dari sebuah buku dan pertemuan singkat itulah kisah cinta ini dimulai.",
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
      text: "Dan akhirnya, kita sampai pada hari yang selama ini selalu kita doakan. Hari di mana kita mengucapkan janji suci, menyatukan dua kehidupan dalam satu tujuan yang sama.Berawal dari sebuah buku yang mempertemukan kita, kini kita menulis lembaran baru sebagai pasangan suami istri. Siapa sangka, dari pertemuan sederhana itu, kita akhirnya menemukan seseorang yang selama ini dicari: tempat pulang yang paling nyaman, tempat berbagi cerita, tawa, dan segala suka maupun duka. Kini, bukan lagi tentang aku atau kamu, melainkan tentang kita. Semoga rumah yang kita bangun senantiasa dipenuhi cinta, keberkahan, ketulusan, dan kebahagiaan hingga akhir hayat. Karena pada akhirnya, di antara begitu banyak kemungkinan, kita saling menemukan dan memilih untuk pulang satu sama lain.",
    },
  ],
  
  gallery: [
    import.meta.env.BASE_URL + "prewedding-1.png",
    import.meta.env.BASE_URL + "prewedding-2.png",
    import.meta.env.BASE_URL + "prewedding-3.png",
    import.meta.env.BASE_URL + "prewedding-4.png",
    import.meta.env.BASE_URL + "prewedding-5.png",
    import.meta.env.BASE_URL + "prewedding-6.png",
    import.meta.env.BASE_URL + "prewedding-7.png",
    import.meta.env.BASE_URL + "prewedding-8.png",
    import.meta.env.BASE_URL + "prewedding-9.png",
    import.meta.env.BASE_URL + "prewedding-10.png",
    import.meta.env.BASE_URL + "prewedding-11.png",
    import.meta.env.BASE_URL + "prewedding-12.png",
    import.meta.env.BASE_URL + "prewedding-13.png",
    import.meta.env.BASE_URL + "prewedding-14.png",
    import.meta.env.BASE_URL + "prewedding-15.png",
    import.meta.env.BASE_URL + "prewedding-16.png",
    import.meta.env.BASE_URL + "prewedding-17.png",
    import.meta.env.BASE_URL + "prewedding-18.png",
    import.meta.env.BASE_URL + "prewedding-19.png",
    import.meta.env.BASE_URL + "prewedding-20.png",
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

  music: import.meta.env.BASE_URL + "musik.mp3",

  bankAccounts: [
    {
      label: "Mempelai Pria",
      name: "DARUL FATUROHMAN",
      bank: "BNI",
      norek: "1936817035",
    },
    {
      label: "Mempelai Wanita",
      name: "ZUHIRNA WULAN DILLA",
      bank: "Mandiri",
      norek: "1660005544572",
    },
  ],

  video: import.meta.env.BASE_URL + "video.mp4",
  frameFlower: import.meta.env.BASE_URL + "bunga-frame.png",
  cornerRight: import.meta.env.BASE_URL + "bunga-sudut-kanan.png",
  cornerLeft: import.meta.env.BASE_URL + "bunga-sudut-kiri.png",
};

// Daftar tamu: tambah baris baru untuk setiap tamu
// Format: "ID_ACAK": "Nama Tamu"
const GUESTS = {
  "x7k2m9": "Budi Santoso",
  // tambahkan tamu lain di sini, contoh:
  // "p4n8q1": "Ahmad Fauzi",
  // "r3t6w5": "Keluarga Besar Hasan",
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
  <div className="font-sc tracking-[0.42em] uppercase text-[0.78rem] text-maroon mb-3">
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

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}>
        <div className="font-sc tracking-[0.42em] uppercase text-[0.72rem] text-maroon mb-3 text-bold">
          The Wedding Of
        </div>
        <div className="font-script text-navy leading-none text-[clamp(2.8rem,11vw,5rem)]">
          {coupleName}
        </div>
        <Divider />
        <p className="font-bold text-[1.05rem]">{dateText}</p>

        <div className="mt-9 mb-6">
          <p className="font-sc tracking-[0.2em] uppercase text-[0.7rem] text-maroon text-bold">
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

/* ---------- form ucapan selamat ---------- */
function CongratulationsForm() {
  const [form, setForm] = useState({ nama: "", ucapan: "" });
  const [greetings, setGreetings] = useState([]);
  const [status, setStatus] = useState("idle");
  const scrollContainerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama.trim() || !form.ucapan.trim()) {
      setStatus("validasi");
      return;
    }
    setGreetings([...greetings, { ...form, id: Date.now() }]);
    setForm({ nama: "", ucapan: "" });
    setStatus("success");
    setTimeout(() => setStatus("idle"), 2000);
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      setTimeout(() => {
        scrollContainerRef.current.scrollTop = 0;
      }, 0);
    }
  }, [greetings]);

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="text-left max-w-[440px] mx-auto mb-10">
        <label className="block font-sc tracking-[0.16em] uppercase text-[0.7rem] text-rose mb-1">
          Nama Anda
        </label>
        <input
          type="text"
          className="w-full bg-white/70 border border-softpink/50 px-4 py-2.5 text-ink outline-none focus:border-rose transition-colors focus:shadow-md"
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
          placeholder="Masukkan nama"
        />

        <label className="block font-sc tracking-[0.16em] uppercase text-[0.7rem] text-rose mt-4 mb-1">
          Ucapan Selamat
        </label>
        <textarea
          rows="4"
          className="w-full bg-white/70 border border-softpink/50 px-4 py-2.5 text-ink outline-none focus:border-rose transition-colors focus:shadow-md"
          value={form.ucapan}
          onChange={(e) => setForm({ ...form, ucapan: e.target.value })}
          placeholder="Tulis ucapan selamat untuk kedua mempelai..."
        />

        {status === "validasi" && (
          <p className="text-navy text-sm mt-2">
            Mohon isi nama dan ucapan terlebih dahulu.
          </p>
        )}

        <button
          type="submit"
          className="w-full mt-5 font-sc tracking-[0.2em] uppercase text-[0.78rem] text-white bg-rosedeep py-3 transition-all hover:opacity-90 hover:shadow-md">
          {status === "success" ? "✓ Terima kasih!" : "Kirim Ucapan"}
        </button>
      </form>

      {greetings.length > 0 && (
        <div className="max-w-[640px] mx-auto">
          <h4 className="font-sc tracking-[0.2em] uppercase text-[0.78rem] text-maroon mb-4 text-center">
            Ucapan Selamat dari Tamu
          </h4>
          <div
            ref={scrollContainerRef}
            className="max-h-[500px] overflow-auto border border-softpink/30 bg-white/40 backdrop-blur-sm rounded-lg p-4">
            <div className="space-y-3">
              {[...greetings].reverse().map((g) => (
                <motion.div
                  key={g.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-softpink/50 bg-white/60 backdrop-blur-sm px-5 py-4 rounded">
                  <p className="font-bold text-navy text-[1rem]">{g.nama}</p>
                  <p className="text-[1.05rem] font-semibold text-ink mt-2 italic">
                    "{g.ucapan}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
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
  const coupleName = `${DATA.groom.name} & ${DATA.bride.name}`;

  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [musicHidden, setMusicHidden] = useState(false);
  const audioRef = useRef(null);

  // nama tamu dari link: ?id=x7k2m9 (dari mapping) atau ?tamu=NamaTamu (langsung)
  const guest = (() => {
    const p = new URLSearchParams(window.location.search);
    const id = p.get("id");
    if (id && GUESTS[id]) return GUESTS[id];
    const t = p.get("tamu") || p.get("to");
    return t ? decodeURIComponent(t.replace(/\+/g, " ")) : "Bapak/Ibu/Saudara/i";
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
          className="absolute inset-0 w-full h-full object-contain md:object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}>
          <source src={DATA.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-drift -z-10" />
      </div>
      <div className="fixed inset-0 -z-10 video-veil" />

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="relative z-10 py-[120px]">
          <Reveal delay={0.15}>
            <div className="font-sc tracking-[0.42em] uppercase text-[0.78rem] text-maroon mb-3 pl-2">
              The Wedding Of
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="font-script text-navy leading-none text-[clamp(3.2rem,12vw,5.8rem)]">
              {DATA.groom.name}
            </div>
            <span className="font-script text-navy block text-[clamp(2rem,7vw,3rem)] my-1">
              &amp;
            </span>
            <div className="font-script text-navy leading-none text-[clamp(3.2rem,12vw,5.8rem)]">
              {DATA.bride.name}
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
        {/* <div className="absolute bottom-7 left-1/2 scroll-bob font-sc tracking-[0.3em] text-[0.64rem] text-maroon">
          SCROLL
        </div> */}
      </section>

      {/* AYAT */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6">
        <div className="relative z-10 max-w-[760px]">
          <Reveal>
            <Divider />
            <p className="italic font-bold text-[1.12rem] max-w-[40ch] mx-auto">
              {DATA.verse}
            </p>
            <p className="font-sc tracking-[0.42em] uppercase text-[0.78rem] text-maroon mt-5">
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
            {[DATA.groom, DATA.bride].map((p, i) => (
              <Reveal
                key={p.fullName}
                delay={0.15 + i * 0.2}
                className="flex-1 min-w-[240px] flex flex-col items-center">
                <CouplePhoto src={p.photo} initial={p.name.charAt(0)} />
                <div className="font-script text-navy text-[2.6rem] leading-tight mt-5 min-h-[5rem] flex items-center justify-center">
                  {p.fullName}
                </div>
                <div className="font-sc tracking-[0.2em] text-maroon text-[0.72rem] uppercase my-2">
                  {i === 0 ? "Mempelai pria" : "Mempelai wanita"}
                </div>
                <p className="text-[1.05rem] font-bold max-w-[30ch] mx-auto min-h-[3.2rem] flex items-center justify-center">
                  {p.parents}
                </p>
                <a
                  href={p.ig}
                  target="_blank"
                  rel="noopener"
                  className="inline-block mt-3 font-sc tracking-[0.2em] uppercase text-[0.7rem] text-maroon border border-maroon/70 px-4 py-1.5 transition-all hover:bg-maroon hover:text-white hover:shadow-md">
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
          <div className="mt-6 text-left border-l border-softpink/50 ml-3 md:ml-6 mb-10">
            {DATA.story.map((s, i) => (
              <Reveal key={s.year} delay={0.1 + i * 0.15}>
                <div className="relative pl-8 pb-10 last:pb-0">
                  <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-rose ring-4 ring-cream" />
                  <div className="font-sc tracking-[0.2em] text-maroon text-[0.74rem] uppercase">
                    {s.year}
                  </div>
                  <h3 className="font-sc text-navy text-[1.3rem] tracking-[0.06em] mt-1">
                    {s.title}
                  </h3>
                  <p className="text-[1.05rem] font-bold text-ink mt-1.5 mb-5">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="relative z-10 max-w-[760px] mt-50">
            <Reveal>
              <Divider />
              <p className="italic font-bold text-[1.12rem] max-w-[40ch] mx-auto">
                {DATA.verse2}
              </p>
              <Divider />
            </Reveal>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6">
        <Reveal className="relative z-10">
          <Eyebrow>Menuju Hari Bahagia</Eyebrow>
          <div className="inline-flex border border-maroon/50 bg-white/70 backdrop-blur-sm mt-1 shadow-lg">
            <div className="px-6 py-3.5">
              <div className="text-[2.6rem] font-medium text-navy leading-none">
                {DATA.day}
              </div>
              <div className="font-sc tracking-[0.2em] text-[0.72rem] text-maroon mt-1.5">
                {DATA.month}
              </div>
            </div>
            <div className="px-6 py-3.5 border-l border-maroon/50">
              <div className="text-[2.6rem] font-medium text-navy leading-none">
                {DATA.year}
              </div>
              <div className="font-sc tracking-[0.2em] text-[0.72rem] text-maroon mt-1.5">
                {DATA.weekday}
              </div>
            </div>
          </div>
          <CountdownBlock />
        </Reveal>
      </section>

      {/* ACARA */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6">
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
                <div className="relative border border-maroon/60 bg-white/70 backdrop-blur-sm px-7 py-9 h-full shadow-lg hover:shadow-xl transition-all">
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

      {/* TANDA KASIH */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6 py-24">
        <div className="relative z-10 w-full max-w-[860px]">
          <Reveal>
            <Eyebrow>Apresiasi untuk Tamu</Eyebrow>
            <SectionTitle>Tanda Kasih</SectionTitle>
            <Divider />
          </Reveal>

          {/* NOMOR REKENING */}
          <Reveal delay={0.15}>
            <p className="text-[1.05rem] font-bold mb-8">
              Doa dan restu Anda adalah hadiah terbesar. Jika ingin memberikan
              hadiah, berikut rekening kedua mempelai:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {DATA.bankAccounts.map((acc, i) => (
                <motion.div
                  key={acc.bank}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="border border-maroon/60 bg-white/70 backdrop-blur-sm px-6 py-7 shadow-lg hover:shadow-xl transition-all">
                  <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-softpink via-rose to-blush" />
                  <p className="font-sc tracking-[0.2em] uppercase text-[0.7rem] text-rose mb-2">
                    {acc.label}
                  </p>
                  <p className="font-bold text-[1.2rem] text-navy mb-4">
                    {acc.name}
                  </p>
                  <div className="bg-navy/5 px-4 py-3 rounded mb-3">
                    <p className="font-sc tracking-[0.1em] text-[0.75rem] text-navy mb-1">
                      Bank
                    </p>
                    <p className="font-bold text-[1.1rem] text-navy">
                      {acc.bank}
                    </p>
                  </div>
                  <div className="bg-navy/5 px-4 py-3 rounded">
                    <p className="font-sc tracking-[0.1em] text-[0.75rem] text-navy mb-1">
                      Nomor Rekening
                    </p>
                    <p className="font-mono font-bold text-[1.1rem] text-navy tracking-widest">
                      {acc.norek}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* FORM UCAPAN */}
          <Reveal delay={0.3}>
            <Divider />
            <p className="text-[1.05rem] font-bold mb-6">
              Kirimkan ucapan selamat Anda untuk kedua mempelai
            </p>
            <CongratulationsForm />
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
