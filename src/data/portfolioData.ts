export interface Project {
  id: string;
  title: string;
  hook: string;
  description: string;
  tags: string[];
  category: 'ai' | 'fullstack' | 'mobile' | 'tools';
  badge?: string;
  link?: {
    url: string;
    label: string;
  };
  note?: string;
  accentGradient: string;
  wireframeType: 'portal' | 'rag' | 'vision' | 'snow' | 'classifier' | 'tax' | 'parallel' | 'topaz';
  statsHighlight?: {
    value: string;
    label: string;
  };
  problemSolution?: {
    problem: string;
    built: string;
    outcome: string;
  };
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  link?: string;
  logo?: string;
  skills?: string[];
  badge?: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    roleHeadline: string;
    shortBio: string;
    education: string;
    location: string;
    status: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    availability: string;
    resumeUrl: string;
  };
  skills: SkillCategory[];
  experiences: ExperienceItem[];
  projects: Project[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Muhammad Hassan Askari",
    roleHeadline: "Junior Software Engineer — Applied AI & Full-Stack",
    shortBio:
      "Detail-oriented software engineer with a strong foundation in full-stack engineering, scalable backend architectures (ASP.NET Core, FastAPI, Python), DevOps automation (AWS, Docker, CI/CD), and applied AI systems (RAG, pgvector, Computer Vision).",
    education: "BS Computer Science, COMSATS University Islamabad (2022–2026) · CGPA: 3.65 / 4.00",
    location: "Islamabad, Pakistan",
    status: "Open to Junior Software Engineer roles, graduate programs, and freelance engineering contracts across Web, Mobile, Scalable Backends, and Applied AI.",
    email: "askari.syed04@gmail.com",
    phone: "+92 335 555 2845",
    github: "https://github.com/AskariSyed",
    linkedin: "https://www.linkedin.com/in/syed-hassan-askari/",
    availability: "Available for Junior / Graduate Roles & Freelance (Web · Mobile · Backend · Scalable AI)",
    resumeUrl: "/CV/Hassan_Askari_CV.pdf",
  },

  skills: [
    {
      category: "DevOps & Cloud",
      skills: ["Docker", "Kubernetes", "AWS EC2", "Terraform", "GitHub Actions", "Jenkins", "Ansible", "Nginx", "Linux"],
    },
    {
      category: "Backend & Systems",
      skills: ["C#", ".NET", "ASP.NET Web API", "Entity Framework", "FastAPI", "Python", "REST APIs"],
    },
    {
      category: "Databases & Storage",
      skills: ["PostgreSQL", "SQL Server", "Oracle", "MySQL", "pgvector", "Firestore"],
    },
    {
      category: "Frontend & Mobile",
      skills: ["Next.js", "React", "TypeScript", "Flutter", "Tailwind CSS", "Bootstrap"],
    },
    {
      category: "AI & Computer Vision",
      skills: ["RAG Pipelines", "LLMs", "pgvector", "PyTorch", "OpenCV", "YOLOv8", "Computer Vision"],
    },
    {
      category: "Observability & QA",
      skills: ["Grafana", "Prometheus", "Loki", "Selenium", "Cypress", "JMeter", "Postman", "Regression Testing"],
    },
  ],

  experiences: [
    {
      id: "pta-ict-intern",
      role: "Information and Communication Technology Intern",
      company: "Pakistan Telecommunication Authority (PTA)",
      location: "Islamabad, Pakistan",
      period: "Jul 2025 – Sep 2025",
      badge: "ICT Internship",
      bullets: [
        "Built ASP.NET Web API backend for the E-Diary system to digitize documentation and workflow.",
        "Designed relational schema for efficient storage and retrieval; integrated with Flutter frontend.",
        "Worked in Agile ceremonies, shaping API contracts and collaborating across sprints.",
      ],
      link: "https://www.pta.gov.pk/",
      logo: "/pta-logo.png",
      skills: ["ASP.NET Web API", "C#", ".NET", "SQL", "Flutter", "Agile/Scrum"],
    },
    {
      id: "hbl-sqa-intern",
      role: "Software Quality Assurance Intern",
      company: "HBL Microfinance Bank Ltd.",
      location: "Islamabad, Pakistan",
      period: "Jul 2024 – Sep 2024",
      badge: "SQA Internship",
      bullets: [
        "Tested web and Android banking apps; logged defects and partnered with developers for fixes.",
        "Documented functional and regression test cases; supported access reviews and audits.",
        "Automated reports with Excel and VBA macros to streamline QA analytics.",
      ],
      link: "https://www.hblmfb.com/",
      logo: "/hbl-logo.png",
      skills: ["Web & Mobile QA", "Regression Testing", "Defect Logging", "VBA & Macros", "Access Reviews"],
    },
  ],

  projects: [
    {
      id: "cui-job-fair-portal",
      title: "CUI Wah Job Fair Portal",
      hook: "Production recruitment and student-coordination portal for COMSATS University Islamabad",
      description:
        "A production recruitment and student-coordination portal for COMSATS University Islamabad, used to run a real job fair. Handles candidate/company registration and interview scheduling with concurrency-safe database validation to prevent slot collisions. Also includes a custom greedy scheduling algorithm for allocating interviews between candidates and companies.",
      tags: ["Full-Stack", "ASP.NET Web API", "SQL", "Scheduling Algorithms"],
      category: "fullstack",
      badge: "Live in production",
      link: {
        url: "https://github.com/AskariSyed/HireBridge",
        label: "Source code",
      },
      accentGradient: "from-blue-600/30 via-indigo-600/20 to-zinc-900/50",
      wireframeType: "portal",
      statsHighlight: {
        value: "0 Collisions",
        label: "Concurrency-safe validation",
      },
      problemSolution: {
        problem:
          "High-volume job fairs result in slot conflicts, double-booked interviewers, and manual scheduling bottlenecks across hundreds of students and company reps.",
        built:
          "Engineered a production ASP.NET Web API system with atomic database transactions and a custom greedy scheduling algorithm to dynamically balance candidate time slots against recruiter capacity.",
        outcome:
          "Deployed live for COMSATS University Islamabad, running the physical event with zero slot collisions and instant schedule distribution.",
      },
    },
    {
      id: "topaz-executive-simulation",
      title: "Topaz Executive: Business Simulation",
      hook: "Browser-based strategic business simulation engine with deterministic quarterly modeling",
      description:
        "A comprehensive business simulation platform delivered to a freelance client, modeled on Topaz-VBE. Features deterministic quarterly execution across manufacturing operations, regional marketing, supply chain delivery logistics, workforce management, and enterprise financial accounting (decreasing-balance depreciation, P&L, balance sheets, and cash flow forecasting).",
      tags: ["React", "TypeScript", "Deterministic Simulation", "Financial Modeling", "Tailwind CSS"],
      category: "fullstack",
      badge: "Client Freelance Project",
      link: {
        url: "https://topaz-vbe.vercel.app/",
        label: "Live application",
      },
      accentGradient: "from-amber-600/30 via-emerald-600/20 to-zinc-900/50",
      wireframeType: "topaz",
      statsHighlight: {
        value: "Topaz-VBE Model",
        label: "Deterministic quarterly execution",
      },
      problemSolution: {
        problem:
          "Corporate executive training simulations typically depend on legacy, desktop-only software packages that are difficult to distribute, monitor, and run on modern client devices.",
        built:
          "Engineered a high-performance browser-native simulation platform in React and TypeScript with deterministic quarterly calculation cycles, multi-regional sales allocation, machine maintenance models, and automated financial accounting.",
        outcome:
          "Successfully delivered and deployed live on Vercel for the client, enabling cohort-based executive strategy and financial modeling without installation friction.",
      },
    },
    {
      id: "ai-email-copilot",
      title: "AI Email Copilot",
      hook: "Context-aware AI email assistant powered by semantic email retrieval",
      description:
        "An AI email assistant that uses retrieval-augmented generation to ground LLM replies in a user's own email history. Emails are embedded and stored with pgvector, retrieved by semantic similarity, and injected into the prompt for context-aware drafts.",
      tags: ["FastAPI", "PostgreSQL", "pgvector", "RAG", "LLMs"],
      category: "ai",
      link: {
        url: "https://github.com/AskariSyed/AI-Email-Copilot",
        label: "Source code",
      },
      accentGradient: "from-emerald-600/30 via-teal-600/20 to-zinc-900/50",
      wireframeType: "rag",
      statsHighlight: {
        value: "Semantic RAG",
        label: "pgvector similarity pipeline",
      },
      problemSolution: {
        problem:
          "Standard LLM email drafting generates generic responses lacking historical context, project-specific details, and the author's distinct communication style.",
        built:
          "Built a FastAPI and PostgreSQL vector service that automatically chunks, embeds, and indexes past correspondences with pgvector, retrieving top-k relevant threads for prompt injection.",
        outcome:
          "Generates hyper-personalized draft replies directly grounded in prior communications, minimizing back-and-forth edits.",
      },
    },
    {
      id: "laneguard-detection",
      title: "LaneGuard — Lane Detection Pipeline",
      hook: "Real-time highway lane detection benchmarking classical CV against deep learning",
      description:
        "A lane-detection system for highway driving footage comparing a classic OpenCV edge-and-geometry pipeline against a lightweight YOLOv8n-seg segmentation model, evaluated on the TuSimple dataset.",
      tags: ["Python", "OpenCV", "YOLOv8", "Computer Vision"],
      category: "ai",
      link: {
        url: "https://github.com/AskariSyed/Lane_Guard",
        label: "Source code",
      },
      accentGradient: "from-amber-600/30 via-orange-600/20 to-zinc-900/50",
      wireframeType: "vision",
      statsHighlight: {
        value: "TuSimple",
        label: "Benchmarked on standard dataset",
      },
      problemSolution: {
        problem:
          "Lane detection pipelines for real-time vehicular telemetry must maintain high accuracy in curved highway scenarios while respecting tight compute budgets.",
        built:
          "Developed dual vision architectures in Python: an OpenCV edge, bird's-eye perspective transform, and polynomial sliding-window pipeline alongside a fine-tuned YOLOv8n-seg segmentation network.",
        outcome:
          "Benchmarked both approaches on TuSimple highway video, quantifying inference frames-per-second versus boundary recovery under challenging lighting.",
      },
    },
    {
      id: "snow-robust-classifier",
      title: "Snow-Robust Traffic Sign Classifier",
      hook: "Weather-resilient computer vision pipeline for degraded driving conditions",
      description:
        "A deep-learning pipeline that restores snow-degraded images before classification, using an EfficientNet-B2 classifier. Improved accuracy under severe snow by 19.32% versus the baseline.",
      tags: ["Deep Learning", "EfficientNet", "Image Restoration", "Python"],
      category: "ai",
      accentGradient: "from-cyan-600/30 via-blue-600/20 to-zinc-900/50",
      wireframeType: "snow",
      statsHighlight: {
        value: "+19.32%",
        label: "Accuracy boost in severe snow",
      },
      problemSolution: {
        problem:
          "Severe snow precipitation and lens obscuration drastically degrade vehicular traffic sign recognition systems, dropping accuracy to unsafe levels.",
        built:
          "Implemented a cascaded deep-learning system pairing an image restoration preprocessing network with an EfficientNet-B2 classification backbone.",
        outcome:
          "Achieved a 19.32% classification accuracy improvement under extreme weather artifacts compared to unmodified baseline models.",
      },
    },
    {
      id: "ai-generated-image-detector",
      title: "AI-Generated Image Detector",
      hook: "Few-shot unseen generative model detector reaching ~0.96 ROC-AUC",
      description:
        "A detector that identifies images from unseen AI generators (e.g. Midjourney, Wukong) and adapts using only a handful of examples. Reached ~0.96 ROC-AUC with 50 examples per generator, tested across 50 experimental conditions.",
      tags: ["Deep Learning", "Few-Shot Learning", "Computer Vision"],
      category: "ai",
      note: "Private repository",
      accentGradient: "from-purple-600/30 via-violet-600/20 to-zinc-900/50",
      wireframeType: "classifier",
      statsHighlight: {
        value: "~0.96 ROC-AUC",
        label: "Few-shot adaptation (50 examples)",
      },
      problemSolution: {
        problem:
          "Current synthetic media forensic classifiers fail when confronted with newly released generative engines that exhibit unseen artifact signatures.",
        built:
          "Formulated a few-shot adaptation pipeline designed to recognize high-frequency forensic anomalies across generative engines with minimal training support samples.",
        outcome:
          "Demonstrated ~0.96 ROC-AUC with just 50 examples per generator, validated across 50 rigorous experimental conditions.",
      },
    },
    {
      id: "tax-calc-pakistan",
      title: "TaxCalc Pakistan",
      hook: "Cross-platform property tax and legal transaction calculator for Pakistan",
      description:
        "A cross-platform Flutter application developed as a freelance client project for estimating property transaction taxes in Pakistan. Calculates statutory charges including Stamp Duty, Town Committee, PLRA, Advance Tax 236K, and Capital Gains Tax 236C across multiple buyer and seller shares with Filer/Non-Filer verification, saving calculation history locally and generating audit-ready PDF reports.",
      tags: ["Flutter", "Dart", "Provider", "PDF Generation", "Tax Algorithms"],
      category: "mobile",
      badge: "Client Freelance Project",
      link: {
        url: "https://github.com/AskariSyed/TaxCalculator",
        label: "Source code",
      },
      accentGradient: "from-emerald-600/30 via-teal-600/20 to-zinc-900/50",
      wireframeType: "tax",
      statsHighlight: {
        value: "PKR Property Engine",
        label: "Filer / Non-Filer multi-party taxes",
      },
      problemSolution: {
        problem:
          "Property transaction taxes in Pakistan involve shifting tax slabs, differing rates for Filers vs. Non-Filers, split ownership shares, and varying local fixed levies, leading to calculation errors during property registration.",
        built:
          "Architected a Flutter application utilizing Provider state management to handle dynamic multi-party buyer/seller inputs, legal tax formulas (Stamp Duty, 236K/236C), local SQLite/shared storage, and PDF report creation.",
        outcome:
          "Delivered a reliable, client-ready mobile and web tool that provides instant, itemized tax computations and shareable PDF audit summaries.",
      },
    },
    {
      id: "parallel-plagiarism-checker",
      title: "Parallel Plagiarism Checker",
      hook: "High-throughput parallel source code similarity detector with CPU telemetry",
      description:
        "A multi-threaded code similarity engine built with Python and Streamlit. Preprocesses and normalizes programming submissions (Python, C/C++, Java) by stripping language-specific syntax noise, evaluates all pairwise combinations (nC2) concurrently using Python multiprocessing, and renders live CPU usage profiling alongside side-by-side code diff analysis.",
      tags: ["Python", "Streamlit", "Multiprocessing", "Parallel Computing"],
      category: "tools",
      link: {
        url: "https://github.com/AskariSyed/ParallelPlagiarismChecker",
        label: "Source code",
      },
      accentGradient: "from-blue-600/30 via-cyan-600/20 to-zinc-900/50",
      wireframeType: "parallel",
      statsHighlight: {
        value: "nC2 Concurrency",
        label: "Multi-core pairwise processing",
      },
      problemSolution: {
        problem:
          "Comparing large batches of programming submissions for similarity incurs an O(n²) pairwise overhead, causing severe slowdowns and browser freezes when executed sequentially.",
        built:
          "Engineered a multi-process pipeline that distributes both code normalization (comment, whitespace, and boilerplate reduction) and pairwise similarity matrix calculation across available CPU cores, surfaced through an interactive Streamlit UI.",
        outcome:
          "Accelerated batch comparison runtime across multi-file submissions with live CPU telemetry, similarity threshold filters, and interactive matched-block inspection.",
      },
    },
  ],
};
