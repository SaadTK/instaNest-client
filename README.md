# 🏨 InstaNest — Hotel Booking Platform  

A full-stack **MERN** hotel booking application where users can explore rooms, filter options, book stays, leave reviews, and manage their bookings with secure authentication.  

🚀 Live Links:  
- **Frontend:** https://instanest-client.netlify.app  
- **Backend API:** https://insta-nest-server-production.up.railway.app  

---

## 📌 Features  

### 👤 Authentication & Security  
- User registration and login (JWT + cookies).  
- Google login support.  
- Protected routes for booking and posting reviews.  

### 🏠 Hotel Rooms  
- View all rooms with pagination.  
- Filter rooms by price, availability, and special offers.  
- View room details with images, amenities, and reviews.  

### 📅 Booking System  
- Date picker for selecting check-in/check-out.  
- Real-time availability updates after booking.  
- Users can view **My Bookings** and cancel if needed.  

### ⭐ Reviews  
- Authenticated users can leave reviews with rating & comment.  
- Reviews sorted by date (latest first).  
- Displays reviewer name, rating, comment, and date.  

### 📱 Responsiveness  
- Fully responsive with **DaisyUI** + Tailwind CSS.  
- Mobile, tablet, and desktop friendly.  

---

## 🛠️ Tech Stack  

### Frontend  
- React + Vite  
- React Router  
- Axios  
- Tailwind CSS + DaisyUI  
- SweetAlert2  

### Backend  
- Node.js + Express.js  
- MongoDB + Mongoose  
- JWT Authentication with HttpOnly cookies  
- bcrypt for password hashing  
- Railway deployment  

---

## 📂 Folder Structure  

```bash
InstaNest/
├── client/         # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Pages (Home, Login, Register, Rooms, etc.)
│   │   ├── context/      # AuthProvider
│   │   └── App.jsx
│   └── ...
└── server/         # Node.js backend
    ├── models/     # Mongoose models
    ├── routes/     # Express routes
    ├── controllers/# Controller logic
    ├── middleware/ # Auth middleware
    └── index.js

⚡ Installation & Setup

Clone the project:

git clone https://github.com/your-username/instaNest.git
cd instaNest

🔹 Backend Setup
cd server
npm install


Create a .env file:

MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret_key
NODE_ENV=development


Run server:

npm run dev

🔹 Frontend Setup
cd client
npm install
npm run dev

✅ Assignment Requirements Covered

 User Authentication (JWT + Google login)

 Rooms CRUD + Filtering

 Booking system with availability check

 Reviews with ratings & sorted display

 Protected routes (only logged in users can book/review)

 Responsive UI with DaisyUI

 Secure deployment with Railway + Netlify

👨‍💻 Author

Tahmid Karim Saad

🌐 Portfolio: https://saadtk.github.io/Saad-React-Portfolio/

💼 LinkedIn: There has been some problem with my LinkedIn account

📧 Email: tahmid.karim.saad@gmail.com

