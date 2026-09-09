/**
 * Portfolio Data for Muhamad Hata
 * Fullstack Mobile Developer, Website Developer, and AI Engineer
 */

export const personalInfo = {
  name: "Muhamad Hata",
  title: "Fullstack Mobile Developer, Website Developer & AI Engineer",
  university: "Universitas Pendidikan Indonesia (UPI)",
  major: "Teknik Komputer",
  photo: "/Foto_PAS_Hata.jpeg",
  bio: "Saat ini saya masih berstatus sebagai mahasiswa Teknik Komputer di Universitas Pendidikan Indonesia (UPI). Saya mendedikasikan proses belajar saya sebagai Web, Mobile, dan AI Engineer yang berfokus pada implementasi nyata. Saya memiliki antusiasme dan ketertarikan tinggi untuk terus mendalami ketiga bidang teknologi tersebut dengan merancang serta menciptakan berbagai program dan aplikasi yang solutif. Semangat eksplorasi ini juga saya asah secara langsung melalui peran aktif sebagai peneliti magang di Pusat Riset Kecerdasan Artifisial dan Keamanan Siber (PR KAKS) BRIN.",
  location: "Bandung, Indonesia",
  github: "https://github.com/MuhamadHata",
  linkedin: "https://www.linkedin.com/in/muhamad-hata-b999901a4/",
  email: "muhamadhata26042005@gmail.com",
};

export const educationAndExperience = [
  {
    id: "brin",
    type: "experience",
    category: "Riset Kecerdasan Artifisial & Keamanan Siber",
    role: "Peneliti Magang (Research Intern)",
    institution: "Badan Riset dan Inovasi Nasional (BRIN)",
    unit: "Pusat Riset Kecerdasan Artifisial dan Keamanan Siber (PR KAKS)",
    period: "Februari 2026 - Sekarang (Aktif)",
    location: "Bandung, Indonesia",
    badge: "ACTIVE RESEARCH CONFIDANT",
    description: "Melakukan penelitian intensif dan eksperimentasi model kecerdasan artifisial, meliputi pemrosesan citra komputer (Computer Vision), akselerasi inferensi model deep learning, dan pengujian ketahanan keamanan siber terhadap adversarial inputs.",
    achievements: [
      "Mengembangkan pipeline evaluasi model Computer Vision berbasis YOLO untuk inferensi citra terdistribusi.",
      "Menganalisis pola anomali telemetri sensor dan proteksi integritas data pada edge computing.",
      "Melakukan studi komparatif kinerja arsitektur deep learning pada perangkat berkemampuan komputasi terbatas."
    ],
    techTags: ["Python", "Computer Vision", "Deep Learning", "Edge AI", "Cyber Security", "Research Analysis"]
  },
  {
    id: "upi",
    type: "education",
    category: "Pendidikan Tinggi",
    role: "Mahasiswa S1 Teknik Komputer",
    institution: "Universitas Pendidikan Indonesia (UPI)",
    unit: "Kampus Daerah UPI Cibiru",
    period: "2021 - Sekarang",
    location: "Bandung, Indonesia",
    badge: "AKADEMIK",
    description: "Menempuh pendidikan sarjana teknik yang saat ini masih Semester 7 dengan fokus kurikulum pada Rekayasa Perangkat Lunak, Arsitektur Sistem Komputer, Jaringan & Keamanan Siber, Pengolahan Sinyal Digital, Sistem Tertanam, dan Inteligence Device Development.",
    achievements: [
      "Menguasai perancangan sistem berbasis mikrokontroler dan telemetri IoT (ESP32 / Arduino / C++).",
      "Merancang proyek perangkat lunak multiplatform mobile dan web untuk kebutuhan publik."
    ],
    techTags: ["Computer Engineering", "System Architecture", "C++", "Data Structures", "Embedded Systems", "Network Security"]
  }
];

import flutterIcon from '../assets/Flutter.svg';
import dartIcon from '../assets/Dart.svg';
import kotlinIcon from '../assets/Kotlin.svg';
import reactIcon from '../assets/react.svg';
import tailwindIcon from '../assets/Tailwind CSS.svg';
import html5Icon from '../assets/HTML5.svg';
import jsIcon from '../assets/JavaScript.svg';
import vueIcon from '../assets/Vue.js.svg';
import nextIcon from '../assets/Next.js.svg';
import vercelIcon from '../assets/Vercel.svg';
import pythonIcon from '../assets/Python.svg';
import pytorchIcon from '../assets/PyTorch.svg';
import opencvIcon from '../assets/OpenCV.svg';
import numpyIcon from '../assets/NumPy.svg';
import supabaseIcon from '../assets/supabase.svg';
import firebaseIcon from '../assets/Firebase.svg';
import fastapiIcon from '../assets/FastAPI.svg';
import phpIcon from '../assets/PHP.svg';
import mysqlIcon from '../assets/MySQL.svg';
import cppIcon from '../assets/C++ (CPlusPlus).svg';
import gitIcon from '../assets/Git.svg';
import githubIcon from '../assets/GitHub.svg';
import vscodeIcon from '../assets/Visual Studio Code (VS Code).svg';
import figmaIcon from '../assets/Figma.svg';

export const techStackList = [
  {
    name: "Flutter",
    category: "Mobile",
    level: "Intermediate",
    icon: flutterIcon,
    description: "Multiplatform UI framework untuk Android & iOS dengan arsitektur reaktif, State Management (Provider/BLoC), dan performa 60-120 FPS.",
    color: "#02569B"
  },
  {
    name: "Dart",
    category: "Mobile",
    level: "Intermediate",
    icon: dartIcon,
    description: "Bahasa pemrograman strongly-typed berorientasi objek yang mendukung kompilasi AOT (Ahead-of-Time) dan JIT.",
    color: "#0081C9"
  },
  {
    name: "Kotlin",
    category: "Mobile",
    level: "Intermediate",
    icon: kotlinIcon,
    description: "Bahasa pemrograman modern untuk native Android development, interoperabilitas Java, Coroutines async, dan Jetpack libraries.",
    color: "#7F52FF"
  },
  {
    name: "Next.js",
    category: "Web",
    level: "Intermediate",
    icon: nextIcon,
    description: "React enterprise framework untuk Server-Side Rendering (SSR), Static Site Generation (SSG), App Router modern, dan arsitektur web performa tinggi.",
    color: "#000000"
  },
  {
    name: "React",
    category: "Web",
    level: "Intermediate",
    icon: reactIcon,
    description: "Pustaka antarmuka pengguna berbasis komponen modular dengan ekosistem Hooks, Context, dan virtual DOM efisien.",
    color: "#087EA4"
  },
  {
    name: "Tailwind CSS",
    category: "Web",
    level: "Intermediate",
    icon: tailwindIcon,
    description: "Utility-first CSS framework untuk perancangan layout ultra-responsif, desain custom, dan integrasi animasi halus.",
    color: "#06B6D4"
  },
  {
    name: "HTML5 & CSS3",
    category: "Web",
    level: "Expert",
    icon: html5Icon,
    description: "Standar semantik web modern, CSS Grid, Flexbox, media queries, SVG styling, dan animasi hardware-accelerated.",
    color: "#E34F26"
  },
  {
    name: "JavaScript",
    category: "Web",
    level: "Advanced",
    icon: jsIcon,
    description: "Pemrograman asynchronous modern (ES2023+), Promise, Typed Interfaces, DOM APIs, dan Web Audio API.",
    color: "#F7DF1E"
  },
  {
    name: "Vue.js",
    category: "Web",
    level: "Intermediate",
    icon: vueIcon,
    description: "Progressive JavaScript framework dengan Composition API, reactivity system, dan SFC (Single File Components).",
    color: "#4FC08D"
  },
  {
    name: "Python",
    category: "AI",
    level: "Intermediate",
    icon: pythonIcon,
    description: "Bahasa pemrograman utama riset AI, otomasi skrip, integrasi REST, dan perancangan pipeline machine learning.",
    color: "#3776AB"
  },
  {
    name: "PyTorch & AI",
    category: "AI",
    level: "Intermediate",
    icon: pytorchIcon,
    description: "Deep learning framework dinamis untuk pelatihan model neural network, fine-tuning, dan akselerasi komputasi tensor GPU.",
    color: "#EE4C2C"
  },
  {
    name: "OpenCV",
    category: "AI",
    level: "Intermediate",
    icon: opencvIcon,
    description: "Library Computer Vision tingkat lanjut untuk pemrosesan citra real-time, segmentasi fitur, tracking, dan transformasi gambar.",
    color: "#5C3EE8"
  },
  {
    name: "NumPy",
    category: "AI",
    level: "Intermediate",
    icon: numpyIcon,
    description: "Komputasi numerik saintifik performa tinggi, operasi array multidimensi, aljabar linear, dan manipulasi tensor.",
    color: "#013243"
  },
  {
    name: "Supabase",
    category: "Backend",
    level: "Intermediate",
    icon: supabaseIcon,
    description: "BaaS terbuka berbasis PostgreSQL, Realtime WebSockets, Row Level Security (RLS), Edge Functions, dan Storage.",
    color: "#3ECF8E"
  },
  {
    name: "Firebase",
    category: "Backend",
    level: "Intermediate",
    icon: firebaseIcon,
    description: "Google Cloud BaaS: Firebase Authentication, Cloud Firestore NoSQL, Cloud Messaging (FCM), dan Crashlytics telemetry.",
    color: "#FFCA28"
  },
  {
    name: "FastAPI",
    category: "Backend",
    level: "Intermediate",
    icon: fastapiIcon,
    description: "Web framework Python modern berkecepatan tinggi berbasis OpenAPI, Pydantic, dan async/await untuk microservices AI.",
    color: "#059669"
  },
  {
    name: "PHP",
    category: "Backend",
    level: "Intermediate",
    icon: phpIcon,
    description: "Pengembangan server-side web dinamis, integrasi database relasional MySQL, otentikasi sesi, dan CRUD sistem informasi.",
    color: "#4F5D95"
  },
  {
    name: "MySQL",
    category: "Backend",
    level: "Intermediate",
    icon: mysqlIcon,
    description: "Relational Database Management System (RDBMS), perancangan skema relasional, indexing, dan optimasi query terstruktur.",
    color: "#00758F"
  },
  {
    name: "C++ & IoT",
    category: "IoT",
    level: "Intermediate",
    icon: cppIcon,
    description: "Pemrograman sistem tertanam (Embedded Systems), antarmuka mikrokontroler ESP32, telemetri sensor, dan integrasi Thinger.io Cloud.",
    color: "#00599C"
  },
  {
    name: "Figma",
    category: "Tools",
    level: "Expert",
    icon: figmaIcon,
    description: "Desain antarmuka UI/UX kolaboratif, perancangan wireframe, prototyping interaktif, design tokens, dan aset grafis Persona 5.",
    color: "#F24E1E"
  },
  {
    name: "Git",
    category: "Tools",
    level: "Intermediate",
    icon: gitIcon,
    description: "Distributed version control system untuk pelacakan perubahan kode, branching, merging, dan staging terstruktur.",
    color: "#F05032"
  },
  {
    name: "GitHub",
    category: "Tools",
    level: "Intermediate",
    icon: githubIcon,
    description: "Platform kolaborasi kode, CI/CD GitHub Actions, repositori terbuka, Issue tracking, dan open-source deployment.",
    color: "#181717"
  },
  {
    name: "VS Code",
    category: "Tools",
    level: "Intermediate",
    icon: vscodeIcon,
    description: "Lingkungan pengembangan kode terpadu utama dengan kustomisasi debugging, linting, integrasi Git, dan remote SSH.",
    color: "#007ACC"
  }
];

export const projectList = [
  {
    id: "sehati-ai",
    title: "Aplikasi SEHATI-AI",
    subtitle: "Sistem Evaluasi Holistik Aktivitas Fisik dan Nutrisi Terintegrasi Multimodal AI & Gait Analysis",
    category: "Mobile",
    featured: true,
    rankBadge: "PHANTOM RANK S",
    repoName: "Aplikasi-SEHATI-AI",
    githubUrl: "https://github.com/MuhamadHata/Aplikasi-SEHATI-AI",
    summary: "Aplikasi kesehatan holistik berbasis kecerdasan artifisial (Computer Vision YOLOv8, ML klasifikasi klinis, LLM Groq & Gemini) untuk evaluasi gizi makanan, deteksi risiko diabetes tipe-2, analisis gaya berjalan (Gait Analysis), serta konsultasi kesehatan cerdas.",
    detailedOverview: "SEHATI-AI menggabungkan kemampuan Computer Vision (Ultralytics YOLOv8) untuk mengenali masakan Indonesia dan internasional secara langsung via kamera, mengkalkulasi kalori serta makronutrisi. Dilengkapi model Machine Learning untuk skrining dini risiko klinis diabetes, pemantauan gula darah berkala, penghitung langkah hemat baterai dengan akselerometer latar belakang, serta integrasi LLM (Google Gemini & Groq LLaMA 3) sebagai asisten virtual 'Nubi'.",
    highlights: [
      "🏠 Dasbor Kesehatan Holistik: Menampilkan metrik vital dalam satu layar, estimasi Biological Aging Score, skor kebugaran, asupan air harian, serta ringkasan aktivitas.",
      "📷 AI Food Recognition (YOLOv8): Pengenalan makanan khas Indonesia dan internasional otomatis via kamera dengan kalkulasi kalori & rincian makronutrisi.",
      "🩺 Prediksi Risiko Diabetes: Skrining klinis mandiri untuk deteksi dini risiko diabetes tipe 2 menggunakan model klasifikasi Machine Learning.",
      "🩸 Tracker Kadar Gula Darah: Pencatatan glukosa berkala (puasa, sewaktu, 2 jam PP) dengan kategorisasi otomatis dan visualisasi grafik tren.",
      "🚶 Sensor Pedometer Hemat Daya: Penghitung langkah latar belakang (background step tracking) memanfaatkan sensor akselerometer bawaan tanpa menguras baterai.",
      "🔬 Gait Analysis (Analisis Gaya Berjalan): Pengukuran keteraturan cadence, simetri langkah, dan variabilitas langkah untuk deteksi dini penurunan fungsi fisik.",
      "💪 Panduan Latihan Fisik (Workout): Katalog latihan terstruktur (Dada, Punggung, Kaki, Lengan, Bahu, Inti) lengkap dengan instruksi langkah demi langkah.",
      "🥗 Rekomendasi Diet & Nutrisi Personal: Rekomendasi menu harian seimbang berbasis prinsip Isi Piringku Kemenkes RI dan kalkulasi BMR/TDEE.",
      "✨ Scan Kesehatan Kulit: Deteksi kondisi kulit wajah (jerawat, pigmentasi) serta informasi indeks UV untuk panduan perlindungan sinar matahari.",
      "💬 Asisten AI Interaktif Nubi: Asisten virtual bertenaga Groq LLaMA 3 dan Google Gemini API untuk konsultasi pola hidup sehat."
    ],
    architecture: "Frontend: Flutter (Dart) modular; Backend: Supabase (PostgreSQL, Realtime, Row Level Security); AI Vision: Ultralytics YOLOv8; LLM: Groq LLaMA-3 & Google Gemini API; Sensor Fusion: Accelerometer & Pedometer API.",
    techStack: ["Flutter", "Dart", "Supabase", "Python", "YOLOv8", "Gemini API", "Groq LLaMA-3", "Sensor Fusion"],
    screenshots: [
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Aplikasi-SEHATI-AI/main/Tampilan%20Fitur%20Sehati/tampilan%20beranda.jpeg",
        title: "Dasbor Beranda Utama",
        caption: "Dasbor holistik, skor penuaan biologis, metrik kalori & status hidrasi harian",
        tag: "Dashboard"
      },
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Aplikasi-SEHATI-AI/main/Tampilan%20Fitur%20Sehati/tampilan%20scan%20makanan.jpeg",
        title: "AI Food Recognition (Vision)",
        caption: "Deteksi otomatis jenis makanan dengan YOLOv8 dan estimasi nilai gizi",
        tag: "Computer Vision"
      },
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Aplikasi-SEHATI-AI/main/Tampilan%20Fitur%20Sehati/tampilan%20log%20makanan.jpeg",
        title: "Pencatatan & Log Nutrisi",
        caption: "Riwayat asupan makanan, rincian makronutrisi (karbohidrat, protein, lemak)",
        tag: "Nutrisi"
      },
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Aplikasi-SEHATI-AI/main/Tampilan%20Fitur%20Sehati/tampilan%20deteksi%20diabetes.jpeg",
        title: "Input Skrining Diabetes",
        caption: "Formulir parameter klinis untuk skrining awal risiko diabetes tipe-2",
        tag: "Clinical ML"
      },
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Aplikasi-SEHATI-AI/main/Tampilan%20Fitur%20Sehati/tampilan%20hasil%20deteksi%20diabetes.jpeg",
        title: "Hasil Prediksi & Analisis Risiko",
        caption: "Hasil evaluasi berbasis model klasifikasi machine learning dan rekomendasi tindakan",
        tag: "ML Result"
      },
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Aplikasi-SEHATI-AI/main/Tampilan%20Fitur%20Sehati/tampilan%20kadar%20gula%20darah.jpeg",
        title: "Pemantauan Kadar Gula Darah",
        caption: "Buku catatan glukosa (puasa, sewaktu, 2 jam PP) dengan visualisasi grafik tren",
        tag: "Monitoring"
      },
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Aplikasi-SEHATI-AI/main/Tampilan%20Fitur%20Sehati/tampilan%20langkah.jpeg",
        title: "Pelacak Langkah Sensorik",
        caption: "Penghitung langkah sensorik real-time, cadence, dan progres target harian",
        tag: "Pedometer"
      },
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Aplikasi-SEHATI-AI/main/Tampilan%20Fitur%20Sehati/tampilan%20aktivitas.jpeg",
        title: "Analisis Aktivitas Fisik",
        caption: "Statistik kebugaran harian, riwayat durasi dan pembakaran kalori aktif",
        tag: "Fitness"
      },
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Aplikasi-SEHATI-AI/main/Tampilan%20Fitur%20Sehati/tampilan%20chatbot.jpeg",
        title: "Chatbot Kesehatan Nubi",
        caption: "Konsultasi kesehatan interaktif bertenaga LLM (Groq LLaMA 3 / Google Gemini)",
        tag: "GenAI"
      },
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Aplikasi-SEHATI-AI/main/Tampilan%20Fitur%20Sehati/tampilan%20program%20diet.jpeg",
        title: "Program Diet Terstruktur",
        caption: "Program nutrisi terarah berbasis prinsip Isi Piringku Kemenkes RI",
        tag: "Diet"
      },
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Aplikasi-SEHATI-AI/main/Tampilan%20Fitur%20Sehati/tampilan%20workout.jpeg",
        title: "Panduan & Direktori Workout",
        caption: "Panduan latihan per kelompok otot dengan animasi dan target repetisi",
        tag: "Workout"
      },
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Aplikasi-SEHATI-AI/main/Tampilan%20Fitur%20Sehati/tampilan%20scan%20beauty.jpeg",
        title: "Scan Kecantikan & Kulit",
        caption: "Analisis kondisi kulit wajah dan edukasi proteksi kesehatan kulit dari indeks UV",
        tag: "Skin AI"
      },
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Aplikasi-SEHATI-AI/main/Tampilan%20Fitur%20Sehati/tampilan%20profil.jpeg",
        title: "Profil Pengguna & Biometrik",
        caption: "Pengaturan data biometrik, target kebugaran, dan preferensi akun pengguna",
        tag: "Profile"
      }
    ]
  },
  {
    id: "anilive",
    title: "Projek Anilive",
    subtitle: "Platform Komunitas Anime Modern dengan Semantic Search (RAG) & Realtime Chat",
    category: "Mobile",
    featured: true,
    rankBadge: "PHANTOM RANK A",
    repoName: "Projek-Anilive",
    githubUrl: "https://github.com/MuhamadHata/Projek-Anilive",
    summary: "Aplikasi Flutter berarsitektur offline-first dengan database 30.000+ judul anime, pencarian semantik cerdas berbasis RAG Pipeline, ruang obrolan langsung (Live Chat & DM) realtime, dan linimasa komunitas penggemar.",
    detailedOverview: "Anilive menghadirkan pengalaman eksplorasi anime modern dengan antarmuka Dark-First Material 3. Mengimplementasikan pipeline RAG (Retrieval-Augmented Generation) menggunakan Together AI / LLaMA-3 untuk memahami kueri bahasa alami (misal: 'anime detektif yang tubuhnya mengecil'). Fitur interaktif mencakup live-chat per anime dengan Supabase Realtime WebSocket, direct message antar teman, sistem bookmark offline-first, dan personalisasi profil dengan Giphy API.",
    highlights: [
      "🔍 Pencarian Semantik AI (RAG Pipeline): Pencarian anime berbasis makna alami menggunakan Together AI & LLaMA-3.",
      "⚡ Database Offline-First 30.000+ Anime: Penyimpanan lokal SQLite tersinkronisasi awan dengan multi-tier cache.",
      "💬 Live Chat Realtime per Judul Anime: Ruang diskusi bersama penggemar secara instan via Supabase WebSocket.",
      "✉️ Direct Messaging Antar Pengguna: Fitur obrolan privat antar teman terenkripsi dan realtime.",
      "🌐 Linimasa Komunitas Penggemar: Feed status sosial, interaksi komentar bertingkat (nested comments), dan sistem pertemanan.",
      "🎬 Personalisasi Profil Dinamis: Integrasi Giphy API untuk banner animasi dan kustomisasi avatar."
    ],
    architecture: "Frontend: Flutter (Dart) Material 3 Dark; State: Riverpod; Realtime Backend: Supabase Realtime; Local DB: SQLite (sqflite); AI Pipeline: Together AI LLaMA-3 Semantic Grounding.",
    techStack: ["Flutter", "Dart", "Supabase Realtime", "Together AI", "LLaMA-3", "Riverpod", "SQLite", "Giphy API"],
    screenshots: [
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Projek-Anilive/main/docs/screenshots/01_pencarian_ai_rag.jpeg",
        title: "Pencarian AI RAG",
        caption: "Pencarian semantik cerdas berbasis bahasa alami dengan Together AI LLaMA-3",
        tag: "AI RAG"
      },
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Projek-Anilive/main/docs/screenshots/02_explore_anime.jpeg",
        title: "Halaman Explore Anime",
        caption: "Katalog 30.000+ anime dengan filter genre, musim, dan status rilis",
        tag: "Explore"
      },
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Projek-Anilive/main/docs/screenshots/03_detail_anime.jpeg",
        title: "Halaman Detail Anime",
        caption: "Sinopsis lengkap, daftar episode, karakter, dan trailer video",
        tag: "Detail"
      },
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Projek-Anilive/main/docs/screenshots/04_home_feed.jpeg",
        title: "Feed Status Komunitas",
        caption: "Linimasa kiriman komunitas penggemar dengan komentar bersarang",
        tag: "Social Feed"
      },
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Projek-Anilive/main/docs/screenshots/05_livechat.jpeg",
        title: "Ruang Live Chat Realtime",
        caption: "Diskusi langsung per judul anime bertenaga Supabase WebSocket",
        tag: "Livechat"
      },
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Projek-Anilive/main/docs/screenshots/06_private_chat.jpeg",
        title: "Direct Message (Pesan Pribadi)",
        caption: "Komunikasi privat antar pengguna secara instan dan responsif",
        tag: "Messaging"
      },
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Projek-Anilive/main/docs/screenshots/07_notifikasi.jpeg",
        title: "Pusat Notifikasi Interaksi",
        caption: "Pemberitahuan aktivitas pertemanan, balasan komentar, dan rilis baru",
        tag: "Notification"
      },
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Projek-Anilive/main/docs/screenshots/08_profil_user.jpeg",
        title: "Profil Pengguna Dinamis",
        caption: "Kustomisasi profil pengguna dengan integrasi banner animasi Giphy",
        tag: "Profile"
      }
    ]
  },
  {
    id: "pelita",
    title: "Projek Aplikasi Pelita",
    subtitle: "Sistem Aplikasi Mobile Terintegrasi untuk Layanan Informasi Publik & Evaluasi Gizi Balita",
    category: "Mobile",
    featured: false,
    rankBadge: "RANK B",
    repoName: "Projek-Aplikasi-Pelita",
    githubUrl: "https://github.com/MuhamadHata/Projek-Aplikasi-Pelita",
    summary: "Aplikasi seluler berbasis Flutter yang dirancang untuk memberikan kemudahan akses informasi layanan publik, kalkulasi antropometri gizi balita untuk pencegahan stunting, serta asisten AI Gemini.",
    detailedOverview: "Dikembangkan menggunakan Flutter dan Dart dengan pendekatan arsitektur komponen bersih (Clean Component Design). Aplikasi Pelita berfokus pada kecepatan pemuatan data, keterbacaan antarmuka ramah pengguna, modul skrining status gizi balita berbasis standar Kementerian Kesehatan, serta asisten konsultasi AI bertenaga Google Gemini.",
    highlights: [
      "🏛️ Portal Informasi Publik Terpadu: Layanan direktori informasi instansi publik yang mudah diakses.",
      "👶 Cek Status Gizi & Pencegahan Stunting: Kalkulasi antropometri otomatis untuk memantau tumbuh kembang balita.",
      "🤖 Chatbot Cerdas Google Gemini: Asisten konsultasi nutrisi anak interaktif berbasis Generative AI.",
      "🎨 Desain Antarmuka Material 3: Palet Teal ramah anak yang dirancang presisi via Figma."
    ],
    architecture: "Mobile Framework: Flutter (Dart SDK 3.24+); Backend: Supabase Auth & PostgreSQL; AI: Google Generative AI (Gemini); Desain: Material 3 & Figma.",
    techStack: ["Flutter", "Dart", "Supabase", "Google Gemini AI", "Material 3", "Figma"],
    screenshots: [
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Projek-Aplikasi-Pelita/main/tampilan%20UI%20Pelita/Tampilan%20Beranda.jpeg",
        title: "Tampilan Beranda Utama",
        caption: "Antarmuka beranda ramah keluarga dengan akses cepat ke seluruh layanan",
        tag: "Beranda"
      },
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Projek-Aplikasi-Pelita/main/tampilan%20UI%20Pelita/Tampilan%20Cek%20Status%20Gizi.jpeg",
        title: "Formulir Cek Status Gizi Balita",
        caption: "Input data antropometri berat, tinggi, dan usia untuk skrining gizi",
        tag: "Cek Gizi"
      },
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Projek-Aplikasi-Pelita/main/tampilan%20UI%20Pelita/Tampilan%20Hasil%20Perhitungan%20Gizi.jpeg",
        title: "Hasil Evaluasi Status Gizi",
        caption: "Hasil perhitungan status gizi dan rekomendasi gizi pencegahan stunting",
        tag: "Hasil Gizi"
      },
      {
        url: "https://raw.githubusercontent.com/MuhamadHata/Projek-Aplikasi-Pelita/main/tampilan%20UI%20Pelita/Tampilan%20Chatbot.jpeg",
        title: "Chatbot Nutrisi Anak (Gemini AI)",
        caption: "Konsultasi cerdas seputar nutrisi, jadwal MPASI, dan perawatan balita",
        tag: "Chatbot"
      }
    ]
  },
  {
    id: "bimbel-qta",
    title: "Sistem Informasi Bimbel QTA",
    subtitle: "Portal Manajemen Akademik & Pembelajaran Terpadu Bimbingan Belajar",
    category: "Web",
    featured: false,
    rankBadge: "RANK B",
    repoName: "Projek-Website-Bimbel-QTA",
    githubUrl: "https://github.com/MuhamadHata/Projek-Website-Bimbel-QTA",
    summary: "Platform web fullstack untuk administrasi lembaga bimbingan belajar: manajemen materi modul pembelajaran, jadwal bimbingan, data tutor, dan buku nilai evaluasi siswa.",
    detailedOverview: "Sistem informasi berbasis web yang memfasilitasi kegiatan operasional institusi pendidikan non-formal. Memungkinkan administrator dan pengajar mengelola bank soal, mengunggah modul digital, memantau absensi kehadiran siswa, serta mencetak rapor perkembangan belajar secara otomatis.",
    highlights: [
      "👥 Manajemen Multi-Role: Hak akses terpisah untuk Administrator, Tutor Pengajar, dan Siswa.",
      "📚 Repositori Modul & Bank Soal: Pengarsipan materi pembelajaran digital dan latihan ujian.",
      "📊 Rekapitulasi Presensi & Buku Nilai: Sistem pemantauan kehadiran dan cetak rapor perkembangan belajar.",
      "🔐 Keamanan Sesi & Basis Data: Otentikasi sesi aman berbasis PHP & MySQL relasional."
    ],
    architecture: "Server-side: PHP; Database: MySQL; Client-side: HTML5, CSS3, JavaScript; Lisensi: GPL-3.0.",
    techStack: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript", "Information System"],
    screenshots: []
  },
  {
    id: "catshop",
    title: "Platform E-Commerce Catshop",
    subtitle: "Situs Toko Online Perlengkapan & Kebutuhan Hewan Peliharaan",
    category: "Web",
    featured: false,
    rankBadge: "RANK B",
    repoName: "Projek-Website-Catshop",
    githubUrl: "https://github.com/MuhamadHata/Projek-Website-Catshop",
    summary: "Aplikasi web perdagangan elektronik (e-commerce) interaktif yang menyediakan katalog produk makanan dan aksesoris kucing, keranjang belanja, serta pencatatan order penjualan.",
    detailedOverview: "Menghadirkan solusi belanja digital yang nyaman bagi pecinta kucing. Fitur mencakup navigasi filter kategori produk (makanan basah/kering, obat-obatan, perlengkapan kandang), kalkulasi keranjang belanja dinamis, sistem checkout pemesanan, dan dasbor pengelolaan inventaris barang bagi pengelola toko.",
    highlights: [
      "🛒 Katalog Produk & Filter Kategori: Pencarian makanan, vitamin, dan aksesoris kucing.",
      "💳 Keranjang Belanja Dinamis: Perhitungan total pesanan real-time dengan validasi formulir checkout.",
      "📦 Dasbor Manajemen Inventaris: Manajemen stok barang dan rekapitulasi data pesanan masuk.",
      "🎨 Desain Antarmuka Berorientasi Pengguna: Prototyping terstruktur di Figma dan responsif."
    ],
    architecture: "Web Stack: PHP, MySQL, Bootstrap, Custom CSS, JavaScript; Desain: Figma UI/UX Prototype.",
    techStack: ["PHP", "MySQL", "CSS3", "JavaScript", "Figma", "E-Commerce Architecture"],
    screenshots: []
  },
  {
    id: "thinger-io",
    title: "Sistem Monitoring IoT Thinger.io",
    subtitle: "Sistem Telemetri Sensor Cerdas Berbasis Mikrokontroler & Cloud IoT",
    category: "IoT",
    featured: false,
    rankBadge: "RANK B",
    repoName: "Tugas-IoT-ThingerIO",
    githubUrl: "https://github.com/MuhamadHata/Tugas-IoT-ThingerIO",
    summary: "Proyek sistem tertanam (Embedded Systems) mata kuliah Sistem Tertanam UPI yang menghubungkan mikrokontroler sensor ke cloud platform Thinger.io untuk pemantauan parameter lingkungan secara real-time.",
    detailedOverview: "Implementasi perangkat lunak tingkat rendah (low-level firmware) menggunakan C++ untuk membaca data telemetri sensor analog dan digital. Data dikirimkan melalui protokol jaringan nirkabel ke dasbor visualisasi Thinger.io Cloud, memungkinkan pemantauan visual grafik nilai sensor dari jarak jauh secara presisi.",
    highlights: [
      "⚡ Firmware C++ Efisien: Penulisan kode mikrokontroler berdaya rendah dengan siklus pembacaan stabil.",
      "📡 Transmisi Data Nirkabel Cloud: Konektivitas telemetri real-time via REST API & WebSocket Thinger.io.",
      "📈 Dasbor Visualisasi Grafik: Pemantauan multi-sensor secara langsung dari peramban web atau smartphone.",
      "🔧 Integrasi Hardware Sensor: Penanganan sinyal sensor analog dan digital pada board ESP32/Arduino."
    ],
    architecture: "Hardware Firmware: C++; Platform Cloud: Thinger.io IoT Server; Perangkat: ESP32 / Arduino.",
    techStack: ["C++", "IoT", "Embedded Systems", "Thinger.io", "Hardware Telemetry"],
    screenshots: []
  }
];

