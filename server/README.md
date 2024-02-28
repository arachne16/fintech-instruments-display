# Financial-Instruments-Display Backend Project

## Overview

The Financial-Instruments-Display Backend Project is designed to showcase a backend solution for financial applications focusing on provide a robust, scalable, and efficient platform for financial transactions, data analysis, and more.
This project aims to demonstrate best practices in backend development, API design, and integration with financial data services.

## Technical Specifications and Architecture

- **Language**: JavaScript
- **Runtime Environment**: Node.js
- **Testing Framework**: Jest for comprehensive unit and integration testing.
- **Database Management**: PostgreSQL, chosen for its robustness, reliability, and feature-rich support for complex queries and transactions.
- **Package Manager**: npm for efficient management of project dependencies.

## Architecture Overview

- **`src/` Directory**: Contains the source code for the application.
  - **`routes/`**: Defines API endpoints, routing client requests to appropriate service handlers.
  - **`models/`**: Represents data models and contains database access logic, facilitating interaction with the PostgreSQL database.
  - **`utils/`**: Utility functions and helpers that provide common functionalities across the application.
  - **`src/tests`**: Unit Testing and Integration Testing are implemented.
- **`package.json`**: Specifies project dependencies and scripts for running the application and tests.
- **`jest.config.js`**: Configuration file for Jest, setting up testing environments and options.
- **`.env / .env.test`**: Configuration file with necessary environment variables, such as database connection settings.

## Setup Instructions

### Prerequisites

Ensure you have Node.js and npm installed on your system. This project was built with Node.js version 20.x.x and npm version 10.x.x.

### Setting Up PostgreSQL

1. **Install PostgreSQL**: Follow the [official documentation](https://www.postgresql.org/download/) to install PostgreSQL on your system.
2. **Create a Database**: Create a new database for the project:
   ```sql
   CREATE DATABASE finance;
   ```
3. **Update `.env` File**: Ensure your `.env` file includes the correct database connection information:
   ```
   postgres://postgres:postgres@localhost:5432/finance
   ```

### Project Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/NinjaKu8/fintech-instruments-display.git
   cd fintech-instruments-display/server
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```

## How to Run the Application

Before starting the application, make sure the PostgreSQL database is running and accessible with the credentials provided in your `.env` file.

To start the server, run:

```bash
npm start
```

This will initialize the application and connect to the PostgreSQL database. The application will be accessible on the default port specified in your configuration (e.g., port 3000).

## Running Tests

To run the test suite with Jest, execute:

```bash
npm test
```
