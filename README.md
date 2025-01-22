/**
 * README.md Content
 */
// # Ticket Purchase API
//
// ## Description
// This API allows users to manage and purchase tickets for events. It includes functionality for user registration, authentication, event creation, ticket purchases, and viewing purchase history.
//
// ## Features
// - User Registration and Authentication
// - Event Management
// - Ticket Purchases
// - Purchase History Retrieval
// - API Documentation available at (http://localhost:3000/api-docs)
//
// ## Installation
// 1. Clone the repository:
//    ```bash
//    git clone https://github.com/mkmike24/ticket_purchase.git
//    ```
// 2. Install dependencies:
//    ```bash
//    npm install
//    ```
// 3. Add environment variables to a `.env` file:
//    ```
//    MONGO_URI=mongodb://localhost:27017/ticket_service
//    JWT_SECRET=your_jwt_secret_key
//    PORT=3000
//    ```
// 4. Start the server:
//    ```bash
//    npm start
//    ```
//
// ## API Endpoints
// - `POST /api/auth/register`: Register a new user
// - `POST /api/auth/login`: Log in and get a token
// - `POST /api/events`: Create an event (Authenticated)
// - `GET /api/events`: View all events
// - `GET /api/events/:eventId/tickets`: View all ticket categories by enventId
// - `PUT /api/events/:id`: Edit an event (Authenticated, Event Creator Only)
// - `POST /api/purchases/purchase`: Purchase tickets (Authenticated)
// - `GET /api/purchases/history`: View purchase history (Authenticated)
//
// ## Testing
// Run tests using:
// ```bash
// npm test <filename>
// ```
//
// ## End-to-End Testing
// End-to-end tests are located in the `tests/e2e.spec.js` file. These tests cover:
// - User registration and login
// - Event creation, retrieval, and editing
// - Ticket purchase
// - Purchase history retrieval
//
// ## Unit Testing
// Unit tests are located in the `tests/unit.spec.js` file. These tests cover:
// - User registration and login
// - Event creation, retrieval, and editing
// - Ticket purchase
// - Purchase history retrieval
//
// ## Docker Deployment
// 1. Build and run the Docker containers:
//    ```bash
//    docker-compose up --build
//    ```
// 2. Access the application at `http://localhost:3000`.
//
