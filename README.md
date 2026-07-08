
# Automated Data Lineage

An end-to-end, full-stack web application designed for **automated data lineage extraction, visualization, and monitoring**. This platform allows engineering and analytics teams to automatically trace data flows, map dependencies across pipelines, inspect transformations, and debug data governance pipelines in real time.

---

## 🛠️ Tech Stack & Architecture

This project is built using a modern, ultra-fast TypeScript full-stack web architecture centered around the **Bun** runtime and **TanStack** framework ecosystem.

* **Runtime & Package Manager:** [Bun](https://bun.sh/)
* **Framework & Full-Stack Routing:** [TanStack Start](https://tanstack.com/start) / [TanStack Router](https://tanstack.com/router)
* **Frontend Library:** [React 19](https://react.dev/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix Primitives, Lucide Icons, Sonner)
* **Build Tool & Bundler:** [Vite](https://vitejs.dev/)
* **Code Quality & Formatting:** ESLint, Prettier

---

## 📂 Project Directory Structure

```
Automated_Data_Lineage/
├── public/                     # Static assets (robots.txt, favicon, etc.)
├── src/
│   ├── components/
│   │   ├── console/            # Console / Dashboard workspace components
│   │   │   └── Console.tsx
│   │   ├── landing/            # Landing page & navigation components
│   │   │   ├── Landing.tsx
│   │   │   └── Nav.tsx
│   │   └── ui/                 # Reusable shadcn/ui component library
│   ├── hooks/                  # Custom React hooks (e.g., use-mobile)
│   ├── lib/                    # Core utilities, error capture & reporting
│   ├── routes/                 # TanStack Router page routes
│   │   ├── __root.tsx          # Root layout wrapper
│   │   ├── index.tsx           # Home / Landing route
│   │   ├── console.tsx         # Lineage Console workspace route
│   │   └── sitemap[.]xml.ts    # Dynamic sitemap endpoint
│   ├── routeTree.gen.ts        # Auto-generated route tree configuration
│   ├── router.tsx              # TanStack Router instance creation
│   ├── server.ts               # Server-side entry point
│   ├── start.ts                # Application startup handler
│   └── styles.css              # Global Tailwind CSS styles
├── AGENTS.mdux                 # Project-specific AI agent guidelines
├── bun.lock                    # Bun dependency lockfile
├── bunfig.toml                 # Bun configuration
├── components.json             # shadcn/ui configuration
├── eslint.config.js            # ESLint flat configuration
├── package.json                # Project dependencies and script commands
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite server & bundler setup

```

---

## 🚀 Getting Started

### Prerequisites

* [Bun](https://bun.sh/) installed on your machine (v1.0.0 or higher recommended).

### Installation

1. **Clone the Repository:**
```bash
git clone https://github.com/your-username/Automated_Data_Lineage.git
cd Automated_Data_Lineage

```


2. **Install Dependencies:**
```bash
bun install

```


3. **Set Up Environment Variables:**
Create a `.env` file in the root directory if necessary:
```env
PORT=3000
NODE_ENV=development

```



---

## 💻 Development & Available Scripts

All scripts can be run directly using Bun:

* **Start Development Server:**
```bash
bun dev

```


Starts the Vite development server with Hot Module Replacement (HMR). Navigate to `http://localhost:3000`.
* **Build for Production:**
```bash
bun run build

```


Compiles client and server assets via TanStack Start / Vite.
* **Start Production Server:**
```bash
bun start

```


Runs the production server setup from the built bundle.
* **Lint Codebase:**
```bash
bun run lint

```


Runs ESLint checks across all `.ts` and `.tsx` files.
* **Format Code:**
```bash
bun run format

```


Formats code using Prettier.

---

## 🧱 Features & UI Workspaces

1. **Landing Page (`/`):** Clean promotional and onboarding interface introducing the automated data lineage concept and capabilities.
2. **Lineage Console (`/console`):** Interactive dashboard featuring data lineage mapping, node detail inspectors, flow graphs, and data pipeline diagnostics.
3. **Built-in Error Reporting & Resilience:** Custom error capture utilities (`src/lib/error-capture.ts`, `src/lib/lovable-error-reporting.ts`) to log and inspect runtime issues seamlessly.
4. **Fully Responsive Design:** Responsive navigation drawers and sidebars built for seamless switching between desktop and mobile displays.

---

## 🤝 Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -m 'Add new lineage visualizer node'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the [MIT License](https://www.google.com/search?q=LICENSE).
