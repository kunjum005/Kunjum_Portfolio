# Kunjum Mittal — Portfolio

A premium personal portfolio built with **React + Vite**, **Framer Motion**, **Three.js / React Three Fiber**, and **Tailwind CSS**.

---

## ✨ Features

- **3D Interactive Brain** — React Three Fiber scene with orbiting rings, satellites, neural lines and particle cloud
- **Mouse Parallax** — The 3D model tracks your cursor in real-time
- **Scroll Parallax** — Hero text floats behind the 3D scene as you scroll (Framer Motion `useScroll` + `useTransform`)
- **Framer Motion** — Staggered hero text with blur-in, scroll-triggered reveals, tilt cards on projects, spring-based custom cursor
- **Custom Cursor** — Magnetic ring that scales on interactive elements
- **Active Nav** — Intersection Observer highlights the current section
- **Tailwind CSS** — Utility-first, dark space aesthetic

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 3. Build for production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Scroll-aware nav with active section highlight
│   ├── Hero.jsx            # Full-viewport hero with parallax text + 3D scene
│   ├── ThreeScene.jsx      # R3F 3D brain — IcosahedronGeometry, rings, satellites
│   ├── Journey.jsx         # Education & internship timeline cards
│   ├── Skills.jsx          # Numbered skill cards with tag hover
│   ├── Projects.jsx        # 3D tilt project cards
│   ├── Achievements.jsx    # Award cards with slide-in animation
│   ├── Connect.jsx         # Contact section with email + social
│   ├── Footer.jsx          # Simple footer
│   └── CustomCursor.jsx    # Spring-based custom cursor ring
├── hooks/
│   └── useScrollReveal.js  # Wrapper around framer-motion useInView
├── utils/
│   └── motionVariants.js   # Reusable Framer Motion animation variants
├── App.jsx
├── main.jsx
└── index.css               # Tailwind + global CSS variables
```


## 📦 Key Dependencies

| Package | Purpose |
|---|---|
| `react` + `react-dom` | UI framework |
| `framer-motion` | Animations, scroll, spring physics |
| `three` | 3D math & rendering |
| `@react-three/fiber` | React renderer for Three.js |
| `@react-three/drei` | R3F helpers (OrbitControls, etc.) |
| `tailwindcss` | Utility CSS |
| `lucide-react` | Icon library |

---

Made with ❤️ by Kunjum Mittal
