/* ============================================================
   PROJECTS — edit, add or remove entries. The wheel and the modal
   are built from this list. `status` is shown as a label.
   `accent` is a [from, to] colour pair used to tint the card.
   ============================================================ */
window.PROJECTS = [
  {
    name: "Hardware Trojan Detection",
    kind: "Major project · ML × FPGA",
    status: "In progress",
    image: "assets/projects/trojan.svg",
    accent: ["#22d3ee", "#3b82f6"],
    blurb:
      "For my major project, I'm looking at whether power traces can reveal hardware Trojans in an FPGA AES-128 implementation. I'm collecting traces from a Basys3 board and testing ML models to see which patterns are actually useful.",
    done: [
      "Full AES-128 in Verilog, verified against FIPS-197 test vectors",
      "Power-trace dataset: clean core plus 3 Trojan variants on a Basys3 with an INA219 sensor",
      "Windowed, z-score normalised traces fed to Random Forest, SVM and a PyTorch 1D-CNN",
      "The 1D-CNN wins at 77% four-class accuracy (Random Forest: 68%)",
      "Per-class recall and clean-vs-Trojan FNR and FPR, with limitations documented honestly"
    ],
    stack: ["Verilog", "Vivado", "FPGA (Basys3)", "Python", "PyTorch", "scikit-learn", "Arduino", "INA219"],
    link: "https://github.com/adyashaexe/HardwareTrojanML"
  },
  {
    name: "GastricSentinel",
    kind: "Minor project · Multimodal medical AI",
    status: "Shipped",
    image: "assets/projects/gastric.svg",
    accent: ["#f472b6", "#fb7185"],
    blurb:
      "GastricSentinel explores multimodal learning with histopathology images and genomic data. I also added Grad-CAM and SHAP because I wanted to understand what the model was using to make a prediction, not just see a score.",
    done: [
      "245K+ histopathology images (GasHisSDB) and about 450 TCGA-STAD genomic cases",
      "64% binary accuracy on noisy, imbalanced medical data, reported honestly",
      "Moved off a colorectal dataset after spotting suspected leakage at 99% accuracy",
      "Grad-CAM heatmaps and SHAP values for every prediction",
      "Flask REST API and a JavaScript dashboard for real-time inference"
    ],
    stack: ["Python", "PyTorch", "scikit-learn", "Flask", "JavaScript", "Grad-CAM", "SHAP"],
    link: "https://github.com/adyashaexe/GastricSentinel"
  },
  {
    name: "AegisNet",
    kind: "Security ML · Real-time IDS",
    status: "Shipped",
    image: "assets/projects/angesnet.svg",
    accent: ["#a78bfa", "#6366f1"],
    blurb:
      "A network intrusion detection system that captures live traffic, extracts flow features and classifies potential threats. The interesting part was putting the capture, prediction and alerting pieces together so they work as one pipeline.",
    done: [
      "Trained on 2.8M+ CIC-IDS-2017 flows across 13 attack classes",
      "78-feature pipeline, with SMOTE to lift recall on the rare attacks",
      "Four stages: capture, processing, classification, alerting",
      "Flask backend and a live dashboard on top"
    ],
    stack: ["Python", "scikit-learn", "Scapy", "SMOTE", "Flask", "JavaScript"],
    link: "https://github.com/adyashaexe/AegisNet"
  },
  {
    name: "ByteBite",
    kind: "Software · Java",
    status: "Built",
    image: "assets/projects/bytebite.svg",
    accent: ["#fbbf24", "#f97316"],
    blurb:
      "A Java food-delivery application with a GUI. I built it to practise object-oriented design and work through a complete flow, from browsing the menu to placing and tracking an order.",
    done: [
      "Core flow: browsing the menu, ordering and tracking",
      "Java GUI front end",
      "Built to showcase object-oriented principles"
    ],
    stack: ["Java", "OOP", "GUI"],
    link: "https://github.com/adyashaexe/ByteBite"
  }
];

/* Focus-area cards (the accordion carousel) */
window.FOCUS = [
  {
    key: "ml",
    title: "Machine learning",
    image: "assets/focus/ml.svg",
    accent: ["#a78bfa", "#6366f1"],
    text: "Models for images, signals and time-series: CNNs, 1D-CNNs, classical baselines, multimodal fusion. I check for leakage before I trust a number, and I distrust any metric that looks too good.",
    tags: ["PyTorch", "TensorFlow", "scikit-learn", "SHAP"]
  },
  {
    key: "hardware",
    title: "Hardware & security",
    image: "assets/focus/hardware.svg",
    accent: ["#22d3ee", "#3b82f6"],
    text: "FPGA design in Verilog, power-measurement rigs and side-channel analysis for spotting tampered circuits. Also a real-time intrusion detector, because paranoia is a transferable skill.",
    tags: ["Verilog", "Basys3", "Scapy", "Arduino"]
  },
  {
    key: "web",
    title: "GenAI, MLOps & full-stack",
    image: "assets/focus/web.svg",
    accent: ["#f472b6", "#fb7185"],
    text: "LLMs, RAG and agents, shipped like real software: Docker, CI/CD, MLflow, FastAPI. A notebook is not a product.",
    tags: ["LangChain", "RAG", "Docker", "FastAPI"]
  }
];

/* Toolbox: rendered (and animated) by js/toolbox.js */
window.TOOLBOX = [
  { title: "Machine learning", color: "#a78bfa",
    items: ["Python", "PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "OpenCV", "CNNs", "Transformers", "Computer Vision", "NLP", "Time-Series", "SHAP", "Grad-CAM"] },
  { title: "Generative & agentic AI", color: "#f472b6",
    items: ["LLMs", "Prompt Engineering", "RAG", "LangChain", "LlamaIndex", "LangGraph", "AI Agents", "Embeddings", "FAISS", "ChromaDB", "Hugging Face", "LoRA / PEFT"] },
  { title: "MLOps & cloud", color: "#22d3ee",
    items: ["MLflow", "DVC", "Docker", "Kubernetes", "GitHub Actions", "Airflow", "FastAPI", "AWS", "GCP", "Git"] },
  { title: "Hardware & security", color: "#fbbf24",
    items: ["Verilog", "Vivado", "FPGA (Basys3)", "AES-128", "Power side-channel analysis", "INA219", "Arduino", "Scapy"] },
  { title: "Data & analytics", color: "#34d399",
    items: ["Pandas", "NumPy", "SQL", "Power BI", "Tableau", "A/B Testing", "Statistics", "EDA"] },
  { title: "Languages & engineering", color: "#60a5fa",
    items: ["Java", "C++", "Bash", "DSA", "OOP", "REST APIs", "Microservices", "Kafka", "PostgreSQL", "MongoDB", "Redis", "React"] }
];

/* Writing: shown in the Writing section (js/writing.js) */
window.WRITING = [
  {
    title: "Indra Met Infinite Versions of Himself Long Before Physics Caught Up",
    blurb: "An ancient Indian story imagined countless versions of one king long before physicists dreamed up parallel worlds.",
    date: "Sep 5",
    url: "https://medium.com/@adyasha.exe/indra-met-infinite-versions-of-himself-long-before-physics-caught-up-95144f19df75",
    color: "#a78bfa"
  },
  {
    title: "The Loneliest Kind of Love Is the One That Never Disappoints You",
    blurb: "AI companions are turning into someone to talk to, someone to miss, and sometimes someone to love.",
    date: "Sep 5",
    url: "https://medium.com/@adyasha.exe/the-loneliest-kind-of-love-is-the-one-that-never-disappoints-you-d28f4d315af1",
    color: "#f472b6"
  }
];
