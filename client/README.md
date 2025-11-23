# ClipSync

ClipSync (SecondBrain) is a modern, full-stack web application for saving, organizing, and sharing your favorite links, notes, tweets, and YouTube videos.  
Built with React, Tailwind CSS, Express, MongoDB, and JWT authentication.

---

## Features

- **User Authentication** (Sign Up / Sign In)
- **Dashboard** to view and manage your saved content
- **Add Content**: Save YouTube videos, Tweets, links, and notes
- **Responsive UI**: Works on desktop, tablet, and mobile
- **Delete Content**: Remove items from your collection
- **Share**: Easily share your saved content
- **Modern UI**: Built with Tailwind CSS

---

## Getting Started

### 1. **Clone the repository**

```bash
git clone https://github.com/DebakantPradhan/secondBrainFrontend.git
cd secondBrainFrontend
npm install
npm run dev
```

### 2. **Backend Setup**

```bash
git clone https://github.com/DebakantPradhan/secondBrain.git
cd secondBrain
npm install
```

- Create a `.env` file in the backend root:

    ```
    db_username=yourMongoUser
    db_password=yourMongoPassword
    DB_NAME=second-brain
    APP_NAME=SecondBrain
    MONGODB_URL=mongodb+srv://yourMongoUser:yourMongoPassword@cluster0.mongodb.net/second-brain?retryWrites=true&w=majority&appName=SecondBrain
    JWT_SECRET=yourSecret
    ACCESS_TOKEN_EXPIRY=15m
    REFRESH_TOKEN_EXPIRY=7d
    ```

- **Start the backend:**

    ```bash
    npm run dev
    ```

---

### 3. **Frontend Setup**

```bash
cd ../secondBrainFrontend
npm install
```

- Create a `.env` file in the frontend root:

    ```
    VITE_BACKEND_URL=http://localhost:8000
    ```

- **Start the frontend:**

    ```bash
    npm run dev
    ```

---

## 🌐 Deployment

### **Backend**
- Deploy to [Render](https://render.com/) or similar Node.js host.
- Set all environment variables in the Render dashboard (do not upload your `.env` file).
- **Do not set `PORT`**; Render sets it automatically.

### **Frontend**
- Deploy to [Netlify](https://netlify.com/) or [Vercel](https://vercel.com/).
- Set `VITE_BACKEND_URL` in your host's environment variables to your backend's public URL.
- For client-side routing, add a `_redirects` file (Netlify) or `vercel.json` (Vercel):

    **Netlify**:  
    ```
    /*    /index.html   200
    ```

    **Vercel**:
    ```json
    {
      "rewrites": [
        { "source": "/(.*)", "destination": "/" }
      ]
    }
    ```

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
- **Deployment:** Render (backend), Netlify/Vercel (frontend)

---

## Screenshots

### Landing Page
![Landing Page](./public/landing.png)

### Sign In / Sign Up
![Sign In](./public/signin.png)
![Sign Up](./public/signup.png)

### Dashboard
![Dashboard](./public/dashboard.png)

---

