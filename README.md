# My Project

Welcome to the **Chamber Management** repository! This project is organized into two main parts:

1. **Frontend** - A Vite-based frontend application
2. **Backend** - A Node.js backend server

## Table of Contents

- [Project Overview](#project-overview)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)

## Project Overview

**Chamber Management** is a full-stack application that demonstrates the use of Vite for the frontend and Node.js for the backend. This setup allows for a modern and fast development experience with an efficient build process and a robust backend server.

## Frontend Setup

The frontend is built using [Vite](https://vitejs.dev/), a modern build tool that provides a fast development experience.

### Requirements

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://classic.yarnpkg.com/) (for package management)

### Installation
####*
1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```
3. Change settings in App.jsx and VoiceAssistant.jsx on Pages > Home directory:
     ```
     axios.defaults.baseURL = (To your backend localhost PORT/remote on App.jsx)
     await axios.post(voice assistant PORT on loalhost/remote on VoiceAssistant.jsx) 
     ```

   

### Development

To start the Vite development server, run:

```bash
npm run dev
```

## Backend Setup

The backend of **My Project** is built using [Node.js](https://nodejs.org/) and may utilize frameworks like [Express](https://expressjs.com/) for building APIs.

### Requirements

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://classic.yarnpkg.com/) (for package management)

###Installation

1. **Navigate to the `backend` directory:**

    ```bash
    cd backend
    ```

2. **Install the dependencies:**

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

### Development

To start the Node.js server in development mode, run:

```bash
npm start
```
