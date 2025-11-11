# 🧾 PDF Annotation App

A full-stack **PDF annotation platform** that allows users to **highlight**, **comment**, and **manage annotations** with **role-based visibility and permissions**.  
Built using the **MERN stack** and deployed on **Render (Backend)** and **Netlify (Frontend)**.

---

## 🚀 Live Demo

🌐 **Frontend (Netlify):** [https://https://pdfannotaionapp.netlify.app/](https://pdfannotaionapp.netlify.app/)  
🖥️ **Backend (Render):** [https://pdf-annotation-app-izx1.onrender.com](https://pdf-annotation-app-izx1.onrender.com)

> 🟢 The deployed app will remain active until **16th November 2025**.

---

## 🗂️ Folder Structure

**Project Root:**

    Pdf_annotation_App/
    ├── backend/
    │ ├── models/
    │ │ └── Annotation.js # Mongoose schema for annotations
    │ ├── routes/
    │ │ └── annotationRoutes.js # Annotation API routes
    │ ├── controllers/
    │ │ └── annotationController.js # Annotation logic
    │ ├── server.js # Express server entry
    │ ├── package.json
    │ └── .env # Environment variables (not committed)
    │
    ├── pdf-annotation-ui/
    │ ├── src/
    │ │ ├── Api/
    │ │ │ └── Api.js # Axios API methods
    │ │ ├── Components/
    │ │ │ ├── PDFAnnotator.jsx # PDF annotation logic (frontend)
    │ │ │ ├── Sidebar.jsx # Sidebar UI
    │ │ └── Pages/
    │ │ └── Dashboard.jsx # Main dashboard layout
    │ │ ├── App.jsx
    │ ├── public/
    │ ├── package.json
    │ └── vite.config.js
    │
    └── README.md

---

## ⚙️ Project Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ajay0175/pdf-annotation-app.git
cd pdf-annotation-app
```

### 2️⃣ Backend Setup
```
cd backend
npm install
```
Create a ``.env`` file inside the ``backend/`` directory:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run the backend:
```
npm start
```
Backend runs at → ``http://localhost:5000``

### 3️⃣ Frontend Setup
```
cd ../pdf-annotation-ui
npm install
```
Run the frontend:
```
npm run dev
```

Frontend runs at → ``http://localhost:5173``

---
| Layer               | Technology                                  |
| ------------------- | ------------------------------------------- |
| **Frontend**        | React (Vite), TailwindCSS, React PDF Viewer |
| **Backend**         | Node.js, Express.js                         |
| **Database**        | MongoDB, Mongoose                           |
| **Hosting**         | Frontend → Netlify, Backend → Render        |
| **Version Control** | Git & GitHub                                |

---
### 🔗 API Endpoints
Base URL
```https://pdf-annotation-app-izx1.onrender.com/api/annotations```

| Method     | Endpoint                       | Description                               |
| ---------- | ------------------------------ | ----------------------------------------- |
| **GET**    | `/api/annotations/:documentId` | Fetch annotations for a PDF               |
| **POST**   | `/api/annotations/add`         | Add a new annotation                      |
| **DELETE** | `/api/annotations/:id`         | Delete annotation (Admin or creator only) |

---
### ✏️ Annotation Logic

1. Users can highlight and comment directly on PDF text or regions.
2. Each annotation includes:
   *  Coordinates (`x`, `y`, `width`, `height`, `page`)
   *  Comment, user, and timestamp
   *  Visibility roles: ``["A1", "D1", "D2", "R1"]``

3. Role-based Permissions:
   * `A1` → Admin (can delete any)
   * `D1`, `D2` → Can create & view annotations
   * `R1` → Read-only (view only)

4. Hovering an annotation shows:
   * Creator name
   * Date & time of creation

5. Admins and annotation creators can delete highlights.

---
### 🌍 Deployment Details
| Component    | Platform | URL                                                                                          |
| ------------ | -------- | -------------------------------------------------------------------------------------------- |
| **Backend**  | Render   | [https://pdf-annotation-app-izx1.onrender.com](https://pdf-annotation-app-izx1.onrender.com) |
| **Frontend** | Netlify  | [https://pdfannotaionapp.netlify.app/](https://pdfannotaionapp.netlify.app/)                                                   |
