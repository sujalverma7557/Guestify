#  Visitor Management System

A **MERN-based** Visitor Management System designed to streamline visitor registration, authentication, and admin approvals.

## 📌 Features
✅ **User Authentication** (JWT-based Login & Registration)  
✅ **Visitor Registration & Management**  
✅ **Admin Dashboard** for approving/rejecting visitors  
✅ **Protected Routes for Admin & Visitors**  
✅ **Request Rescheduling & Status Updates**  
✅ **Modern UI with React & Tailwind CSS**  

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express, MongoDB, JWT Authentication
- **Database:** MongoDB Atlas
- **State Management:** Context API / Redux (optional)

## ⚡ Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/visitor-management-system.git
cd visitor-management-system
```
### 2️⃣ Install Dependencies
```sh
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```
### 3️⃣ Set Up Environment Variables
Create a `.env` file in the **backend** folder and add:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```
### 4️⃣ Run the Application
```sh
# Start Backend Server
cd backend
npm start

# Start Frontend Server
cd frontend
npm start
```
🚀 The application will be running at `http://localhost:3000`

## 📡 API Endpoints
### 🔑 **Authentication**
- `POST /api/auth/register` - Register Visitor
- `POST /api/auth/login` - Login Visitor/Admin

### 👥 **Visitors**
- `GET /api/visitors` - Get all visitors (Admin only)
- `PUT /api/visitors/update/:id` - Approve/Reject Visitor (Admin only)
- `POST /api/visitors/request-reschedule` - Request Visit Reschedule

## 📸 Screenshots


<img width="1440" alt="Screenshot 2025-03-24 at 1 40 06 AM" src="https://github.com/user-attachments/assets/a360d0ba-033c-4c4b-844b-f45c99cf5900" />
<img width="1434" alt="Screenshot 2025-03-24 at 2 04 02 AM" src="https://github.com/user-attachments/assets/0e6427f7-897a-4f00-bdbe-0d928cd49fd3" />

<img width="1434" alt="Screenshot 2025-03-24 at 1 42 09 AM" src="https://github.com/user-attachments/assets/394472d9-4972-47b9-bfda-4f2765888d05" />


<img width="1434" alt="Screenshot 2025-03-24 at 1 43 05 AM" src="https://github.com/user-attachments/assets/8b4519a4-982c-4c95-895b-9eee1e317a52" />
<img width="1434" alt="Screenshot 2025-03-24 at 1 42 56 AM" src="https://github.com/user-attachments/assets/f7c23baf-cd94-4ef2-b9fe-1462f1e50e49" />





## 📜 License
This project is licensed under the **MIT License**.

