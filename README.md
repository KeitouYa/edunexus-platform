# 🎓 EduNexus — Online Teaching Platform

> A full-stack web application that enables teachers and students to manage courses, assignments, attendance, and learning materials in one integrated online system.

---

## 🚀 Overview

EduNexus is designed to digitize classroom management, addressing inefficiencies in traditional teaching such as paper attendance, delayed homework feedback, and limited resource sharing.  
The platform supports multi-role access (Admin, Teacher, Student) and provides tools for online course creation, assignment submission, digital attendance, and data visualization.

---

## 🧠 Core Features

- **👩‍🏫 Course Management** – Teachers create, delete, and manage courses; students join with course codes.  
- **📝 Assignment Management** – Teachers publish and grade assignments; students upload files directly to cloud storage.  
- **📅 Attendance System** – Numeric code–based digital sign-in with real-time status tracking.  
- **📚 Resource Sharing** – Teachers and students upload/download study materials.  
- **📊 Data Visualization** – Real-time charts (ECharts) for attendance rate and performance trends.  
- **🔐 User Management** – Role-based login and session persistence for Admin / Teacher / Student.

---

## 🧩 Architecture

| Layer | Technologies |
|-------|---------------|
| **Frontend** | Vue 3, Vuex, Element Plus, Axios, ECharts |
| **Backend** | Spring Boot, Java 8, MySQL |
| **Storage** | Alibaba Cloud OSS |
| **Pattern** | RESTful API + B/S Architecture |


---

## ⚙️ Setup Instructions

### Backend
```bash
cd backend
mvn spring-boot:run
