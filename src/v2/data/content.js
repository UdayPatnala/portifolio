// Centralized Content Management System (CMS) data source for Portfolio V2.
// This acts as the single source of truth for all content.

export const cmsContent = {
  profile: {
    name: "Patnala Uday Kumar",
    firstName: "Uday",
    lastName: "Kumar",
    title: "Associate Software Engineer & Data Science Specialist",
    subtitle: "Data Science Engineer",
    bio: "A premium, highly-interactive, responsive developer portfolio custom-crafted for recruiters and corporate hiring managers. Designed around a sleek glassmorphism dark theme with cybernetic highlights and advanced mathematical rendering.",
    officePhoto: "/profile-office.jpg",
    profilePhoto: "/profile.jpg",
    location: "Andhra Pradesh, India"
  },
  
  socials: {
    github: "https://github.com/UdayPatnala",
    linkedin: "https://linkedin.com/in/uday-patnala",
    email: "udaypatnala5@gmail.com",
    phone: "+91 XXXXXXXXXX", // Placeholder or hidden
    location: "Visakhapatnam, India"
  },
  
  resume: {
    filename: "PATNALA UDAY KUMAR.pdf",
    path: "/PATNALA UDAY KUMAR.pdf"
  },

  navigation: {
    links: [
      { label: "Home", hash: "#/" },
      { label: "Skills", hash: "#/skills" },
      { label: "Journey", hash: "#/journey" },
      { label: "Projects", hash: "#/projects" },
      { label: "Experience", hash: "#/experience" },
      { label: "Achievements", hash: "#/achievements" },
      { label: "Contact", hash: "#/contact" }
    ]
  },

  skills: [
    {
      category: "Programming",
      icon: "Terminal",
      color: "rgba(16, 185, 129, 0.4)",
      items: [
        { name: "Java", level: "Intermediate" },
        { name: "Python", level: "Intermediate" },
        { name: "C Language", level: "Intermediate" }
      ]
    },
    {
      category: "Web & Frontend",
      icon: "Code",
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
      icon: "Database",
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
      icon: "Award",
      color: "rgba(16, 185, 129, 0.4)",
      items: [
        { name: "Data Structures & Algorithms", level: "Intermediate" },
        { name: "Object Oriented Programming", level: "Intermediate" },
        { name: "Git & GitHub", level: "Advanced" },
        { name: "Docker & Vercel", level: "Intermediate" },
        { name: "Software Testing", level: "Advanced" }
      ]
    }
  ],

  projects: [
    {
      id: "music-mirror",
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
      live: "https://github.com/UdayPatnala/music-mirror",
      image: "/music_mirror_real.png"
    },
    {
      id: "nebula-gallery",
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
      live: "https://github.com/UdayPatnala/Nebula",
      image: "/nebula_real.png"
    },
    {
      id: "javapath-pro",
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
      live: "https://github.com/UdayPatnala/Java-Path",
      image: "/javapath_real.png"
    },
    {
      id: "spedex-fintech",
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
      live: "https://github.com/UdayPatnala/Spedex",
      image: "/spedex_real.png"
    },
    {
      id: "churn-prediction",
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
      id: "job-finder",
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
      id: "skyflow-dashboard",
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
      id: "smart-parking",
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
      id: "etl-pipeline",
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
      id: "lru-cache",
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
      id: "bookstore-backend",
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
      id: "github-upgrader",
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
  ],

  experience: [
    {
      role: "Machine Learning Engineer (Training)",
      provider: "Codec Technologies",
      period: "8 Weeks",
      description: "Numerical computation and basic model setups in Python using NumPy and Pandas.",
      highlights: [
        "Applied linear regression and classification techniques to test datasets.",
        "Manipulated large feature matrices and cleaned records using Pandas."
      ]
    },
    {
      role: "Software Engineer (Training)",
      provider: "Codec Technologies",
      period: "4 Weeks",
      description: "Basics of responsive layout setups with HTML, CSS, and vanilla JS DOM manipulation.",
      highlights: [
        "Built responsive grid layouts with custom layout CSS parameters.",
        "Developed basic interactive states and form checking tools in Vanilla JavaScript."
      ]
    }
  ],

  education: [
    {
      degree: "B.Tech in Computer Science Engineering (Data Science)",
      institution: "Raghu Institute of Technology, Andhra Pradesh",
      period: "2022 - 2026 (Graduated)",
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
  ],

  certifications: [
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
  ],

  achievements: [
    {
      title: "Research Paper Published",
      description: "Published \"Smart Music Recommendation System Based on User Emotions,\" IJARESM, Vol. 14, Issue 3 (Mar 2026).",
      date: "Mar 2026",
      link: "/publication-certificate.pdf"
    },
    {
      title: "NPTEL Java Elite + Silver Certification",
      description: "Ranked among the top performance bracket in national-level Java compiler examination.",
      date: "2024",
      link: "https://nptel.ac.in/noc/E_Certificate/NPTEL24CS43S97030107030776012"
    },
    {
      title: "Software Testing Master Class",
      description: "Udemy Professional Certificate covering functional software testing and automation models.",
      date: "2024",
      link: "https://ude.my/UC-bd895877-add9-4488-be08-331cd88b2d6a"
    },
    {
      title: "AWS Academy Graduate Badge",
      description: "Successfully finalized official cloud foundation metrics and systems design criteria.",
      date: "2023",
      link: "https://www.credly.com/go/nrAdO7j9"
    }
  ],

  seo: {
    title: "Patnala Uday Kumar | Premium Portfolio V2",
    description: "Portfolio of Patnala Uday Kumar - Associate Software Engineer & Data Science Specialist. Expert in React, Spring Boot, Python, and Machine Learning.",
    keywords: "Patnala Uday Kumar, Portfolio, Software Engineer, Data Science, React, Java, Spring Boot, Visakhapatnam",
    author: "Patnala Uday Kumar",
    ogType: "website",
    ogUrl: "https://github.com/UdayPatnala"
  },

  featureFlags: {
    enableParticleBackground: true,
    enableCustomCursor: true,
    enableLossLandscape: true,
    enableMusicSystem: false // Keep structural flag
  }
};
