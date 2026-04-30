# 🚀 AI Resume Analyzer & Job Match System

A full-stack AI-powered SaaS application that analyzes resumes against job descriptions, calculates match scores, and provides intelligent, actionable suggestions — including AI-generated resume bullet improvements.

---

## 🧠 Overview

This project helps job seekers:

* 📊 Understand how well their resume matches a job description
* 🧩 Identify missing or weak skills
* ✍️ Improve resume content using AI-generated suggestions
* 🎯 Optimize resumes for ATS (Applicant Tracking Systems)

Unlike basic analyzers, this system doesn’t just show problems — it **actively helps fix them**.

---

## ✨ Key Features

### 🔍 Resume Analysis

* Parses resume + job description
* Extracts and compares skills
* Calculates:

  * Match Score
  * Weighted Score
  * Skill Coverage

---

### 📊 Interactive Dashboard (Frontend)

* Glassmorphism UI with modern design
* Fully responsive layout
* Visual insights using charts:

  * 🍩 Donut Chart (Skill coverage)
  * 📊 Bar Chart (Score comparison)
  * 📡 Radar Chart (Skill strength)
  * 🎯 Score visualization

---

### 🤖 AI Suggestions Panel (Core Feature)

* 🚨 Critical fixes (lost skills)
* ⚡ Quick wins (easy improvements)
* 🧩 Skill gap actions
* ✍️ Resume rewrite suggestions

---

### ✨ AI Bullet Generator (Game-Changer)

* Generates strong resume bullet points
* Based on:

  * Skill
  * Experience
  * Context
* Follows best practices:

  * Action verbs
  * Technical clarity
  * Impact-focused writing

---

### 📄 Tailored Resume Output

* AI-refined summary
* Improved experience bullets
* Clean skill list

---

## 🏗️ Tech Stack

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Framer Motion (animations)
* Recharts (charts)
* Lucide React (icons)

---

### Backend

* Node.js
* Express.js
* OpenAI API (for AI generation)
* PDF parsing (resume extraction)

---

## 🧱 Architecture

```
Client (Next.js)
   ↓
API Layer (Frontend Services)
   ↓
Backend (Express)
   ↓
AI Processing (OpenAI)
```

---

## 📁 Project Structure

```
/app
  /analyze
  /compare

/components
  /ai
  /charts
  /resume
  /ui

/hooks
/services
/types
```

---

## 🔌 API Endpoints

### 1. Compare Resume

```
POST /compare
```

**Returns:**

* Match score
* Matched & missing skills
* Tailored resume
* Improvement analysis

---

### 2. AI Rewrite (Bullet Generator)

```
POST /ai/rewrite
```

**Request:**

```json
{
  "skill": "redux",
  "experience": "Junior Developer",
  "context": "React dashboard app"
}
```

**Response:**

```json
{
  "bullets": [
    "Implemented global state management using Redux Toolkit...",
    "Optimized data flow and reduced prop drilling...",
    "Integrated Redux with async API handling..."
  ]
}
```

---

## 🎨 UI Design System

### Style: Glassmorphism + Tech UI

* Frosted glass cards
* Gradient backgrounds (blue → purple)
* Soft shadows & rounded corners
* Smooth animations

### Color Palette

* Primary: `#0F172A` (Dark Navy)
* Secondary: `#6366F1 → #8B5CF6`
* Accent: `#06B6D4`

---

## ⚡ Performance Optimizations

* Server Components (Next.js)
* Minimal client-side rendering
* Memoization where needed
* Optimized re-renders
* Lazy-loaded components (charts)

---

## 🔍 SEO Optimization

* Metadata configured in layout
* Semantic HTML structure
* Fast loading via server rendering

---

## 🚀 How to Run

### 1. Clone the repo

```
git clone <your-repo-url>
```

### 2. Install dependencies

```
npm install
```

### 3. Run frontend

```
npm run dev
```

### 4. Run backend

```
npm run server
```

---

## 🧪 Future Improvements

* 📄 Live resume preview editor
* ✏️ One-click “Fix My Resume”
* 📈 ATS keyword density analysis
* 🎯 Skill importance weighting
* 🔐 User authentication (SaaS model)
* 💳 Subscription system

---

## 🎯 Why This Project Matters

Most resume tools:

> Show what’s wrong

This project:

> Shows what’s wrong **and fixes it using AI**

That’s the difference between a tool and a **product**.

---

## 👨‍💻 Author

Built with focus on real-world hiring needs and modern AI-driven UX.

---

## ⭐ Final Note

This project is designed not just as a demo, but as a **production-ready SaaS foundation** that can be extended into a full business.

---
