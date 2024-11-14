# Interactive Web App for Mills and PKS Dumpsites

An interactive, responsive web app that displays and manages a set of map markers for mills and Palm Kernel Shell (PKS) dumpsites.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup Instructions](#setup-instructions)
3. [API Endpoints](#api-endpoints)
4. [Swagger Documentation](#swagger-documentation)
5. [Environment Variables](#environment-variables)

---

## Prerequisites

Before setting up the project, make sure you have the following installed:

- **Node.js** (version 14 or above)
- **npm** (Node Package Manager)
- **MongoDB** (Running locally or via a cloud service like MongoDB Atlas)

You can download and install **Node.js** from [nodejs.org](https://nodejs.org/).

You can set up MongoDB by following the [MongoDB installation guide](https://docs.mongodb.com/manual/installation/).

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Ejay02/releaf_be.git
cd project-name
```


### 2. Install dependencies

Run the following command to install all necessary packages:

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file at the root of the project with the following environment variables:

```bash
MONGODB_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=your-secret-key
```

- `MONGODB_URI`: This is the connection string for your MongoDB database. If you are using MongoDB locally, the default connection is `mongodb://localhost:27017/<your-database-name>`.
- `JWT_SECRET`: This is the secret key used to sign JWT tokens. Make sure to use a strong, secret value for security.

### 4. Run the application

To run the application locally, use the following command:

```bash
npm run start:dev
```

This will start the app in development mode. The app will be available at `http://localhost:3000`.

---

## API Endpoints

Below are the main API endpoints of the application:

### **User**

- **POST /auth/register**
  Create a new user.

  **Request Body:**

  ```json
  {
    "username": "john_doe",
    "email": "john_doe@example.com",
    "password": "securePassword123"
  }
  ```

  **Response:**

  - **201 Created:** User created successfully.
  - **400 Bad Request:** Validation errors or missing fields.

- **POST /auth/login**
  Login and get a JWT token.

  **Request Body:**

  ```json
  {
    "email": "john.doe@example.com",
    "password": "password"
  }
  ```

  **Response:**

  - **200 OK:** Returns the JWT token.

---

### **Dumpsites**

- **GET /dumpsites**
  Get a list of all dumpsites.

  **Response:**

  - **200 OK:** Returns the list of dumpsites.

- **POST /dumpsites**
  Create a new dumpsite (Protected by JWT).

  **Request Body:**

  ```json
  {
    "latitude": 45.0,
    "longitude": 50.0,
    "capacity": 100,
    "status": "active"
  }
  ```

  **Response:**

  - **201 Created:** Dumpsite created successfully.
  - **401 Unauthorized:** JWT token required.

- **GET /dumpsites/:id**
  Get a specific dumpsite by ID.

  **Response:**

  - **200 OK:** Returns the dumpsite data.
  - **401 Unauthorized:** JWT token required.
  - **404 Not Found:** Dumpsite not found.

---

## Swagger Documentation

You can access the full API documentation through Swagger at:

- **Local (Development)**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

- **Dev (Development)**: [https://releaf-be.onrender.com/api/docs](https://releaf-be.onrender.com/api/docs)

Swagger provides an interactive interface to explore and test the API endpoints. You can authorize requests by clicking the **Authorize** button and entering the JWT token in the **Bearer** field or use PostMan.

For example, to test the **Login** endpoint:

- Go to `POST /auth/login`
- Click **Try it out**, fill in the login details, and click **Execute**.
- You’ll get a JWT token in the response.
- Copy that token and click **Authorize** at the top of the Swagger UI. Paste the token in the **Authorization** field and click **Authorize**.
- Now you can test the protected endpoints with the authorized token.



## Environment Variables

Make sure you configure the following environment variables before running the app:

| Variable      | Description                                          |
| ------------- | ---------------------------------------------------- |
| `MONGODB_URI` | MongoDB connection URI, either local or cloud-based. |
| `JWT_SECRET`  | The secret key used for signing JWT tokens.          |


