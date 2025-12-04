# Enterprise Project Management API

[![CI/CD Pipeline](https://github.com/Harish-Ranjith/project-management-api/actions/workflows/ci.yml/badge.svg)](https://github.com/Harish-Ranjith/project-management-api/actions)
[![Docker](https://img.shields.io/badge/Docker-Enabled-blue.svg)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A production-grade, containerized RESTful API designed to simulate a real-world SaaS backend. 

## Overview

This project is not just a task manager; it is a demonstration of **modern backend architecture**. It solves common enterprise challenges like **multi-tenancy** (data isolation), **scalability** (containerization), and **reliability** (automated testing pipelines).

I engineered this system to mimic the backend of tools like Jira or Asana, allowing users to register, securely manage their own projects, and organize tasks via a nested resource structure.

---

## Key Technical Features

### Security First (Zero Trust)
- **JWT Authentication:** Stateless authentication using JSON Web Tokens.
- **Bcrypt Hashing:** Industry-standard salt/hash protection for user passwords.
- **Role-Based Access Control (RBAC):** Custom middleware ensures users can strictly access *only* their own data.
- **Input Validation:** Strict type checking to prevent injection attacks.

### Architecture & Design
- **RESTful Best Practices:** Semantic HTTP methods, status codes, and nested routing (`/projects/:id/tasks`).
- **MVC Pattern:** Clean separation of concerns (Models, Controllers, Routes) for maintainability.
- **Multi-Tenancy:** Logical data isolation ensures User A never sees User B's projects.

### DevOps & Automation
- **Dockerized Environment:** The entire stack (Node.js API + MongoDB) is containerized via `docker-compose`, guaranteeing that "it works on my machine" means it works everywhere.
- **CI/CD Pipeline:** A GitHub Actions workflow automatically spins up a MongoDB service and runs integration tests on every push, ensuring code quality.
- **Interactive Documentation:** Fully documented using **OpenAPI/Swagger** standards.

---

## Tech Stack

| Category | Technologies |
|----------|--------------|
| **Runtime** | Node.js (v18), Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **DevOps** | Docker, Docker Compose, GitHub Actions |
| **Testing** | Jest, Supertest (Integration Testing) |
| **Docs** | Swagger UI, OpenAPI 3.0 |

---

## Getting Started

You can run this project in two ways: using Docker (Recommended) or Manually.

### Prerequisites
- Docker Desktop (for Docker method)
- Node.js v18+ (for Manual method)

### Option 1: The Docker Way (Fastest)

1. **Clone the repository**
   ```
   git clone https://github.com/Harish-Ranjith/project-management-api.git
   cd project-management-api
   ```
2. **Start the services**
   ```
   docker-compose up --build
   ```
3. **Access the documentation**
   ```
   http://localhost:5000
    ```

---

## Testing
  This project relies on Integration Testing to verify that the API endpoints, database, and authentication logic work together correctly.
  To run the test suite:
  ```Bash
  # If running locally (ensure local MongoDB is up)
  npm test
  # The CI Pipeline runs these tests automatically on every GitHub push.
  ```

---

## API Documentation
  I believe good code documents itself, but great code has a manual.
  Visit /api-docs on your running server to interact with the API endpoints directly from your browser.
