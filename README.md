# ✈️ Flight Training Platform – Train the Pilots

Welcome to the **Flight Training Platform**, a full-featured web application designed to manage and track aviation training programs. This platform helps streamline the entire training process by enabling **students** to enroll in structured flight programs, complete milestone-based tasks, and manage payments. Meanwhile, **admins** can configure training programs, define tasks, and monitor progress.

👉 **Live Site**: [https://flight-training-platform.onrender.com](https://flight-training-platform.onrender.com)

---


## 🚀 Features

### 🎓 Student Functionality
- Sign up and log in securely
- Make a **mandatory base payment of ₹5000** to activate enrollment eligibility
- Browse available training programs
- Enroll into programs and complete tasks
- Track progress and task completion status
- View and manage wallet balance (credits are deducted as tasks are completed)
- Recharge wallet anytime

### 🛠 Admin Functionality
- Log in to a secure admin panel
- Create, update, and delete **training programs**
- Define and assign **tasks** to each program
- View and manage **all enrolled students**
- Monitor task completion and progress per student

---


## 🔐 Credentials

### Admin Login
- **Email:** `admin@abc.com`
- **Password:** `123`

### Sample Student Logins
| Email            | Password |
|------------------|----------|
| som@abc.com      | 123      |
| saji@abc.com     | 123      |
| shresh@abc.com   | 123      |
| shibu@abc.com    | 123      |

> You can also register new users through the signup flow.


## 👥 User Roles

### 🔐 Admin
- Full access to dashboard
- Program & task management
- Student progress tracking

### 👨‍🎓 Students
- Can enroll in programs only after base payment
- Must complete tasks to proceed
- Credits deducted per task
- Wallet must be topped up as needed

---

## 🧱 Tech Stack (MERN)

| Layer      | Technology            |
|------------|------------------------|
| Frontend   | React.js|
| Backend    | Node.js, Express.js    |
| Database   | MongoDB (Mongoose ODM) |
| Auth       | JWT (JSON Web Tokens)  |
| Deployment | Render (Full-stack)    |

---


git clone https://github.com/your-username/flight-training-platform.git
cd flight-training-platform
