# Portfolio Backend

Express/TypeScript REST API for the portfolio website with MongoDB storage.

## Setup

```bash
# Install dependencies
npm install

# Ensure MongoDB is running locally
# macOS: brew services start mongodb-community
# or use Docker: docker run -d -p 27017:27017 --name mongodb mongo

# Seed the database with sample projects (optional)
npm run seed

# Run in development mode
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Server health check

### Contact
- `POST /api/contact` - Send contact form message
  - Body: `{ name: string, email: string, message: string }`

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects only
- `GET /api/projects/:id` - Get single project by ID
- `POST /api/projects` - Create new project (supports file upload)
- `PUT /api/projects/:id` - Update project (supports file upload)
- `DELETE /api/projects/:id` - Delete project

### File Uploads
- `POST /api/projects` and `PUT /api/projects/:id` support multipart/form-data
- Field name: `images` (accepts up to 10 files)
- Allowed types: jpeg, jpg, png, gif, webp
- Max file size: 5MB per file
- Files are served from `/uploads/:filename`

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfoliodb
```

## Database

### MongoDB Setup

The application uses MongoDB with Mongoose ODM. The database name is `portfoliodb`.

**Install MongoDB:**
- macOS: `brew install mongodb-community`
- Windows: Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- Docker: `docker run -d -p 27017:27017 --name mongodb mongo`

**Start MongoDB:**
- macOS: `brew services start mongodb-community`
- Docker: `docker start mongodb`

### Project Schema

```typescript
{
  title: String (required)
  description: String (required)
  longDescription: String
  technologies: [String]
  images: [String]  // URLs to uploaded images
  githubUrl: String
  liveUrl: String
  featured: Boolean (default: false)
  order: Number (default: 0)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

## Project Structure

```
backend/
├── src/
│   ├── config/         # Database configuration
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware (file upload)
│   ├── models/         # Mongoose models
│   ├── routes/         # Route definitions
│   ├── scripts/        # Utility scripts (seed data)
│   └── index.ts        # Entry point
├── uploads/            # Uploaded files (gitignored)
├── dist/               # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── .env
```
