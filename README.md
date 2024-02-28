# FinTech Instruments Display Project

Welcome to the FinTech Instruments Display project repository. This comprehensive project is designed to showcase financial instruments in a user-friendly interface, utilizing modern web technologies for both the frontend (FE) and backend (BE). Our aim is to provide an accessible platform for displaying various financial data and insights.

## Project Overview

This project is structured into two main components:

- **Frontend (Client)**: A React-based application that presents financial data in a visually appealing and interactive manner.
- **Backend (Server)**: A Flask (or alternative framework) API that aggregates and serves financial data from various sources.

## Environment Setup

### Prerequisites

- Docker
- Docker Compose
- Git
- Node.js (for local development)
- React (for local development)

### Docker Environment

This project is fully dockerized, allowing for easy setup and deployment. Docker and Docker Compose are used to containerize both the frontend and backend services, ensuring consistent environments across development, testing, and production.

#### Running with Docker Compose

1. Clone the repository:
   ```
   git clone https://github.com/NinjaKu8/fintech-instruments-display.git
   ```
2. Navigate to the project directory:
   ```
   cd fintech-instruments-display
   ```
3. Build and start the services with Docker Compose:

   ```
   docker compose up
   ```

   This command will start both frontend(`http://localhost:1234/`) and backend(`http://localhost:3000/`) services in containers, making them accessible via their respective ports as defined in the `docker-compose.yml` file.

4. Load financial instruments data (JSON files) into the Postgres DB:

   ```
   http://localhost:3000/importData
   ```

   After it's done successfully, it shows `Data import completed successfully.`

Now, the project is ready!

#### Visit the website

Visit [http://localhost:1234/](http://localhost:1234/).

## Project Structure

- **`/client`**: Contains the frontend application along with its README detailing setup and development instructions.
- **`/server`**: Houses the backend API source code with its own README for backend-specific guidelines.
- **`docker-compose.yml`**: Defines the multi-container Docker setup for running the frontend and backend services.
- **`/.github`**: Contains GitHub Actions workflows for continuous integration and deployment automation.

## GitHub Actions

This project utilizes GitHub Actions for CI/CD, automating tests, builds, and deployments. Workflows are defined under the `.github/workflows` directory, providing an automated pipeline for:

- Running tests for both frontend and backend on push or pull requests.
- Building Docker images and pushing them to a registry.
- Deploying the application to various environments.

## Further Information

For detailed setup and development instructions, please refer to the README files located in the [client](https://github.com/NinjaKu8/fintech-instruments-display/blob/master/client/README.md) and [server](https://github.com/NinjaKu8/fintech-instruments-display/blob/master/server/README.md) directories.
