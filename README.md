# 🚀 Cool.ai

Cool.ai is a premium, state-of-the-art AI-powered web application that consolidates a suite of cutting-edge AI utilities into a unified, sleek, glassmorphic dashboard. Written in React/Vite for the frontend and Node/Express for the backend, it delivers lightning-fast responses, robust user authentication, and seamless AI generation.

---

## 📌 Features

*   **📝 Write Article**: Generate high-quality articles with configurable length based on simple text prompts.
*   **💡 Blog Titles**: Generate engaging, SEO-optimized blog titles for different keywords and categories.
*   **🎨 AI Image Generator**: Create realistic, fantasy, 3D, and anime style images on-the-fly using advanced AI diffusion models, with options to publish to the community.
*   **✨ Background Removal**: Automatically isolate subjects and remove image backgrounds with high precision.
*   **✂️ Object Removal**: Generatively remove specified objects from your photos in seconds using AI-powered inpainting.
*   **📄 Resume Reviewer**: Upload PDF resumes to get deep, constructive feedback on strengths, weaknesses, and structure via AI-powered parsing.
*   **👥 Community Feed**: View public creations, browse community-generated artwork, and like creations dynamically.
*   **🔐 Clerk Auth & Plan Guarding**: Secure account signup and sign-in with Clerk. Features plan guarding (free limits vs premium plan checks).

---

## 🛠 Tech Stack

### Frontend
- **React.js** & **Vite** (Next-gen bundling & React 19)
- **Tailwind CSS** (Modern utility-first styling)
- **Lucide React** (Premium vector icons)
- **React Router v7** (Declarative routing)
- **Clerk React** (User auth & session handling)
- **Axios** (HTTP client for API requests)

### Backend
- **Node.js** & **Express.js** (REST API)
- **Neon Serverless PostgreSQL** (Serverless cloud database connection)
- **Clerk Express** (Backend auth protection and metadata middleware)
- **Cloudinary SDK** (Media storage and real-time AI image transformations)
- **Multer** (Multipart form-data parsing for file uploads)
- **PDF-Parse** (Extracted textual content from uploaded PDF resumes)
- **OpenAI Node SDK** (Gemini AI OpenAI-compatible completions gateway)

---

## 📂 Folder Structure

```
Cool-ai/ 
├── client/                     # Frontend Application (Vite + React)
│   ├── src/
│   │   ├── assets/             # Images and local static assets
│   │   ├── components/         # Reusable UI components (Sidebar, Navbar, Hero, etc.)
│   │   ├── pages/              # View pages (WriteArticle, BlogTitles, Reviweresume, etc.)
│   │   ├── App.jsx             # Route definitions & base layout
│   │   └── main.jsx            # React mounting & ClerkProvider wrapping
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend API (Node + Express)
│   ├── Controllers/            # Controller logic (aiController, userController)
│   ├── configs/                # Configuration modules (database, cloudinary, multer)
│   ├── middlewares/            # Middleware modules (auth, etc.)
│   ├── routes/                 # Route endpoints (aiRouter, userRouter)
│   ├── server.js               # Express app setup and server listener
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/puniiith25/Cool-ai.git
cd Cool-ai
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` directory:
```env
PORT=4500
DATABASE_URL=your_neon_postgresql_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
gemini_api_key=your_google_gemini_api_key
CLIPDROP_API_KEY=your_clipdrop_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
```

Create a `.env` file in the `client` directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND=http://localhost:4500
```

### 3. Run Locally

#### Backend Server
```bash
cd server
npm install
npm run server
```

#### Frontend Client
```bash
cd client
npm install
npm run dev
```

Your web application will be running at `http://localhost:5173` and connected to the backend API at `http://localhost:4500`.
