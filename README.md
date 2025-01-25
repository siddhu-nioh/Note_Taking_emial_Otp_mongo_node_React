# Note_Taking_emial_Otp_mongo_node_React
 note taking appliaction created with clean ui with user login and sign up with mail system otp verification , in frontned used react and in backend used node with express and jwt with nodemailer and mongodb as database 
# Full-Stack Note-Taking Application

## Project Overview
This project involves the development of a full-stack note-taking application that allows users to create, manage, and delete notes. The application features user authentication using email and OTP, and it is designed to be mobile-friendly while closely replicating the provided design.

### Download Assets
 download the necessary assets (images and other static files) using the following link:
[Download Assets](https://hwdlte.com/RvqdLn)

## Tasks Completed
1. User Signup: Implement a signup process using email and OTP flow. Ensure that all inputs required for signup are properly validated.
2. Error Handling: Display relevant error messages in case of incorrect inputs, OTP errors, or API failures.
3. Welcome Page: After signup or login, display a welcome page that shows user information. Provide users with the ability to create and delete notes.
4. Responsive Design: Ensure the design is mobile-friendly and closely replicates the provided design from the link above.
5. Authorization: Use JWT to authorize users for creating or deleting their notes.

## Additional Notes
- Use the latest versions of all resources.
- Commit your work after completing each feature.
- Include a README file with clear instructions on how to build the project.
- Share the completed project within the next 3 days.
- Deploy the project in the cloud and share the URL.
- Google account signup or login is not required.

## Technology Stack
- Front-end: ReactJS 
- Backend:  Node.js ,Express js 
- Database: MongoDB
- Version Control: Git

## Getting Started

### Prerequisites
Make sure you have the following installed:
- Node.js
- npm (Node Package Manager)
- A code editor (e.g., Visual Studio Code)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install Dependencies**
   - For Frontend:
     ```bash
     cd note-taking-frontend
     npm install
     ```

   - For Backend:
     ```bash
     cd note-taking-backend
     npm install
     ```

3. **Run the Application**
   - Start the backend server:
     ```bash
     cd note-taking-backend
     npm  start
     ```

   - Start the frontend application:
     ```bash
     cd  note-taking-frontend
     npm  start
     ```

### Project Structure

```
/project-root
│
├── /note-taking-frontend          # Frontend React application
│   ├── /src           # Source files for React components and assets
│   └── package.json   # Frontend dependencies and scripts
│   
├── /note-taking-backend           # Backend Node.js application
│   ├── /src           # Source files for API routes and controllers
│   └── package.json   # Backend dependencies and scripts
│   
└── README.md          # Project documentation
```

## Features

- User authentication with email and OTP validation.
- CRUD operations for notes (Create, Read, Update, Delete).
- Responsive design for mobile compatibility.
- JWT-based authorization for secure note management.

