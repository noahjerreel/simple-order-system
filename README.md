# Order System – Full Stack Technical Exercise

## Overview

This project implements a small **full-stack order processing system**.

Users can submit an order through a **React frontend**, which calls a **Node.js + TypeScript backend API**. The backend validates the request, calculates the total order price, simulates order processing, and returns a response indicating whether the order was **CONFIRMED** or **REJECTED**.

The system uses **in-memory storage only** and includes **authentication, validation, and automated tests**.

---

# Tech Stack

### Backend

* Node.js
* Express
* TypeScript
* Joi (schema validation)
* JSON Web Token (JWT)
* Mocha + Chai + Supertest (testing)

### Frontend

* React
* TypeScript
* Fetch API

---

# Project Structure

```
order-system
│
├── backend
│   ├── configs
│   │   └── constants
│   │   │   └── app.constant.ts
│   │   │   
│   │   └─ development.env.yml
│   │
│   ├── production
│   │   ├── controllers
│   │   ├── services
│   │   ├── middleware
│   │   ├── validators
│   │   ├── routes
│   │   └── helpers
│   │
│   ├── test
│   │   └── order.test.ts
│   │
│   └── server.ts
│   └── tsconfig.json
│
└── frontend
    │
    ├── package.json
    ├── tsconfig.json
    │
    └── production
        ├── index.tsx
        ├── App.tsx
        ├── api.ts
        └── types.ts
```

---

# Backend Architecture

The backend follows a **layered architecture**:

```
Route → Middleware → Controller → Service
```

### Responsibilities

| Layer      | Responsibility                |
| ---------- | ----------------------------- |
| Routes     | Define API endpoints          |
| Middleware | Authentication and validation |
| Controller | Handles request/response      |
| Service    | Business logic                |

This approach improves:

* maintainability
* testability
* scalability
* separation of concerns

---

# API Endpoint

## POST `/orders`

Creates a new order.

### Request

```json
{
  "items": [
    { "id": "item_1", "quantity": 2 },
    { "id": "item_2", "quantity": 1 }
  ],
  "customer": {
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

### Successful Response

```json
{
  "orderId": "ord_123",
  "status": "CONFIRMED",
  "total": 4200
}
```

### Rejected Response

```json
{
  "orderId": "ord_123",
  "status": "REJECTED",
  "reason": "ORDER_TOTAL_TOO_HIGH"
}
```

---

# Validation Rules

The API validates:

* At least **one item must exist**
* **Quantity must be greater than 0**
* **Customer name is required**
* **Customer email must be valid**

Validation is implemented using **Joi schemas**.

---

# Authentication

The API uses **JWT authentication**.

### Token Requirements

Requests must include:

```
Authorization: Bearer <JWT_TOKEN>
```

JWT tokens:

* expire after **1 hour**
* are validated by **auth middleware**

---

# Order Processing Logic

Item prices are mocked in memory.

Example:

```
item_1 = 1000
item_2 = 2000
item_3 = 1200
```

The API calculates the total price:

```
total = item_price × quantity
```

If the total exceeds a predefined threshold:

```
ORDER_TOTAL_TOO_HIGH
```

The order is **rejected**.

Otherwise it is **confirmed**.

---

# Frontend

The React application allows a user to:

* enter customer name
* enter customer email
* add multiple items
* specify item quantities
* submit the order
* view API responses

The UI handles:

* loading state
* success state
* error state

The frontend communicates with the backend using the **Fetch API**.

---

# Testing

The backend includes **unit and integration tests** using:

* Mocha
* Chai
* Supertest

### Positive Tests

1. Valid order returns **CONFIRMED**
2. Large order returns **REJECTED**
3. Order with multiple items succeeds

### Negative Tests

1. Missing JWT token
2. Invalid request body
3. Invalid email format

Tests validate:

* authentication
* request validation
* business logic

---

# Running the Project

## Backend

Install dependencies:

```
cd backend
npm install
```

Run server:

```
npm run dev
```

Run tests:

```
npm test
```

---

## Frontend

Install dependencies:

```
cd frontend
npm install
```

Start React app:

```
npm start
```

---

# Design Decisions

### Layered Architecture

Separates concerns between routing, validation, business logic, and response handling.

### Middleware

Authentication and validation are reusable across endpoints.

### In-Memory Storage

Used to keep the implementation simple and focus on API design and validation logic.

---

# Tradeoffs

| Decision             | Tradeoff                |
| -------------------- | ----------------------- |
| In-memory storage    | Data is lost on restart |
| Simple price catalog | Not dynamic             |
| Single endpoint API  | Limited functionality   |

These were chosen to keep the implementation focused on **core backend design principles**.

---

# Improvements with More Time

If this were a production system, I would add:

* PostgreSQL database
* Redis caching
* Order persistence
* OpenAPI / Swagger documentation
* Docker containerization
* CI/CD pipeline
* API rate limiting
* structured logging
* monitoring and alerting

---

# Future Extensions

Potential system extensions:

### Order Persistence

Store orders in a database for history and analytics.

### Inventory Management

Check item availability before confirming orders.

### Payment Integration

Integrate payment gateways before confirming orders.

### Event-Driven Processing

Introduce a message queue (Kafka / SQS) to process orders asynchronously.

### Idempotency

Prevent duplicate order submissions using idempotency keys.

---

# Summary

This project demonstrates:

* backend API design
* request validation
* authentication
* separation of concerns
* full-stack integration
* automated testing

The architecture is intentionally structured so that it can **scale into a production-grade service with minimal refactoring**.
