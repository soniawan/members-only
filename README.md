# Members Only

An exclusive clubhouse where registered users can write messages, but only members can see who the author of each message is. Admins have the additional privilege to delete messages. This project is built to practice user authentication, session management, and role-based authorization.

## Features

*   **User Authentication**: Secure sign-up and log-in functionality.
*   **Role-Based Access Control**:
    *   **Guest**: Can view messages but not the author or the date.
    *   **Member**: Can view messages along with the author and the date.
    *   **Admin**: Has all member privileges plus the ability to delete messages.
*   **Message Board**: Users can post new messages to the board.
*   **Secure Passwords**: User passwords are encrypted using `bcryptjs` before storing in the database.
*   **Input Validation**: Forms are validated using `express-validator` to ensure data integrity.

## Technologies Used

*   **Backend**: Node.js, Express.js
*   **Database**: PostgreSQL, `pg` module
*   **Authentication**: Passport.js (Local Strategy), `express-session`
*   **View Engine**: EJS (Embedded JavaScript templates)
*   **Security**: `bcryptjs` for password hashing, `dotenv` for environment variable management

## Prerequisites

Before you begin, ensure you have met the following requirements:

*   You have installed **Node.js** and **npm**.
*   You have installed and set up **PostgreSQL**.

## Database Setup

1.  Log in to your PostgreSQL shell (`psql`).
2.  Create a new database named `members-only`:
    ```sql
    CREATE DATABASE "members-only";
    ```
3.  Connect to the database:
    ```sql
    \c "members-only"
    ```
4.  Create the `users` and `messages` tables by executing the following queries:

    ```sql
    CREATE TABLE users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_member BOOLEAN DEFAULT FALSE,
        is_admin BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE messages(
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title VARCHAR(255) NOT NULL,
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
    );
    ```

## Getting Started

Follow these steps to run the project locally.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/soniawan/members-only.git
    cd members-only
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables Setup:**
    Create a `.env` file in the root directory and configure the following variables. Replace the values with your actual database credentials and a secure session secret.
    ```env
    PORT=3000
    DATABASE_URL=postgresql://your_db_user:your_password@localhost:5432/members-only
    SESSION_SECRET=your_super_secret_session_key
    NODE_ENV=development
    ```
    *(Note: `DATABASE_URL` format or individual DB credentials like `DB_USER`, `DB_PASSWORD`, etc., depending on your `db/pool.js` configuration)*

4.  **Run the application:**
    *   For development (uses `nodemon` for auto-restart):
        ```bash
        npm run dev
        ```
    *   For production:
        ```bash
        npm start
        ```

5.  **Access the App:**
    Open your web browser and navigate to `http://localhost:3000`.
