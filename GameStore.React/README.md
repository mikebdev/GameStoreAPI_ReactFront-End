# GameStore React Frontend

A dark, colorful React + TypeScript single-page app for the **GameStore** Web API.
Provides full CRUD management of games with a top navigation bar.

## Tech stack

- [Vite](https://vitejs.dev/) + React 18 + TypeScript
- [react-router-dom](https://reactrouter.com/) for routing
- Native `fetch` (no axios / query library)
- Custom CSS (CSS variables, gradient accents — no UI framework)

## Prerequisites

The backend API (`../GameStore.Api`) must be running. By default it listens on
`http://localhost:5093`. CORS is configured on the API to allow this app's origin
(`http://localhost:5173`).

Start the API:

```bash
cd ../GameStore.Api
dotnet run
```

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Configuration

The API base URL is read from `.env`:

```
VITE_API_BASE_URL=http://localhost:5093
```

Change it if your API runs elsewhere. If you change the frontend's dev port,
update the CORS policy origins in `GameStore.Api/Program.cs` to match.

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the dev server (port 5173)     |
| `npm run build`   | Type-check and build for production   |
| `npm run preview` | Preview the production build locally  |

## Routes

| Route             | Page                          |
| ----------------- | ----------------------------- |
| `/`               | Games list (with delete)      |
| `/games/new`      | Create a game                 |
| `/games/:id`      | Game details                  |
| `/games/:id/edit` | Edit a game                   |
