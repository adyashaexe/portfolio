/* ============================================================
   PROJECTS — edit, add or remove entries. The wheel and the modal
   are built from this list. `status` is shown as a label.
   ============================================================ */
window.PROJECTS = [
  {
    name: "Hardware Trojan Detection",
    kind: "Final-year project · Group ECSc_14",
    status: "Active",
    image: "assets/projects/trojan.svg",
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
    name: "Hermes",
    kind: "AI meeting assistant · RAG",
    status: "Building",
    image: "assets/projects/hermes.svg",
    blurb:
      "A bot that joins Google Meet, Zoom or Microsoft Teams and answers questions across notes, transcripts and docs. Formerly named Polaris.",
    done: [
      "Retrieves relevant context first, then generates precise answers",
      "Targets Meet, Zoom and Teams from the start",
      "Chroma as the vector store"
    ],
    stack: ["Python", "RAG", "Chroma"],
    link: "https://github.com/adyashaexe" // TODO
  },
  {
    name: "Ondeck",
    kind: "Job aggregator · Full-stack",
    status: "Planned",
    image: "assets/projects/ondeck.svg",
    blurb:
      "Pulls job listings from multiple sites and apps, then sorts and filters them in one place.",
    done: [
      "React frontend with a FastAPI backend",
      "Single Vercel deployment serving both frontend and API"
    ],
    stack: ["React", "FastAPI", "Vercel"],
    link: "https://github.com/adyashaexe" // TODO
  }
];

/* Focus-area cards (the accordion carousel) */
window.FOCUS = [
  {
    key: "ml",
    title: "Machine learning",
    image: "assets/focus/ml.svg",
    text: "Models for signals, images and time-series: 1D-CNNs, classical baselines, multimodal fusion. I check for leakage before I trust a number.",
    tags: ["PyTorch", "scikit-learn", "Time-series"]
  },
  {
    key: "hardware",
    title: "Hardware & security",
    image: "assets/focus/hardware.svg",
    text: "FPGA design in Verilog, power measurement rigs and side-channel analysis for spotting tampered circuits.",
    tags: ["Verilog", "Basys3", "Arduino"]
  },
  {
    key: "web",
    title: "Web & full-stack",
    image: "assets/focus/web.svg",
    text: "React and FastAPI apps, retrieval-based assistants and clean dashboards that make results easy to explore.",
    tags: ["React", "FastAPI", "RAG"]
  },
  {
    key: "design",
    title: "Design & writing",
    image: "assets/focus/design.svg",
    text: "Graphic design and content writing for the Lakshya School of Electronics club: making technical topics easy to look at and read.",
    tags: ["Graphic design", "Content writing"]
  }
];
