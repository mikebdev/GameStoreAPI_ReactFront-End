import type { GameDetails, GameInput, GameSummary, Genre } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5093';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...init,
    });
  } catch {
    throw new ApiError(0, `Could not reach the API at ${BASE_URL}. Is it running?`);
  }

  if (!res.ok) {
    const body = await res.text();
    throw new ApiError(res.status, body || `Request failed with status ${res.status}`);
  }

  // 204 No Content (PUT/DELETE) has no body to parse.
  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}

export const getGames = () => request<GameSummary[]>('/games');

export const getGame = (id: number) => request<GameDetails>(`/games/${id}`);

export const createGame = (game: GameInput) =>
  request<GameDetails>('/games', {
    method: 'POST',
    body: JSON.stringify(game),
  });

export const updateGame = (id: number, game: GameInput) =>
  request<void>(`/games/${id}`, {
    method: 'PUT',
    body: JSON.stringify(game),
  });

export const deleteGame = (id: number) =>
  request<void>(`/games/${id}`, { method: 'DELETE' });

export const getGenres = () => request<Genre[]>('/genres');
