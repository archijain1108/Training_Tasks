# TaskFlowLite

## Project Overview

TaskFlowLite is a full-stack task management application. Authenticated users can create, view, update, and delete their own tasks through a React dashboard. Tasks are displayed in a three-column Kanban board grouped by `pending`, `in-progress`, and `completed` status.

The frontend provides registration, login, logout, task forms, task cards, loading states, and protected dashboard navigation. The backend exposes an Express API, validates request bodies, persists users and tasks with Sequelize, and restricts task queries and mutations to the authenticated user.

## Features

- User registration with unique username and email checks.
- User login and logout.
- JWT authentication stored in an HTTP-only `token` cookie.
- Protected profile lookup through `GET /api/auth/getMe`.
- Password hashing with `bcryptjs` before a user is created.
- Per-user task ownership checks on task reads and mutations.
- Create, read, update, and delete task operations.
- Separate task-status update endpoint for Kanban status changes.
- Task statuses: `pending`, `in-progress`, and `completed`.
- Task priorities: `low`, `medium`, and `high`.
- Future due-date validation on the frontend and backend.
- Request-body validation with Yup in the frontend and AJV in the backend.
- Centralized Express error middleware for unhandled server errors.
- Responsive React dashboard with Kanban columns, task counts, edit actions, and delete actions.

## Tech Stack

| Area | Technologies |
| --- | --- |
| Frontend | React 19, Vite, React Router, Tailwind CSS 4 |
| Frontend forms and validation | React Hook Form, `@hookform/resolvers`, Yup |
| Frontend API client | Axios |
| Backend | Node.js, Express 5, ES modules |
| Database | PostgreSQL |
| ORM and migrations | Sequelize 6, Sequelize CLI |
| Backend validation | AJV, `ajv-formats`, custom `futureDate` keyword |
| Authentication and security | JSON Web Tokens, HTTP-only cookies, `bcryptjs`, `cookie-parser`, CORS |
| Backend middleware and utilities | Morgan, `dotenv` |
| Deployment | No deployment configuration is included in the repository |

## Project Architecture / Folder Structure

```text
TaskFlowLite/
├── Backend/
│   ├── server.js                    # Loads environment variables and starts Express
│   ├── package.json                 # Backend scripts and dependencies
│   ├── .sequelizerc                 # Sequelize CLI paths
│   ├── src/
│   │   ├── app.js                   # Express app, middleware, and route mounting
│   │   ├── config/config.js         # PostgreSQL Sequelize configuration
│   │   ├── controllers/
│   │   │   ├── auth.controllers.js  # Registration, login, logout, and current user
│   │   │   └── task.controllers.js  # Task CRUD and status updates
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js   # JWT cookie verification
│   │   │   ├── errorHandler.js      # 500 error response middleware
│   │   │   └── validate.js          # AJV request validation middleware
│   │   ├── migrations/               # Users and tasks table migrations
│   │   ├── models/
│   │   │   ├── index.js             # Sequelize initialization and model loading
│   │   │   ├── user.js               # User model and password hooks
│   │   │   └── task.js               # Task model
│   │   ├── routes/                   # Authentication and task routes
│   │   └── validators/               # AJV schemas for auth and tasks
│   └── utils/ajv.js                 # AJV instance and date keyword
├── Frontend/
│   ├── package.json                 # Frontend scripts and dependencies
│   ├── vite.config.js               # Vite, React, and Tailwind plugins
│   └── src/
│       ├── App.jsx                  # Router and application routes
│       ├── main.jsx                 # React providers and BrowserRouter setup
│       ├── common/loading/           # Loading indicator
│       ├── components/auth/          # Login and registration UI, hooks, schemas
│       ├── components/dashboard/     # Dashboard, Kanban, task cards, and forms
│       ├── services/                 # Axios API wrappers by HTTP operation
│       └── store/                    # AuthContext and TaskContext state
└── readme.md
```

## Application Flow

1. The React app starts in `Frontend/src/main.jsx`, creating a `BrowserRouter` and wrapping the application with authentication and task contexts.
2. `App.jsx` calls the current-user endpoint on startup and routes users to the login page when no authenticated user is available.
3. Forms use React Hook Form with Yup schemas, then call Axios service functions from `Frontend/src/services`.
4. Axios sends requests to the configured `VITE_BACKEND_URL` with credentials enabled so the `token` cookie is included.
5. Express mounts authentication routes under `/api/auth` and task routes under `/api/tasks`.
6. Protected routes run the JWT cookie middleware, then controllers query or mutate PostgreSQL through Sequelize models.
7. The response updates `AuthContext` or `TaskContext`, and the dashboard renders the current user and tasks.

## API Documentation

The API is mounted by the backend application. Authentication is cookie-based; protected requests require the JWT `token` cookie.

### Authentication endpoints

| Method | Endpoint | Purpose | Auth | Body |
| --- | --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Create a user and set the auth cookie | Public | `{ username, email, password }` |
| `POST` | `/api/auth/login` | Authenticate a user and set the auth cookie | Public | `{ email, password }` |
| `POST` | `/api/auth/logout` | Clear the auth cookie | Required | None |
| `GET` | `/api/auth/getMe` | Return the authenticated user without the password | Required | None |

Successful registration returns `201` with a message and public user fields. Successful login, logout, and profile lookup return `200`. Registration conflicts and invalid credentials return `400`; a missing token returns `404`; an invalid token returns `401`; a missing user in the profile lookup returns `404`.

### Task endpoints

| Method | Endpoint | Purpose | Auth | Body or parameters |
| --- | --- | --- | --- | --- |
| `GET` | `/api/tasks` | List tasks owned by the current user | Required | None |
| `POST` | `/api/tasks` | Create a task for the current user | Required | `{ title, description, priority, dueDate }` |
| `GET` | `/api/tasks/:taskId` | Get one task owned by the current user | Required | `taskId` path parameter |
| `PATCH` | `/api/tasks/:taskId` | Update task fields | Required | Any of `title`, `description`, `status`, `priority`, `dueDate`; at least one is required by the schema |
| `DELETE` | `/api/tasks/:taskId` | Delete a task owned by the current user | Required | `taskId` path parameter |
| `PATCH` | `/api/tasks/:taskId/status` | Update only a task's status | Required | `{ status }` |

Task responses use a message plus a `task`, `tasks`, or `updatedStatus` property depending on the operation. Task creation defaults status to `pending` and priority to `medium` at the model level. Validation failures return `400` with an `errors` array. Unhandled backend errors are passed to the error middleware and return `500` with an `Internal Server Error` message.

## Database

The configured development database is PostgreSQL, accessed through Sequelize. Run migrations in dependency order: users first, then tasks.

### `users` table / `User` model

- `id`: auto-incrementing integer primary key.
- `username`: required and unique string.
- `email`: required, unique, and email-formatted string.
- `password`: required string; the model hashes it before creation.
- Sequelize `createdAt` and `updatedAt` timestamps.

### `tasks` table / `Task` model

- `id`: auto-incrementing integer primary key.
- `userId`: required foreign key to `users.id`.
- `title`: required string.
- `description`: text field.
- `status`: required enum: `pending`, `in-progress`, or `completed`.
- `priority`: required enum: `low`, `medium`, or `high`.
- `dueDate`: required date/date-only value.
- Sequelize `createdAt` and `updatedAt` timestamps.

`User.hasMany(Task)` and `Task.belongsTo(User)` use `userId`. The database foreign key cascades updates and deletes from a user to that user's tasks.

## Authentication & Authorization

Registration and login sign a JWT containing the user ID with `JWT_SECRET` and set it in an HTTP-only `token` cookie. The cookie is marked `secure` when `NODE_ENV` is `production` and uses `sameSite: strict`. Logout clears the cookie.

The authentication middleware reads and verifies the cookie, then places the decoded user ID on `req.user`. All task endpoints are protected. Task queries include both the task ID and `req.user.id`, so users can only read, change, or delete tasks belonging to their account.

## Validation & Error Handling

- Frontend authentication and task forms use Yup through React Hook Form.
- Backend authentication and task request bodies use AJV with `ajv-formats`.
- Registration requires `username`, `email`, and a 4-8 character password. Login requires a valid email and a 4-8 character password.
- Task titles are 3-100 characters in the backend schema, descriptions are 6-100 characters, priorities and statuses are restricted to their enum values, and due dates must be future dates.
- The backend validation middleware returns `400` and formats AJV errors as an `errors` array.
- Express uses `errorHandler` after the routes for unhandled errors and returns `500`.
- The frontend displays form and API error messages through React Hook Form errors.

## Environment Variables

Create `Backend/.env` for backend variables and `Frontend/.env` for the Vite variable. The repository ignores backend `.env` files.

### Backend

```text
PORT
CLIENT_URL
DB_USERNAME
DB_PASSWORD
DB_NAME
DB_HOST
DB_PORT
JWT_SECRET
NODE_ENV
```

`CLIENT_URL` defaults to `http://localhost:5173`, and `NODE_ENV` defaults to `development` when not set. `JWT_SECRET` and the database connection variables are used by the running backend.

### Frontend

```text
VITE_BACKEND_URL
```

Set `VITE_BACKEND_URL` to the backend API base URL used by Axios.

## Installation & Setup

### Prerequisites

- Node.js and npm.
- A running PostgreSQL database.

### Install dependencies

From the project root:

```bash
cd Backend
npm install

cd ../Frontend
npm install
```

### Configure the environment

Create the environment files described above. Set the PostgreSQL connection values, a JWT secret, the backend port, and the frontend API base URL.

### Create database tables

From `Backend/`, run the Sequelize migrations:

```bash
npx sequelize-cli db:migrate
```

### Run the backend

From `Backend/`:

```bash
npm run dev
```

The backend listens on the value of `PORT`.

### Run the frontend

From `Frontend/`:

```bash
npm run dev
```

Vite serves the frontend using its configured development server. The backend CORS configuration defaults to `http://localhost:5173`.

## Available Scripts

### Backend

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start `server.js` with Nodemon |
| `npm test` | Exits with a placeholder “no test specified” error |

The backend has no `start` script.

### Frontend

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production Vite build |
| `npm run lint` | Run ESLint across the frontend |
| `npm run preview` | Preview the Vite build locally |

## Development Workflow

Run the backend and frontend development servers in separate terminals. The frontend reads `VITE_BACKEND_URL` and sends Axios requests with credentials enabled. The backend allows the configured `CLIENT_URL`, parses JSON and cookies, logs requests with Morgan, validates protected requests, and uses Sequelize to access PostgreSQL.

Typical development commands are:

```bash
# Terminal 1
cd Backend
npm run dev

# Terminal 2
cd Frontend
npm run dev

# Backend migration command
cd Backend
npx sequelize-cli db:migrate

# Frontend checks
cd Frontend
npm run lint
npm run build
```

## Deployment

No deployment platform, container, hosting configuration, CI workflow, or production start command is included in the repository. Deployment would therefore require configuring the Node backend, built Vite frontend, PostgreSQL database, environment variables, and cookie/CORS settings for the target environment.

## Future Improvements

The following are potential improvements based on the current implementation and are not currently implemented:

- Add automated backend and frontend tests.
- Add a production backend start script and deployment configuration.
- Add migrations for any future schema changes and seed data if needed.
- Add pagination, filtering, or search for larger task lists.
- Add confirmation and user feedback around task deletion and API failures.
- Add a dedicated route guard instead of navigating during dashboard render.
- Align frontend and backend task validation limits and response handling.
- Add stronger production cookie settings and a documented secret-management process.
