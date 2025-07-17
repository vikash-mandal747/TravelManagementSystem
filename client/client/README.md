# Travel Management System — Frontend

This is the **frontend** of the Travel Management System built using **React** and **Tailwind CSS**. It serves as the user interface for customers, vehicle owners, and admins to interact with the backend APIs.

---

## 🔧 Features

- 🔐 Secure Login & Signup (JWT-based authentication)
- 🧑‍💼 Role-Based Dashboards:
  - Customer: Book trips
  - Owner: Manage vehicles and trips
  - Admin: View analytics like monthly revenue
- 📦 Modular and scalable code structure
- 🎨 Tailwind CSS for responsive UI
- 🔄 API integration with backend (Node.js + MongoDB)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <https://github.com/vikash-mandal747/TravelManagementSystem.git>
cd client
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file in `client/` directory and add the following:

```
VITE_API_URL=http://localhost:3000
```

Make sure this URL matches your backend server URL.

### 4. Run the frontend

```bash
npm run dev
```

---

## 🗂️ Folder Structure

```
client/
├── src/
│   ├── auth/         # AuthProvider and authentication hooks
│   ├── pages/        # Page components (Login, Signup, Dashboard, Revenue, etc.)
│   ├── components/   # Shared components (Forms, Cards, UI)
│   ├── App.jsx       # Root App component
│   ├── main.jsx      # Entry point
│   └── ...
├── public/
├── tailwind.config.js
├── index.html
└── ...
```

---

## 📸 Screenshots

> Add screenshots of the Dashboard, Revenue Panel, etc. here (optional)

---

## 📬 API Integration

This frontend interacts with the backend APIs at:

```
http://localhost:5000/api/
```

Make sure to run the backend before starting the frontend. Refer to the [backend README](../server/README.md) for details.

---

## 🛡️ Tech Stack

* React.js
* React Router
* Tailwind CSS
* Axios
* Vite

---

## 👤 Author

Developed by **Vikash Kumar Mandal**

---

## 📄 License

This project is licensed under the MIT License.

