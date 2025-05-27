# wremotely-frontend

This repository contains the **frontend** codebase for the wremotely project. It is built with React, TypeScript, and Vite, and is designed for fast, modern web development and easy deployment (e.g., Netlify).

> **Note:**  
> This repository is **only for the frontend**.  
> All data ETL (Extract, Transform, Load) scripts and backend data processing are handled in a **separate private repository**.

---

## Features

- ⚡ Lightning-fast development with [Vite](https://vitejs.dev/)
- ⚛️ Modern UI with [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- 🧩 UI components powered by [shadcn/ui](https://ui.shadcn.com/)
- 🔍 Fuzzy job search with [Fuse.js](https://fusejs.io/)
- 🌙 Built-in dark mode toggle
- 📱 Responsive design
- 🧩 Modular components
- 🚀 Ready for [Netlify](https://www.netlify.com/) deployment

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [git](https://git-scm.com/)

### Setup

1. **Clone this repository:**

   ```bash
   git clone https://github.com/your-username/wremotely-frontend.git
   cd wremotely-frontend/app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Edit the `.env` file in the `app/` directory as needed.

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Build for production:**

   ```bash
   npm run build
   ```

6. **Preview the production build:**

   ```bash
   npm run preview
   ```

---

## Deployment

- This project is ready for deployment on Netlify, Vercel, or any static hosting provider.
- For Netlify, set the build command to `npm run build` and the publish directory to `dist`.

---

## Project Structure

```
.
├── LICENSE
├── README.md
└── app
    ├── index.html
    ├── netlify.toml
    ├── package.json
    ├── public/                # Static assets (robots.txt, etc.)
    ├── scripts/               # Static generation scripts
    ├── src/
    │   ├── components/        # React components
    │   ├── pages/             # Page components
    │   ├── App.tsx            # Main application component
    │   ├── main.tsx           # Application entry point
    │   └── ...                # Other source files
    ├── tailwind.config.js
    └── ...
```

---

## Data & ETL

- **Important:**  
  This repository does **not** contain any data ETL (Extract, Transform, Load) scripts or backend logic.
- All data processing and ETL scripts are managed in a **separate private repository**.
- The frontend expects processed data (e.g., `transformed_data.json`) to be available in the appropriate location (such as `app/data/`).

---

## License

This project is licensed under the MIT License. See [LICENSE](../LICENSE) for details.
