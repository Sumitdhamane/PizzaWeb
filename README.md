# 🍕 PizzaWeb – Full Stack MERN Application with Razorpay Integration

## 📖 Description

**PizzaWeb** is a full-stack MERN (MongoDB, Express.js, React.js, and Node.js) web application designed to deliver a seamless and secure online pizza ordering experience.  
Users can browse a dynamic pizza menu, customize their selections, manage their cart, and make secure online payments using the **Razorpay Payment Gateway**.

The frontend is developed using **React and Vite**, with **pure CSS styling** — no external UI libraries like Tailwind or Bootstrap — ensuring a clean, responsive, and lightweight user interface.  
The backend is built using **Node.js and Express.js**, handling authentication, payments, and order management efficiently.  
**MongoDB** is used as the database to store user data, pizza details, and order information.

---

## 🚀 Features

- 🔐 **User Authentication** with JWT (Login & Registration)
- 🍕 **Dynamic Pizza Management** (Add/Edit/Delete)
- 🛒 **Cart and Order Tracking** with Real-Time Updates
- 💳 **Razorpay Payment Integration** for Secure Transactions
- 📱 **Responsive Design** built entirely using CSS
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

2. Navigate to the Project Directory
cd PizzaWeb

3. Install Dependencies

For both frontend and backend:

cd client
npm install

cd ../server
npm install

4. Create a .env File in the Server Directory

Add your environment variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

5. Run the Application

Start the backend:

npm run server


Start the frontend:

npm run dev

🧩 Folder Structure
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
LinkedIn
 | GitHub

 
---

Would you like me to include **deployment instructions** (for example, hosting frontend on Vercel and backend on Render or Railway)?  
I can also add a **live demo section** if you plan to deploy it.

## 🏗️
