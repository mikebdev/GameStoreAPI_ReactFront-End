import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getGame, getGenres } from '../api/gameStoreApi';
import type { GameDetails, Genre } from '../types';
import { formatDate, formatPrice } from '../utils/format';

export default function GameDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<GameDetails | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const gameId = Number(id);
    setLoading(true);
    setError(null);
    Promise.all([getGame(gameId), getGenres()])
      .then(([gameData, genreData]) => {
        setGame(gameData);
        setGenres(genreData);
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Failed to load game.')
      )
      .finally(() => setLoading(false));
  }, [id]);

  const genreName = game ? genres.find((g) => g.id === game.genreId)?.name ?? '—' : '';

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">{game ? game.name : 'Game'}</h1>
        <Link to="/" className="btn btn-ghost">
          ← Back
        </Link>
      </div>

      {error && <div className="alert">{error}</div>}

      {loading ? (
        <div className="center">
          <span className="loader" />
        </div>
      ) : game ? (
        <>
          <div className="detail-card">
            <div className="detail-row">
              <span className="label">Name</span>
              <span className="value">{game.name}</span>
            </div>
            <div className="detail-row">
              <span className="label">Genre</span>
              <span className="value">
                <span className="badge">{genreName}</span>
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Price</span>
              <span className="value">{formatPrice(game.price)}</span>
            </div>
            <div className="detail-row">
              <span className="label">Release date</span>
              <span className="value">{formatDate(game.releaseDate)}</span>
            </div>
          </div>

          <div className="form-actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/games/${game.id}/edit`)}
            >
              Edit
            </button>
          </div>
        </>
      ) : (
        !error && <div className="empty-state">Game not found.</div>
      )}
    </div>
  );
}
