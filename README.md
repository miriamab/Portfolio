# Mein Portfolio

Full-stack portfolio website with Next.js frontend and Express/TypeScript backend.

## Project Structure

```
Portfolio/
├── frontend/          # Next.js frontend application
├── backend/           # Express/TypeScript REST API
└── start-dev.sh       # Script to start both servers
```

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Install frontend dependencies:
```bash
cd frontend
npm install
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

### Development

#### Option 1: Start both servers with one command
```bash
./start-dev.sh
```

#### Option 2: Start servers separately

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
# Runs on http://localhost:3001
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

## Tech Stack

### Frontend
- Next.js 15
- TypeScript
- React
- TailwindCSS (through globals.css)

### Backend
- Express.js
- TypeScript
- CORS
- dotenv

## API Endpoints

- `GET /health` - Health check
- `POST /api/contact` - Contact form submission

## Environment Variables

### Frontend (.env.local)
```
BACKEND_URL=http://localhost:3001
```

### Backend (.env)
```
PORT=3001
NODE_ENV=development
```

## Production Build

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm start
```
