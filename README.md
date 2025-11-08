# 🍕 PizzaWeb – Full Stack MERN Application with Razorpay Integration

## 📖 Description

**PizzaWeb** is a full-stack **MERN (MongoDB, Express.js, React.js, and Node.js)** web application designed to deliver a seamless and secure online pizza ordering experience.  
Users can browse a dynamic pizza menu, customize their selections, manage their cart, and make secure online payments using the **Razorpay Payment Gateway**.

The **frontend** is developed using **React and Vite**, styled with **pure CSS** — no external UI libraries like Tailwind or Bootstrap — ensuring a clean, responsive, and lightweight user interface.  
The **backend** is built using **Node.js and Express.js**, handling authentication, payments, and order management efficiently.  
**MongoDB** serves as the database to store user data, pizza details, and order information.

---

## 🚀 Features

- 🔐 **User Authentication** with JWT (Login & Registration)
- 🍕 **Dynamic Pizza Management** (Add / Edit / Delete)
- 🛒 **Cart and Order Tracking** with Real-Time Updates
- 💳 **Razorpay Payment Integration** for Secure Transactions
- 📱 **Responsive UI** built entirely using custom CSS
- ⚙️ **RESTful API Architecture** with proper validation and error handling
- 🗄️ **MongoDB Database** for storing all user, product, and order data

---

## 🧰 Tech Stack

**Frontend:** React, Vite, CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Payment Gateway:** Razorpay API  
**Authentication:** JWT (JSON Web Token)

---

## 🏗️ Project Setup

### 1️⃣ Navigate to the Project Directory
```bash
cd PizzaWeb
2️⃣ Install Dependencies
For both frontend and backend:

bash
Copy code
cd client
npm install

cd ../server
npm install
3️⃣ Create a .env File in the Server Directory
Add your environment variables:

ini
Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
4️⃣ Run the Application
Start the backend:

bash
Copy code
npm run server
Start the frontend:

bash
Copy code
npm run dev
🧩 Folder Structure
pgsql
Copy code
PizzaWeb/
├── client/                # React Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                # Node.js + Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── .env
├── README.md
└── package.json
🧠 Learning Outcome
PizzaWeb demonstrates a complete e-commerce workflow — from dynamic menu management to secure online payments — highlighting core MERN stack development, RESTful API design, and real-world payment integration skills.
This project showcases practical experience in full-stack development, performance optimization, and deployment readiness.

🧑‍💻 Author
Sumit Dhamane
Full Stack MERN Developer | Software Engineer | Open Source Contributor

🔗 LinkedIn
💻 GitHub

🪪 License
This project is licensed under the MIT License — feel free to use and modify it for learning or development purposes.

⭐ If you like this project, consider giving it a star on GitHub!

yaml
Copy code

---

Would you like me to include a **"🌐 Deployment" section** (showing how to deploy the backend to
