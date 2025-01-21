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
//
// ## Installation
// 1. Clone the repository:
//    ```bash
//    git clone <repo-url>
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
// - `PUT /api/events/:id`: Edit an event (Authenticated, Event Creator Only)
// - `POST /api/purchases/purchase`: Purchase tickets (Authenticated)
// - `GET /api/purchases/history`: View purchase history (Authenticated)
//
// ## Testing
// Run tests using:
// ```bash
// npm test
// ```
//
// ## Docker Deployment
// 1. Build and run the Docker containers:
//    ```bash
//    docker-compose up --build
//    ```
// 2. Access the application at `http://localhost:3000`.
//