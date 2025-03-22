# StaffSync - Employee Management System

StaffSync is a comprehensive employee management system built using the MERN stack. It provides role-based access control for admins and employees, along with features like employee and department management, leave tracking, search, filter, and pagination.

## Features

- Role-based authentication (Admin & Employee)
- Employee and department management
- Leave request and approval system
- Attendance marking system
- Search, filter, and pagination for efficient data retrieval
- Responsive UI with Tailwind CSS

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT
- **State Management:** Context API

## Installation & Setup

Follow these steps to set up the project on your local machine.

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/staffsync.git
cd staffsync
```

### 2. Set Up Environment Variables

Create a `.env` file in the server directory and define the following variables with your own values:

```env
PORT=
MONGODB_URL=
JWT_KEY=
```

### 3. Install Dependencies

#### Backend

```sh
cd server
npm install
```

#### Frontend

```sh
cd ../client
npm install
```

### 4. Seed the Database (Create Admin User)

Before running the application, seed the database by running:

```sh
cd ../server
node userSeed.js
```

This will create an admin user.

### 5. Start the Application

#### Backend

```sh
cd server
npm start
```

#### Frontend

```sh
cd ../client
npm run dev
```

## Folder Structure

### Server Directory

```
server/
│── controllers/
│── database/
│── middleware/
│── models/
│── routes/
│── public/upload/
│── .gitignore
│── package.json
│── package-lock.json
│── server.js
│── userSeed.js
```

### Client Directory

```
client/
│── public/
│── src/
│── .gitignore
│── index.html
│── package.json
│── package-lock.json
│── vite.config.js
```

## Contributing

Feel free to fork this repository and submit pull requests for improvements or new features.
