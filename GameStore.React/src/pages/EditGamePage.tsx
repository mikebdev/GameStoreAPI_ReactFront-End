import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GameForm from '../components/GameForm';
import { getGame, getGenres, updateGame } from '../api/gameStoreApi';
import type { GameInput, Genre } from '../types';

export default function EditGamePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const gameId = Number(id);

  const [genres, setGenres] = useState<Genre[]>([]);
  const [initialValue, setInitialValue] = useState<GameInput | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([getGame(gameId), getGenres()])
      .then(([game, genreData]) => {
        setGenres(genreData);
        setInitialValue({
          name: game.name,
          genreId: game.genreId,
          price: game.price,
          releaseDate: game.releaseDate,
        });
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Failed to load game.')
      )
      .finally(() => setLoading(false));
  }, [gameId]);

  async function handleSubmit(value: GameInput) {
    setSubmitting(true);
    setError(null);
    try {
      await updateGame(gameId, value);
      navigate(`/games/${gameId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update game.');
      setSubmitting(false);
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Edit Game</h1>
      </div>

      {error && <div className="alert">{error}</div>}

      {loading ? (
        <div className="center">
          <span className="loader" />
        </div>
      ) : initialValue ? (
        <GameForm
          genres={genres}
          initialValue={initialValue}
          submitLabel="Save Changes"
          submitting={submitting}
          onSubmit={handleSubmit}
          onCancel={() => navigate(`/games/${gameId}`)}
        />
      ) : (
        !error && <div className="empty-state">Game not found.</div>
      )}
    </div>
  );
}
