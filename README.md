# AceInterview – AI-Powered Interview & Coding Platform

**AceInterview** is an AI-powered career preparation platform designed to help students and job seekers prepare for technical and behavioral interviews in one place. It combines **AI resume analysis, personalized AI coaching, mock interviews, video interviews, interview chat, and a coding practice platform** into a unified interview-preparation ecosystem.

---

## **Project Overview**

AceInterview provides an end-to-end interview preparation experience. Users can analyze their resumes, receive personalized career guidance, practice coding problems, take AI-generated mock interviews, interact with an AI interview assistant, and review their performance.

The platform is designed to simulate a realistic interview environment while providing AI-powered feedback and personalized recommendations for improvement.

---

## **Core Modules**

### **1. AI Resume Analyzer**

Users can upload their resume and receive AI-powered analysis.

- Resume content analysis
- ATS-oriented evaluation
- Identification of strengths and weaknesses
- Missing skills and keywords
- Improvement suggestions
- Resume-based interview preparation

### **2. AI Career Coach**

The AI Career Coach acts as a personalized career assistant.

- Career-related conversations
- Skill improvement guidance
- Interview preparation advice
- Personalized learning recommendations
- Career and placement guidance

### **3. AI Mock Interview**

Users can generate personalized mock interviews based on their target role and company.

- AI-generated interview questions
- Company and role-based interviews
- Difficulty selection
- Technical and behavioral questions
- Resume-based interview preparation
- AI-powered answer evaluation
- Performance feedback

### **4. Chat Interview Mode**

A conversational interview experience where users interact with an AI interviewer.

- Real-time question-and-answer flow
- AI-generated follow-up questions
- Technical and behavioral interview simulation
- Answer evaluation
- Interview feedback

### **5. Video Interview Mode**

A more realistic interview environment designed to simulate an actual interview.

- Camera-based interview experience
- AI-generated interview questions
- Interview progress tracking
- Interview session management
- Performance evaluation
- Interview feedback

### **6. AI Coding Platform**

AceInterview includes an integrated coding practice environment for technical interview preparation.

- Company-oriented coding questions
- Topic-based coding problems
- Difficulty levels
- Custom test cases
- Code execution
- Code submission
- Test-case validation
- Accepted / Wrong Answer verdicts
- Submission history
- Runtime and memory information
- AI-generated coding hints
- AI code review

### **7. Interview & Coding Analytics**

The platform tracks user performance to help identify areas that need improvement.

- Interview scores
- Coding submission history
- Accepted submissions
- Wrong answers
- Performance tracking
- Previous interview sessions
- AI-generated improvement feedback

---

## **Key Highlights**

- **Unified Interview Preparation Ecosystem** combining resume analysis, career coaching, mock interviews and coding practice.
- **AI-Powered Personalization** based on the user's resume, target role, skills and interview performance.
- **Multiple Interview Modes** including conversational chat and video-based interviews.
- **Integrated Coding Judge** for practicing and submitting coding problems.
- **AI Coding Assistance** through hints and automated code reviews.
- **Company & Role-Oriented Preparation** for targeted placement preparation.
- **Performance Tracking** across interviews and coding practice.

---

## **Tech Stack**

### **Frontend**

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- Lucide React

### **Backend**

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication

### **AI & Machine Learning**

- Google Gemini API
- AI-powered question generation
- AI resume analysis
- AI interview evaluation
- AI career coaching
- AI coding hints
- AI code review
- Retrieval/AI-assisted interview workflows

### **Coding Execution**

- Docker
- Dockerode
- C++ execution environment
- Isolated code execution containers
- Custom test-case validation

### **Development Tools**

- Git
- GitHub
- VS Code
- Docker
- MongoDB

---

## **Platform Workflow**
                         ┌──────────────────┐
                         │      User        │
                         └────────┬─────────┘
                                  │
             ┌────────────────────┼────────────────────┐
             │                    │                    │
             ▼                    ▼                    ▼
    ┌────────────────┐   ┌────────────────┐   ┌────────────────┐
    │ Resume Analysis│   │  AI Career     │   │ Mock Interview │
    │                │   │     Coach      │   │                │
    └───────┬────────┘   └───────┬────────┘   └───────┬────────┘
            │                    │                    │
            ▼                    ▼              ┌─────┴─────┐
     AI Resume Feedback   Career Guidance       │           │
                                               ▼           ▼
                                            Chat        Video
                                               │           │
                                               └─────┬─────┘
                                                     │
                                                     ▼
                                               AI Evaluation
                                                     │
                                                     ▼
                                           Performance Feedback

                         ┌──────────────────────────────┐
                         │      Coding Platform         │
                         └──────────────┬───────────────┘
                                        │
                                        ▼
                                  Coding Questions
                                        │
                                        ▼
                                   Code Editor
                                        │
                                        ▼
                                 Run / Submit
                                        │
                                        ▼
                                Code Execution
                                        │
                                        ▼
                                 Test Validation
                                        │
                              ┌─────────┴─────────┐
                              ▼                   ▼
                          Accepted           Wrong Answer
                              │                   │
                              └─────────┬─────────┘
                                        ▼
                                  AI Code Review
                                        │
                                        ▼
                                  AI Hint / Feedback


---

## **Project Structure**

```text
AceInterview/
│
├── client/
│   ├── src/
│   │   ├── app/
│   │   │   ├── dashboard/
│   │   │   ├── interview/
│   │   │   ├── coding/
│   │   │   ├── resume/
│   │   │   ├── ai-coach/
│   │   │   ├── video-interview/
│   │   │   ├── career-coach/
│   │   │   ├── history/
│   │   │   └── admin/
│   │   │
│   │   ├── components/
│   │   │   └── coding/
│   │   │
│   │   └── services/
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scripts/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   └── package.json
│
├── judge0/
│
├── judge0-old/
│
├── .gitignore
│
└── README.md
---


## **Installation & Setup**

### **Prerequisites**

Before running AceInterview locally, make sure the following are installed:

- Node.js 18 or higher
- npm
- MongoDB
- Git
- Docker (optional)

## **Installation**

git clone <https://github.com/anushka13-alt/AceInterview/tree/main>
cd AceInterview

# Client
cd client
npm install
npm run dev

# Server
cd ../server
npm install
npm run dev
---

---

## **Environment Variables**

AceInterview uses environment variables to securely store database credentials, authentication secrets and AI API keys.

Create a `.env` file inside the `server` directory:

PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

NODE_ENV=development

For the client, create a .env.local file inside the client directory if your frontend configuration requires environment variables:
NEXT_PUBLIC_API_URL=http://localhost:5000


---

## **How the Platform Works**

AceInterview follows an end-to-end preparation workflow that allows users to prepare for interviews, practice coding and receive AI-powered feedback from a single platform.

### **1. Create an Account**

Users create an account and access their personalized AceInterview dashboard.

### **2. Analyze Your Resume**

Upload a resume and receive AI-generated insights about skills, strengths, weaknesses and improvement areas.

### **3. Get Career Guidance**

Use the AI Career Coach to discuss career goals, placement preparation, technical skills and learning priorities.

### **4. Prepare for Interviews**

Select a target role, company and difficulty level to generate personalized AI interview questions.

### **5. Choose Interview Mode**

Users can practice through:

- **Chat Interview**
- **Video Interview**

### **6. Receive AI Feedback**

After answering interview questions, the AI analyzes the responses and provides performance feedback, strengths, weaknesses and improvement suggestions.

### **7. Practice Coding**

Users can select coding problems based on topics, companies and difficulty levels and solve them using the integrated code editor.

### **8. Run and Submit Code**

Solutions can be executed against test cases before being submitted for validation.

### **9. Improve with AI**

Users can use AI hints and AI code reviews to understand their mistakes and improve their solutions.

### **10. Track Preparation**

Interview sessions and coding submissions can be reviewed to understand progress and identify areas requiring additional practice.


## **Project Status**

AceInterview is in active development.

The core platform includes AI resume analysis, AI career coaching, mock interviews, chat interviews, video interviews, coding practice, code execution, test-case validation, solution submissions, AI coding hints and AI code reviews.

---

## **Author**

**Anushka Bisht**

B.Tech Computer Science & Engineering (AI)

Graphic Era Deemed University

---

## **License**

This project is developed for educational, portfolio and interview-preparation purposes.

---




