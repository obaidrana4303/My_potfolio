'use strict';

/* ══════════════════════════════════════════════════
   DATA — Skills, Projects, Experience, Contacts
══════════════════════════════════════════════════ */

const SKILLS = {
  "Languages": { color: "var(--accent)", icon: "</>", items: ["C++", "C", "C#", ".NET", "Python", "Dart", "JavaScript", "SQL", "Assembly"] },
  "Frontend": { color: "var(--accent2)", icon: "🎨", items: ["React.js", "HTML5", "CSS3", "Flutter"] },
  "Backend": { color: "var(--accent3)", icon: "⚙️", items: ["Node.js", "Firebase", "Google Cloud"] },
  "AI / ML": { color: "var(--yellow)", icon: "🧠", items: ["PyTorch", "HuggingFace", "RAG", "Fine-tuning", "Pretraining", "Vision Transformers"] },
  "Tools": { color: "#a855f7", icon: "🔧", items: ["Git", "Streamlit", "Groq AI", "MusicBrainz", "AcoustID"] },
};

const PROJECTS = [
  {
    id: 1, title: "Clinical RAG System", sub: "Diagnostic Reasoning Engine", cat: "AI / NLP", tag: "GenAI", color: "#00f5d4", icon: "🧬",
    desc: "End-to-end RAG pipeline (BM25 + TinyLlama) with Streamlit frontend for interactive diagnostic reasoning over the DiReCT clinical dataset.",
    tech: ["Python", "TinyLlama", "BM25", "RAG", "Streamlit", "NLP"], link: "https://ragdiagnostic--reasoning-for-clinical-notes-n7ehdpllhs9z3xbyjj.streamlit.app/", type: "live"
  },
  {
    id: 2, title: "Masked Autoencoder (MAE)", sub: "Self-Supervised Visual Learning", cat: "Computer Vision", tag: "Deep Learning", color: "#f72585", icon: "👁️",
    desc: "Self-supervised MAE from scratch using Vision Transformers in PyTorch. Trained on Tiny ImageNet to reconstruct images from 25% visible patches — PSNR ~22dB, SSIM ~0.65.",
    tech: ["PyTorch", "Vision Transformers", "MAE", "Tiny ImageNet", "Python"], link: "https://huggingface.co/spaces/RanaObaid4303/obaid-mae-tiny-imagenet", type: "live"
  },
  {
    id: 3, title: "Fine-Tuning Transformers", sub: "Multi-Task NLP Applications", cat: "NLP", tag: "ML", color: "#7209b7", icon: "🤖",
    desc: "Fine-tuned BERT, GPT-2, and T5 for classification, code generation, and summarization tasks across multiple NLP domains.",
    tech: ["BERT", "GPT-2", "T5", "HuggingFace", "Python", "PyTorch"], link: "https://github.com/obaidrana4303", type: "github"
  },
  {
    id: 4, title: "UMEED", sub: "Cloud-Based Geospatial AI System", cat: "Mobile / Cloud", tag: "Flutter", color: "#4cc9f0", icon: "🌍",
    desc: "AI-powered mobile app that analyzes environmental and satellite data to provide intelligent insights and decision support for environmental problems.",
    tech: ["Flutter", "Firebase", "Google Cloud", "Python", "AI", "Dart"], link: "https://github.com/obaidrana4303", type: "github"
  },
  {
    id: 5, title: "Music Organizer", sub: "AI-Powered Local Music Manager", cat: "App Development", tag: "Flutter", color: "#fb8500", icon: "🎵",
    desc: "Flutter Android app that automatically scans, identifies, and organizes music libraries using MusicBrainz, AcoustID fingerprinting, and Groq AI — with bulk metadata fixing, duplicate detection, and a built-in player.",
    tech: ["Flutter", "Dart", "Groq AI", "AcoustID", "MusicBrainz", "Firebase"], link: "https://github.com/obaidrana4303", type: "github"
  },
  {
    id: 6, title: "Full-Stack Web Apps", sub: "Responsive Modern Web Interfaces", cat: "Web Development", tag: "React", color: "#06d6a0", icon: "🌐",
    desc: "Responsive web applications using HTML, CSS, JavaScript, React.js, and Node.js. Built and integrated frontend and backend in a full-stack environment at DATICS-AI.",
    tech: ["React.js", "Node.js", "HTML", "CSS", "JavaScript", "REST APIs"], link: "https://github.com/obaidrana4303", type: "github"
  },
  {
    id: 7, title: "Dodgem Coin Grab", sub: "Multi-Level AI Console Game", cat: "Games / Systems", tag: "C++", color: "#ffd60a", icon: "🎮",
    desc: "Challenging 4-level console game where a single player collects coins on a grid while 1–3 intelligent computer opponents predict moves and adapt their pursuit strategy each level. Features file-based high-score persistence. Also implemented a faster, smoother version in NASM Assembly (COAL) achieving greater performance accuracy.",
    tech: ["C++", "File Handling", "AI Pathfinding", "NASM Assembly", "COAL", "Console"], link: "https://github.com/obaidrana4303", type: "github"
  },
  {
    id: 8, title: "Tic-Tac-Toe", sub: "Two-Player Console Game", cat: "Games / Systems", tag: "C++", color: "#e63946", icon: "⭕",
    desc: "A clean, interactive 2-player Tic-Tac-Toe game built in C++ as one of my earliest projects. Features symbol selection, move validation, repeated-address detection, and win checking across all rows, columns, and diagonals.",
    tech: ["C++", "Console I/O", "Game Logic"], link: "https://github.com/obaidrana4303", type: "github"
  },
  {
    id: 9, title: "Snake Game", sub: "COAL / NASM Assembly Project", cat: "Games / Systems", tag: "Assembly", color: "#57cc99", icon: "🐍",
    desc: "Fully functional Snake game implemented in NASM x86 Assembly as a COAL course project. Low-level graphics and input handling demonstrate deep understanding of registers, memory addressing, and hardware-level control flow.",
    tech: ["NASM", "x86 Assembly", "COAL", "Low-Level I/O", "Console"], link: "https://github.com/obaidrana4303", type: "github"
  },
  {
    id: 10, title: "University Management System", sub: "OOP Course Project", cat: "Systems / OOP", tag: "C++", color: "#b5838d", icon: "🏫",
    desc: "Comprehensive OOP-based university management system in C++ featuring a full class hierarchy — Person, Teacher, Student, HOD, Admin — with polymorphism, operator overloading, and file handling. Manages student records, timetables, grades, attendance, and multi-role authentication.",
    tech: ["C++", "OOP", "Inheritance", "Polymorphism", "File Handling", "Visual Studio"], link: "https://github.com/obaidrana4303", type: "github"
  },
  {
    id: 11, title: "DB Management App", sub: "Data Structures & Database Lab Project", cat: "Systems / OOP", tag: "C# / SQL", color: "#6d6875", icon: "🗄️",
    desc: "A C# Windows Forms desktop application built as a Database Lab final project. Connects to Oracle and SQL Server backends to support full CRUD operations across multiple data forms — featuring DataSets, ADO.NET, and a polished multi-form GUI.",
    tech: ["C#", ".NET", "Oracle", "SQL Server", "Windows Forms", "ADO.NET"], link: "https://github.com/obaidrana4303", type: "github"
  },
  {
    id: 12, title: "Pacman Game", sub: "Freelance — OOP C++ Console Game", cat: "Games / Systems", tag: "C++", color: "#f4a261", icon: "👻",
    desc: "Freelance-commissioned Pacman game in C++ using an object-oriented architecture. Separate classes handle Ghosts, Maze generation, and Player movement, delivering the classic pellet-eating gameplay with ghost chase AI in a terminal environment.",
    tech: ["C++", "OOP", "Ghost AI", "Maze Generation", "Console"], link: "https://github.com/obaidrana4303", type: "github"
  },
  {
    id: 13, title: "Space Shooter", sub: "Freelance — Arcade Console Game", cat: "Games / Systems", tag: "C++", color: "#457b9d", icon: "🚀",
    desc: "Freelance-commissioned space shooter arcade game built in C++. Players pilot a ship dodging and destroying incoming enemies across escalating waves, demonstrating real-time input handling, collision detection, and dynamic difficulty scaling in a console environment.",
    tech: ["C++", "Real-Time Input", "Collision Detection", "Console", "Game Loop"], link: "https://github.com/obaidrana4303", type: "github"
  },
  {
    id: 14, title: "Custom DDPM Image Synthesis", sub: "Diffusion Model for High-Quality Generation", cat: "AI / NLP", tag: "Deep Learning", color: "#c77dff", icon: "🎨",
    desc: "Designed and trained a custom Denoising Diffusion Probabilistic Model (DDPM) with a U-Net backbone for high-resolution image generation, reverse denoising, and target image reconstruction. Optimized with mixed precision training and evaluated using PSNR & SSIM metrics. Deployed via Gradio/Streamlit for interactive inference.",
    tech: ["Python", "PyTorch", "U-Net", "DDPM", "Gradio", "Streamlit"], link: "https://github.com/obaidrana4303", type: "github"
  },
  {
    id: 15, title: "Martin Dow Field Force Tracker", sub: "Real-Time Location & Reporting System", cat: "Mobile / Cloud", tag: "Android", color: "#2ec4b6", icon: "📍",
    desc: "Full-stack real-time GPS tracking and field reporting system built for Martin Dow Group to monitor pharmaceutical sales reps. Features an Android app with foreground GPS service, offline Room caching & auto-sync, a Python Flask RESTful backend with SQLite, and a PIN-protected web dashboard displaying live positions on Google Maps with auto-refreshing cards and daily objective summaries.",
    tech: ["Java", "Android SDK", "Python", "Flask", "SQLite", "Google Maps API"], link: "https://github.com/obaidrana4303/-Martin-Dow-Real-Time-Field-Force-Tracker", type: "github"
  },
];

const EXP = [
  {
    company: "DATICS-AI", role: "Software & AI Intern", period: "July – August 2025", color: "var(--accent)",
    desc: "Developed responsive web applications and integrated full-stack components at an AI-driven data analytics company.", num: "01"
  },
  {
    company: "FAST NUCES", role: "Teaching & Lab Assistant", period: "Aug 2024 – Jun 2025", color: "var(--accent3)",
    desc: "Teaching Assistant for OOP and Lab Assistant for Data Structures — supporting students in theoretical and practical implementation.", num: "02"
  },
];

const CONTACTS = [
  { label: "Email", value: "orana4303@gmail.com", href: "mailto:orana4303@gmail.com", color: "var(--accent)", icon: "✉" },
  { label: "GitHub", value: "github.com/obaidrana4303", href: "https://github.com/obaidrana4303", color: "var(--accent2)", icon: "◈" },
  { label: "Phone", value: "+92307-222-0445", href: "tel:+923072220445", color: "var(--accent3)", icon: "◉" },
  { label: "Location", value: "Bahawalpur, Punjab, Pakistan", href: null, color: "var(--yellow)", icon: "◎" },
];
