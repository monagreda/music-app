# 🎵 Music App - Modern Streaming Interface

A high-performance music streaming web application built with a focus on UI/UX, responsive design, and seamless data handling.

### Live Demo
**[View Live Project](https://music-app-lovat-xi.vercel.app/)**

---
This app goes beyond simple playback by incorporating a **custom K-Means algorithm** built from scratch in Python. It analyzes the music library to discover patterns and group songs intelligently.

* **Data-Driven Insights:** The algorithm processes `reproduciones` (plays) and `duracion_min` (duration) to segment the catalog.
* **Custom Implementation:** Built using **NumPy** and **Pandas**, avoiding black-box libraries for the core logic to ensure full control over the clustering process.
* **Automated Pipeline:** A Python script cleans the data, runs the model, and exports a `canciones_ready.json` file that directly feeds the React frontend.
* **Visual Reports:** Generates automated dashboards using **Seaborn** and **Matplotlib** to monitor cluster distribution and artist performance.

### 🛠️ Tech Stack & Tools
- **Frontend:** React.js (built with **Vite** for ultra-fast development).
- **Styling:** **Tailwind CSS** (Utility-first CSS for a modern, sleek look).
- **Data Science:** Python, NumPy, Pandas.
- **Visualization:** Matplotlib, Seaborn.
- **State Management:** React Hooks (`useState`, `useEffect`) for dynamic UI updates.
- **Deployment:** Vercel.

### Key Features
- **Modern User Interface:** A clean, dark-themed dashboard inspired by top-tier streaming platforms.
- **Dynamic Search:** Real-time filtering to find tracks and artists instantly.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop screens using Tailwind's grid and flexbox.
- **Efficient Performance:** Leverages Vite's Hot Module Replacement (HMR) and optimized build process.

### 🧠 What I Learned
During this project, I strengthened my skills in **component-based architecture** and learned how to efficiently manage side effects in React. I also focused on **performance optimization**, ensuring the app remains snappy even with multiple UI elements.

---

### ⚙️ How to Run it Locally
1. Clone the repository: 
   ```bash
   git clone [https://github.com/monagreda/music_app.git](https://github.com/monagreda/music_app.git)
