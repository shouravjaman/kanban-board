# Kanban Board
A simple Kanban task management application built with vanilla JavaScript, Node.js, Express, and MongoDB.

## Live Demo

[Open the Kanban Board](https://shouravjaman.github.io/kanban-board/)

## Features

- Create new tasks.
- Move tasks between Todo, Doing, and Done columns.
- Edit task titles.
- Delete tasks.
- Save tasks in MongoDB so they remain available after refreshing.
- Display a loading screen while tasks are being fetched from the server.

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- Mongoose

### Database
- MongoDB Atlas

### Deployment
- GitHub Pages — Frontend
- Render — Backend

## Project Structure

```text
Kanban-board/
├── backend/
│   ├── models/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── CSS/
│   ├── JS/
│   └── assets/
└── .github/
    └── workflows/
        └── deploy.yml
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Fetch all tasks |
| POST | `/api/tasks` | Create a task |
| PATCH | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## What I Learned

This was initially a frontend project. I later integrated backend to practice and improve my backend foundation, so it might not have some fancy functionalities but i tried my best to implement what i have learned and i learned more while building the project from scratch.

Through this project, I practised:

- Building REST APIs with Express.
- Connecting a Node.js application to MongoDB.
- Creating and using Mongoose models.
- Handling asynchronous requests with `async/await`.
- Performing CRUD operations.
- Connecting a frontend to a backend using `fetch()`.
- Deploying a frontend and backend separately.
- Using GitHub Actions to automate frontend deployment.
