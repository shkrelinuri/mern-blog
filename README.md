# MERN Blog

A blog app with a React front end and a Node.js/Express API backed by MongoDB. Readers can browse posts, and signed-in authors can create, edit, and delete their own posts.

## Project layout

- `client/` — React app, started with Create React App.
- `api/` — Express API and Mongoose models.

## Local setup

Install dependencies in both parts of the app:

```sh
cd api
npm install
cd ../client
npm install
```

The API listens on port `4000`, and the client expects it at `http://localhost:4000`. Before the app can run, configure a MongoDB connection and a private JWT signing secret in the API; the current API file still contains placeholder development values. Do not deploy it as-is or reuse those values in a real service.

Start the API with `node index.js` from `api/`, then start the client with `npm start` from `client/`. The React app opens at `http://localhost:3000`.
