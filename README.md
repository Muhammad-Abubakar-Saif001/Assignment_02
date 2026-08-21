# 🚀 User Management REST API & CI Pipeline

[![Node.js CI Workflow](https://github.com/Muhammad-Abubakar-Saif001/Assignment_02/actions/workflows/test.yml/badge.svg)](https://github.com/Muhammad-Abubakar-Saif001/Assignment_02/actions/workflows/test.yml)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.x-brightgreen.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/express-v5.2.1-blue.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-blue.svg)](https://www.postgresql.org/)
[![TypeORM](https://img.shields.io/badge/ORM-TypeORM-orange.svg)](https://typeorm.io/)
[![Jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://jestjs.io/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A robust, modern RESTful backend application built with **Node.js (ES Modules)**, **Express 5**, **TypeORM**, and **PostgreSQL**, complete with automated integration test suites and GitHub Actions CI/CD workflows.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
- [Running the Application](#-running-the-application)
- [API Reference](#-api-reference)
- [Automated Testing](#-automated-testing)
- [Continuous Integration (CI/CD)](#-continuous-integration-cicd)
- [Author & License](#-author--license)

---

## 📖 Overview

This repository demonstrates modern backend development patterns with asynchronous database integration and automated testing. It features an Express REST API with TypeORM for object-relational mapping against a PostgreSQL database, an automated test suite using Jest and Supertest, and a fully configured GitHub Actions workflow that provisions a live PostgreSQL service container during test execution.

---

## ✨ Key Features

- **Modern JavaScript (ESM)**: Built using standard ECMAScript Modules (`import`/`export`).
- **Express 5 API**: Clean routing and JSON payload processing.
- **Relational Data Mapping**: TypeORM `EntitySchema` for schema definitions and queries against PostgreSQL.
- **Environment Isolation**: Dynamic environment resolution (`.env` for development, `.env.test` for testing).
- **Integration Testing**: Automated HTTP testing with Jest & Supertest that verifies database persistence and cleans test data between test runs.
- **CI/CD Pipeline**: GitHub Actions workflow running on Ubuntu with a healthy PostgreSQL service container.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | [Node.js](https://nodejs.org/) (ES Modules) |
| **Framework** | [Express 5](https://expressjs.com/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) |
| **ORM** | [TypeORM](https://typeorm.io/) |
| **Testing** | [Jest](https://jestjs.io/), [Supertest](https://github.com/ladjs/supertest), [cross-env](https://github.com/kentcdodds/cross-env) |
| **Config** | [dotenv](https://github.com/motdotla/dotenv) |
| **CI/CD** | [GitHub Actions](https://github.com/features/actions) |

---

## 📁 Project Architecture

```plaintext
Assignment_02/
├── .github/
│   └── workflows/
│       └── test.yml          # GitHub Actions CI workflow with PostgreSQL service
├── src/
│   ├── config/
│   │   └── data-source.js    # TypeORM DataSource configuration & DB connection
│   └── entities/
│       └── User.js           # User entity schema definition
├── tests/
│   └── user.test.js          # Supertest + Jest integration tests
├── .env.example              # Sample environment configuration template
├── .gitignore                # Git ignored patterns & secrets
├── index.js                  # Application entry point & Express route definitions
├── package.json              # Project dependencies, metadata, and scripts
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v20.x or v24.x recommended)
- **npm** (v9.x or higher)
- **PostgreSQL** server running locally or via Docker

---

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Muhammad-Abubakar-Saif001/Assignment_02.git
   cd Assignment_02
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

---

### Environment Configuration

Create a `.env` file in the project root by copying the template:

```bash
cp .env.example .env
```

Populate the configuration values with your PostgreSQL credentials:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=your_database_name
```

> **Note:** For running tests locally, create a `.env.test` file targeting your test database instance.

---

## 💻 Running the Application

### Start the Server

```bash
npm start
```

When connected successfully, you should see:
```plaintext
Server running on port 3000
```

---

## 📡 API Reference

### Create a User

Creates a new user record in the PostgreSQL database.

- **URL:** `/users`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`

#### Request Body:

```json
{
  "name": "Abubakar Saif",
  "email": "abubakar@example.com"
}
```

#### Success Response:

- **Code:** `201 Created`
- **Content:**

```json
{
  "id": 1,
  "name": "Abubakar Saif",
  "email": "abubakar@example.com"
}
```

#### Error Response:

- **Code:** `500 Internal Server Error`
- **Content:**

```json
{
  "error": "Internal server error"
}
```

#### Example cURL Request:

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Abubakar Saif", "email": "abubakar@example.com"}'
```

---

## 🧪 Automated Testing

Integration tests verify endpoint behaviour, database connections, and data integrity.

To execute the test suite:

```bash
npm test
```

### What the test suite does:
- Initializes the TypeORM `DataSource` connection to the test database.
- Sends an HTTP `POST` request to `/users` using **Supertest**.
- Asserts that the response status is `201` and the user record is properly persisted in PostgreSQL.
- Cleans up and truncates table data after each test run and safely destroys the database connection upon completion.

---

## 🔄 Continuous Integration (CI/CD)

The project includes an automated GitHub Actions workflow defined in [`.github/workflows/test.yml`](.github/workflows/test.yml).

On every `push` to the repository, the workflow:
1. Provisions an **Ubuntu Latest** runner.
2. Spawns an isolated **PostgreSQL service container** with health checks.
3. Sets up **Node.js 24**.
4. Installs dependencies via `npm install`.
5. Executes the full integration test suite against the PostgreSQL container.

---

## 👤 Author

**Muhammad Abubakar Saif**
- GitHub: [@Muhammad-Abubakar-Saif001](https://github.com/Muhammad-Abubakar-Saif001)

---

## 📄 License

This project is licensed under the [ISC License](package.json).