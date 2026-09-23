# 🌍 LandLens AI

**LandLens AI** is an AI-powered land research and policy intelligence platform designed to make land-related information easier to access, understand, and analyze.

The project is being developed incrementally, with the initial stages focused on building a responsive authentication interface and a secure backend foundation.

---

## 🚀 Project Status

**Current Progress: Day 3 completed**

| Day    | Work Completed                                                           | Status |
| ------ | ------------------------------------------------------------------------ | ------ |
| Day 1  | Project initialization, React frontend, FastAPI backend, health endpoint | ✅      |
| Day 2  | Responsive authentication UI                                             | ✅      |
| Day 3  | Backend authentication, database models, JWT authentication, API tests   | ✅      |
| Day 4+ | Land research and AI intelligence features                               | 🔜     |

---

## 🎯 Current Features

### Frontend

* Responsive LandLens authentication interface
* Login and registration UI
* React-based frontend
* Modern responsive design
* Frontend connected to the project architecture

### Backend

* FastAPI REST API
* Health-check endpoint
* User registration
* User login
* Password hashing
* JWT access-token generation
* Role-based user foundation
* SQLAlchemy database integration
* Authentication validation
* Duplicate-email protection
* Authentication test suite

---

## 🏗️ Project Architecture

```text
                    ┌──────────────────────┐
                    │      User            │
                    │  Web Browser         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      Frontend        │
                    │   React Application   │
                    └──────────┬───────────┘
                               │
                         HTTP / API
                               │
                               ▼
                    ┌──────────────────────┐
                    │       FastAPI        │
                    │      Backend API     │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
       Authentication       Database       Future AI Services
       JWT + Password       SQLAlchemy      Land Intelligence
       Hashing              + Models        + Research
```

---

## 📁 Project Structure

```text
landlens-ai/
│
├── backend/
│   ├── .env.example
│   ├── auth_utils.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── requirements.txt
│   ├── schemas.py
│   ├── test_auth.py
│   │
│   └── routers/
│       ├── __init__.py
│       └── auth.py
│
├── frontend/
│   └── ...
│
├── .gitignore
└── README.md
```

---

# 🛠️ Technology Stack

## Frontend

* React
* Vite
* JavaScript / JSX
* CSS
* Responsive UI

## Backend

* Python
* FastAPI
* Uvicorn
* SQLAlchemy
* Pydantic
* Python-JOSE
* bcrypt
* python-dotenv

## Database

* SQLAlchemy ORM
* SQLite for the current development setup

## Testing

* Pytest
* FastAPI TestClient

## Development Tools

* Git
* GitHub
* PowerShell
* VS Code

---

# 🔐 Authentication System

The Day 3 backend introduces the initial authentication system.

## Registration

Users can create an account using:

```text
Full Name
Email
Password
Role
```

The password is never stored as plain text.

Instead:

```text
Password
   ↓
bcrypt hashing
   ↓
Hashed password
   ↓
Database
```

---

## Login

During login:

```text
Email + Password
       ↓
Find user
       ↓
Verify password
       ↓
Generate JWT
       ↓
Return access token
```

Invalid credentials return a generic:

```text
Invalid email or password
```

This avoids revealing whether a particular email exists.

---

# 🔑 JWT Authentication

After successful login, the backend creates an access token containing information such as:

```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "role": "user"
}
```

The token can later be used to authenticate protected API endpoints.

---

# 👥 User Roles

The authentication foundation supports user roles.

The role system is designed so that additional permissions can be added as the project grows.

Example:

```text
User
 ├── Regular User
 ├── Researcher
 └── Admin
```

The exact role permissions will be expanded in later development stages.

---

# 📡 API Endpoints

## Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "ok",
  "service": "LandLens AI API"
}
```

---

## Register

```http
POST /auth/register
```

Example request:

```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

---

## Login

```http
POST /auth/login
```

Example request:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Successful authentication returns a JWT access token.

---

# 🧪 Testing

Day 3 includes automated authentication tests.

Run the tests from the `backend` directory:

```powershell
cd backend
python -m pytest test_auth.py -v
```

Current test coverage:

```text
test_register_success                 PASSED
test_duplicate_email_registration     PASSED
test_login_success                    PASSED
test_login_wrong_password             PASSED
test_login_nonexistent_email          PASSED
```

### Current Result

```text
5 passed
```

✅ All authentication tests are currently passing.

---

# ⚙️ Local Setup

## 1. Clone the repository

```powershell
git clone https://github.com/TDMNQS/landlens-ai.git
```

Move into the project:

```powershell
cd landlens-ai
```

---

# 🐍 Backend Setup

Move into the backend:

```powershell
cd backend
```

Create a virtual environment:

```powershell
python -m venv .venv
```

Activate it:

### Windows PowerShell

```powershell
.\.venv\Scripts\Activate.ps1
```

Install dependencies:

```powershell
python -m pip install -r requirements.txt
```

---

## 🔐 Environment Variables

Create a local `.env` file based on:

```text
.env.example
```

Example:

```text
DATABASE_URL=sqlite:///./landlens.db
SECRET_KEY=your-secret-key
```

> Never commit your real `.env` file or secret keys to GitHub.

---

# ▶️ Run the Backend

From the `backend` directory:

```powershell
python -m uvicorn main:app --reload
```

The API will normally be available at:

```text
http://127.0.0.1:8000
```

Health check:

```text
http://127.0.0.1:8000/health
```

---

# 📚 API Documentation

FastAPI automatically provides interactive API documentation.

After starting the backend, open:

```text
http://127.0.0.1:8000/docs
```

You can test endpoints such as:

```text
GET  /health
POST /auth/register
POST /auth/login
```

---

# 🖥️ Frontend Setup

Open another PowerShell terminal and move into the frontend:

```powershell
cd frontend
```

Install dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

Vite will display the local frontend URL in the terminal.

---

# 🔄 Current Authentication Flow

```text
                User
                 │
                 ▼
        ┌─────────────────┐
        │ React Frontend  │
        └────────┬────────┘
                 │
                 │ POST /auth/register
                 ▼
        ┌─────────────────┐
        │    FastAPI      │
        │ Authentication  │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ Password Hash   │
        │    bcrypt       │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │    Database     │
        │    SQLAlchemy   │
        └─────────────────┘


Login:

User
 │
 ▼
Email + Password
 │
 ▼
FastAPI
 │
 ▼
Password Verification
 │
 ▼
JWT Access Token
 │
 ▼
Authenticated User
```

---

# 🧩 Day 1

### Completed

* Initialized LandLens AI repository
* Created React frontend
* Created FastAPI backend
* Added backend health endpoint
* Established frontend/backend project structure
* Added initial Git configuration

Health endpoint:

```http
GET /health
```

---

# 🎨 Day 2

### Completed

* Built responsive authentication UI
* Created login interface
* Created registration interface
* Improved responsive design
* Connected the project to the backend architecture
* Prepared frontend for authentication APIs

---

# 🔐 Day 3

### Completed

* Added SQLAlchemy database configuration
* Added user database model
* Added role model
* Added Pydantic schemas
* Added password hashing
* Added JWT authentication
* Added registration endpoint
* Added login endpoint
* Added duplicate-email validation
* Added invalid-login protection
* Added authentication router
* Added automated authentication tests
* Verified **5/5 tests passing**

---

# 🔒 Security Notes

The current development implementation includes:

* Password hashing using bcrypt
* JWT-based authentication
* Generic invalid-login error
* Duplicate-email validation
* Environment-based configuration
* `.env` excluded from version control

Before production deployment, additional security hardening will be required, including:

* Strong production secret management
* Restricted CORS origins
* Token expiration and refresh strategy
* Rate limiting
* HTTPS
* Production database configuration
* More granular authorization
* Security headers
* Input validation and monitoring

---

# 🚧 Future Development

The authentication foundation is only the beginning of LandLens AI.

Planned development includes:

### Day 4+

* Protected routes
* Current-user authentication
* Frontend login integration
* Frontend registration integration
* Authentication state management

### Land Intelligence

* Land information search
* Property/land research
* Location-based information
* Land records and document analysis
* Policy and regulation research

### AI Features

* AI-powered land research
* Natural-language questions
* Document understanding
* Intelligent search
* Policy analysis
* AI-generated research summaries

### Platform

* User dashboard
* Saved research
* Search history
* Document uploads
* Role-based permissions
* Production deployment

---

# 📈 Development Roadmap

```text
Day 1
 │
 ├── Project Setup
 ├── React Frontend
 └── FastAPI Backend
        │
        ▼
Day 2
 │
 ├── Authentication UI
 └── Responsive Design
        │
        ▼
Day 3
 │
 ├── Database
 ├── User Models
 ├── Password Hashing
 ├── JWT Authentication
 └── Automated Tests
        │
        ▼
Day 4+
 │
 ├── Protected APIs
 ├── Frontend Authentication
 ├── Land Research
 ├── AI Intelligence
 └── Production Features
```

---

# 🧪 Current Quality Check

| Check                             | Result |
| --------------------------------- | ------ |
| Backend imports                   | ✅      |
| User registration                 | ✅      |
| Duplicate registration protection | ✅      |
| User login                        | ✅      |
| Wrong password handling           | ✅      |
| Non-existent user handling        | ✅      |
| Automated tests                   | ✅ 5/5  |
| Git commit                        | ✅      |
| GitHub push                       | ✅      |

---

# 👨‍💻 Development

LandLens AI is being developed incrementally, with each development day adding a new layer to the platform.

The current focus is establishing a reliable foundation before implementing the AI-powered land intelligence features.

---

## 📄 License

License information will be added as the project moves toward release.

---

## ⭐ Project

**LandLens AI**

> AI-powered land research and policy intelligence platform.

GitHub:

https://github.com/TDMNQS/landlens-ai
