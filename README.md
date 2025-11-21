📒 MERN Notes App

A simple and secure Notes Application built using the MERN Stack (MongoDB, Express, React, Node.js).
Users can register, log in, and manage personal notes with authentication using JWT.

🚀 Features

User Authentication (JWT Protected APIs)

Create ✍, Read 📖, Update ✏, Delete 🗑 Notes

Secure Routing – Only logged-in users can access Dashboard

Clean and Simple UI using Tailwind CSS

🛠 Tech Stack
Layer	Technology
Frontend	React, Tailwind CSS, Axios
Backend	Node.js, Express.js
Database	MongoDB, Mongoose
Auth	JSON Web Token (JWT), bcrypt
📌 Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/harshitbamal/notes-app-mern.git
cd notes-app-mern

2️⃣ Setup Backend
cd server
npm install


Create .env file in backend:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Start server:

npm start

3️⃣ Setup Frontend
cd ../client
npm install
npm run dev


📌 Future Improvements

Add search and filter for notes

Archive notes feature

Profile settings for users

Dark Mode 🌙

👨‍💻 Developer

Harshit Bamal
