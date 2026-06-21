import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import GamesListPage from './pages/GamesListPage';
import GameDetailsPage from './pages/GameDetailsPage';
import CreateGamePage from './pages/CreateGamePage';
import EditGamePage from './pages/EditGamePage';
import './styles/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <GamesListPage /> },
      { path: 'games/new', element: <CreateGamePage /> },
      { path: 'games/:id', element: <GameDetailsPage /> },
      { path: 'games/:id/edit', element: <EditGamePage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
