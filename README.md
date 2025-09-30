# Academic Papers API

This project is a RESTful API for managing academic paper submissions for a conference. It includes authentication for different user roles: teachers, students, and evaluators. The API supports both REST and GraphQL interfaces and is equipped with automated tests to ensure functionality and reliability.

## Features

- User authentication and authorization
- Role-based access control for teachers, students, and evaluators
- CRUD operations for academic paper submissions
- Integration with GraphQL for flexible querying
- Automated testing using Supertest, Mocha, and Chai

## Technologies Used

- Node.js
- Express.js
- MongoDB (or any other database of your choice)
- JWT for authentication
- Supertest for testing
- Mocha and Chai for assertions

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB (or your preferred database) running

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd academic-papers-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```
   DATABASE_URL=<your-database-url>
   JWT_SECRET=<your-jwt-secret>
   ```

### Running the Application

To start the application, run:
```
npm start
```

The API will be available at `http://localhost:3000` (or your specified port).

### Running Tests

To run the automated tests, use:
```
npm test
```

This will execute all unit and integration tests to ensure the API is functioning as expected.

## Coverage Report
- After each run, the coverage report is available in the Actions tab under Artifacts (coverage-report).
- Locally, you can generate the report with:

```
npm run coverage
```


## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Log in a user

### Paper Submissions

- `POST /api/papers`: Create a new paper submission
- `GET /api/papers`: Retrieve all paper submissions
- `GET /api/papers/:id`: Retrieve a specific paper submission
- `DELETE /api/papers/:id`: Delete a specific paper submission

## GraphQL

The GraphQL endpoint is available at `/graphql`. You can use it to perform queries and mutations related to paper submissions.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## Continuous Integration (CI/CD)

This project uses GitHub Actions to ensure code quality and reliability on every push and pull request.Pipeline Overview- Installs project dependencies with npm ci
- Starts a MongoDB service for integration tests
- Runs automated tests with Mocha, Chai, Sinon, and Supertest
- Generates a coverage report with nyc (Istanbul)
- Uploads the coverage report as an artifact in GitHub Actions

## Project Structure

```filetree
academic-papers-api
└── academic-papers-api
|   ├── src
|       ├── app.js
|       ├── server.js
|       ├── config
|           └── config.js
|       ├── controllers
|           ├── auth.controller.js
|           └── paper.controller.js
|       ├── middlewares
|           └── auth.middleware.js
|       ├── models
|           ├── paper.model.js
|           └── user.model.js
|       ├── routes
|           ├── auth.routes.js
|           └── paper.routes.js
|       ├── services
|           ├── auth.service.js
|           └── paper.service.js
|       ├── tests
|           ├── controllers
|               └── paper.controller.test.js
|           ├── integration
|               └── paper.test.js
|           └── setup.js
|       ├── graphql
|           ├── resolvers
|               └── paper.resolvers.js
|           ├── schemas
|               └── paper.schema.js
|           └── index.js
|       └── utils
|           └── auth.js
|   ├── package.json
|   ├── README.md
|   └── .env
|   ├── coverage


## License

This project is licensed under the MIT License. See the LICENSE file for details.