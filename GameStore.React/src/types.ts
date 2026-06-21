export interface Genre {
  id: number;
  name: string;
}

/** Returned by GET /games — note `genre` is the genre name, not the id. */
export interface GameSummary {
  id: number;
  name: string;
  genre: string;
  price: number;
  releaseDate: string; // ISO date "YYYY-MM-DD"
}

/** Returned by GET /games/{id} — note `genreId` instead of a genre name. */
export interface GameDetails {
  id: number;
  name: string;
  genreId: number;
  price: number;
  releaseDate: string; // ISO date "YYYY-MM-DD"
}

/** Request body shared by POST /games (create) and PUT /games/{id} (update). */
export interface GameInput {
  name: string;
  genreId: number;
  price: number;
  releaseDate: string; // ISO date "YYYY-MM-DD"
}
