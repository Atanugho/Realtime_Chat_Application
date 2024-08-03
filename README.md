# Chat Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction
This is a real-time chat application that allows users to communicate with each other. It supports multiple chat rooms, user authentication, and real-time messaging. The application is built using the MERN stack (MongoDB, Express, React, Node.js).

## Features
- User Authentication (Register, Login, Logout)
- Real-time Messaging
- Multiple Chat Rooms
- User Presence Indicator (Online/Offline Status)
- Responsive Design

## Technologies Used
- **Frontend:** React, Redux, Socket.io-client
- **Backend:** Node.js, Express, Socket.io
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Styling:** CSS, Material-UI

## Installation
Follow these steps to set up the project on your local machine:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/chat-application.git
   cd chat-application

2. **Install the dependencies:**
   ```sh
   cd ../client
   npm install

3. **Install client dependencies:**
    ```sh
    cd ../server
    npm install

4. **Create a .env file in the server directory and add the following environment variables:**
    ```sh
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret

5. **Start the development server:**
    ```sh
    npm run dev

6. **start the client server:**
    ```sh
    cd ../client
    npm start

## Usage

1. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
2. Register a new account or log in with an existing account.
3. Join a chat room or create a new one.
4. Start chatting with other users in real-time.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-branch
   git commit -m "Add some feature"
   git push origin feature-branch
