# TALKIFFY with Vite

This is a simple MERN (MongoDB, Express, React, Node.js) application set up with Vite as the frontend build tool. The project is split into two main folders:

- `frontend` - The React application powered by Vite
- `backend` - The Express.js backend with MongoDB integration

## Prerequisites

Before running this app, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (either running locally or using a cloud service like MongoDB Atlas)

## Project Setup

### 1. Clone the repository

Clone the repository to your local machine:

### 2. Set up the Backend (Express)

Navigate to the backend folder and install the necessary dependencies:

cd backend
npm install
npm run dev

need to install nodemon for development purposes

### 3. Set up the Frontend (React with Vite)

Navigate to the frontend folder and install the necessary dependencies:

cd frontend
npm install
npm run dev

### 4. Environment Variables

Create a .env file in the backend folder and set these variables:

MONGODB_URI= your URI
PASSWORD= your password
PORT=5001
JWT_COOKIE_EXPIRES_IN=7
JWT_SECRET= your password
JWT_EXPIRES_IN=7d
NODE_ENV=development

# folder structure

TALKIFFY/
│
├── backend/ # Express backend
│ ├── avatars/ # user's avatars
│ ├── controllers/ # Route controllers
│ ├── lib/ # usefull modules
│ ├── models/ # MongoDB models
│ ├── routes/ # API routes
│ ├── .env # Backend environment variables
│ └── server.js # Express server setup
│
└── frontend/ # React frontend with Vite
│ ├── src/ # React app source code
│ ├── index.html # Main HTML template
│ ├── package.json # Frontend dependencies
│ └── vite.config.js # Vite configuration
│ └── postcss.config.js # css config
│ └── tailwind.config.js # tailwind config
│ └── eslint.config.js # eslint config

### NOTES

Make sure MongoDB is running locally or use a cloud database like MongoDB Atlas.
Vite's hot module replacement (HMR) works well for a smooth development experience on the frontend.
You can extend the app by adding more features like group chats, voice and video calls, adding more settings and optimizing UI/UX
