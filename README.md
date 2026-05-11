# 🎮 CloudNest

Cloud File Sharing Platform built using MERN Stack and DevOps tools.

---

# 🚀 Project Overview

CloudNest is a secure cloud file sharing platform where users can:

- Register and Login
- Upload Files
- Download Files
- Delete Files
- Set files as Public or Private
- View files uploaded by different users

The project also demonstrates DevOps concepts using Docker, Docker Compose, Jenkins, GitHub, and MongoDB Atlas.

---

# ✨ Features

## 🔐 Authentication
- User Registration
- User Login
- JWT Authentication

## 📁 File Management
- Upload Files
- Download Files
- Delete Files

## 🌍 Visibility System
- Public Files → visible to everyone
- Private Files → visible only to owner

## 👤 User-based Storage
- Every user has their own files
- Dashboard shows:
  - file name
  - visibility
  - uploaded by

## 🎮 Minecraft Inspired UI
- Retro block-style UI
- Pixel-like buttons
- Pixel-themed dashboard

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Tailwind CSS
- React Router DOM

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT
- Multer

## DevOps Tools
- Docker
- Docker Compose
- Jenkins
- GitHub

---

# 📂 Folder Structure

```bash
CloudNest/
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── uploads/
│   ├── Dockerfile
│   ├── package.json
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
│
├── docker-compose.yml
├── Jenkinsfile
└── README.md
```

---

# ⚙️ Environment Variables

Create `.env` inside backend folder.

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# 🐳 Docker Setup

## Build and Run

```bash
docker compose up --build
```

## Stop Containers

```bash
docker compose down
```

---

# 🔄 Jenkins CI/CD Pipeline

Jenkins is used for deployment automation.

The Jenkins pipeline performs:

1. Clone Repository from GitHub
2. Build Docker Containers
3. Run Containers using Docker Compose

Example Jenkins Pipeline:

```groovy
pipeline {

    agent any

    stages {

        stage('Clone Repository') {

            steps {
                git 'YOUR_GITHUB_REPOSITORY_URL'
            }
        }

        stage('Build Containers') {

            steps {
                sh 'docker compose build'
            }
        }

        stage('Run Containers') {

            steps {
                sh 'docker compose up -d'
            }
        }
    }
}
```

---

# 🌐 Application URLs

Frontend:

```bash
http://localhost:5173
```

Backend:

```bash
http://localhost:5000
```

---

# 🔐 Authentication Flow

```text
Register
   ↓
Login
   ↓
JWT Token Generated
   ↓
Dashboard Access
```

---

# 📁 File Access Logic

## Public Files
- Accessible by all users

## Private Files
- Accessible only by owner

---

# 🎮 UI Theme

CloudNest uses a Minecraft-inspired design:
- block-based layout
- retro gaming feel
- pixel-like buttons
- inventory-style dashboard

---

# 🚀 Future Improvements

- Kubernetes Deployment
- AWS EC2 Deployment
- GitHub Webhooks
- Automatic Jenkins Trigger
- File Sharing Links
- Search Functionality
- Drag & Drop Upload

---

# 👨‍💻 Author

Kumar Abhay Partap Singh

---

# ⭐ GitHub

If you like this project, give it a star ⭐
