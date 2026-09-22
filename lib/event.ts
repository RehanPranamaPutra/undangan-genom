/**
 * SATU-SATUNYA tempat untuk mengganti isi undangan.
 * Ubah nilai di bawah sesuai data wisuda, lalu taruh foto & musik di folder
 * /public (lihat CLAUDE.md).
 */

export type GalleryItem = {
  /** path foto di /public, mis. "/photos/gallery/sidang.jpg". Kosongkan ("") untuk placeholder. */
  src: string;
  alt: string;
  caption?: string;
  /** titik fokus crop, CSS object-position "x% y%" (juga jadi pusat zoom). */
  position?: string;
  /** perbesaran foto di dalam bingkai (1 = tanpa zoom). Berguna bila subjek terlalu kecil. */
  zoom?: number;
  /**
   * Opsional. Bentuk & rasio bingkai diatur per posisi di kolase (lihat
   * `gallerySlots` di components/Invitation.tsx). Isi hanya untuk memaksa rasio
   * tertentu, mis. "4/5", "1/1", "3/2".
   */
  ratio?: string;
};

export type RundownItem = {
  time: string;
  title: string;
};

export const event = {
  /** undangan ini untuk satu kelas/angkatan, bukan wisudawan perorangan */
  graduate: {
    name: "GENOMIA 23",
    nickname: "GENOMIA 23",
    /** dipakai sebagai label singkat di bawah nama, mis. angkatan/tahun masuk */
    degree: "Angkatan 2023",
    program: "Manajemen Informatika",
    faculty: "Teknologi Informasi",
    university: "Politeknik Negeri Padang",
    /** opsional; kosongkan bila tidak ingin ditampilkan */
    honors: "",
  },

  ceremony: {
    day: "Sabtu",
    /** dipakai untuk metadata & kalender; format YYYY-MM-DD */
    date: "2026-09-26",
    dateLabel: "26 September 2026",
    timeLabel: "Pukul 08.00 WIB",
    venue: "Gedung Pusat Kreativitas Mahasiswa",
    venueDetail: "Kampus Politeknik Negeri Padang, Padang",
    mapsUrl: "https://maps.app.goo.gl/oEGHP5AvXr3xEpsF9",
  },

  /** urutan acara — tampil bernomor */
  rundown: [
    { time: "07.00", title: "Registrasi dan penempatan tamu" },
    { time: "08.00", title: "Pembukaan dan prosesi masuk wisudawan" },
    { time: "09.30", title: "Inti acara: pemindahan tali toga" },
    { time: "11.00", title: "Ramah tamah dan sesi foto bersama" },
  ] as RundownItem[],

  /**
   * Foto potret di halaman sampul (sebelum undangan dibuka).
   * `position` = titik fokus crop (CSS object-position: "x% y%").
   * `zoom` = perbesaran (1 = tanpa zoom). Bingkai sampul mengikuti rasio 3:2
   * (lanskap) — pilih foto lanskap supaya tidak terpotong.
   */
  cover: {
    src: "/photos/gallery/izin.jpg",
    alt: "GENOMIA 23 berdoa bersama menjelang hari wisuda",
    position: "50% 32%",
    zoom: 1,
  } as {
    src: string;
    alt: string;
    position?: string;
    zoom?: number;
  },

  /**
   * Urutan foto = urutan cerita. `ratio` diisi rasio ASLI tiap foto (bukan
   * dipaksa potret/lanskap) — di galeri (components/Invitation.tsx), foto
   * lanskap otomatis melebar dua kolom, foto potret tetap satu kolom tinggi.
   */
  gallery: [
    {
      src: "/photos/gallery/maba-1.jpg",
      alt: "GENOMIA 23 berkumpul di ruang kelas pada masa mahasiswa baru",
      caption: "Hari pertama, satu angkatan GENOMIA 23",
      ratio: "16/9",
    },
    {
      src: "/photos/gallery/maba-2.jpg",
      alt: "GENOMIA 23 memenuhi ruang kelas bersama saat masa orientasi",
      caption: "Ruangan penuh, cerita baru dimulai",
      ratio: "16/9",
    },
    {
      src: "/photos/gallery/maba-5.jpg",
      alt: "GENOMIA 23 membentuk simbol segitiga bersama di depan gedung kampus",
      caption: "Kompak sejak dari kampus",
      ratio: "9/16",
    },
    {
      src: "/photos/gallery/maba-4.jpg",
      alt: "GENOMIA 23 berkumpul di rooftop bersama",
      caption: "Satu tempat, banyak tawa",
      ratio: "16/9",
    },
    {
      src: "/photos/gallery/maba-3.jpg",
      alt: "Sebagian GENOMIA 23 duduk santai sambil mengobrol di rooftop",
      caption: "Ngobrol sampai lupa waktu",
      ratio: "9/16",
    },
    {
      src: "/photos/gallery/perjalanan-1.jpg",
      alt: "GENOMIA 23 duduk santai di taman kampus",
      caption: "Waktu senggang di sela kuliah",
      ratio: "9/16",
    },
    {
      src: "/photos/gallery/maba-6.jpg",
      alt: "GENOMIA 23 berkumpul di rooftop sambil bermain gitar",
      caption: "Musik dan secangkir cerita",
      ratio: "3/4",
    },
    {
      src: "/photos/gallery/maba-7.jpg",
      alt: "Sebagian GENOMIA 23 tertawa bersama sambil duduk di rooftop",
      caption: "Momen kecil yang paling dirindukan",
      ratio: "3/4",
    },
    {
      src: "/photos/gallery/perjalanan-2.jpg",
      alt: "GENOMIA 23 berfoto bersama saat healing ke pantai",
      caption: "Healing, melepas penat kuliah",
      ratio: "3/4",
    },
    {
      src: "/photos/gallery/perjalanan-3.jpg",
      alt: "GENOMIA 23 berkumpul pada malam hari di sebuah acara kebersamaan",
      caption: "Kumpul malam mempererat kebersamaan",
      ratio: "4/3",
    },
    {
      src: "/photos/gallery/healing-1.jpg",
      alt: "GENOMIA 23 singgah di jalan perkebunan teh dalam perjalanan healing",
      caption: "Healing bareng, jauh dari kampus",
      ratio: "4/3",
    },
    {
      src: "/photos/gallery/healing-2.jpg",
      alt: "GENOMIA 23 berpose di jalan perkebunan teh",
      caption: "Udara sejuk, tawa yang sama",
      ratio: "3/4",
    },
    {
      src: "/photos/gallery/healing-3.jpg",
      alt: "GENOMIA 23 berpose bersama di jalan perkebunan teh",
      caption: "Sejenak lupa deadline",
      ratio: "3/4",
    },
    {
      src: "/photos/gallery/sidang-1.jpg",
      alt: "GENOMIA 23 berfoto di tangga kampus dengan pakaian sidang",
      caption: "Hari sidang, tegang tapi kompak",
      ratio: "9/16",
    },
    {
      src: "/photos/gallery/sidang-2.jpg",
      alt: "GENOMIA 23 berfoto di tangga kampus setelah sidang",
      caption: "Satu per satu berhasil dilalui",
      ratio: "9/16",
    },
    {
      src: "/photos/gallery/sidang-3.jpg",
      alt: "GENOMIA 23 berkumpul di tangga kampus dengan pakaian sidang",
      caption: "Menuju garis akhir",
      ratio: "9/16",
    },
    {
      src: "/photos/gallery/studio-jurusan-1.jpg",
      alt: "GENOMIA 23 berfoto studio dengan seragam jurusan Teknik Informatika",
      ratio: "3/2",
    },
    {
      src: "/photos/gallery/studio-jurusan-2.jpg",
      alt: "GENOMIA 23 berfoto studio dengan seragam jurusan",
      ratio: "3/2",
    },
    {
      src: "/photos/gallery/studio-jurusan-3.jpg",
      alt: "GENOMIA 23 berfoto studio dengan seragam jurusan",
      ratio: "3/2",
    },
    {
      src: "/photos/gallery/studio-kelas-1.jpg",
      alt: "GENOMIA 23 berfoto studio dengan seragam kelas 23",
      ratio: "3/2",
    },
    {
      src: "/photos/gallery/studio-kelas-2.jpg",
      alt: "GENOMIA 23 berfoto studio dengan seragam kelas 23",
      ratio: "3/2",
    },
    {
      src: "/photos/gallery/studio-kelas-3.jpg",
      alt: "GENOMIA 23 berfoto studio dengan seragam kelas 23",
      ratio: "3/2",
    },
    {
      src: "/photos/gallery/studio-putih-1.jpg",
      alt: "GENOMIA 23 berfoto studio dengan balutan putih",
      ratio: "3/2",
    },
    {
      src: "/photos/gallery/studio-putih-2.jpg",
      alt: "GENOMIA 23 berfoto studio dengan balutan putih",
      ratio: "3/2",
    },
    {
      src: "/photos/gallery/izin.jpg",
      alt: "GENOMIA 23 berdoa bersama menjelang hari wisuda",
      caption: "Kami mohon doa dan restu untuk melangkah lebih jauh",
      ratio: "3/2",
    },
  ] as GalleryItem[],

  quote: {
    text: "Tiga tahun ini bukan hanya tentang gelar, tetapi tentang kebersamaan yang kami bangun satu sama lain, dan tentang siapa kami karena satu sama lain.",
    source: "Catatan kecil GENOMIA 23 menjelang wisuda",
  },

  music: {
    /** taruh file di /public/music/ lalu tulis path-nya di sini */
    src: "/music/ingat-hari-ini.mp3",
    title: "Ingat Hari Ini",
  },

  /** teks pembuka di dalam undangan */
  opening:
    "Tiga tahun berlalu dengan segala revisi dan malam-malam panjangnya, dan akhirnya sampai juga di titik ini. Dengan penuh syukur, kami — GENOMIA 23 — mengundang Anda untuk hadir dan berbagi kebahagiaan di hari wisuda kami.",

  closing:
    "Kehadiran Anda akan menjadi kebahagiaan tersendiri bagi kami, keluarga besar GENOMIA 23. Terima kasih atas doa dan dukungan yang selalu menyertai.",

  /** nama di bagian tanda tangan penutup */
  signature: "GENOMIA 23",

  year: "2026",

  /** label & judul kecil di UI — ganti sesuka hati */
  copy: {
    coverKicker: "Wisuda 2026",
    coverTagline: "Akhirnya sampai di garis akhir.",
    greetingLabel: "Kepada Yth.",
    openButton: "Buka Undangan",
    musicHint: "Nyalakan suara untuk pengalaman terbaik.",
    introLead: "Dengan penuh syukur,",
    panelHeading: "Simpan tanggalnya",
    mapsButton: "Lihat Lokasi",
    rundownHeading: "Susunan Acara",
    galleryHeading: "Sepenggal Perjalanan",
    thanksPrefix: "Terima kasih",
    signoff: "Sampai jumpa di hari bahagia itu,",
  },
};

export type EventData = typeof event;
