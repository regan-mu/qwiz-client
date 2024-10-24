# Qwiz App (Frontend)

Qwiz is a dynamic web application designed for creating, managing, and answering quizzes. It features a clean interface for users to participate in quizzes, as well as an admin dashboard for quiz management.

## Features

- **Create Quizzes:** Easily create quizzes with multiple questions and answers.
- **Answer Quizzes:** Users can answer quizzes one question at a time in a multistep format.
- **Edit Quizzes:** Modify quiz details such as title, description, and deadline.
- **View Results:** See quiz responses and track average scores.
- **User Profiles:** View and update user profiles with email and username.
- **Authentication:** Secure login and signup functionality.

## Technologies Used

- **Frontend:** React, TypeScript, Tailwind CSS, Material React Table, VITE
- **Backend:** Node.js, Express.js, Prisma, PostgreSQL
- **API:** Axios, TanStack Query
- **Authentication:** JWT (JSON Web Token)

## Running Locally

1: Clone the repository:

```bash
git clone https://github.com/regan-mu/qwiz-client.git
cd qwiz-client
```

2: Install Dependencies

```bash
npm install
```

3: Set up environment variables:

Create a **.env** file in the root and add your database URL, JWT secret, and other necessary environment variables. Use the **.env-sample**.

```bash
npm run dev
```

6: Open your browser and navigate to <http://localhost:5173>.

7: Make sure the API backend is running as well. The backend is hosted on this **[REPOSITORY](https://github.com/regan-mu/qwiz-backend)**
