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
    linkedin: "https://linkedin.com/in/patnala-uday-kumar",
    email: "udaypatnala5@gmail.com",
    phone: "+91 97036 60750",
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
      category: "Core & Backend",
      icon: "Terminal",
      color: "rgba(16, 185, 129, 0.4)",
      items: [
        { name: "Java", level: "Intermediate (65%)", levelPercent: 65 },
        { name: "Java Backend", level: "Intermediate (65%)", levelPercent: 65 },
        { name: "OOP", level: "Intermediate (65%)", levelPercent: 65 },
        { name: "Data Structures & Algorithms", level: "Working Knowledge (55%)", levelPercent: 55 },
        { name: "SQL", level: "Working Knowledge (55%)", levelPercent: 55 },
        { name: "DBMS", level: "Working Knowledge (55%)", levelPercent: 55 },
        { name: "REST APIs", level: "Intermediate (65%)", levelPercent: 65 }
      ]
    },
    {
      category: "Web & Frontend",
      icon: "Code",
      color: "rgba(6, 182, 212, 0.4)",
      items: [
        { name: "JavaScript", level: "Intermediate (60%)", levelPercent: 60 },
        { name: "React.js", level: "Proficient (70%)", levelPercent: 70 }
      ]
    },
    {
      category: "Data Science & ML",
      icon: "Database",
      color: "rgba(245, 158, 11, 0.4)",
      items: [
        { name: "Python", level: "Intermediate (65%)", levelPercent: 65 },
        { name: "NumPy", level: "Intermediate (60%)", levelPercent: 60 },
        { name: "Pandas", level: "Intermediate (60%)", levelPercent: 60 },
        { name: "Machine Learning", level: "Working Knowledge (55%)", levelPercent: 55 }
      ]
    },
    {
      category: "Tools & Quality",
      icon: "Award",
      color: "rgba(168, 85, 247, 0.4)",
      items: [
        { name: "Git / GitHub", level: "Proficient (70%)", levelPercent: 70 },
        { name: "Software Testing", level: "Intermediate (65%)", levelPercent: 65 },
        { name: "Debugging", level: "Intermediate (60%)", levelPercent: 60 }
      ]
    }
  ],

  projects: [
    {
      id: "music-mirror",
      title: "Music Mirror",
      description: "A real-time facial emotion recognition music recommendation system using React.js and Python API endpoints that normalizes expressions and dynamically recommends curated tracks inside an embedded player.",
      tags: ["React.js", "Python", "REST APIs", "JavaScript"],
      category: "Data Science & ML",
      type: "ml",
      highlights: [
        "Real-time webcam face-detection pipeline in React.js calling Python POST /recommend endpoint to normalize expressions.",
        "Integrated embedded YouTube playback and manual mood overrides in a responsive Vercel application.",
        "LocalStorage-backed user profiles, mood history, and favorites persistence without a heavy backend."
      ],
      github: "https://github.com/UdayPatnala/music-mirror",
      live: "https://music-mirror-aos.vercel.app/",
      image: "/music_mirror_real.png"
    },
    {
      id: "churn-prediction",
      title: "Churn Prediction System",
      description: "An end-to-end customer churn analysis and real-time prediction model using Scikit-learn, Machine Learning, Pandas, Python, and Streamlit.",
      tags: ["Python", "Machine Learning", "Pandas", "Scikit-Learn", "Streamlit"],
      category: "Data Science & ML",
      type: "ml",
      highlights: [
        "Engineered end-to-end ML pipeline with Scikit-learn utilizing hyperparameter optimization, standard scaling, and one-hot encoding for customer churn prediction.",
        "Developed a REST API with payload validation and an interactive Streamlit analytics dashboard."
      ],
      github: "https://github.com/UdayPatnala/Churn-Prediction-System",
      live: "https://github.com/UdayPatnala/Churn-Prediction-System",
      image: "/churn_real.png"
    },
    {
      id: "javapath-pro",
      title: "JavaPath Pro",
      description: "An interactive full-stack Java learning platform with real-time code execution, syntax diagnostics, and AI mentor.",
      tags: ["React.js", "Java", "SQL", "DBMS", "REST APIs"],
      category: "Full-Stack & Web",
      type: "web",
      highlights: [
        "Built interactive Java learning platform with Java 17 execution through execution APIs and AI mentor.",
        "Implemented password hashing, JWT authentication, and protected REST APIs.",
        "Database persistence for user progress and chat history."
      ],
      github: "https://github.com/UdayPatnala/Java-Path",
      live: "https://javapath-pro-aos.vercel.app/",
      image: "/javapath_real.png"
    },
    {
      id: "nebula-gallery",
      title: "Nebula Cinematic Gallery",
      description: "An AI-assisted cinematic memory gallery with local image ingestion, metadata generation, timeline sorting, and duplicate detection.",
      tags: ["React.js", "JavaScript", "REST APIs"],
      category: "Full-Stack & Web",
      type: "web",
      highlights: [
        "Optimized client-side rendering for heavy indexed image storage.",
        "Local object detection and image timeline sorting.",
        "API integration connecting to metadata generation services."
      ],
      github: "https://github.com/UdayPatnala/Nebula",
      live: "https://nebula-nmo.vercel.app",
      image: "/nebula_real.png"
    },
    {
      id: "spedex-fintech",
      title: "Spedex Fintech Dashboard",
      description: "A comprehensive fintech workspace for tracking spending indexing, transaction velocities, and budgeting aggregates.",
      tags: ["Java Backend", "Spring Boot", "React.js", "REST APIs"],
      category: "Full-Stack & Web",
      type: "web",
      highlights: [
        "Robust Java Spring Boot backend serving authenticated endpoints.",
        "Feature-rich React web dashboard mapping budgets, vendor insights, and reminders."
      ],
      github: "https://github.com/UdayPatnala/Spedex",
      live: "https://spe-dex.vercel.app",
      image: "/spedex_real.png"
    },
    {
      id: "job-finder",
      title: "Job Finder Portal",
      description: "A job portal search aggregator, application tracker, and resume match diagnostic dashboard for junior developers.",
      tags: ["React.js", "JavaScript", "REST APIs"],
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
      tags: ["React.js", "JavaScript", "Chart.js"],
      category: "Full-Stack & Web",
      type: "web",
      highlights: [
        "Renders dynamic charts mapping sales performance by region.",
        "Simulates real-time transaction ingestion using updates.",
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
      tags: ["Java", "Swing", "DBMS", "SQL"],
      category: "Full-Stack & Web",
      type: "web",
      highlights: [
        "Interactive Java Swing desktop client displaying slot diagrams.",
        "Tracks reservations and real-time occupancy updates in SQL database.",
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
      tags: ["Python", "Pandas", "SQL", "DBMS"],
      category: "Data Science & ML",
      type: "ml",
      highlights: [
        "Extracts unstructured log records from simulated files.",
        "Performs schema cleanups and date indexing transformations using Pandas.",
        "Loads cleaned tables into DBMS for analysis."
      ],
      github: "https://github.com/UdayPatnala/Etl-Data-Pipeline",
      live: "https://github.com/UdayPatnala/Etl-Data-Pipeline",
      image: "/churn_real.png"
    },
    {
      id: "lru-cache",
      title: "LRU Cache Java Utility",
      description: "A custom thread-safe implementation of a Least Recently Used (LRU) cache in Java with generic key-value mappings.",
      tags: ["Java", "Data Structures & Algorithms", "OOP"],
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
      description: "A robust Java Spring Boot REST API backend managing user catalog carts, orders, and payment integrations.",
      tags: ["Java", "Spring Boot", "SQL", "DBMS", "REST APIs"],
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
