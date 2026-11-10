/* ============================================================
   PROJECTS — edit, add or remove entries. The wheel and the modal
   are built from this list. `status` is shown as a label.
   `accent` is a [from, to] colour pair used to tint the card.
   ============================================================ */
window.PROJECTS = [
  {
    name: "Hardware Trojan Detection",
    kind: "Final-year project · Group ECSc_14",
    status: "Active",
    image: "assets/projects/trojan.svg",
    accent: ["#22d3ee", "#3b82f6"],
    blurb:
      "Detecting hardware Trojans in FPGA-based AES-128 circuits using power side-channel analysis and machine learning.",
    done: [
      "Full AES-128 in Verilog, verified against FIPS-197 test vectors",
      "Three Trojan variants and a Basys3 hardware wrapper",
      "Power logging pipeline: INA219 sensor, Arduino and Python",
      "Training notebook with a PyTorch 1D-CNN, Random Forest and SVM",
      "Leave-one-Trojan-out cross-validation to test generalisation"
    ],
    stack: ["Verilog", "FPGA (Basys3)", "Python", "PyTorch", "scikit-learn", "Arduino", "INA219"],
    link: "https://github.com/adyashaexe/HardwareTrojanML"
  },
  {
    name: "GastricSentinel",
    kind: "Minor project · Medical ML",
    status: "In progress",
    image: "assets/projects/gastric.svg",
    accent: ["#f472b6", "#fb7185"],
    blurb:
      "Gastric cancer detection that fuses histopathology images, genomic profiles and clinical data into a single model.",
    done: [
      "Histopathology images from GasHisSDB",
      "Genomic profiles and clinical data from TCGA-STAD",
      "Moved off a colorectal dataset after spotting suspected leakage at 99% accuracy",
      "Replaced synthetic data with the three real datasets"
    ],
    stack: ["Python", "Deep learning", "Multimodal fusion", "TCGA-STAD", "GasHisSDB"],
    link: "https://github.com/adyashaexe/GastricSentinel"
  },
  {
    name: "Exoplanet Finder",
    kind: "Scientific ML · Dashboard",
    status: "Building",
    image: "assets/projects/exoplanet.svg",
    accent: ["#a78bfa", "#6366f1"],
    blurb:
      "Time-series analysis and classification to flag exoplanet candidates, with a dashboard on top. The backend comes first.",
    done: [
      "Scientific machine learning on time-series data",
      "Classification pipeline, built backend-first",
      "Dashboard planned for exploring results"
    ],
    stack: ["Python", "Time-series analysis", "Classification"],
    link: "https://github.com/adyashaexe" // TODO: point at the repo once it exists
  },
  {
    // TODO: fill in the real description, status, stack and repo link for Angesnet.
    name: "Angesnet",
    kind: "Project",
    status: "Coming soon",
    image: "assets/projects/angesnet.svg",
    accent: ["#fbbf24", "#f97316"],
    blurb: "Details for this project are coming soon.",
    done: ["Write-up in progress"],
    stack: ["Details soon"],
    link: "https://github.com/adyashaexe" // TODO
  }
];

/* Focus-area cards (the accordion carousel) */
window.FOCUS = [
  {
    key: "ml",
    title: "Machine learning",
    image: "assets/focus/ml.svg",
    accent: ["#a78bfa", "#6366f1"],
    text: "Models for signals, images and time-series: 1D-CNNs, classical baselines, multimodal fusion. I check for leakage before I trust a number.",
    tags: ["PyTorch", "scikit-learn", "Time-series"]
  },
  {
    key: "hardware",
    title: "Hardware & security",
    image: "assets/focus/hardware.svg",
    accent: ["#22d3ee", "#3b82f6"],
    text: "FPGA design in Verilog, power measurement rigs and side-channel analysis for spotting tampered circuits.",
    tags: ["Verilog", "Basys3", "Arduino"]
  },
  {
    key: "web",
    title: "Web & full-stack",
    image: "assets/focus/web.svg",
    accent: ["#f472b6", "#fb7185"],
    text: "React and FastAPI apps, retrieval-based assistants and clean dashboards that make results easy to explore.",
    tags: ["React", "FastAPI", "RAG"]
  }
];

/* Toolbox: rendered (and animated) by js/toolbox.js */
window.TOOLBOX = [
  { title: "Machine learning", color: "#a78bfa",
    items: ["Python", "PyTorch", "scikit-learn", "1D-CNN", "Random Forest", "SVM", "Time-series classification"] },
  { title: "Hardware", color: "#22d3ee",
    items: ["Verilog", "FPGA (Basys3)", "AES-128", "Power side-channel analysis", "INA219", "Arduino"] },
  { title: "Web and data", color: "#f472b6",
    items: ["React", "FastAPI", "RAG with Chroma", "Web development", "SAP BTP"] }
];
