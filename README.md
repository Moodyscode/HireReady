
# 🚀 HireReady — Smart CV & Job Matching Platform

HireReady is a full-stack web application that helps job seekers evaluate how well their CV matches a job description.

Users can upload their CV, paste a job description, and instantly receive a skill match score, matched skills, missing skills, and personalized improvement recommendations.

## ✨ Features

- 📄 Upload CVs in PDF or DOCX format
- 🔍 Automatically extract text from uploaded CVs
- 🎯 Compare CV skills against job requirements
- 📊 Calculate a skill match percentage
- ✅ Identify matched technical skills
- ❌ Highlight missing skills
- 💡 Generate skill improvement recommendations
- 📱 Responsive React dashboard
- 🔗 REST API integration
- 🛡️ File type and size validation

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- Vite
- CSS3
- Fetch API

### Backend
- Node.js
- Express.js
- REST APIs
- Multer
- PDF-Parse
- Mammoth
- CORS
- Dotenv

### Database
- PostgreSQL (planned integration)

### Development Tools
- Visual Studio Code
- Git & GitHub
- npm
- ESLint

## 📁 Project Structure

```text
HireReady/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
├── .gitignore
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Moodyscode/HireReady.git
cd HireReady
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
NODE_ENV=development
```

Start the backend:

```bash
npm run dev
```

Backend runs at:

http://localhost:5000

### 3. Set up the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

http://localhost:5173

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API welcome message |
| GET | `/api/health` | Backend health check |
| POST | `/api/cv/upload` | Upload and extract CV text |
| POST | `/api/analyze` | Analyze CV against job description |

### Example Analysis Response

```json
{
  "success": true,
  "message": "CV analysis completed successfully.",
  "filename": "example-cv.pdf",
  "matchPercentage": 86,
  "matchedSkills": [
    "JavaScript",
    "Python",
    "Django",
    "SQL",
    "Docker",
    "Git"
  ],
  "missingSkills": [
    "React"
  ],
  "recommendations": [
    "Consider developing or demonstrating React skills."
  ]
}
```

## 🧠 How HireReady Works

1. The user uploads a PDF or DOCX CV.
2. The backend extracts readable text.
3. The user provides a job description.
4. The skill matching engine identifies recognized technologies.
5. The system compares CV skills with job requirements.
6. The dashboard displays the results and recommendations.

**Note:** HireReady currently uses rule-based keyword matching. Its match percentage reflects recognized skill overlap, not a candidate's overall suitability or verified proficiency.

## 🗺️ Roadmap

- [x] Set up Node.js and Express backend
- [x] Implement CV upload and text extraction
- [x] Build skill matching engine
- [x] Create React dashboard
- [x] Connect frontend and backend
- [ ] Integrate PostgreSQL
- [ ] Save and retrieve analysis history
- [ ] Add user authentication
- [ ] Improve CV analysis with AI
- [ ] Export analysis reports
- [ ] Deploy application online

## 👨‍💻 Developer

**Mahmood Chalamanda**

Software Developer | Full-Stack Development | Backend Engineering

GitHub: https://github.com/Moodyscode

## 📄 License

No license has been specified for this project yet.
