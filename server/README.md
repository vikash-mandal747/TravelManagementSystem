# 🚗 Travel Management System – Backend

This is the backend of the **Travel Management System** built with **Node.js**, **Express**, and **MongoDB**. It provides RESTful APIs for handling users, vehicles, trip management, and admin features like revenue tracking.

---

## 🚀 Features

- ✅ **User Authentication** (Signup/Login) using JWT
- ✅ **Role-Based Access Control**
  - **Customer:** Book trips
  - **Owner:** Add/manage vehicles
  - **Admin:** Access to overall system statistics like revenue
- ✅ **Vehicle Management**
- ✅ **Trip Creation & Booking**
- ✅ **Monthly Revenue Analytics**
- 🛡️ Passwords stored securely using bcrypt
- 📦 Modular folder structure following MVC pattern

---

## 🔧 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT
- **Environment Variables:** dotenv
- **Others:** CORS, bcrypt, Helmet

---

## 📁 Folder Structure

```

server/
├── config/           # DB connection & common configurations
├── controllers/      # Route controller logic
├── middleware/       # Authentication & role-check middleware
├── models/           # Mongoose schemas (User, Vehicle, Trip, etc.)
├── routes/           # Route definitions
├── utils/            # Utility functions
├── server.js          # Entry point
├── .env              # Environment variables (not committed)

````

---

## ⚙️ Installation Instructions

1. **Clone the repository**
```bash
git clone https://github.com/your-username/your-repo-name.git
cd server
````

2. **Install dependencies**

```bash
npm install
```

3. **Add Environment Variables**

Create a `.env` file in the root of the `server` folder with the following:

| Key            | Value                              |
| -------------- | ---------------------------------- |
| PORT           | `<your_port>`                      |
| MONGO_URI     | `<your_mongodb_connection_string>` |
| JWT_SECRETKEY | `<your_jwt_secret_key>`            |
|
---

## 📮 API Endpoints (Summary)

| Route       | Method | Description               | Access     |
| ----------- | ------ | ------------------------- | ---------- |
| `/signup`   | POST   | Register new user         | Public     |
| `/login`    | POST   | Login user                | Public     |
| `/vehicles` | CRUD   | Vehicle management        | Owner only |
| `/trips`    | CRUD   | Trip creation and booking | Mixed      |
| `/revenue`  | GET    | Get monthly revenue data  | Admin only |

---

## ✅ Roles & Permissions

| Role     | Access Description                         |
| -------- | ------------------------------------------ |
| Customer | Can book trips                             |
| Owner    | Can add/manage their vehicles              |
| Admin    | Can view revenue reports and manage system |

---

## 📊 Revenue Report (Admin-only)

Endpoint `/revenue` returns monthly revenue with total earnings and trip count:

```json
[
  {
    "_id": 7,
    "totalRevenue": 2114,
    "count": 2
  }
]
```

---

## 🤝 Contributing

Feel free to fork this repo and make improvements. Pull requests are welcome!

---

## 🛡️ License

MIT License

---

> Made with ❤️ by Vikash Kumar Mandal

```

