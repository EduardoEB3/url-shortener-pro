# URL Shortener Pro

A robust, fast and scalable URL shortener API built with Node.js, Express, TypeScript, MongoDB and Redis.

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5)
- **Language**: TypeScript (running via `tsx`)
- **Database**: MongoDB (with Mongoose)
- **Caching**: Redis
- **ID Generation**: nanoid
- **Infrastructure**: Docker & Docker Compose
- **Testing**: Node.js Native Test Runner (`tsx --test`) & Supertest

## 📦 Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v22+ recommended for native test runner features)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

## 🛠️ Installation & Setup

1. **Clone the repository** (if you haven't already):

   ```bash
   git clone <repository-url>
   cd url-shortener-pro
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root of the project. Make sure to define the necessary variables (e.g., MongoDB URI, Redis URL, Port). Example:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/url-shortener
   REDIS_URL=redis://localhost:6379
   ```

4. **Start Infrastructure (MongoDB & Redis)**:
   You can easily spin up the required databases using Docker Compose:

   ```bash
   npm run docker:run
   ```

5. **Run the Application**:
   - For development (with watch mode):
     ```bash
     npm run dev
     ```
   - For production/standard start:
     ```bash
     npm start
     ```

## 📜 Available Scripts

- `npm run dev`: Starts the server in development mode using `tsx watch` with environment variables from `.env`.
- `npm start`: Starts the application using `tsx` with environment variables from `.env`.
- `npm run docker:run`: Starts MongoDB and Redis containers in the background (`docker-compose up -d`).
- `npm test`: Runs integration and unit tests using the native Node.js test runner.
- `npm run test:watch`: Runs tests in watch mode.

## 📂 Project Structure

```text
src/
├── app.ts                 # Express App setup and configuration
├── server.ts              # Server entry point
├── config/                # Configuration files (Database, Redis, etc.)
├── controllers/           # Route handlers / Logic
├── middlewares/           # Custom Express middlewares
├── models/                # Mongoose Database Models
├── routes/                # API Route definitions
├── services/              # Business logic layer
└── shared/
    └── interfaces/        # TypeScript interfaces and types

tests/
├── integration/           # API integration tests
└── unit/                  # Unit tests for services and utils
```

## 📝 License

This project is licensed under the MIT License.
