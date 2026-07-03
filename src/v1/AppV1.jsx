import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Code, 
  Briefcase, 
  Award, 
  Terminal, 
  Database, 
  Send, 
  ArrowUp, 
  Menu, 
  X, 
  Sparkles, 
  CheckCircle,
  FileText,
  Sun,
  Moon
} from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';

import ParticleBackground from '../components/ParticleBackground';
import CustomCursor from '../components/CustomCursor';
import ProjectCard from '../components/ProjectCard';
import CommandPalette from '../components/CommandPalette';

// --- CUSTOM SVG BRAND ICONS ---

const Github = ({ size = 20, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    width={size}
    height={size}
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 20, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    width={size}
    height={size}
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// --- CUSTOM SVG LOGO COMPONENT ---

const Logo = ({ size = 28, className = "" }) => (
  <motion.svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    fill="none"
    width={size}
    height={size}
    className={className}
    whileHover={{ scale: 1.1, rotate: 8 }}
    transition={{ type: "spring", stiffness: 400, damping: 12 }}
  >
    <defs>
      <linearGradient id="logo-u-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
      <linearGradient id="logo-k-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
    </defs>
    
    {/* Inner dashed ring */}
    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" className="opacity-25" />
    
    {/* U-Path */}
    <motion.path 
      d="M 28 25 L 28 58 A 12 12 0 0 0 52 58 L 52 25" 
      stroke="url(#logo-u-grad)" 
      strokeWidth="8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    />
          
    {/* K-Diagonals */}
    <motion.path 
      d="M 52 43 L 72 23 M 52 43 L 72 63" 
      stroke="url(#logo-k-grad)" 
      strokeWidth="8" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut", delay: 0.25 }}
    />
  </motion.svg>
);

// --- DATASET DEFINITIONS ---

const PROJECT_DATA = [
  {
    title: "Music Mirror",
    description: "A real-time facial emotion recognition music recommendation system. Reads expressions via webcam to dynamically recommend curated tracks inside an embedded player.",
    tags: ["React.js", "FastAPI", "face-api.js", "Python", "Webcam API", "LocalStorage"],
    category: "Data Science & ML",
    type: "ml",
    highlights: [
      "Real-time webcam feed processed via face-api.js with custom thresholds.",
      "Embedded YouTube player dynamically updates via URL state management.",
      "LocalStorage caching for persistent mood history and user profiles without a backend."
    ],
    github: "https://github.com/UdayPatnala/music-mirror",
    live: "https://music-mirror.vercel.app",
    image: "/music_mirror_real.png"
  },
  {
    title: "Nebula Cinematic Gallery",
    description: "An AI-assisted cinematic memory gallery with local image ingestion, Gemini metadata generation, timeline sorting, duplicate detection, and Firebase sync.",
    tags: ["React.js", "Express", "Node.js", "Firebase", "Gemini API", "Dexie.js", "GSAP"],
    category: "Full-Stack & Web",
    type: "web",
    highlights: [
      "Optimized client-side rendering with Dexie.js for heavy indexed image storage.",
      "TensorFlow MobileNet integration for zero-latency local object detection.",
      "Node/Express proxy securely connecting to Gemini API for metadata generation."
    ],
    github: "https://github.com/UdayPatnala/Nebula",
    live: "https://nebula-nmo.vercel.app",
    image: "/nebula_real.png"
  },
  {
    title: "JavaPath Pro",
    description: "An interactive full-stack learning platform designed to help junior developers master Java syntax, OOP concepts, and design patterns through a simulated corporate ticketing system.",
    tags: ["React.js", "Vite", "Node.js", "Express", "SQLite", "Sequelize ORM", "Gemini API", "JWT"],
    category: "Full-Stack & Web",
    type: "web",
    highlights: [
      "React sandboxed IDE utilizing custom regex for AST-like syntax evaluation.",
      "Express REST API coupled with SQLite and Sequelize ORM for state persistence.",
      "Secure JWT authentication flow and rate-limited Gemini AI mentor integrations."
    ],
    github: "https://github.com/UdayPatnala/Java-Path",
    live: "https://javapath-pro.vercel.app",
    image: "/javapath_real.png"
  },
  {
    title: "Spedex Fintech Dashboard",
    description: "A comprehensive fintech workspace for tracking spending indexing, transaction velocities, and budgeting aggregates.",
    tags: ["Spring Boot", "Java 17", "React Native", "Expo", "Kotlin", "React.js", "H2 Database", "JWT"],
    category: "Full-Stack & Web",
    type: "web",
    highlights: [
      "Robust Spring Boot backend serving JWT-authenticated endpoints.",
      "Expo React Native mobile app with a transient Android/Kotlin module integration.",
      "Feature-rich React web dashboard mapping budgets, vendor insights, and reminders."
    ],
    github: "https://github.com/UdayPatnala/Spedex",
    live: "https://spe-dex.vercel.app",
    image: "/spedex_real.png"
  },
  {
    title: "Churn Prediction System",
    description: "An end-to-end customer churn analysis and prediction model utilizing machine learning to identify high-risk accounts and analyze churn velocities.",
    tags: ["Python", "Pandas", "Scikit-Learn", "XGBoost", "Matplotlib"],
    category: "Data Science & ML",
    type: "ml",
    highlights: [
      "Performs demographic and transaction feature engineering on user datasets.",
      "Trains random forests and XGBoost classification models.",
      "Generates detailed feature importances and ROC-AUC evaluation curves."
    ],
    github: "https://github.com/UdayPatnala/Churn-Prediction-System",
    live: "https://github.com/UdayPatnala/Churn-Prediction-System",
    image: "/churn_real.png"
  },
  {
    title: "Job Finder Portal",
    description: "A job portal search aggregator, application tracker, and resume match diagnostic dashboard for junior developers.",
    tags: ["React.js", "Express", "Node.js", "MongoDB", "Tailwind CSS"],
    category: "Full-Stack & Web",
    type: "web",
    highlights: [
      "Aggregates job listings via custom search endpoints.",
      "Matches resume skills against posting requirements using regex comparison.",
      "Tracks application status pipelines with progress alerts."
    ],
    github: "https://github.com/UdayPatnala/Job-Finder",
    live: "https://github.com/UdayPatnala/Job-Finder",
    image: "/jobflow_real.png"
  },
  {
    title: "SkyFlow Sales Dashboard",
    description: "An interactive business analytics sales dashboard visualizing transaction velocities, regional metrics, and revenue targets.",
    tags: ["React.js", "Chart.js", "Express", "Tailwind CSS", "Node.js"],
    category: "Full-Stack & Web",
    type: "web",
    highlights: [
      "Renders dynamic charts mapping sales performance by region.",
      "Simulates real-time transaction ingestion using socket updates.",
      "Exportable data sheets and metrics summaries."
    ],
    github: "https://github.com/UdayPatnala/Sales-Dashboard",
    live: "https://github.com/UdayPatnala/Sales-Dashboard",
    image: "/skyflow_real.png"
  },
  {
    title: "Smart Parking System",
    description: "A Java-based smart parking space booking and tracking system mapping real-time slot occupancy and reservations.",
    tags: ["Java", "Swing", "JDBC", "MySQL", "Socket Programming"],
    category: "Full-Stack & Web",
    type: "web",
    highlights: [
      "Interactive Java Swing desktop client displaying slot diagrams.",
      "Tracks reservations and real-time occupancy updates in MySQL DB.",
      "Features simulated ticket printouts and check-in/check-out logs."
    ],
    github: "https://github.com/UdayPatnala/Smart-Parking-Java",
    live: "https://github.com/UdayPatnala/Smart-Parking-Java",
    image: "/taskmaster_real.png"
  },
  {
    title: "ETL Data Pipeline",
    description: "An automated data pipeline extracting logs, transforming schemas, and loading processed records into an analytics data warehouse.",
    tags: ["Python", "Apache Airflow", "PostgreSQL", "SQL", "Pandas"],
    category: "Data Science & ML",
    type: "ml",
    highlights: [
      "Extracts unstructured log records from simulated files.",
      "Performs schema cleanups and date indexing transformations using Pandas.",
      "Loads cleaned tables into PostgreSQL for analysis."
    ],
    github: "https://github.com/UdayPatnala/Etl-Data-Pipeline",
    live: "https://github.com/UdayPatnala/Etl-Data-Pipeline",
    image: "/churn_real.png"
  },
  {
    title: "LRU Cache Java Utility",
    description: "A custom thread-safe implementation of a Least Recently Used (LRU) cache in Java with generic key-value mappings.",
    tags: ["Java", "Data Structures", "Generics", "Concurrency", "JUnit"],
    category: "Full-Stack & Web",
    type: "web",
    highlights: [
      "Custom double-linked list and hash map implementation.",
      "Thread-safe synchronization locks for parallel access.",
      "Unit tested coverage validating evictions and cache hits."
    ],
    github: "https://github.com/UdayPatnala/Iru-Cache-Java",
    live: "https://github.com/UdayPatnala/Iru-Cache-Java",
    image: "/taskmaster_real.png"
  },
  {
    title: "Online Bookstore Backend",
    description: "A robust Spring Boot REST API backend managing user catalog carts, orders, and payment integrations.",
    tags: ["Spring Boot", "Java 17", "Hibernate", "Spring Security", "MySQL"],
    category: "Full-Stack & Web",
    type: "web",
    highlights: [
      "Implements repository layers with JPA/Hibernate query bindings.",
      "Secure user profile registration and token checks.",
      "Structured payment checkouts flow simulation."
    ],
    github: "https://github.com/UdayPatnala/Online-Bookstore-Backend",
    live: "https://github.com/UdayPatnala/Online-Bookstore-Backend",
    image: "/taskmaster_real.png"
  },
  {
    title: "GitHub Profile Upgrader",
    description: "A utility script and dashboard to automatically update developer profiles with dynamic readmes and workflow statistics.",
    tags: ["JavaScript", "Node.js", "GitHub Actions", "Markdown"],
    category: "Full-Stack & Web",
    type: "web",
    highlights: [
      "Fetches repository metadata and contributions via GitHub APIs.",
      "Generates customized markdown badges and profiles readmes.",
      "Automates updates on cron schedule triggers."
    ],
    github: "https://github.com/UdayPatnala/github-profile-upgrader",
    live: "https://github.com/UdayPatnala/github-profile-upgrader",
    image: "/skyflow_real.png"
  }
];

const SKILLS_DATA = [
  {
    category: "Programming",
    icon: <Terminal size={24} className="text-emerald-500" />,
    color: "rgba(16, 185, 129, 0.4)",
    items: [
      { name: "Java", level: "Intermediate" },
      { name: "Python", level: "Intermediate" },
      { name: "C Language", level: "Intermediate" }
    ]
  },
  {
    category: "Web & Frontend",
    icon: <Code size={24} className="text-cyan-500" />,
    color: "rgba(6, 182, 212, 0.4)",
    items: [
      { name: "React.js", level: "Advanced" },
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "HTML5 & CSS3", level: "Expert" },
      { name: "JavaScript (ES6+)", level: "Advanced" }
    ]
  },
  {
    category: "Database & Backend",
    icon: <Database size={24} className="text-amber-500" />,
    color: "rgba(245, 158, 11, 0.4)",
    items: [
      { name: "SQL", level: "Intermediate" },
      { name: "PostgreSQL", level: "Intermediate" },
      { name: "Node.js & Express", level: "Intermediate" },
      { name: "Spring Boot", level: "Intermediate" }
    ]
  },
  {
    category: "Core CS & Tools",
    icon: <Award size={24} className="text-emerald-500" />,
    color: "rgba(16, 185, 129, 0.4)",
    items: [
      { name: "Data Structures & Algorithms", level: "Intermediate" },
      { name: "Object Oriented Programming", level: "Intermediate" },
      { name: "Git & GitHub", level: "Advanced" },
      { name: "Docker & Vercel", level: "Intermediate" },
      { name: "Software Testing", level: "Advanced" }
    ]
  }
];

const getProjectCountForSkill = (skillName) => {
  const normalizedSkill = skillName.toLowerCase().trim();
  return PROJECT_DATA.filter((proj) => 
    proj.tags.some((tag) => {
      const normalizedTag = tag.toLowerCase().trim();
      if (normalizedTag.includes(normalizedSkill) || normalizedSkill.includes(normalizedTag)) return true;
      if (normalizedSkill === "java" && normalizedTag.includes("java") && !normalizedTag.includes("javascript")) return true;
      if (normalizedSkill === "git & github" && (normalizedTag.includes("git") || normalizedTag.includes("github"))) return true;
      if (normalizedSkill === "html5 & css3" && (normalizedTag.includes("html") || normalizedTag.includes("css"))) return true;
      if (normalizedSkill === "docker & vercel" && (normalizedTag.includes("docker") || normalizedTag.includes("vercel"))) return true;
      if (normalizedSkill === "node.js & express" && (normalizedTag.includes("node") || normalizedTag.includes("express"))) return true;
      return false;
    })
  ).length;
};

const TRAINING_DATA = [
  {
    role: "Machine Learning Engineer",
    provider: "Codec Technologies",
    period: "8 Weeks",
    description: "Numerical computation and basic model setups in Python using NumPy and Pandas."
  },
  {
    role: "Software Engineer",
    provider: "Codec Technologies",
    period: "4 Weeks",
    description: "Basics of responsive layout setups with HTML, CSS, and vanilla JS DOM manipulation."
  }
];

const EDUCATION_DATA = [
  {
    degree: "B.Tech in Computer Science Engineering (Data Science)",
    institution: "Raghu Institute of Technology, Andhra Pradesh",
    period: "2022 - 2026",
    grade: "CGPA: 7.70",
    color: "border-emerald-500"
  },
  {
    degree: "Intermediate Education",
    institution: "Narayana Junior College, Visakhapatnam",
    period: "2020 - 2022",
    grade: "Score: 910 / 1000",
    color: "border-cyan-500"
  },
  {
    degree: "SSC (Secondary School Certificate)",
    institution: "Abhyudaya High School, Bobbili",
    period: "2019 - 2020",
    grade: "GPA: 10 / 10",
    color: "border-amber-500"
  }
];

const CERTIFICATIONS = [
  { 
    title: "Programming in Java", 
    provider: "NPTEL (National Programme on Technology Enhanced Learning)",
    link: "https://nptel.ac.in/noc/E_Certificate/NPTEL24CS43S97030107030776012"
  },
  { 
    title: "AWS Cloud Foundations Training Badge", 
    provider: "Amazon Web Services (AWS)",
    link: "https://www.credly.com/go/nrAdO7j9"
  },
  { 
    title: "Software Testing Master Class", 
    provider: "Udemy Professional Certificate",
    link: "https://ude.my/UC-bd895877-add9-4488-be08-331cd88b2d6a"
  }
];

const ShowcaseItem = ({ project, index, isDarkMode }) => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [15, -15]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), { stiffness: 120, damping: 20 });
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xVal = (e.clientX - rect.left) / rect.width;
    const yVal = (e.clientY - rect.top) / rect.height;
    mouseX.set(xVal);
    mouseY.set(yVal);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const isLeft = index % 2 === 0;

  // Visual styling colors based on project
  const getColors = (title) => {
    if (title.includes("Music")) {
      return {
        glow: "from-emerald-500/10 via-transparent to-emerald-500/5",
        hoverShadow: "hover:shadow-[0_40px_80px_-20px_rgba(16,185,129,0.3)]",
        border: "border-emerald-500/20 hover:border-emerald-500/40"
      };
    }
    if (title.includes("Nebula")) {
      return {
        glow: "from-purple-500/10 via-transparent to-purple-500/5",
        hoverShadow: "hover:shadow-[0_40px_80px_-20px_rgba(168,85,247,0.3)]",
        border: "border-purple-500/20 hover:border-purple-500/40"
      };
    }
    return {
      glow: "from-cyan-500/10 via-transparent to-cyan-500/5",
      hoverShadow: "hover:shadow-[0_40px_80px_-20px_rgba(6,182,212,0.3)]",
      border: "border-cyan-500/20 hover:border-cyan-500/40"
    };
  };

  const colors = getColors(project.title);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col lg:flex-row items-center gap-12 py-16 ${
        isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
      }`}
    >
      {/* 3D Browser Mockup Column */}
      <div className="w-full lg:w-7/12" style={{ perspective: 1500 }}>
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ 
            rotateX, 
            rotateY,
            transformStyle: "preserve-3d"
          }}
          whileHover={{ scale: 1.02 }}
          className={`relative rounded-2xl border bg-slate-950/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] ${colors.hoverShadow} ${colors.border} transition-all duration-500 overflow-hidden group`}
        >
          {/* Top Address Bar (Fake Browser UI) */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/90 border-b border-white/5 select-none">
            {/* Window controls */}
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 block" />
            </div>
            {/* Search/Address input */}
            <div className="flex-1 max-w-md mx-auto bg-slate-950/80 rounded-md border border-white/5 px-3 py-0.5 text-center text-[10px] font-mono text-gray-500 truncate">
              {project.live.replace('https://', '')}
            </div>
          </div>

          {/* Screenshot container with 3D layers */}
          <div className="relative w-full h-[220px] sm:h-[300px] md:h-[380px] overflow-hidden">
            {/* Volumetric background glow */}
            <div className={`absolute inset-0 bg-gradient-to-tr ${colors.glow} mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
            
            {/* Glass sheen overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />

            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-90 group-hover:brightness-100 group-hover:scale-[1.01] transition-all duration-770 select-none pointer-events-none"
              style={{ transform: "translateZ(20px)" }}
            />

            {/* Depth vignette */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-10" style={{ transform: "translateZ(30px)" }} />
          </div>
        </motion.div>
      </div>

      {/* Narrative Info Column */}
      <div className="w-full lg:w-5/12 flex flex-col items-start gap-4">
        <div className="flex items-center gap-2">
          <span className="text-emerald-500 font-mono text-sm font-semibold">0{index + 1}</span>
          <span className="w-8 h-[1px] bg-emerald-500/40" />
          <span className="text-[10px] font-mono tracking-wider uppercase text-cyan-500 truncate max-w-[180px]">{project.title}</span>
        </div>
        
        <h3 className={`text-2xl sm:text-3xl font-extrabold transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          {project.title}
        </h3>

        <p className={`text-sm leading-relaxed transition-colors duration-300 ${
          isDarkMode ? 'text-gray-400' : 'text-slate-600'
        }`}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {project.tags.slice(0, 4).map(tag => (
            <span 
              key={tag} 
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-4">
          <a 
            href={project.live} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-lg bg-emerald-500 text-black shadow-md hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 cursor-none"
          >
            Launch System <ExternalLink size={12} />
          </a>
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-lg border transition-all duration-300 cursor-none ${
              isDarkMode 
                ? 'border-white/10 hover:border-white/30 text-white hover:bg-white/5' 
                : 'border-slate-200 hover:border-slate-400 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Source Code <Github size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Scrolling3DImages = ({ isDarkMode }) => {
  const featuredTitles = ["Music Mirror", "Nebula Cinematic Gallery", "JavaPath Pro"];
  const featuredProjects = PROJECT_DATA.filter(p => featuredTitles.includes(p.title));
  
  // Sort them to match the order: Music Mirror first, Nebula second, JavaPath Pro third
  const sortedProjects = featuredTitles.map(title => featuredProjects.find(p => p.title === title)).filter(Boolean);

  return (
    <div className="w-full flex flex-col gap-16 md:gap-24 relative max-w-6xl mx-auto">
      {sortedProjects.map((project, i) => (
        <ShowcaseItem key={project.title} project={project} index={i} isDarkMode={isDarkMode} />
      ))}
    </div>
  );
};

const ViewAllProjectsCard = ({ onClick, remainingCount, isDarkMode }) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`p-6 rounded-2xl border border-dashed flex flex-col justify-center items-center text-center cursor-pointer min-h-[380px] transition-all duration-300 relative group overflow-hidden ${
        isDarkMode 
          ? 'border-emerald-500/30 bg-emerald-500/[0.02] hover:border-emerald-500/60 hover:bg-emerald-500/[0.04]' 
          : 'border-emerald-500/20 bg-slate-50 hover:border-emerald-500/40 hover:bg-slate-100'
      }`}
      style={{ perspective: 1000 }}
    >
      {/* Background cyber grid effect */}
      <div className="absolute inset-0 bg-scanlines opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Graphic Stack representation of hidden projects */}
      <div className="relative w-36 h-28 mb-6 flex justify-center items-center" style={{ transformStyle: 'preserve-3d' }}>
        {/* Layer 3 */}
        <motion.div 
          style={{ transform: "translateZ(10px) rotate(-8deg)" }}
          className="absolute w-24 h-16 rounded-lg border border-emerald-500/10 bg-slate-900/40 shadow-md flex items-center justify-center -top-2 -left-2 group-hover:-top-4 group-hover:-left-4 transition-all duration-500"
        >
          <Code size={18} className="text-emerald-500/40" />
        </motion.div>
        
        {/* Layer 2 */}
        <motion.div 
          style={{ transform: "translateZ(20px) rotate(6deg)" }}
          className="absolute w-24 h-16 rounded-lg border border-emerald-500/10 bg-slate-900/60 shadow-lg flex items-center justify-center -bottom-2 -right-2 group-hover:-bottom-4 group-hover:-right-4 transition-all duration-500"
        >
          <Terminal size={18} className="text-cyan-500/40" />
        </motion.div>
        
        {/* Main front card */}
        <motion.div 
          style={{ transform: "translateZ(30px)" }}
          className="w-26 h-18 rounded-xl border border-emerald-500/30 bg-slate-950/80 shadow-[0_15px_30px_rgba(0,0,0,0.55)] hover:border-emerald-500/50 flex flex-col items-center justify-center gap-1 group-hover:scale-105 transition-all duration-500 z-10"
        >
          <Sparkles size={24} className="text-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
            +{remainingCount}
          </span>
        </motion.div>
      </div>
      
      <div className="z-10">
        <h3 className={`text-xl font-bold font-mono tracking-wider mb-2 transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-slate-800'
        }`}>
          Explore Database
        </h3>
        
        <p className={`text-xs max-w-[200px] mx-auto mb-6 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-400' : 'text-slate-600'
        }`}>
          Expand grid to inspect all {remainingCount + 3} built systems in my capstone directory.
        </p>
        
        <span className="inline-flex items-center gap-1.5 px-4 py-2 text-[10px] font-mono font-bold tracking-wider uppercase rounded-lg bg-emerald-500 text-black shadow-md hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
          Show All Projects <Briefcase size={12} />
        </span>
      </div>
    </motion.div>
  );
};

// --- MAIN PORTFOLIO COMPONENT ---

const App = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Audio removed as requested

  // Command Palette State
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Portrait color state (touch/hover with delayed revert)
  const [portraitColor, setPortraitColor] = useState(false);
  const portraitTimerRef = useRef(null);

  // Footer portrait color state
  const [footerPortraitColor, setFooterPortraitColor] = useState(false);
  const footerPortraitTimerRef = useRef(null);

  // Theme Toggler state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_theme');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });



  // Filter project cards
  const [selectedFilter, setSelectedFilter] = useState('all');
  const filteredProjects = selectedFilter === 'all'
    ? PROJECT_DATA
    : PROJECT_DATA.filter((proj) => proj.type === selectedFilter);

  // Mobile menu navbar
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll to Top float button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Active section for sliding nav underline indicator
  const [activeSection, setActiveSection] = useState('hero');

  // Contact form submission state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

  // State to control expansion of Featured Projects grid
  const [showAll, setShowAll] = useState(false);

  // Parallax mouse movements for the profile visual
  const heroX = useMotionValue(0.5);
  const heroY = useMotionValue(0.5);
  
  const heroRotateX = useSpring(useTransform(heroY, [0, 1], [12, -12]), { stiffness: 150, damping: 22 });
  const heroRotateY = useSpring(useTransform(heroX, [0, 1], [-12, 12]), { stiffness: 150, damping: 22 });

  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xVal = (e.clientX - rect.left) / rect.width;
    const yVal = (e.clientY - rect.top) / rect.height;
    heroX.set(xVal);
    heroY.set(yVal);
  };

  const handleHeroMouseLeave = () => {
    heroX.set(0.5);
    heroY.set(0.5);
  };

  // Scroll spy IntersectionObserver for Navbar active states
  useEffect(() => {
    const sections = ['hero', 'arsenal', 'portfolio', 'academic', 'connect'];
    const observers = sections.map((secId) => {
      const el = document.getElementById(secId);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(secId);
          }
        },
        { threshold: 0.2, rootMargin: "-80px 0px -80px 0px" }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  // Synchronize layout theme body class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      document.body.classList.remove('light-theme');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.body.classList.add('light-theme');
    }
    try {
      localStorage.setItem('portfolio_theme', JSON.stringify(isDarkMode));
    } catch (e) {
      console.warn("Theme storage failed:", e);
    }
  }, [isDarkMode]);



  useEffect(() => {
    // Scroll event listener for float button
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus('submitting');

    try {
      const response = await fetch("https://formsubmit.co/ajax/udaypatnala5@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject || "New Message from Portfolio",
            message: formData.message,
            _captcha: "false" // Disable captcha for seamless AJAX submission
        })
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus('error');
    }

    setTimeout(() => {
      setFormStatus('idle');
    }, 5000);
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isEditableTarget = (target) => {
    if (!(target instanceof Element)) return false;
    return Boolean(target.closest('input, textarea, select, [contenteditable="true"], .allow-copy'));
  };

  const preventContentCopy = (event) => {
    if (!isEditableTarget(event.target)) {
      event.preventDefault();
    }
  };

  const preventContentDrag = (event) => {
    if (!isEditableTarget(event.target)) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    const preventProtectedShortcuts = (event) => {
      if (isEditableTarget(event.target)) return;
      const key = event.key.toLowerCase();
      if ((event.ctrlKey || event.metaKey) && ['a', 'c', 'p', 's', 'u', 'x'].includes(key)) {
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', preventProtectedShortcuts);
    return () => window.removeEventListener('keydown', preventProtectedShortcuts);
  }, []);

  return (
    <div 
      onCopy={preventContentCopy}
      onCut={preventContentCopy}
      onContextMenu={preventContentCopy}
      onDragStart={preventContentDrag}
      className={`read-only-interface relative min-h-screen transition-colors duration-300 overflow-x-hidden selection:bg-emerald-500/30 ${
      isDarkMode ? 'bg-[#03060a] text-gray-100 selection:text-white' : 'bg-[#f8fafc] text-slate-900 selection:text-emerald-950'
    }`}>
      {/* Visual background components */}
      <ParticleBackground isDarkMode={isDarkMode} />
      <CommandPalette isOpen={isCommandPaletteOpen} setIsOpen={setIsCommandPaletteOpen} isDarkMode={isDarkMode} />
      <CustomCursor />

      {/* Top scroll neon progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 origin-left z-[100]" 
        style={{ scaleX }} 
      />

      {/* --- FLOATING HEADER / NAVBAR --- */}
      <header className="fixed top-0 inset-x-0 h-16 z-[45] glass-panel border-b transition-all duration-300">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <div 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-2 cursor-pointer font-bold tracking-widest text-lg font-mono text-emerald-500 group"
          >
            <Logo size={28} className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} isDarkMode={isDarkMode} />
            <span className={`text-sm tracking-wider font-extrabold ${isDarkMode ? 'text-white group-hover:text-emerald-400 transition-colors' : 'text-slate-900 group-hover:text-emerald-600 transition-colors'}`}>UDAY</span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-mono">
            {['Arsenal', 'Portfolio', 'Academic', 'Connect'].map((section) => {
              const secId = section.toLowerCase();
              const isActive = activeSection === secId;
              return (
                <button
                  key={section}
                  onClick={() => scrollToSection(secId)}
                  className={`transition-all duration-200 relative py-1 px-1.5 group cursor-none font-semibold ${
                    isActive 
                      ? (isDarkMode ? 'text-emerald-400 font-bold' : 'text-emerald-600 font-bold')
                      : (isDarkMode ? 'text-gray-400 hover:text-emerald-300' : 'text-slate-600 hover:text-emerald-600')
                  }`}
                >
                  {section}
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavIndicator" 
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}

            {/* Light/Dark Toggle Icon Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg border transition-all duration-300 cursor-none overflow-hidden ${
                isDarkMode 
                  ? 'bg-white/5 border-white/5 text-emerald-400 hover:bg-white/10 hover:border-emerald-500/30' 
                  : 'bg-slate-100 border-slate-200 text-emerald-700 hover:bg-slate-200 hover:border-emerald-500/30'
              }`}
              title={isDarkMode ? "Switch to Light Blueprint" : "Switch to Dark Terminal"}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDarkMode ? "dark" : "light"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                </motion.div>
              </AnimatePresence>
            </button>


            <button 
              onClick={() => scrollToSection('connect')}
              className="px-4 py-1.5 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-500 dark:text-emerald-300 rounded-lg font-bold hover:from-emerald-500/30 hover:to-cyan-500/30 hover:border-emerald-400/50 transition-all duration-300 cursor-none"
            >
              Initialize Connect
            </button>
          </nav>

          {/* Mobile hamburger menu */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Mobile Light/Dark Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg border transition-all duration-300 cursor-none ${
                isDarkMode ? 'bg-white/5 border-white/10 text-emerald-400' : 'bg-slate-100 border-slate-200 text-emerald-600'
              }`}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-gray-400 p-2 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-16 inset-x-0 backdrop-blur-lg border-b z-40 py-6 px-8 flex flex-col gap-5 lg:hidden shadow-2xl transition-colors duration-300 ${
              isDarkMode ? 'bg-[#03070d]/95 border-emerald-500/10' : 'bg-white/95 border-emerald-500/10'
            }`}
          >
            {['Arsenal', 'Portfolio', 'Academic', 'Connect'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section.toLowerCase())}
                className={`text-left font-mono text-lg py-1 border-b transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-emerald-400 border-white/5' 
                    : 'text-slate-700 hover:text-emerald-600 border-slate-100'
                }`}
              >
                {section}
              </button>
            ))}

            <button
              onClick={() => scrollToSection('connect')}
              className="mt-2 w-full py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-bold font-mono tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              Establish Connection
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section 
        id="hero" 
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-6 overflow-hidden max-w-7xl mx-auto"
        style={{ perspective: 1200 }}
      >
        {/* Main profile pic as blurred hero background watermark */}
        <img
          aria-hidden="true"
          src="/profile.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none"
          style={{
            zIndex: -1,
            opacity: 0.08,
            filter: 'blur(55px) saturate(0.5) brightness(0.7)',
          }}
        />
        <div className="grid lg:grid-cols-12 gap-12 items-center w-full z-10">
          
          {/* Left Text details */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-mono"
            >
              <Sparkles size={12} className="animate-spin" />
              <span>Data Science Engineer</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none font-sans transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              PATNALA <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">UDAY</span> KUMAR
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-xl sm:text-2xl font-mono h-16 flex items-center justify-center lg:justify-start transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-slate-600'
              }`}
            >
              <span className="text-emerald-500 mr-2">&gt; </span>
              <Typewriter
                words={[
                  'Data Science Enthusiast', 
                  'Java Backend Architect', 
                  'Optimization Engineer', 
                  'Full-Stack Developer'
                ]}
                loop={0}
                cursor
                cursorStyle='_'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`max-w-lg leading-relaxed text-sm sm:text-base transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-slate-600'
              }`}
            >
              Specializing in analytical modeling, machine learning pipelines, and database tuning. Experienced in creating enterprise-grade Spring Boot APIs, structured ETL scripts, and responsive React interfaces.
            </motion.p>

            {/* Quick Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-lg pt-2 pb-4"
            >
              {[
                { value: "12+", label: "Projects Built", color: "text-emerald-500" },
                { value: "7.70", label: "B.Tech CGPA", color: "text-cyan-500" },
                { value: "2", label: "Industry Roles", color: "text-purple-500" },
                { value: "3", label: "Specialist Certs", color: "text-amber-500" }
              ].map((stat, sidx) => (
                <div 
                  key={sidx}
                  className={`p-3 rounded-xl border glass-panel transition-all duration-300 hover:-translate-y-0.5 ${
                    isDarkMode ? 'border-white/5 bg-white/[0.01]' : 'border-emerald-500/10 bg-slate-50'
                  }`}
                >
                  <div className={`text-xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
                  <div className={`text-[10px] uppercase font-mono tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-slate-500'}`}>{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Quick Resume & Contact Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start w-full pt-2"
            >
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black rounded-xl font-bold font-mono tracking-wide hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300 cursor-none"
              >
                Inspect CAPSTONES
              </button>
              <a 
                href="/PATNALA UDAY KUMAR.pdf" 
                download="PATNALA UDAY KUMAR.pdf"
                className={`px-6 py-3 border rounded-xl font-bold font-mono tracking-wide flex items-center gap-2 transition-all duration-300 cursor-none ${
                  isDarkMode 
                    ? 'bg-white/5 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/5 hover:border-emerald-500/40' 
                    : 'bg-emerald-50/50 border-emerald-500/20 text-emerald-600 hover:bg-emerald-500/5 hover:border-emerald-500/30'
                }`}
              >
                Download CV <FileText size={14} />
              </a>
              <button 
                onClick={() => scrollToSection('connect')}
                className={`px-6 py-3 border rounded-xl font-bold font-mono tracking-wide transition-all duration-300 cursor-none ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
                    : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200 hover:border-slate-300'
                }`}
              >
                Verify Contact
              </button>
            </motion.div>

            {/* Social details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={`flex gap-4 items-center justify-center lg:justify-start pt-6 border-t w-full transition-colors duration-300 ${
                isDarkMode ? 'border-white/5' : 'border-emerald-500/10'
              }`}
            >
              {[
                { icon: <Github size={20} />, href: "https://github.com/UdayPatnala" },
                { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/patnala-uday-kumar" },
                { icon: <Mail size={20} />, href: "mailto:udaypatnala5@gmail.com" },
                { icon: <Phone size={20} />, href: "tel:+919703660750" }
              ].map((social, i) => (
                <motion.a 
                  key={i}
                  href={social.href} 
                  target={social.href.startsWith('http') ? "_blank" : undefined}
                  rel={social.href.startsWith('http') ? "noreferrer" : undefined}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className={`p-3 border rounded-xl transition-all duration-300 cursor-none ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/5 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5' 
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-500/30 hover:bg-emerald-500/5'
                  }`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Profile Photo with Radial Mask (layered 3D depth) */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ 
              rotateX: heroRotateX, 
              rotateY: heroRotateY, 
              transformStyle: "preserve-3d" 
            }}
            className="lg:col-span-5 relative flex items-center justify-center h-[400px] md:h-[500px]"
          >
            {/* Soft glowing ambient circle behind the portrait */}
            <div 
              style={{ transform: 'translateZ(-40px)' }}
              className="absolute w-72 h-72 md:w-80 md:h-80 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 rounded-full blur-[80px] pointer-events-none animate-pulse" 
            />
            
            {/* Outer Spinning decorative orbit ring at Z-depth 10 */}
            <motion.div 
              style={{ 
                transform: 'translateZ(10px)', 
                transformStyle: "preserve-3d" 
              }}
              animate={{ rotate: 360 }} 
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute w-80 h-80 md:w-96 md:h-96 border border-emerald-500/10 dark:border-emerald-500/5 rounded-full pointer-events-none flex items-center justify-center"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 absolute -top-1" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/40 absolute -bottom-0.5" />
            </motion.div>

            {/* Inner Counter-Spinning decorative orbit ring at Z-depth 30 */}
            <motion.div 
              style={{ 
                transform: 'translateZ(30px)', 
                transformStyle: "preserve-3d" 
              }}
              animate={{ rotate: -360 }} 
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              className="absolute w-76 h-76 md:w-90 md:h-90 border border-dashed border-cyan-500/10 dark:border-cyan-500/5 rounded-full pointer-events-none flex items-center justify-center"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/30 absolute -left-0.5" />
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500/30 absolute -right-0.5" />
            </motion.div>
 
            {/* Profile image revealed through a recessed circular cut-out */}
            <motion.div
              style={{ 
                transform: 'translateZ(50px)' 
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="hero-portrait-hole relative w-72 h-72 sm:w-80 sm:h-80 md:w-[23rem] md:h-[23rem] rounded-full flex items-center justify-center"
              onMouseEnter={() => { setPortraitColor(true); clearTimeout(portraitTimerRef.current); }}
              onMouseLeave={() => { portraitTimerRef.current = setTimeout(() => setPortraitColor(false), 2000); }}
              onTouchStart={() => { setPortraitColor(true); clearTimeout(portraitTimerRef.current); portraitTimerRef.current = setTimeout(() => setPortraitColor(false), 3000); }}
            >
              {/* Office profile pic — static portrait with 3D tilt */}
              <div className="hero-portrait-window">
                <img 
                  src="/profile-office.jpg"
                  alt="Patnala Uday Kumar — Office Portrait"
                  className={`hero-portrait-img filter transition-all duration-700 select-none pointer-events-none ${portraitColor ? 'grayscale-0 contrast-100 brightness-100' : 'grayscale contrast-115 brightness-95'}`}
                  style={{ objectPosition: 'center 15%' }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- SKILLS SECTION (High Interaction + 3D loss surface) --- */}
      <section id="arsenal" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 45, rotateX: 6 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
        >
          <div className="mb-16 text-center lg:text-left">
            <span className="text-emerald-500 font-mono tracking-widest uppercase text-xs block mb-2">&bull; TECHNICAL COMPETENCE</span>
            <h2 className={`text-3xl sm:text-5xl font-extrabold transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>Technical Arsenal</h2>
            <div className="h-[2px] w-20 bg-gradient-to-r from-emerald-500 to-cyan-500 mt-4 mx-auto lg:mx-0" />
          </div>

          {/* Skill card layout with 3D canvas projection */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {SKILLS_DATA.map((cat, idx) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ 
                  y: -6, 
                  borderColor: cat.color,
                  boxShadow: `0 0 30px ${cat.color.replace('0.4', '0.08')}` 
                }}
                className={`p-6 rounded-2xl glass-panel border transition-all duration-300 ${
                  isDarkMode ? 'border-white/5' : 'border-emerald-500/10'
                }`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2.5 rounded-xl border transition-colors duration-300 ${
                    isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'
                  }`}>
                    {cat.icon}
                  </div>
                  <h3 className={`text-lg font-bold font-mono transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>{cat.category}</h3>
                </div>

                <div className="space-y-4">
                  {cat.items.map((skill) => (
                    <motion.div 
                      key={skill.name} 
                      className="flex flex-col group/item"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="flex justify-between items-center text-sm mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium transition-colors duration-300 group-hover/item:text-emerald-500 dark:group-hover/item:text-emerald-400 ${
                            isDarkMode ? 'text-gray-200' : 'text-slate-700'
                          }`}>{skill.name}</span>
                          {getProjectCountForSkill(skill.name) > 0 && (
                            <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-full border border-cyan-500/10 opacity-70 group-hover/item:opacity-100 transition-opacity">
                              {getProjectCountForSkill(skill.name)} projects
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded transition-transform group-hover/item:scale-105">
                          {skill.level}
                        </span>
                      </div>
                      <div className={`h-1 rounded-full overflow-hidden transition-colors duration-300 ${
                        isDarkMode ? 'bg-white/5' : 'bg-slate-200'
                      }`}>
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ 
                            width: skill.level === 'Expert' ? '95%' : skill.level === 'Advanced' ? '80%' : '60%' 
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500" 
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* --- 3D INTERACTIVE SHOWCASE --- */}
      <section id="showcase" className="py-24 px-6 max-w-7xl mx-auto border-t border-emerald-500/5 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-16 text-center">
            <span className="text-emerald-500 font-mono tracking-widest uppercase text-xs block mb-2">&bull; VOLUMETRIC SYSTEM ARCHIVE</span>
            <h2 className={`text-3xl sm:text-5xl font-extrabold transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>System Showcase</h2>
            <div className="h-[2px] w-20 bg-gradient-to-r from-emerald-500 to-cyan-500 mt-4 mx-auto" />
            <p className={`mt-4 max-w-2xl mx-auto text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
              Interactive 3D mockups of my top projects. Hover on desktop to tilt the display and inspect interface structures dynamically in real-time.
            </p>
          </div>

          <Scrolling3DImages isDarkMode={isDarkMode} />
        </motion.div>
      </section>

      {/* --- FEATURED PROJECTS PORTFOLIO (Real Engineering focus) --- */}
      <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto border-t border-emerald-500/5 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 45, rotateX: 6 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
        >
          <div className="mb-12 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-emerald-500 font-mono tracking-widest uppercase text-xs block mb-2">&bull; CAPSTONE ARCHIVES</span>
              <h2 className={`text-3xl sm:text-5xl font-extrabold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>Featured Projects</h2>
              <div className="h-[2px] w-20 bg-gradient-to-r from-emerald-500 to-cyan-500 mt-4 mx-auto lg:mx-0" />
            </div>

            {/* Filtering Controller controls */}
            <div className={`flex flex-wrap gap-2 justify-center lg:justify-end p-1.5 rounded-xl border transition-colors duration-300 ${
              isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'
            }`}>
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'ml', label: 'Data Science & ML' },
                { id: 'web', label: 'Full-Stack & Web' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedFilter(tab.id);
                    setShowAll(true);
                  }}
                  className={`px-4 py-2 text-xs font-mono rounded-lg transition-all duration-300 cursor-none ${
                    selectedFilter === tab.id
                      ? 'bg-emerald-500 text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                      : `hover:text-emerald-500 ${isDarkMode ? 'text-gray-400 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-200'}`
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filtered Project Cards Grid */}
          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {(showAll ? filteredProjects : filteredProjects.slice(0, 3)).map((project, idx) => (
                <ProjectCard 
                  key={project.title} 
                  project={project} 
                  isDarkMode={isDarkMode}
                  isExtra={showAll && idx >= 3}
                />
              ))}
              
              {!showAll && filteredProjects.length > 3 && (
                <ViewAllProjectsCard 
                  onClick={() => setShowAll(true)} 
                  remainingCount={filteredProjects.length - 3} 
                  isDarkMode={isDarkMode} 
                />
              )}
            </AnimatePresence>
          </motion.div>

          {/* Show Less toggle control when expanded */}
          {showAll && filteredProjects.length > 3 && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setShowAll(false)}
                className={`px-5 py-2.5 text-xs font-mono font-bold uppercase rounded-lg border flex items-center gap-2 transition-all duration-300 cursor-none ${
                  isDarkMode 
                    ? 'border-emerald-500/30 hover:border-emerald-500/60 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10'
                    : 'border-emerald-500/20 hover:border-emerald-500/40 text-emerald-600 bg-emerald-500/5 hover:bg-emerald-500/10'
                }`}
              >
                Show Less <ArrowUp size={12} />
              </button>
            </div>
          )}
        </motion.div>
      </section>

      {/* --- EDUCATION, CERTIFICATES & TRAINING (Consolidated Secondary Section) --- */}
      <section id="academic" className={`py-24 border-t transition-colors duration-300 overflow-hidden ${
        isDarkMode ? 'bg-white/[0.01] border-white/5' : 'bg-slate-500/[0.01] border-emerald-500/10'
      }`}>
        <motion.div
          initial={{ opacity: 0, y: 45, rotateX: 6 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
          className="max-w-7xl mx-auto px-6"
        >
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Education History (Span 6) */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="text-emerald-500 font-mono tracking-widest uppercase text-xs block mb-2">// ACADEMIC PATHWAYS</span>
                <h2 className={`text-2xl sm:text-4xl font-extrabold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>Education</h2>
                <div className="h-[2px] w-16 bg-emerald-500 mt-3" />
              </div>

              <div className="relative pl-6 sm:pl-8 border-l border-emerald-500/20 space-y-6 ml-2">
                {EDUCATION_DATA.map((edu, eIdx) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: eIdx * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline Dot Node */}
                    <div className={`absolute -left-[36px] sm:-left-[48px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border transition-all duration-300 shadow-md ${
                      isDarkMode 
                        ? 'bg-[#03060a] border-emerald-500/30 text-emerald-400 hover:border-emerald-500' 
                        : 'bg-white border-emerald-500/40 text-emerald-600 hover:border-emerald-600'
                    }`}>
                      <Award size={13} />
                    </div>

                    <motion.div
                      whileHover={{ x: 6, scale: 1.01 }}
                      className={`p-6 rounded-2xl glass-panel border-l-4 ${edu.color} border-y border-r transition-all duration-300 ${
                        isDarkMode ? 'border-white/5' : 'border-emerald-500/10'
                      }`}
                    >
                      <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                        <h3 className={`font-bold text-base transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>{edu.degree}</h3>
                        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                          {edu.grade}
                        </span>
                      </div>
                      <p className={`text-xs mb-3 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-slate-700'
                      }`}>{edu.institution}</p>
                      <span className={`text-[10px] font-mono ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>{edu.period}</span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications (Span 3) */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <span className="text-emerald-500 font-mono tracking-widest uppercase text-xs block mb-2">&bull; PROFESSIONAL CREDENTIALS</span>
                <h2 className={`text-2xl sm:text-4xl font-extrabold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>Certifications</h2>
                <div className="h-[2px] w-16 bg-cyan-500 mt-3" />
              </div>

              <div className="space-y-4">
                {CERTIFICATIONS.map((cert) => (
                  <motion.a
                    key={cert.title}
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -6, scale: 1.02, borderColor: 'rgba(0, 245, 212, 0.5)' }}
                    className={`group flex items-start gap-3.5 p-4 rounded-xl glass-panel border transition-all duration-300 cursor-none block ${
                      isDarkMode 
                        ? 'border-white/5 hover:bg-cyan-500/[0.04] hover:shadow-[0_0_20px_rgba(6,182,212,0.08)]' 
                        : 'border-emerald-500/15 hover:bg-cyan-500/[0.04]'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 mt-0.5 group-hover:bg-cyan-500/20 transition-colors duration-300">
                      <Award size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-bold text-xs leading-tight transition-colors duration-300 ${
                        isDarkMode ? 'text-white group-hover:text-cyan-300' : 'text-slate-800 group-hover:text-cyan-700'
                      }`}>{cert.title}</h4>
                      <p className={`text-[10px] mt-1 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-slate-500'
                      }`}>{cert.provider}</p>
                    </div>
                    <div className={`shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0 ${
                      isDarkMode ? 'text-cyan-400' : 'text-cyan-600'
                    }`}>
                      <ExternalLink size={13} />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Technical Training & Internships (Span 3 - secondary representation) */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <span className="text-emerald-500 font-mono tracking-widest uppercase text-xs block mb-2">&bull; TECHNICAL CREDENTIALS</span>
                <h2 className={`text-2xl sm:text-4xl font-extrabold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>Training</h2>
                <div className="h-[2px] w-16 bg-amber-500 mt-3" />
              </div>

              <div className="relative pl-5 border-l border-amber-500/20 space-y-4 ml-1">
                {TRAINING_DATA.map((train, tIdx) => (
                  <motion.div
                    key={train.role}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: tIdx * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline Dot Node */}
                    <div className={`absolute -left-[30px] top-1.5 w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-300 shadow-md ${
                      isDarkMode 
                        ? 'bg-[#03060a] border-amber-500/30 text-amber-450 hover:border-amber-500' 
                        : 'bg-white border-amber-500/40 text-amber-600 hover:border-amber-600'
                    }`}>
                      <Terminal size={10} />
                    </div>

                    <motion.div
                      whileHover={{ y: -6, scale: 1.02, borderColor: 'rgba(245, 158, 11, 0.4)' }}
                      className={`p-4 rounded-xl glass-panel border transition-all duration-300 ${
                        isDarkMode ? 'border-white/5' : 'border-emerald-500/15'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className={`font-bold text-xs transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-slate-800'
                        }`}>{train.role}</h4>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/25 text-amber-600 rounded">
                          {train.period}
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono block ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                        {train.provider}
                      </span>
                      <p className={`text-[11px] leading-relaxed mt-2 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-slate-600'
                      }`}>
                        {train.description}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* --- CONTACT & CONNECT --- */}
      <section id="connect" className="py-24 px-6 border-t border-emerald-500/5 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 45, rotateX: 6 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
          className="max-w-7xl mx-auto"
        >
          <div className="mb-16 text-center">
            <span className="text-emerald-500 font-mono tracking-widest uppercase text-xs block mb-2">&bull; DIRECT INTERACTION</span>
            <h2 className={`text-3xl sm:text-5xl font-extrabold transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>Initialize Connect</h2>
            <div className="h-[2px] w-20 bg-gradient-to-r from-emerald-500 to-cyan-500 mt-4 mx-auto" />
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Contact details list */}
            <div className="lg:col-span-5 space-y-8">
              {/* Suit/Professional photo card in contact sidebar */}
              <motion.div
                className="relative rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl mb-2"
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.03 }}
                onMouseEnter={() => { setFooterPortraitColor(true); clearTimeout(footerPortraitTimerRef.current); }}
                onMouseLeave={() => { footerPortraitTimerRef.current = setTimeout(() => setFooterPortraitColor(false), 2000); }}
                onTouchStart={() => { setFooterPortraitColor(true); clearTimeout(footerPortraitTimerRef.current); footerPortraitTimerRef.current = setTimeout(() => setFooterPortraitColor(false), 3000); }}
              >
                <img
                  src="/profile.jpg"
                  alt="Patnala Uday Kumar — Profile"
                  className={`w-full h-56 object-cover filter transition-all duration-700 select-none ${footerPortraitColor ? 'grayscale-0' : 'grayscale'}`}
                  style={{ objectPosition: 'center 18%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400">&bull; PATNALA UDAY KUMAR</span>
                  <p className="text-[9px] text-white/50 font-mono mt-0.5">Software Engineer</p>
                </div>
              </motion.div>

              <h3 className={`text-2xl font-bold font-mono transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>Telemetry Nodes</h3>
              <p className={`leading-relaxed text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-slate-600'
              }`}>
                Feel free to drop a message or reach out via email for potential projects, professional networks, or internship roles.
              </p>

              <div className="space-y-6 font-mono text-sm">
                <div className="flex items-center gap-4">
                  <div className={`p-3 border rounded-xl text-emerald-500 transition-colors duration-300 ${
                    isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'
                  }`}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block font-bold">&bull; EMAIL ADDRESS</span>
                    <a href="mailto:udaypatnala5@gmail.com" className={`transition-colors ${
                      isDarkMode ? 'text-white hover:text-emerald-400' : 'text-slate-900 hover:text-emerald-600'
                    }`}>
                      udaypatnala5@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`p-3 border rounded-xl text-cyan-500 transition-colors duration-300 ${
                    isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'
                  }`}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block font-bold">&bull; PHONE NUMBER</span>
                    <a href="tel:+919703660750" className={`transition-colors ${
                      isDarkMode ? 'text-white hover:text-cyan-400' : 'text-slate-900 hover:text-cyan-600'
                    }`}>
                      +91 9703660750
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`p-3 border rounded-xl text-amber-500 transition-colors duration-300 ${
                    isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'
                  }`}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block font-bold">&bull; CURRENT LOCATION</span>
                    <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>Andhra Pradesh, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Form panel */}
            <div className="lg:col-span-7">
              <form onSubmit={handleFormSubmit} className={`p-8 rounded-2xl glass-panel border space-y-6 ${
                isDarkMode ? 'border-white/5' : 'border-emerald-500/10'
              }`}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="form-name" className="block text-xs font-mono text-gray-500 mb-2">YOUR NAME</label>
                    <input
                      type="text"
                      id="form-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Uday Kumar"
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-[0_0_15px_rgba(16,185,129,0.15)] focus:bg-white/[0.08] transition-all cursor-none ${
                        isDarkMode 
                          ? 'bg-white/5 border-white/5 text-white' 
                          : 'bg-slate-100 border-slate-200 text-slate-800 focus:bg-slate-50'
                      }`}
                    />
                  </div>
                  <div>
                    <label htmlFor="form-email" className="block text-xs font-mono text-gray-500 mb-2">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      id="form-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="udaypatnala5@gmail.com"
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-[0_0_15px_rgba(16,185,129,0.15)] focus:bg-white/[0.08] transition-all cursor-none ${
                        isDarkMode 
                          ? 'bg-white/5 border-white/5 text-white' 
                          : 'bg-slate-100 border-slate-200 text-slate-800 focus:bg-slate-50'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="form-subject" className="block text-xs font-mono text-gray-500 mb-2">SUBJECT</label>
                  <input
                    type="text"
                    id="form-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Software Engineer Role Opportunities"
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-[0_0_15px_rgba(16,185,129,0.15)] focus:bg-white/[0.08] transition-all cursor-none ${
                      isDarkMode 
                        ? 'bg-white/5 border-white/5 text-white' 
                        : 'bg-slate-100 border-slate-200 text-slate-800 focus:bg-slate-50'
                    }`}
                  />
                </div>

                <div>
                  <label htmlFor="form-message" className="block text-xs font-mono text-gray-500 mb-2">MESSAGE CONTENT</label>
                  <textarea
                    id="form-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    placeholder="Let's build something amazing together..."
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-[0_0_15px_rgba(16,185,129,0.15)] focus:bg-white/[0.08] transition-all cursor-none ${
                      isDarkMode 
                        ? 'bg-white/5 border-white/5 text-white' 
                        : 'bg-slate-100 border-slate-200 text-slate-800 focus:bg-slate-50'
                    }`}
                  />
                </div>

                <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black rounded-xl font-bold font-mono tracking-wide flex items-center gap-2 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] disabled:opacity-50 transition-all duration-300 cursor-none"
                  >
                    <span>{formStatus === 'submitting' ? 'Transmitting...' : 'Transmit Message'}</span>
                    <Send size={14} className={formStatus === 'submitting' ? 'animate-ping' : ''} />
                  </button>

                  {/* Toast Success Message */}
                  <AnimatePresence>
                    {formStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs py-2 px-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl"
                      >
                        <CheckCircle size={14} />
                        <span>Message successfully sent to Uday Kumar!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>

          </div>
        </motion.div>
      </section>

      {/* --- FOOTER --- */}
      <footer className={`py-12 border-t text-center transition-colors duration-300 ${
        isDarkMode ? 'bg-[#020306] border-white/5' : 'bg-slate-100 border-emerald-500/10'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-500">
          <p>© 2026 Patnala Uday Kumar. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span className="text-[10px] text-emerald-500/40 tracking-wider">BUILT WITH REACT, TAILWIND V4 & FRAMER MOTION</span>
          </div>
        </div>
      </footer>

      {/* Audio Removed */}

      {/* --- FLOAT BACK TO TOP BUTTON --- */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-8 p-3.5 bg-emerald-500 border border-emerald-400 rounded-full text-black hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] z-40 transition-all duration-300 cursor-none"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
