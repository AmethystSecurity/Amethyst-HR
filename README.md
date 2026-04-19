# Amethyst HR

> Elegant, futuristic HR management system built with Next.js 14 and TypeScript.

Amethyst HR is a comprehensive enterprise HR platform featuring employee management, attendance tracking, payroll processing, leave management, and performance tracking — all wrapped in a premium dark theme with glassmorphism UI and smooth animations.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## Features

- **Authentication** – NextAuth.js with Google OAuth support
- **Employee Management** – CRUD operations, profiles, search & filters
- **Attendance Tracking** – Clock in/out, calendar view, analytics
- **Payroll Processing** – Salary configuration, PDF payslip generation
- **Leave Management** – Request/approval workflow, balance tracking
- **Performance Reviews** – KPI dashboards, review cycles, feedback
- **Dark Theme** – Premium glassmorphism UI with amethyst purple accents
- **Responsive** – Works on desktop, tablet, and mobile

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS + custom CSS |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Animation | Framer Motion |
| Charts | Recharts |
| Icons | Lucide React |
| Database | MongoDB + Mongoose |
| Auth | NextAuth.js |
| PDF | @react-pdf/renderer |

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or cloud)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/amethyst-hr.git
   cd amethyst-hr
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration (see [Environment](#environment) section).

4. Ensure MongoDB is running:
   ```bash
   # If using local MongoDB
   mongod
   ```
   Or use MongoDB Atlas and update `MONGODB_URI` accordingly.

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | ✅ | MongoDB connection string |
| `NEXTAUTH_URL` | ✅ | Application base URL |
| `NEXTAUTH_SECRET` | ✅ | NextAuth secret (generate with `openssl rand -base64 32`) |
| `GOOGLE_CLIENT_ID` | ⚠️ | Google OAuth client ID (optional) |
| `GOOGLE_CLIENT_SECRET` | ⚠️ | Google OAuth client secret (optional) |

See `.env.example` for full configuration template.

---

## Project Structure

```
amethyst/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/             # Authentication pages (login, signup)
│   │   ├── (dashboard)/        # Dashboard and feature modules
│   │   ├── api/                # API routes (NextAuth, auth, users)
│   │   ├── about/              # About page
│   │   ├── contact/            # Contact page
│   │   ├── services/           # Services page
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Landing page
│   ├── components/             # Reusable UI components
│   │   ├── layout/             # Sidebar, Header, etc.
│   │   ├── ui/                 # Card, Input, Button, etc.
│   │   └── features/           # Feature-specific components
│   ├── lib/                    # Utilities (mongodb, utils)
│   ├── models/                 # Mongoose schemas
│   ├── hooks/                  # Custom React hooks
│   └── types/                  # TypeScript type definitions
├── public/                     # Static assets (images, favicon, etc.)
├── .env.example                # Environment template
├── .gitignore                  # Git ignore rules
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # TailwindCSS configuration
├── tsconfig.json               # TypeScript configuration
├── SPEC.md                     # Technical specification
└── package.json                # Dependencies and scripts
```

---

## Design System

The app follows a **dark theme** with **amethyst purple (#9966CC)** as the primary color, featuring:

- Glassmorphism effects with backdrop blur
- Neon glow borders and text
- Smooth Framer Motion animations
- Responsive grid layout (12-column)
- Custom typography (Sora, DM Sans, JetBrains Mono)

See `SPEC.md` for full design and functionality specifications.

---

## Database Schema

The project uses MongoDB with Mongoose. The primary model is `User` (found in `src/models/User.ts`), which includes:

- Authentication fields (email, username, password)
- Employee profile data (name, phone, role, department, avatar)
- Leave balance tracking (annual, sick, personal, WFH)
- Activity timestamps

Additional collections (Attendance, LeaveRequests, Payroll, PerformanceReviews) are planned per specification but not yet implemented.

---

## Authentication

NextAuth.js handles authentication with:

- Google OAuth provider (optional)
- JWT-based sessions
- Role-based access control (employee, manager, hr, admin)
- Custom callbacks for role assignment based on email patterns

Session data includes: `id`, `email`, `name`, `role`, `department`, `accessToken`.

---

## Roadmap

Planned features (per SPEC.md):

- [ ] Attendance system with clock in/out
- [ ] Leave request & approval workflow
- [ ] Payroll processing & PDF payslips
- [ ] Performance review cycles
- [ ] Department management
- [ ] Advanced reporting & analytics
- [ ] Email notifications
- [ ] File uploads (documents, avatars)

Contributions welcome!

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

Please follow the existing code style and ensure ESLint passes.

---

## License

MIT License — feel free to use this project for learning or commercial purposes.

See `LICENSE` file for full text (add if desired).

---

## Support

For questions or issues, open a GitHub issue or contact the maintainer.
